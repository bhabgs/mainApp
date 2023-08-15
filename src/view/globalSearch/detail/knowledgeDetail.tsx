import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

/**
 * 知识库详情
 */
const KnowledgeDetail = defineComponent({
  setup() {
    const route = useRoute();
    const id = route.query.dataId;

    return () => (
      <div class='knowledge-detail'>
        <iframe
          width='100%'
          height='100%'
          src={`${location.origin}/ekb/#/ekb/details?id=${id}`}
          frameborder='0'
        ></iframe>
      </div>
    );
  },
});

export default KnowledgeDetail;
