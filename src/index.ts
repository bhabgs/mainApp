import { createApp } from 'vue';
import antd from 'ant-design-vue';
import inl from 'inl-ui';
// import inl from '../../industrial-ui/packages/pc';
import startQianKun, { actions } from '@/micro-apps';
import App from './app';
import router from './router';
import store from './store';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import 'ant-design-vue/dist/antd.less';
import 'inl-ui/dist/iconfont.js';
import 'inl-ui/dist/style.css';
// import '../../industrial-ui/packages/pc/dist/style.css';
import './assets/style/index.less';

dayjs.locale('zhCn');

const app = createApp(App);
app.use(store).use(router).use(antd).use(inl);
// 注册 qiankun
startQianKun({
  sandbox: { experimentalStyleIsolation: true },
  singular: false,
});
inl.utils.microAppUtils.setMainAppName('mtip-factory');
app.provide('qiankunAction', actions);
app.mount('#app');
