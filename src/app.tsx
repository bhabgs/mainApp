import { defineComponent, inject, onMounted, provide, Suspense } from 'vue';
import { useQianKunState } from 'inl-ui/dist/hooks';
// import { useQianKunState } from '../../industrial-ui/packages/pc/dist/hooks';
import { changeTheme } from 'inl-ui/dist/utils';
import { MicroAppStateActions } from 'qiankun';
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import clientApi from '@/api/client';

const App = defineComponent({
  setup() {
    const qiankunAction = inject<MicroAppStateActions>('qiankunAction');
    const qiankunState = useQianKunState(qiankunAction);
    provide('qiankunState', qiankunState);

    const setTheme = async () => {
      const { data } = await clientApi.getSysConfig();
      if (data) {
        localStorage.setItem('theme', data.style === 1 ? 'dark' : 'default');
        localStorage.setItem('homepageCopyright', data.homepageCopyright);
        sessionStorage.setItem('homepageCopyright', data.homepageCopyright);
      }
      changeTheme.settingTheme();
    };
    onMounted(setTheme);

    return () => (
      <ConfigProvider locale={zhCN}>
        <Suspense
          v-slots={{
            fallback: () => <h2>加载中...</h2>,
            default: () => <router-view></router-view>,
          }}
        ></Suspense>
      </ConfigProvider>
    );
  },
});

export default App;
