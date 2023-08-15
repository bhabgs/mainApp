import { defineComponent, onMounted, ref } from 'vue';
import SelectPeople from './selectPeople';
import _ from 'lodash';
import * as api from '@/api/pages/personalCenter';

const QueryFilter = defineComponent({
  emits: ['search'],
  props: {
    withCreator: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { emit }) {
    const formRef = ref();
    const form = ref<any>({
      keyword: '',
      processId: '',
      flowId: null,
      dateRange: [],
      creatorUserId: null,
    });

    const taskTypeList = ref<any[]>([]);
    const getTaskTypeList = async () => {
      const { data } = await api.getAllTaskType();
      const res: any[] = [];
      for (const item of data.list) {
        let category = res.find((cat) => cat.label === item.category);
        if (!category) {
          category = { label: item.category, options: [] };
          res.push(category);
        }
        item.label = item.fullName;
        item.value = item.id;
        category.options.push(item);
      }
      taskTypeList.value = res;
    };
    onMounted(getTaskTypeList);

    const handleSearch = () => {
      const dateRange = form.value.dateRange;
      const data = {
        ...form.value,
        startTime: dateRange?.[0] ? dateRange[0].startOf('day').valueOf() : '',
        endTime: dateRange?.[1] ? dateRange[1].endOf('day').valueOf() : '',
      };
      emit('search', _.omit(data, 'dateRange'));
    };
    onMounted(handleSearch);

    const handleReset = () => {
      formRef.value.resetFields();
      handleSearch();
    };

    return () => (
      <div class='query-filter'>
        <a-form
          class='table-query-form'
          ref={formRef}
          model={form.value}
          labelCol={{ style: { width: '9em' } }}
        >
          <a-row>
            <a-col span={6}>
              <a-form-item label='任务编号' name='processId'>
                <a-input
                  style={{ width: '200px' }}
                  placeholder='请输入'
                  v-model:value={form.value.processId}
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col span={6}>
              <a-form-item label='任务标题' name='keyword'>
                <a-input
                  style={{ width: '200px' }}
                  placeholder='请输入'
                  v-model:value={form.value.keyword}
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col span={6}>
              <a-form-item label='任务类型' name='flowId'>
                <a-select
                  style={{ width: '200px' }}
                  placeholder='请选择'
                  allowClear
                  options={taskTypeList.value}
                  v-model:value={form.value.flowId}
                ></a-select>
              </a-form-item>
            </a-col>
            {props.withCreator && (
              <a-col span={6}>
                <a-form-item label='发起人员' name='creatorUserId'>
                  <SelectPeople
                    style={{ width: '200px' }}
                    v-model:value={form.value.creatorUserId}
                  />
                </a-form-item>
              </a-col>
            )}
            <a-col span={12}>
              <a-form-item label='发起时间' name='dateRange'>
                <a-range-picker
                  style={{ width: '400px' }}
                  picker='date'
                  v-model:value={form.value.dateRange}
                ></a-range-picker>
              </a-form-item>
            </a-col>
            <a-col offset={props.withCreator ? 6 : 6} span={6}>
              <a-form-item style={{ textAlign: 'right' }}>
                <a-space>
                  <a-button type='primary' onClick={handleSearch}>
                    查询
                  </a-button>
                  <a-button onClick={handleReset}>重置</a-button>
                </a-space>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
    );
  },
});

export default QueryFilter;
