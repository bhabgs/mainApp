import { defineComponent, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useTableList } from 'inl-ui/dist/hooks';
import { columns } from './config';
import QueryFilter from './components/queryFilter';
import * as api from '@/api/pages/personalCenter';

const columnsDone = columns.filter((item) => item.key !== 'status');

/**
 * 已办
 */
const FlowDone = defineComponent({
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
            2,
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
          opType: 0,
          formType: task.formType,
          taskNodeId: task.thisStepId,
          name: `任务详情 ${task.fullName}`,
        },
      });
    };

    return () => (
      <div class='flow-done'>
        <QueryFilter onSearch={handleSearch} />
        <inl-layout-table>
          {{
            content: () => (
              <a-table
                loading={isLoading.value}
                columns={columnsDone}
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

export default FlowDone;
