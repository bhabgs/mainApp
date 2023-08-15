import { Component, markRaw } from 'vue';
import PersonalCenter from '@/view/personalCenter';
import PersonalSetting from '@/view/personalSetting';
import GlobalSearch from '@/view/globalSearch';
import AlarmDetail from '@/view/globalSearch/detail/alarmDetail';
import NoticeDetail from '@/view/globalSearch/detail/noticeDetail';
import KnowledgeDetail from '@/view/globalSearch/detail/knowledgeDetail';
import WorkflowContainer from '@/view/workflow';
export interface IExtraPage {
  name: string;
  key: string;
  icon: string;
  component: Component;
  isExtra: true;
}

export const extraPages: IExtraPage[] = [
  {
    name: '个人中心',
    key: 'myNotice',
    icon: 'icon-xitongguanli_yonghuquanxianguanli_yonghuguanli',
    component: markRaw(PersonalCenter),
    isExtra: true,
  },
  {
    name: '个人设置',
    key: 'personalSetting',
    icon: 'icon-xitongguanli_yonghuquanxianguanli_yonghuguanli',
    component: markRaw(PersonalSetting),
    isExtra: true,
  },
  {
    name: '全局搜索',
    key: 'globalSearch',
    icon: 'icon-zhinengjikong_shipinjiankong_shijianguanli_shijianchaxun',
    component: markRaw(GlobalSearch),
    isExtra: true,
  },
  {
    name: '报警详情',
    key: 'alarmDetail',
    icon: 'icon-zhinengjikong_shipinjiankong_shijianguanli_shijianchaxun',
    component: markRaw(AlarmDetail),
    isExtra: true,
  },
  {
    name: '通知详情',
    key: 'noticeDetail',
    icon: 'icon-zhinengjikong_shipinjiankong_shijianguanli_shijianchaxun',
    component: markRaw(NoticeDetail),
    isExtra: true,
  },
  {
    name: '知识库详情',
    key: 'knowledgeDetail',
    icon: 'icon-zhinengjikong_shipinjiankong_shijianguanli_shijianchaxun',
    component: markRaw(KnowledgeDetail),
    isExtra: true,
  },
  {
    name: '工作流',
    key: 'workflowDetail',
    icon: 'icon-icon_yewulei_wulianpingtai_jingyingguanli_hetongguanli',
    component: markRaw(WorkflowContainer),
    isExtra: true,
  },
];
