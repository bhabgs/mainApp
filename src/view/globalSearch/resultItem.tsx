import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { formatTime } from '@/utils/time';
import * as api from '@/api/pages/globalSearch';

// 通知类型 对应页面菜单编码
const RESULT_TYPE_MAP = {
  alarm: 'alarmDetail',
  notification: 'noticeDetail',
  ekb: 'knowledgeDetail',
};

/**
 * 全局搜索 - 搜索结果
 */
const ResultItem = defineComponent({
  props: {
    record: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();

    const menuCode = computed(() => {
      const { sourceName } = props.record;
      return RESULT_TYPE_MAP[sourceName];
    });

    const toDetail = async () => {
      if (props.record.sourceName === 'alarm') {
        router.push(
          `/mtip-intelligent-centralized-control/alarmManager/alarmLog/${props.record.dataId}?name=报警详情&appId=0`,
        );
      } else if (props.record.sourceName === 'THINGINSTANCE') {
        const { data } = await api.getThingInstance(props.record.dataId);
        if (!data) return;
        const thingInfo = JSON.stringify({
          model: data.thingCode,
          isEdit: false,
        });
        router.push({
          path: `/mtip-developer-center/thingManager/thingInstanceManager/thingInstDetail/${data.thingInstId}`,
          query: {
            name: '物实例详情',
            thingInfo,
          },
        });
      } else if (props.record.sourceName === 'workflowable') {
        router.push({
          path: '/',
          query: {
            extraPageKey: 'workflowDetail',
            uniqueKey: props.record.dataId,
            dataId: props.record.dataId,
            name: `任务详情 ${props.record.title}`,
            opType: 0,
          },
        });
      } else if (menuCode.value) {
        router.push({
          path: '/',
          query: {
            extraPageKey: menuCode.value,
            uniqueKey: `${props.record.sourceName}${props.record.dataId}`,
            dataId: props.record.dataId,
          },
        });
      }
    };

    return () => (
      <li class='result-item'>
        {/* 标题 */}
        <div class='result-title'>
          <a v-html={props.record.title} onClick={toDetail}></a>
        </div>
        <div class='result-detail-container'>
          {/* 图片 */}
          {props.record.imageUrl && (
            <div class='result-image'>
              <img src={props.record.imageUrl} alt='图片' />
            </div>
          )}

          <div class='result-detail'>
            <div class='content'>
              <p v-html={props.record.summary}></p>
            </div>
            <div class='description'>
              <span class='desc-item author'>
                <icon-font type='icon-xitongguanli_yonghuquanxianguanli_yonghuguanli'></icon-font>
                {props.record.userName}
              </span>
              <span class='desc-item sourse'>
                <icon-font type='icon-kaifazhezhongxin_wumoxingguanli_shengchanxitong'></icon-font>
                {props.record.sourceDesc}
              </span>
              <span class='desc-item time'>
                <icon-font type='icon-icon_xitonglei_shijian'></icon-font>
                {formatTime(props.record.updateDt)}
              </span>
            </div>
          </div>
        </div>
      </li>
    );
  },
});

export default ResultItem;
