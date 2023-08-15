import dayjs from 'dayjs';

export const columns = [
  {
    title: '任务编号',
    dataIndex: 'processId',
    width: 200,
  },
  {
    title: '任务标题',
    dataIndex: 'fullName',
  },
  {
    title: '任务类型',
    dataIndex: 'flowName',
    width: 150,
  },
  {
    title: '当前节点',
    dataIndex: 'currentNodeName',
  },
  {
    title: '发起时间',
    dataIndex: 'startTime',
    width: 180,
    customRender({ text }) {
      return text && dayjs(text).format('YYYY-MM-DD HH:mm');
    },
  },
  {
    title: '发起人员',
    dataIndex: 'userName',
    width: 120,
  },
  {
    key: 'status',
    title: '流程状态',
    dataIndex: 'status',
    width: 120,
    align: 'center',
    customRender({ record }) {
      const { status, currentNodeTitle, thisStepTitle } = record;
      if (status == 1) {
        const title = currentNodeTitle || thisStepTitle || '等待审核';
        return <a-tag color='processing'>{title}</a-tag>;
      }
      if (status == 2) {
        return <a-tag color='success'>审核通过</a-tag>;
      }
      if (status == 3) {
        return <a-tag color='error'>审核驳回</a-tag>;
      }
      if (status == 4) {
        return <a-tag>流程撤回</a-tag>;
      }
      if (status == 5) {
        return <a-tag>审核终止</a-tag>;
      }
      if (status == 6) {
        return <a-tag color='warning'>等待抢单</a-tag>;
      }
      return <a-tag color='warning'>等待提交</a-tag>;
    },
  },
  {
    title: '更新时间',
    dataIndex: 'creatorTime',
    width: 180,
    customRender({ text }) {
      return text && dayjs(text).format('YYYY-MM-DD HH:mm');
    },
  },
  {
    key: 'action',
    title: '操作',
  },
];
