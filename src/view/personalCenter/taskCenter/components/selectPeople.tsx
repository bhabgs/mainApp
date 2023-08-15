import { defineComponent, onMounted, ref } from 'vue';
import { useVModel } from '@vueuse/core';
import * as api from '@/api/pages/personalCenter';

/**
 * 选择人员组件
 */
const SelectPeople = defineComponent({
  emits: ['update:value'],
  props: {
    value: {
      type: String,
    },
  },
  setup(props, { emit, attrs }) {
    const modelValue = useVModel(props, 'value', emit);

    const treeData = ref([]);
    const getTreeData = async () => {
      const { data } = await api.getUserTreeList();
      const allList = data.departmentList;
      if (!allList.length) return;
      const formatList = (list) => {
        let res: any = [];
        for (const dep of list) {
          if (!dep.subList.length && !dep.userSummaryList.length) {
            continue;
          }
          if (dep.subList && dep.subList.length) {
            dep.subList = formatList(dep.subList);
          }
          dep.type = 'dep';
          dep.label = dep.name;
          dep.value = dep.id;
          dep.selectable = false;
          // dep.disabled = true;
          const userList = dep.userSummaryList.map((item) => ({
            ...item,
            type: 'user',
            label: item.employeeName,
            value: item.userId,
          }));
          dep.children = [...dep.subList, ...userList];
          res.push(dep);
        }
        return res;
      };
      formatList(allList);
      treeData.value = allList;
    };
    onMounted(getTreeData);

    return () => (
      <a-tree-select
        placeholder='请选择'
        allowClear
        show-search
        treeNodeFilterProp='label'
        tree-default-expand-all
        treeData={treeData.value}
        v-model:value={modelValue.value}
        {...attrs}
      ></a-tree-select>
    );
  },
});

export default SelectPeople;
