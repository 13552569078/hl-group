<template>
  <div
    v-show="nativeType !== 'hidden'"
    v-bind="containerAttrs"
    :class="[
      namespace,
      inputSize ? inputSize : '',
      `as-${nativeType}`,
      type ? type : '',
      {
        'is-disabled': inputDisabled,
        'is-exceed': inputExceed,
        'is-focus': focused,
        'has-password-visible': getPwdVisible(),
        'has-suffix': getSuffixVisible(),
        'round': round,
        'fill': inputFill,
        'block': block,
        'thin' : thin
      },
      $attrs.class
    ]"
    :style="$attrs.style"
    :role="containerRole"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <template v-if="nativeType !== 'textarea'">
      <slot name="tags"></slot>
      <input
        v-if="nativeType !== 'textarea'"
        :id="inputId"
        ref="input"
        v-bind="attrs"
        :type="showPassword ? (passwordVisible ? 'text': 'password') : nativeType"
        :disabled="inputDisabled"
        :formatter="formatter"
        :parser="parser"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :tabindex="tabindex"
        :aria-label="label"
        :placeholder="placeholder"
        :style="inputStyle"
        :form="form"
        class="input-inner"
        @compositionstart="handleCompositionStart"
        @compositionupdate="handleCompositionUpdate"
        @compositionend="handleCompositionEnd"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @change="handleChange"
        @keydown="handleKeydown"
      >
      <span v-if="$slots.prefix" class="input-affixe prefix" @click="focus">
        <slot name="prefix"></slot>
      </span>

      <span v-if="getSuffixVisible()" class="input-affixe suffix" @click="focus">
        <template v-if="!showClear">
          <slot name="suffix"></slot>
        </template>
        <hl-icon v-if="showClear" class="input-close" @mousedown.prevent @click="clear">
          <system-close />
        </hl-icon>
      </span>
      <span v-if="getPwdVisible()" class="input-affixe password-visible">
        <hl-icon v-if="showPwdVisible" @click="handlePasswordVisible">
          <system-hidden v-if="passwordVisible" />
          <system-show v-if="!passwordVisible" />
        </hl-icon>
      </span>
      <span v-if="isWordLimitVisible" :style="countStyle" class="input-count">
        {{ textLength }} / {{ attrs.maxlength }}
      </span>
    </template>
    <textarea
      v-else
      :id="inputId"
      ref="textarea"
      :class="[`input-inner`, type]"
      v-bind="attrs"
      :tabindex="tabindex"
      :disabled="inputDisabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :style="textareaStyle"
      :aria-label="label"
      :placeholder="placeholder"
      :form="form"
      :rows="rows"
      @compositionstart="handleCompositionStart"
      @compositionupdate="handleCompositionUpdate"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
      @keydown="handleKeydown"
    >
    </textarea>
    <span
      v-if="isWordLimitVisible && nativeType === 'textarea'"
      :style="countStyle"
      class="input-count"
    >
      {{ textLength }} / {{ attrs.maxlength }}
    </span>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  inject,
  computed,
  watch,
  nextTick,
  ref,
  shallowRef,
  onMounted,
  onUpdated,
} from 'vue'
import { isNil } from 'lodash-unified'
import { useAttrs, useConsistentProp, useCursor, useNamespace, useFormItemInputId } from '@hongluan-ui/hooks'
import { UPDATE_MODEL_EVENT } from '@hongluan-ui/constants'
import { isObject, isKorean, debugWarn } from '@hongluan-ui/utils'
import { isClient, useResizeObserver } from '@vueuse/core'
import { formContextKey, formItemContextKey, FormItemEvents } from '@hongluan-ui/tokens'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemClose, SystemShow, SystemHidden } from '@hongluan-ui/components/system-icon'
import { calcTextareaHeight } from './utils'
import { inputProps } from './input'

import type { FormContext, FormItemContext } from '@hongluan-ui/tokens'
import type { StyleValue } from '@hongluan-ui/utils'

type TargetElement = HTMLInputElement | HTMLTextAreaElement

