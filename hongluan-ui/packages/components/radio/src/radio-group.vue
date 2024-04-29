<template>
  <hl-group
    :id="groupId"
    ref="radioGroupRef"
    :class="[namespace]"
    :dir="dir"
    :merge="merge"
    :indent="indent"
    :gap="gap"
    :gap-x="gapX"
    :gap-y="gapY"
    :full="full"
    :wrap="wrap"
    :align="align"
    :block="block"
    role="radiogroup"
    :aria-label="!isLabeledByFormItem ? label || 'radio-group' : undefined"
    :aria-labelledby="isLabeledByFormItem ? formItem.labelId : undefined"
  >
    <slot></slot>
  </hl-group>
</template>

<script lang="ts">
import { defineComponent, nextTick, provide, onMounted, ref, reactive, toRefs, watch, inject, computed } from 'vue'
import { UPDATE_MODEL_EVENT } from '@hongluan-ui/constants'
import { radioGroupKey, formItemContextKey, FormItemEvents } from '@hongluan-ui/tokens'
import { useConsistentProp, useId, useNamespace, useFormItemInputId } from '@hongluan-ui/hooks'
import { HlGroup } from '@hongluan-ui/components/group'
import { radioGroupProps } from './radio-group'

import type { RadioGroupProps } from '..'
import type { FormItemContext } from '@hongluan-ui/tokens'
import { debugWarn } from '@hongluan-ui/utils'

export default defineComponent({
  name: 'RadioGroup',
  components: { HlGroup },
  props: radioGroupProps,
  emits: [UPDATE_MODEL_EVENT, 'change'],

  setup(props, ctx) {
    const radioGroupRef = ref<{ $el: HTMLDivElement; }>()
    const radioId = useId()

    const name = computed(() => {
      return props.name || radioId.value
    })

    const formItem = inject(formItemContextKey, {} as FormItemContext)
    const { inputId: groupId, isLabeledByFormItem } = useFormItemInputId(
      props,
      {
        formItemContext: formItem,
      },
    )

    const { namespace } = useNamespace('radio-group')
    const { size, disabled, fill } = useConsistentProp()

    const changeEvent = (value: RadioGroupProps['modelValue']) => {
      ctx.emit(UPDATE_MODEL_EVENT, value)
      nextTick(() => ctx.emit('change', value))
    }

    onMounted(() => {
      const radios =
        radioGroupRef.value.$el.querySelectorAll<HTMLInputElement>('[type=radio]')
      const firstLabel = radios[0]
      if (!Array.from(radios).some(radio => radio.checked) && firstLabel) {
        firstLabel.tabIndex = 0
      }
    })

    provide(
      radioGroupKey,
      reactive({
        ...toRefs(props),
        changeEvent,
        name,
      }),
    )

    watch(
      () => props.modelValue,
      () => {
        if (props.validateEvent) {
          formItem.validate?.(FormItemEvents.change).catch(err => debugWarn(err))
        }
      },
    )

    return {
      namespace,
      size,
      disabled,
      fill,
      radioGroupRef,
      formItem,
      groupId,
      isLabeledByFormItem,
    }
  },
})
</script>
