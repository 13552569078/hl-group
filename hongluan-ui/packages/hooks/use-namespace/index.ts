import { computed } from 'vue'
import { PREFIX } from '@hongluan-ui/constants'
import { useGlobalConfig } from '../use-global-config'

export const defaultNamespace = PREFIX.toLocaleLowerCase()

export const useNamespace = (block?: string) => {
  const globalConfig = useGlobalConfig('namespace')
  const namespace = computed(() => (globalConfig.value || defaultNamespace) + (block ? `-${block}` : ''))
  return {
    namespace,
  }
}
