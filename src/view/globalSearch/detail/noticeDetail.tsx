import { computed, defineComponent, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { uniqBy } from 'lodash';
import { getNoticeDetail } from '@/api/pages/globalSearch';

/**
 * 通知详情
 */
const NoticeDetail = defineComponent({
  setup() {
    const route = useRoute();

    const detail = ref<any>({});

    // 收件人
    const recievNames = computed(() => {
      if (!detail.value.receiverInfos) return '';
      return uniqBy(detail.value.receiverInfos, 'receiverId')
        .map((item: any) => item.receiverName)
        .join(',');
    });

    const getDetail = async (id: string) => {
      const { data } = await getNoticeDetail(id);
      detail.value = data;
    };

    // 监听id变化 获取数据
    onMounted(() => {
      const { dataId } = route.query;
      getDetail(dataId + '');
    });

    const getSendType = (type: string) => {
      switch (type) {
        case 'IMMEDIATELY':
          return '立即发送';
        case 'DELAY':
          return '延迟发送';
        case 'TIMING':
          return '定时发送';
        default:
          return '--';
      }
    };

    return () => (
      <div class='notice-detail'>
        {/* <div class='page-header'>
          <router-link to={{ query: { menuCode: '2081' } }}>
            <arrow-left-outlined style={{ color: '#7a7bcc' }} />
          </router-link>
          <span>返回物通知列表</span>
        </div> */}
        <a-descriptions
          labelStyle={{
            justifyContent: 'flex-end',
            width: '6em',
            color: '#5C667D',
          }}
          contentStyle={{
            maxWidth: '750px',
            color: '#354052',
            fontWeight: '500',
          }}
          title='通知详情'
          column={1}
        >
          <a-descriptions-item label='通知标题'>
            {detail.value.messageTitle}
          </a-descriptions-item>
          <a-descriptions-item label='收件人'>
            {recievNames.value}
          </a-descriptions-item>
          <a-descriptions-item label='发送时间'>
            {getSendType(detail.value.sendType)}
          </a-descriptions-item>
          <a-descriptions-item label='通道'>
            {detail.value.channelName}
          </a-descriptions-item>
          <a-descriptions-item label='发送等级'>
            {detail.value.level}
          </a-descriptions-item>
          <a-descriptions-item label='通知内容'>
            {detail.value.messageContent}
          </a-descriptions-item>
        </a-descriptions>
      </div>
    );
  },
});

export default NoticeDetail;
