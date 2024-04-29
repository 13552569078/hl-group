import { defineComponent, renderSlot, watch } from 'vue'
import { isValidComponentSize } from '@hongluan-ui/utils'
import { PREFIX } from '@hongluan-ui/constants'
import { provideGlobalConfig } from '@hongluan-ui/hooks'

import type { PropType, VNode, ExtractPropTypes } from 'vue'
import type { Indexable } from '@hongluan-ui/utils'
import type { ComponentSize } from '@hongluan-ui/constants'
import type { ExperimentalFeatures } from '@hongluan-ui/tokens'
import type { Language } from '@hongluan-ui/locale'
import type { MessageConfigContext } from '@hongluan-ui/components/message'

export const messageConfig: MessageConfigContext = {}

export const configProviderProps = {
  /**
   * @description Controlling if the users want a11y features
   */
  a11y: {
    type: Boolean,
    default: true,
  },
  /**
   * @description Locale Object
   */
  locale: {
    type: Object as PropType<Language>,
  },
  /**
   * @description global component size
   */
  size: {
    type: String as PropType<ComponentSize>,
    validator: isValidComponentSize,
  },
  /**
   * @description global Initial zIndex
   */
  zIndex: Number,
  touchmoveForbid: {
    type: Boolean,
    default: true,
  },
  systemIcons: {
    type: Object as PropType<Indexable<VNode>>,
    value: () => ({}),
  },
  /**
   * @description features at experimental stage to be added, all features are default to be set to false                                                                                | ^[object]
   */
  experimentalFeatures: {
    type: Object as PropType<ExperimentalFeatures>,
  },
  /**
   * @description Controls if we should handle keyboard navigation
   */
  keyboardNavigation: {
    type: Boolean,
    default: true,
  },
  /**
   * @description message related configuration, [see the following table](#message-attributes)
   */
  message: {
    type: Object as PropType<MessageConfigContext>,
  },
  /**
   * @description global component className prefix (cooperated with [$namespace](https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/mixins/config.scss#L1)) | ^[string]
   */
  namespace: {
    type: String,
    default: PREFIX.toLocaleLowerCase(),
  },
}
export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

const ConfigProvider = defineComponent({
  name: 'ConfigProvider',
  props: configProviderProps,

  setup(props, { slots }) {
    watch(
      () => props.message,
      val => {
        Object.assign(messageConfig, val ?? {})
      },
      { immediate: true, deep: true },
    )
    const config = provideGlobalConfig(props)
    return () => renderSlot(slots, 'default', { config: config?.value })
  },
})

export type ConfigProviderInstance = InstanceType<typeof ConfigProvider>
export default ConfigProvider

