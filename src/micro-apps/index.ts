import {
  addGlobalUncaughtErrorHandler,
  start,
  initGlobalState,
  MicroAppStateActions,
} from 'qiankun';
import { VNode } from 'vue';
// 微应用的信息
// import apps from './apps';

export interface IExtraPageDefine {
  key: string;
  name: string;
  icon?: string;
  component: VNode;
}
export interface IGlobalState {
  extraPages: IExtraPageDefine[];
}

/**
 * 添加全局的未捕获异常处理器
 */
addGlobalUncaughtErrorHandler((event: Event | string) => {
  throw event;
});

/**
 * qiankun 通信实例
 */
const initialState = {
  extraTabs: [],
  removeMenuTabs: [],
  activeTabKey: '',
  refreshTabKey: '',
  theme: '',
  removeTab: undefined,
};
export const actions: MicroAppStateActions = initGlobalState(initialState);

// 导出 qiankun 的启动函数
export default start;
