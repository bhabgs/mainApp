import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useIntervalFn, useStorage } from '@vueuse/core';
import VConsole from 'vconsole';
import { Login } from 'inl-ui/dist/utils';
import { extraPages } from '@/micro-apps/page';
import { message } from 'ant-design-vue';

import { Layout } from 'inl-ui/dist/components';
// import { Layout } from '../../../../industrial-ui/dist/components';
import * as api from '@/api/pages/main';
import * as personalCenterApi from '@/api/pages/personalCenter';
import clientApi from '@/api/client';

export interface IMenuItem {
  id: string;
  code: string;
  name: string;
  icon?: string;
  mode: 0 | 1 | 2;
  url: string;
  parentId?: string;
  valid: 1 | 0;
  subList: IMenuItem[];
}

export type MenuList = IMenuItem[];

const loginFun = new Login();

const Main = defineComponent({
  async beforeRouteEnter(to, from) {
    const { showConsole }: any = to.query;
    if (showConsole === 'true') {
      new VConsole();
    }
    // url中携带的token优先
    const queryToken = to.query.token as string;
    const userId = to.query.userId as string;
    const appId = to.query.appId as string;
    // sessionStorage.setItem('appId', appId || "0");
    (window as any).__APP_ID__ = appId || '0';
    if (queryToken) {
      localStorage.setItem('token', queryToken);
      sessionStorage.setItem('token', queryToken);
      if (userId) {
        const userinfo = JSON.parse(sessionStorage.getItem('userinfo') || '{}');
        userinfo.userId = userId;
        sessionStorage.setItem('userinfo', JSON.stringify(userinfo));
      }
    }
    const token = window.sessionStorage.getItem('token');
    if (to.path !== '/login') {
      if (queryToken) {
        try {
          await loginFun.getTokenByCode();
          return;
        } catch (e) {
          return '/login';
        }
      } else if (to.query?.env === 'zx') {
        // 智信微应用 => 免登
        await loginFun.getTokenByCode();
        return;
      } else if (token) {
        return;
      } else {
        return '/login';
      }
    }
    return;
  },
  setup() {
    const router = useRouter();

    // 获取app列表
    const url = new URL('/micro-app.json', import.meta.url);
    const appList = ref([]);
    const getAppList = async () => {
      appList.value = await (await fetch(url.href)).json();
    };
    getAppList();

    const copyright = useStorage<string>(
      'homepageCopyright',
      '',
      sessionStorage,
    );
    const user = useStorage<any>('userinfo', {}, sessionStorage);

    // 用户权限菜单
    const userMenu = ref<MenuList>([]);
    const getUserMenu = async () => {
      const { data: menuData } = await api.getUserMenu();
      userMenu.value = menuData;
    };
    getUserMenu();

    // 网页logo
    const logo = ref();
    const getLogo = async () => {
      logo.value = URL.createObjectURL(await api.getWebLogo(4, 1));
    };
    getLogo();

    // 轮询未读消息个数
    const unreadCount = ref(0);
    const { pause } = useIntervalFn(
      async () => {
        try {
          const { data: msgCount } = await api.getUnreadMessageCount();
          const { data: taskCount } =
            await personalCenterApi.getTaskTodoCount();
          unreadCount.value = msgCount + taskCount;
        } catch {
          pause();
        }
      },
      3000,
      { immediateCallback: true },
    );

    // 打开页面
    const handleExtraPage = (key: string) => {
      router.push({
        path: '/',
        query: {
          extraPageKey: key,
        },
      });
    };

    // 全局搜索
    const handleGlobalSearch = (e) => {
      router.push({
        path: '/',
        query: {
          extraPageKey: 'globalSearch',
          keyword: e,
        },
      });
    };

    // 退出登录
    const handleLogout = async () => {
      // 记录登出日志
      try {
        await clientApi.insertLogRecord({
          createUser: user.value.userName,
          softSysId: '1',
          operateId: '111',
          recordId: '11',
          moduleId: '4',
          content: '登出',
        });
      } catch (e) {}
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userinfo');
      localStorage.removeItem('token');
      localStorage.removeItem('userinfo');
      message.info('用户退出登录');
      // 跳转到其他页面后刷新页面
      await router.push('/login');
      // window.location.reload();
    };

    return () =>
      appList.value.length > 0 && (
        <Layout
          appList={appList.value}
          extraPages={extraPages}
          copyRight={copyright.value}
          logo={logo.value}
          userInfo={user.value}
          userMenu={userMenu.value}
          messageCount={unreadCount.value}
          onLogout={handleLogout}
          onGlobalSearch={handleGlobalSearch}
          onExtraPage={handleExtraPage}
        />
      );
  },
});

export default Main;
