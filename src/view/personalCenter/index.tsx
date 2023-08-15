import { defineComponent, onMounted, ref } from 'vue';
import { useEvent } from 'inl-ui/dist/hooks';
import TaskCenter from './task-center';
import MsgSubscribe from './msg-subscribe';
import FlowTodo from './taskCenter/flowTodo';
import FlowLaunch from './taskCenter/flowLaunch';
import FlowDone from './taskCenter/flowDone';
import FlowCirculate from './taskCenter/flowCirculate';
import GroupMessage from './taskCenter/groupMessage';
import * as api from '@/api/pages/personalCenter';

const renderBadge = (title: string, count: number) => {
  return (
    <>
      {count > 0 && <a-badge class='unread-badge' status='error' />}
      {title}
      {count > 0 && `(${count})`}
    </>
  );
};

/**
 * 个人中心
 */
const PersonalCenter = defineComponent({
  setup() {
    const activeKey = ref(['all']);

    const noService = Boolean(
      Number(sessionStorage.getItem('NO_NOTICE_SERVICE')),
    );

    const msgCount = ref({
      all: 0,
      read: 0,
      unread: 0,
    });
    const taskCount = ref(0);
    const taskReject = ref(0);

    // 获取消息数目
    const getMsgCount = async () => {
      if (noService) return;
      const { data } = await api.getMessageList({
        pageSize: 0,
        pageNum: 0,
      });
      msgCount.value.all = data.allMsgCount;
      msgCount.value.unread = data.unreadMsgCount;
      msgCount.value.read = msgCount.value.all - msgCount.value.unread;
    };
    onMounted(getMsgCount);
    // 获取任务数目
    const getTaskCount = async () => {
      const { data } = await api.getTaskTodoCount();
      taskCount.value = data;
      const res = await api.getTaskListLaunch({
        currentPage: 1,
        pageSize: 0,
        status: 3,
      });
      taskReject.value = res.data.pagination.total;
    };
    onMounted(getTaskCount);
    useEvent('personalCenterTaskCountRefresh', getTaskCount);

    const groupCount = ref(0);
    const getGroupCount = async () => {
      const { data } = await api.getTaskListTodo(
        {
          sort: 'desc',
          currentPage: 1,
          pageSize: 0,
        },
        6,
      );
      groupCount.value = data.pagination.total;
    };
    onMounted(getGroupCount);

    return () => (
      <div class='personal-center'>
        <a-menu
          class='menu'
          style={{ width: '200px' }}
          mode='inline'
          openKeys={['message', 'task']}
          v-model={[activeKey.value, 'selectedKeys']}
        >
          <a-sub-menu key='message'>
            {{
              title: () => '我的消息',
              default: () => (
                <>
                  <a-menu-item key='all' title='全部消息'>
                    全部消息
                  </a-menu-item>
                  <a-menu-item key='unread' title='未读消息'>
                    {renderBadge('未读消息', msgCount.value.unread)}
                  </a-menu-item>
                  <a-menu-item key='read' title='已读消息'>
                    已读消息
                  </a-menu-item>
                </>
              ),
            }}
          </a-sub-menu>
          <a-sub-menu key='task' title='我的任务'>
            <a-menu-item key='taskTodo' title='我的待办'>
              {renderBadge('待办任务', taskCount.value)}
            </a-menu-item>
            <a-menu-item key='taskDone' title='已办任务'>
              已办任务
            </a-menu-item>
            <a-menu-item key='taskLaunch' title='我发起的'>
              {renderBadge('我发起的', taskReject.value)}
            </a-menu-item>
            <a-menu-item key='taskCirculate' title='抄送我的'>
              抄送我的
            </a-menu-item>
            <a-menu-item key='groupMessage' title='组内任务池'>
              {renderBadge('组内任务池', groupCount.value)}
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
        <div class='content'>
          {(() => {
            const key = activeKey.value[0];
            switch (key) {
              case 'all':
                return (
                  <MsgSubscribe
                    key='all'
                    read={null}
                    noService={noService}
                    onUpdate={getMsgCount}
                  />
                );
              case 'read':
                return (
                  <MsgSubscribe
                    key='read'
                    read={1}
                    noService={noService}
                    onUpdate={getMsgCount}
                  />
                );
              case 'unread':
                return (
                  <MsgSubscribe
                    key='unread'
                    read={0}
                    noService={noService}
                    onUpdate={getMsgCount}
                  />
                );
              case 'taskTodo':
                return <FlowTodo key='todo' />;
              case 'taskDone':
                return <FlowDone key='done' />;
              case 'taskLaunch':
                return <FlowLaunch key='launch' />;
              case 'taskCirculate':
                return <FlowCirculate />;
              case 'groupMessage':
                return <GroupMessage onRefresh={getGroupCount} />;
            }
          })()}
        </div>
      </div>
    );
  },
});

export default PersonalCenter;
