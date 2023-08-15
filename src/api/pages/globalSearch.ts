import instance from '..';

/**
 * 获取搜索来源列表
 */
export const getSourceList = () =>
  instance.get('/globalsearch/v1/source/getAll');

/**
 * 获取热搜列表
 */
export const getHotList = () =>
  instance.get('/globalsearch/v1/preferenceAgg/getHotSearch');

/**
 * 搜索
 */
export const postSearch = (data: any) =>
  instance.post('/globalsearch/v1/search/searchEs', data);

/**
 * 根据报警记录id获取详情
 * @param id id
 */
export const getAlarmRecordDetail = (id: string) =>
  instance.post(`/alarmlite/v1/alarm/detailById/${id}`);

/**
 * 根据id获取通知详情
 * @param id id
 */
export const getNoticeDetail = (id: string) =>
  instance.get(`/notification/v1/record/${id}`);

/**
 * 获取物实例详情
 * @param id 物实例id
 */
export const getThingInstance = (id: string) =>
  instance.get('/mtip/thing/v2/thingInst/findById', {
    params: {
      id,
      requestType: 'all',
      thingCode: '',
      functionCode: 'web',
    },
  });
