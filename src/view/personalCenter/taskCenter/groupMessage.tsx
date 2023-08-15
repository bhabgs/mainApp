import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTableList } from 'inl-ui/dist/hooks';
import { columns } from './config';
import QueryFilter from './components/queryFilter';
import * as api from '@/api/pages/personalCenter';
import { Modal, message } from 'ant-design-vue';

const GroupMessage = defineComponent({
  emits: ['refresh'],
  setup(props, { emit }) {
    const router = useRouter();

    const form = ref<any>({});

    const checkedKeys = ref<string[]>([]);

    const { currPage, pageSize, pagination, isLoading, tableList, refresh } =
      useTableList(
        () =>
          api.getTaskListTodo(
            {
              ...form.value,
              sort: 'desc',
              currentPage: currPage.value,
              pageSize: pageSize.value,
            },
            6,
          ),
        'list',
        'pagination.total',
      );

    const handleSearch = (params) => {
      form.value = { ...params };
      currPage.value = 1;
      refresh();
      emit('refresh');
    };

    const handleDetail = (task: any) => {
      router.push({
        path: '/',
        query: {
          extraPageKey: 'workflowDetail',
          uniqueKey: task.id,
          dataId: task.id,
          opType: 0,
          name: `审批任务 ${task.fullName}`,
        },
      });
    };

    const handleSeize = (task) => {
      Modal.confirm({
        title: '提示',
        content: `确定抢单“${task.fullName}”吗？`,
        async onOk() {
          await api.seizeTaskOrder(task.processId);
          message.success('抢单成功');
          refresh();
          emit('refresh');
        },
      });
    };

    return () => (
      <div class='group-message'>
        <QueryFilter onSearch={handleSearch} />
        <inl-layout-table>
          {{
            // opt: () => (
            //   <a-button type='primary' ghost>
            //     批量抢单
            //   </a-button>
            // ),
            content: () => (
              <a-table
                loading={isLoading.value}
                pagination={pagination}
                rowSelection={{
                  type: 'checkbox',
                  preserveSelectedRowKeys: true,
                  selectedRowKeys: checkedKeys.value,
                  onChange: (keys: string[]) => (checkedKeys.value = keys),
                }}
                columns={columns}
                dataSource={tableList.value}
              >
                {{
                  bodyCell: ({ column, record }) => {
                    if (column.key === 'action') {
                      return (
                        <>
                          <a-button
                            type='link'
                            size='small'
                            onClick={() => handleDetail(record)}
                          >
                            详情
                          </a-button>
                          <a-button
                            type='link'
                            size='small'
                            onClick={() => handleSeize(record)}
                          >
                            抢单
                          </a-button>
                        </>
                      );
                    }
                  },
                }}
              </a-table>
            ),
          }}
        </inl-layout-table>
      </div>
    );
  },
});

export default GroupMessage;
