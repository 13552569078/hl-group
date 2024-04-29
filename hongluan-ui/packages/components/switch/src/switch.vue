<template>
  <div
    :class="[
      namespace,
      switchDisabled ? 'is-disabled' : '',
      checked ? 'is-checked' : '',
      type ? type : '',
      switchSize ? switchSize : ''
    ]"
    :style="[
      width ? `--switch-width: ${width}` : '',
    ]"
    @click.prevent="switchValue"
  >
    <input
      :id="inputId"
      ref="input"
      type="checkbox"
      role="switch"
      :aria-checked="checked"
      :aria-disabled="switchDisabled"
      :name="name"
      :true-value="activeValue"
      :false-value="inactiveValue"
      :disabled="switchDisabled"
      :tabindex="tabindex"
      @change="handleChange"
      @keydown.enter="switchValue"
    >
    <em ref="core" class="core"></em>
    <spinner v-if="loading && !$slots.icon" />
    <slot v-else name="icon" :checked="checked"></slot>
  </div>
</template>
<script lang='ts'>
import { defineComponent, computed, onMounted, ref, inject, nextTick, watch, getCurrentInstance } from 'vue'
import { isPromise } from '@vue/shared'
import { formItemContextKey, FormItemEvents } from '@hongluan-ui/tokens'
import { useConsistentProp, useNamespace, useFormItemInputId, useDeprecated } from '@hongluan-ui/hooks'
import { isBoolean, throwError, debugWarn } from '@hongluan-ui/utils'
import Spinner from '@hongluan-ui/components/spinner'
import { UPDATE_MODEL_EVENT, CHANGE_EVENT, INPUT_EVENT } from '@hongluan-ui/constants'
import { switchProps } from './switch'

import type { FormItemContext } from '@hongluan-ui/tokens'

export default defineComponent({
  name: 'Switch',
  components: { Spinner },
  props: switchProps,
  emits: ['update:modelValue', 'change', 'input'],
  setup(props, { emit }) {
    const vm = getCurrentInstance()!
    const formItem = inject(formItemContextKey, {} as FormItemContext)

    const isModelValue = ref(props.modelValue !== false)
    const input = ref<HTMLInputElement>()
    const core = ref<HTMLElement>()
    const scope = 'Switch'

    watch(() => props.modelValue, () => {
      isModelValue.value = true
    })

    watch(() => props.value, () => {
      isModelValue.value = false
    })

    useDeprecated(
      {
        from: '"value"',
        replacement: '"model-value" or "v-model"',
        scope: 'Switch',
        version: '2.5.0',
        ref: 'http://hl.front.etcc.group/2x/#/zh-CN/component/switch#attributes',
        type: 'Attribute',
      },
      computed(() => !!vm.vnode.props?.value),
    )


    const actualValue = computed(() => {
      return isModelValue.value ? props.modelValue : props.value
    })

    const checked = computed(() => actualValue.value === props.activeValue)

    const { size: switchSize, disabled: tempDisabled } = useConsistentProp()
    const { inputId } = useFormItemInputId(props, {
      formItemContext: formItem,
    })

    if (![props.activeValue, props.inactiveValue].includes(actualValue.value)) {
      emit(UPDATE_MODEL_EVENT, props.inactiveValue)
      emit(CHANGE_EVENT, props.inactiveValue)
      emit(INPUT_EVENT, props.inactiveValue)
    }

    watch(checked, () => {
      input.value.checked = checked.value

      if (props.activeColor || props.inactiveColor) {
        setBackgroundColor()
      }

      if (props.validateEvent) {
        formItem?.validate?.(FormItemEvents.change).catch(err => debugWarn(err))
      }
    })

    const switchDisabled = computed((): boolean => {
      return tempDisabled.value || props.loading
    })

    const handleChange = (): void => {
      const val = checked.value ? props.inactiveValue : props.activeValue
      emit(UPDATE_MODEL_EVENT, val)
      emit(CHANGE_EVENT, val)
      emit(INPUT_EVENT, val)
      nextTick(() => {
        input.value.checked = checked.value
      })
    }

    const switchValue = (): void => {
      if (switchDisabled.value) return

      const { beforeChange } = props
      if (!beforeChange) {
        handleChange()
        return
      }

      const shouldChange = beforeChange()

      const isExpectType = [isPromise(shouldChange), isBoolean(shouldChange)].some(i => i)
      if (!isExpectType) {
        throwError(scope, 'beforeChange must return type `Promise<boolean>` or `boolean`')
      }

      if (isPromise(shouldChange)) {
        shouldChange.then(result => {
          if (result) {
            handleChange()
          }
        }).catch(e => {
          debugWarn(scope, `some error occurred: ${e}`)
        })
      } else if (shouldChange) {
        handleChange()
      }
    }

    const setBackgroundColor = (): void => {
      const newColor = checked.value ? props.activeColor : props.inactiveColor
      const coreEl = core.value
      if (props.borderColor) coreEl.style.borderColor = props.borderColor
      else if (!props.borderColor) coreEl.style.borderColor = newColor
      coreEl.style.backgroundColor = newColor
    }

    const focus = (): void => {
      input.value?.focus?.()
    }

    onMounted(() => {
      if (props.activeColor || props.inactiveColor || props.borderColor) {
        setBackgroundColor()
      }
      input.value.checked = checked.value
    })

    const { namespace } = useNamespace('switch')

    return {
      namespace,
      input,
      inputId,
      switchSize,
      core,
      switchDisabled,
      checked,
      handleChange,
      switchValue,
      focus,
    }
  },
})
</script>