export default defineComponent({
  name: 'Input',
  components: {
    HlIcon,
    SystemClose,
    SystemShow,
    SystemHidden,

  },
  inheritAttrs: false,
  props: inputProps,
  emits: [
    UPDATE_MODEL_EVENT, 'input', 'change', 'focus', 'blur', 'clear',
    'mouseleave', 'mouseenter', 'keydown', 'compositionstart', 'compositionupdate', 'compositionend',
  ],
  setup(props, { emit, slots, attrs: rawAttrs }) {
    const { namespace } = useNamespace('input')
    const containerAttrs = computed<Record<string, unknown>>(() => {
      const comboBoxAttrs = {}
      if (props.containerRole === 'combobox') {
        comboBoxAttrs['aria-haspopup'] = rawAttrs['aria-haspopup']
        comboBoxAttrs['aria-owns'] = rawAttrs['aria-owns']
        comboBoxAttrs['aria-expanded'] = rawAttrs['aria-expanded']
      }
      return comboBoxAttrs
    })

    const attrs = useAttrs({
      excludeKeys: computed<string[]>(() => {
        return Object.keys(containerAttrs.value)
      }),
    })

    const form = inject(formContextKey, {} as FormContext)
    const formItem = inject(formItemContextKey, {} as FormItemContext)

    const input = ref<HTMLInputElement>()
    const textarea = ref<HTMLTextAreaElement>()
    const countStyle = ref<StyleValue>()
    const focused = ref(false)
    const hovering = ref(false)
    const isComposing = ref(false)
    const passwordVisible = ref(false)
    const _textareaCalcStyle = shallowRef(props.inputStyle)

    const inputOrTextarea = computed(() => input.value || textarea.value)
    const { size: inputSize, disabled: inputDisabled, fill: inputFill } = useConsistentProp()
    const needStatusIcon = computed(() => form.statusIcon)
    const validateState = computed(() => formItem.validateState || '')
    const textareaStyle = computed<StyleValue>(() => [
      props.inputStyle,
      _textareaCalcStyle.value,
      { resize: props.resize },
    ])
    const nativeInputValue = computed(() => isNil(props.modelValue) ? '' : String(props.modelValue))
    const showClear = computed(() => {
      return props.clearable &&
        !inputDisabled.value &&
        !props.readonly &&
        !!nativeInputValue.value &&
        (focused.value || hovering.value)
    })
    const showPwdVisible = computed(() => {
      return props.showPassword &&
        !inputDisabled.value &&
        !props.readonly &&
        !!nativeInputValue.value &&
        (!!nativeInputValue.value || focused.value)
    })

    const isWordLimitVisible = computed(() => {
      return props.showWordLimit &&
        !!attrs.value.maxlength &&
        (props.nativeType === 'text' || props.nativeType === 'textarea') &&
        !inputDisabled.value &&
        !props.readonly &&
        !props.showPassword
    })
    const textLength = computed(() => {
      return Array.from(nativeInputValue.value).length
    })
    const inputExceed = computed(() => {
      // show exceed style if length of initial value greater then maxlength
      return isWordLimitVisible.value && textLength.value > Number(attrs.value.maxlength)
    })

    const [recordCursor, setCursor] = useCursor(input)
    const { inputId } = useFormItemInputId(props, {
      formItemContext: formItem,
    })

    useResizeObserver(textarea, entries => {
      if (!isWordLimitVisible.value || props.resize !== 'both') return
      const entry = entries[0]
      const { width } = entry.contentRect
      countStyle.value = {
        /** right: 100% - width + padding(15) + right(6) */
        right: `calc(100% - ${width + 15 + 6}px)`,
      }
    })

    const resizeTextarea = () => {
      const { nativeType, autosize } = props

      if (!isClient || nativeType !== 'textarea') return

      if (autosize) {
        const minRows = isObject(autosize) ? autosize.minRows : void 0
        const maxRows = isObject(autosize) ? autosize.maxRows : void 0
        _textareaCalcStyle.value = {
          ...calcTextareaHeight(textarea.value, minRows, maxRows),
        }
      } else {
        _textareaCalcStyle.value = {
          minHeight: calcTextareaHeight(textarea.value).minHeight,
        }
      }
    }

    const setNativeInputValue = () => {
      const input = inputOrTextarea.value
      if (!input || input.value === nativeInputValue.value) return
      input.value = nativeInputValue.value
    }

    const handleInput = (event: Event) => {
      recordCursor()

      let { value } = event.target as TargetElement

      if (props.formatter) {
        value = props.parser ? props.parser(value) : value
        value = props.formatter(value)
      }

      // should not emit input during composition
      // see: https://github.com/ElemeFE/element/issues/10516
      if (isComposing.value) return

      // hack for https://github.com/ElemeFE/element/issues/8548
      // should remove the following line when we don't support IE
      if (value === nativeInputValue.value) {
        setNativeInputValue()
        return
      }

      emit(UPDATE_MODEL_EVENT, value)
      emit('input', value, event)

      // ensure native input value is controlled
      // see: https://github.com/ElemeFE/element/issues/12850
      nextTick(setNativeInputValue)
      setCursor()
    }

    const handleChange = (event: Event) => {
      emit('change', (event.target as TargetElement).value)
    }

    const focus = () => {
      // see: https://github.com/ElemeFE/element/issues/18573
      nextTick(() => {
        inputOrTextarea.value.focus()
      })
    }

    const blur = () => {
      inputOrTextarea.value.blur()
    }

    const handleFocus = (event: FocusEvent) => {
      focused.value = true
      emit('focus', event)
    }

    const handleBlur = (event: FocusEvent) => {
      focused.value = false
      emit('blur', event)
      if (props.validateEvent) {
        formItem.validate?.(FormItemEvents.blur).catch(err => debugWarn(err))
      }
    }

    const select = () => {
      inputOrTextarea.value.select()
    }

    const handleCompositionStart = (event: CompositionEvent) => {
      emit('compositionstart', event)
      isComposing.value = true
    }

    const handleCompositionUpdate = (event: CompositionEvent) => {
      emit('compositionupdate', event)
      const text = (event.target as HTMLInputElement)?.value
      const lastCharacter = text[text.length - 1] || ''
      isComposing.value = !isKorean(lastCharacter)
    }

    const handleCompositionEnd = (event: CompositionEvent) => {
      emit('compositionend', event)
      if (isComposing.value) {
        isComposing.value = false
        handleInput(event)
      }
    }

    const clear = () => {
      emit(UPDATE_MODEL_EVENT, '')
      emit('change', '')
      emit('clear')
      emit('input', '')
    }

    const handlePasswordVisible = () => {
      passwordVisible.value = !passwordVisible.value
      focus()
    }

    const getSuffixVisible = () => {
      return slots.suffix ||
        props.clearable ||
        // showClear.value ||
        // showPwdVisible.value ||
        (validateState.value && needStatusIcon.value)
    }

    const getPwdVisible = () => {
      return props.showPassword ||
        // showClear.value ||
        // showPwdVisible.value ||
        (validateState.value && needStatusIcon.value)
    }

    watch(() => props.modelValue, () => {
      nextTick(() => resizeTextarea())
      if (props.validateEvent) {
        formItem.validate?.(FormItemEvents.change).catch(err => debugWarn(err))
      }
    })

    // native input value is set explicitly
    // do not use v-model / :value in template
    // see: https://github.com/ElemeFE/element/issues/14521
    watch(nativeInputValue, () => {
      setNativeInputValue()
    })

    // when change between <input> and <textarea>,
    // update DOM dependent value and styles
    // https://github.com/ElemeFE/element/issues/14857
    watch(() => props.nativeType, () => {
      nextTick(() => {
        setNativeInputValue()
        resizeTextarea()
      })
    })

    onMounted(() => {
      if (!props.formatter && props.parser) {
        debugWarn(
          'Input',
          'If you set the parser, you also need to set the formatter.',
        )
      }
      setNativeInputValue()
      nextTick(resizeTextarea)
    })

    const handleMouseLeave = (e: MouseEvent) => {
      hovering.value = false
      emit('mouseleave', e)
    }

    const handleMouseEnter = (e: MouseEvent) => {
      hovering.value = true
      emit('mouseenter', e)
    }

    const handleKeydown = (e: KeyboardEvent) => {
      emit('keydown', e)
    }

    return {
      namespace,
      input,
      inputId,
      textarea,
      attrs,
      containerAttrs,
      inputSize,
      validateState,
      textareaStyle,
      countStyle,
      resizeTextarea,
      inputDisabled,
      inputFill,
      showClear,
      showPwdVisible,
      isWordLimitVisible,
      textLength,
      hovering,
      inputExceed,
      passwordVisible,
      inputOrTextarea,
      handleInput,
      handleChange,
      handleFocus,
      handleBlur,
      handleCompositionStart,
      handleCompositionUpdate,
      handleCompositionEnd,
      handlePasswordVisible,
      clear,
      select,
      focus,
      blur,
      focused,
      getSuffixVisible,
      getPwdVisible,
      handleMouseLeave,
      handleMouseEnter,
      handleKeydown,
    }
  },
})

</script>
