import { computed, getCurrentInstance } from 'vue'
import { useDeprecated } from '@hongluan-ui/hooks'
import { isBoolean } from '@hongluan-ui/utils'

export function useDeprecateAppendToBody(scope: string, from: string) {
  const vm = getCurrentInstance()!

  const compatTeleported = computed(() => {
    return (
      isBoolean(vm.props[from]) ? vm.props[from] : vm.props.teleported
    ) as boolean
  })

  useDeprecated(
    {
      scope,
      from,
      replacement: 'teleported',
      version: '2.1.0',
      ref: 'cestc-aqyj.github.io/hongluan-ui/#/zh-CN/component/popover',
    },
    computed(() => isBoolean(vm.props[from])),
  )

  return {
    compatTeleported,
  }
}
