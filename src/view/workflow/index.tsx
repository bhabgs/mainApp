import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import {
  useSessionStorage,
  useLocalStorage,
  useEventListener,
} from '@vueuse/core';
import { useEvent } from 'inl-ui/dist/hooks';

/**
 * 引用工作流
 */
const WorkflowContainer = defineComponent({
  props: {
    dataId: String,
  },
  setup(props, { emit }) {
    const router = useRouter();
    const route = useRoute();
    const iframeRef = ref();
    const refreshCount = useEvent('personalCenterTaskCountRefresh');

    const { dataId, opType, taskNodeId } = route.query;
    const token = useSessionStorage('token', '');
    const userinfo = useSessionStorage<any>('userinfo', {});
    const theme = useLocalStorage('theme', 'default');
    const url = `/mtip-bpmn/#/workFlow/flowDetail/${dataId}?opType=${opType}&taskNodeId=${taskNodeId}&hideMenu=true&token=${token.value}&userId=${userinfo.value.userId}&theme=${theme.value}`;
    // const url = `http://localhost:3000/#/workFlow/flowDetail/${dataId}?opType=${opType}&taskNodeId=${taskNodeId}&hideMenu=true&token=${token.value}&userId=${userinfo.value.userId}&theme=${theme.value}`;

    useEventListener(window, 'message', (e) => {
      const { type, operation } = e.data;
      if (type === 'workflowDetail' && operation === 'close') {
        router.push({
          path: '/',
          query: {
            extraPageKey: 'myNotice',
          },
        });
        refreshCount?.();
        emit('close');
      }
    });

    return () => (
      <div class='workflow-container'>
        <iframe
          ref={iframeRef}
          src={url}
          frameborder='0'
          width='100%'
          height='100%'
        ></iframe>
      </div>
    );
  },
});

export default WorkflowContainer;
