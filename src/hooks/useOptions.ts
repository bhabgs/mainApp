import { onMounted, ref } from 'vue';

/**
 * 获取下拉框的选项
 * @param apiFn api接口函数
 * @param labelMapping label的字段
 * @param valueMapping value的字段
 */
export function useOptions(
  apiFn: any,
  labelMapping = 'name',
  valueMapping = 'id',
) {
  const options = ref<{ value: unknown; label: string }[]>([]);
  const getOptions = async () => {
    const { data } = await apiFn();
    options.value = data.map((item: any) => ({
      label: item[labelMapping],
      value: item[valueMapping],
    }));
  };
  onMounted(getOptions);
  return options;
}
