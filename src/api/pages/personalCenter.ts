import instance from '..';

/**
 * 获取当前用户是否有消息
 */
export const getUserMessage = () =>
  instance.get('/common/v1/message/existUnreadMsg', {
    customData: { hideMsg: true },
  } as any);

/**
 * 获取全部消息通道列表
 */
export const getMsgChannel = () =>
  instance.get('/common/v1/message/msgChannel/all');

/**
 * 获取通知消息列表
 */
export const getMessageList = (data: any) =>
  instance.post('/common/v1/message/all/page', data);

/**
 * 获取通知详情
 * @param id id
 */
export const getMessageDetail = (id: string) =>
  instance.get(`/common/v1/message/detail/${id}`);

export const setMessageRead = (id: string) =>
  instance.post('/common/v1/message/setMsgRead', [id]);

/**
 * 设置所有通知已读
 */
export const setAllMessageRead = () =>
  instance.post('/common/v1/message/setMsgRead/all');

/**
 * 批量删除通知
 * @param list id列表
 */
export const batchDeleteMessage = (list: string[]) =>
  instance.post('/common/v1/message/removeMsgList', list);

/**
 * 获取用户树结构
 */
export const getUserTreeList = () =>
  instance.get('/common/v1/department/all/tree/org/user');

/**
 * 任务中心 - 获取待办任务数目
 */
export const getTaskTodoCount = () =>
  instance.get('/workflowable/v1/api/workflow/Engine/FlowBefore/FlowTodoCount');

/**
 * 任务中心 - 获取所有任务类型(流程)
 */
export const getAllTaskType = () =>
  instance.get('/workflowable/v1/api/workflow/Engine/FlowEngine', {
    params: {
      currentPage: 1,
      pageSize: 999,
      sort: 'desc',
    },
  });

/**
 * 任务中心 - 待办列表 / 已办 / 组内消息
 */
export const getTaskListTodo = (params: any, type: number) =>
  instance.get(`/workflowable/v1/api/workflow/Engine/FlowBefore/List/${type}`, {
    params,
  });

/**
 * 任务中心 - 我发起的
 */
export const getTaskListLaunch = (params: any) =>
  instance.get('/workflowable/v1/api/workflow/Engine/FlowLaunch', {
    params,
  });

/**
 * 任务中心 - 抢单操作
 * @param id 任务id
 */
export const seizeTaskOrder = (id: string) =>
  instance.get(
    `/workflowable/v1/api/workflow/Engine/FlowPreempt/preempt/${id}`,
  );
