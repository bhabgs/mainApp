import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTableList } from 'inl-ui/dist/hooks';
import { columns } from './config';
import QueryFilter from './components/queryFilter';
import * as api from '@/api/pages/personalCenter';

/**
 * 待办任务
 */
const FlowTodo = defineComponent({
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
            1,
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
          opType: 1,
          taskNodeId: task.thisStepId,
          formType: task.formType,
          name: `审批任务 ${task.fullName}`,
        },
      });
    };

    return () => (
      <div class='flow-todo'>
        <QueryFilter onSearch={handleSearch} />
        <inl-layout-table>
          {{
            content: () => (
              <a-table
                loading={isLoading.value}
                columns={columns}
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
                            审批
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

export default FlowTodo;
