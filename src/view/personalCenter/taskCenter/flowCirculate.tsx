import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTableList } from 'inl-ui/dist/hooks';
import { columns } from './config';
import QueryFilter from './components/queryFilter';
import * as api from '@/api/pages/personalCenter';

const columnsLaunch = columns;

/**
 * 抄送我的
 */
const FlowCirculate = defineComponent({
  setup() {
    const router = useRouter();

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
            3,
          ),
        'list',
        'pagination.total',
      );

    const form = ref<any>({});
    const handleSearch = (params: any) => {
      form.value = params;
      currPage.value = 1;
      refresh();
    };

    const handleTask = (task: any) => {
      router.push({
        path: '/',
        query: {
          extraPageKey: 'workflowDetail',
          uniqueKey: task.id,
          dataId: task.id,
          formType: task.formType,
          taskNodeId: task.thisStepId,
          name: `任务详情 ${task.fullName}`,
          opType: 3,
        },
      });
    };

    return () => (
      <div class='FlowCirculate'>
        <QueryFilter withCreator={false} onSearch={handleSearch} />
        <inl-layout-table>
          {{
            content: () => (
              <a-table
                loading={isLoading.value}
                columns={columnsLaunch}
                scroll={{ y: '57vh' }}
                pagination={pagination}
                dataSource={tableList.value}
                v-slots={{
                  bodyCell: ({ column, record }) => {
                    if (column.key === 'action') {
                      return (
                        <a-space>
                          <a-button
                            type='link'
                            onClick={() => handleTask(record)}
                          >
                            详情
                          </a-button>
                        </a-space>
                      );
                    }
                  },
                }}
              ></a-table>
            ),
          }}
        </inl-layout-table>
      </div>
    );
  },
});

export default FlowCirculate;
