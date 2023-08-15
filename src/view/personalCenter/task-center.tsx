import { defineComponent, ref } from 'vue';
import dayjs from 'dayjs';

const columns = [
  {
    title: '任务标题',
  },
  {
    title: '状态',
  },
  {
    title: '布置人',
  },
  {
    title: '负责人',
  },
  {
    title: '布置时间',
  },
  {
    title: '完成时间',
  },
  {
    title: '任务内容',
  },
  {
    key: 'action',
    title: '操作',
  },
];

/**
 * 任务中心
 */
const TaskCenter = defineComponent({
  setup() {
    const formRef = ref();

    const form = ref({
      status: undefined,
      range: [],
      keyword: '',
    });

    return () => (
      <div class='task-center'>
        <a-form
          ref={formRef}
          labelCol={{ style: { width: '8em' } }}
          model={form.value}
        >
          <a-row>
            <a-col span={6}>
              <a-form-item name='status' label='状态'>
                <a-select
                  style={{ width: '200px' }}
                  v-model={[form.value.status, 'value']}
                ></a-select>
              </a-form-item>
            </a-col>
            <a-col span={12}>
              <a-form-item name='range' label='布置时间查询'>
                <a-range-picker
                  style={{ width: '400px' }}
                  v-model={[form.value.range, 'value']}
                ></a-range-picker>
              </a-form-item>
            </a-col>
            <a-col span={6}>
              <a-form-item name='keyword'>
                <a-input
                  style={{ width: '200px' }}
                  placeholder='请输入日志关键内容'
                  allowClear
                  v-model={[form.value.keyword, 'value']}
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col offset={18} span={6}>
              <a-form-item style={{ textAlign: 'right' }}>
                <a-space>
                  <a-button
                    type='primary'
                    onClick={() => {
                      console.log(form.value);
                    }}
                  >
                    查询
                  </a-button>
                </a-space>
              </a-form-item>
            </a-col>
          </a-row>
          <a-table
            columns={columns}
            dataSource={[]}
            v-slots={{
              bodyCell: ({ column }: any) => {
                if (column.key === 'action') {
                  return (
                    <a-space>
                      <a-button type='link' size='small'>
                        详情
                      </a-button>
                      <a-button type='link' size='small'>
                        审批
                      </a-button>
                    </a-space>
                  );
                }
              },
            }}
          ></a-table>
        </a-form>
      </div>
    );
  },
});

export default TaskCenter;
