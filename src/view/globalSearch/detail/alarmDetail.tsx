import { defineComponent, onMounted, ref, watch } from 'vue';
import { getAlarmRecordDetail } from '@/api/pages/globalSearch';
import { useRoute } from 'vue-router';

const AlarmDetail = defineComponent({
  setup() {
    const route = useRoute();

    const detail = ref();

    // 获取报警详情
    const getAlarmDetail = async (id: string) => {
      const { data } = await getAlarmRecordDetail(id);
      detail.value = data;
    };

    onMounted(() => {
      const { dataId } = route.query;
      if (dataId) {
        getAlarmDetail(dataId + '');
      }
    });

    return () => (
      <div class='alarm-detail'>
        {
          detail.value && '报警详情'
          // <inl-alarm-detail
          //   showHeader={false}
          //   record={detail.value}
          //   onClose={handleClose}
          // ></inl-alarm-detail>
        }
      </div>
    );
  },
});

export default AlarmDetail;
