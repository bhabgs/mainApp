import { computed, inject } from 'vue';
import { IGlobalState } from '@/micro-apps';

/**
 * 附加页面列表
 */
export function useExtraPages() {
  const qiankunState = inject<IGlobalState>('qiankunState')!;

  const extraPages = computed(() => qiankunState.extraPages);

  return extraPages;
}
