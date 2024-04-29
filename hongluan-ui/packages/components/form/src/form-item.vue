<template>
  <hl-row
    ref="formItemRef"
    :role="isGroup ? 'group' : undefined"
    :aria-labelledby="isGroup ? labelId : undefined"
    :class="[formItemClass]"
    :gap="itemGap"
    :gap-x="formContext?.itemGapX"
    :gap-y="formContext?.itemGapY"
  >
    <hl-col v-if="label || $slots.label" :class="[labelClass, 'form-label']" :style="{ width: labelStyle }">
      <component
        :is="labelFor ? 'label' : 'div'"
        v-if="hasLabel"
        :id="labelId"
        :for="labelFor"
      >
        <slot name="label" :label="currentLabel">{{ currentLabel }}</slot>
      </component>
    </hl-col>
    <hl-col class="form-content" :class="[contentClass, offset]" :style="contentStyle">
      <slot></slot>
      <transition name="zoom-in-top">
        <slot v-if="shouldShowError" name="error" :error="validateMessage">
          <div class="form-content-info">
            {{ validateMessage }}
          </div>
        </slot>
      </transition>
    </hl-col>
  </hl-row>
</template>

<script lang="ts">
import { defineComponent, provide, inject, ref, watch, computed, onMounted, onBeforeUnmount, toRefs, reactive, nextTick } from 'vue'
import AsyncValidator from 'async-validator'
import { clone } from 'lodash-unified'
import { refDebounced } from '@vueuse/core'
import { ensureArray, getProp, isFunction, isString } from '@hongluan-ui/utils'
import { useGlobalConfig, useId, useNamespace } from '@hongluan-ui/hooks'
import { formContextKey, formItemContextKey } from '@hongluan-ui/tokens'
import HlRow from '@hongluan-ui/components/row'
import HlCol from '@hongluan-ui/components/col'
import { formItemProps } from './form-item'

import type { CSSProperties } from 'vue'
import type { RuleItem } from 'async-validator'
import type { ComponentSize } from '@hongluan-ui/constants'
import type { Arrayable } from '@hongluan-ui/utils'
import type { FormItemContext, FormItemRule, FormValidateFailure } from '@hongluan-ui/tokens'
import type { FormItemValidateState } from './form-item'

export default defineComponent({
  name: 'FormItem',
  components: { HlRow, HlCol },
  props: formItemProps,
  setup(props, { slots }) {
    const HL = useGlobalConfig()
    const { namespace } = useNamespace('form-item')

    const formContext = inject(formContextKey, undefined)

    const labelId = useId().value
    const inputIds = ref<string[]>([])

    const validateState = ref<FormItemValidateState>('')
    const validateStateDebounced = refDebounced(validateState, 100)
    const validateMessage = ref('')

    const formItemRef = ref<{ $el: HTMLElement; }>()

    // special inline value.
    let initialValue: any = undefined
    let isResettingField = false

    const propString = computed(() => {
      if (!props.prop) return ''
      return isString(props.prop) ? props.prop : props.prop.join('.')
    })

    const hasLabel = computed<boolean>(() => {
      return !!(props.label || slots.label)
    })

    const labelFor = computed<string | undefined>(() => {
      return props.for || inputIds.value.length === 1
        ? inputIds.value[0]
        : undefined
    })

    const isGroup = computed<boolean>(() => {
      return !labelFor.value && hasLabel.value
    })

    const labelStyle = computed(() => {
      let width = props.width || formContext?.width
      width = Array.isArray(width) ? width : [width]
      const labelWidth = width && (width[0] as string)
      return labelWidth
    })

    const contentStyle = computed(() => {
      let width = props.width || formContext?.width
      width = Array.isArray(width) ? width : [width]
      const contentWidth = width && (width[1] as string)
      const style = {} as CSSProperties
      if (contentWidth && !Number.isNaN(Number.parseInt(contentWidth, 10))) {
        style.width = contentWidth
      }
      return style
    })

    const labelClass = computed(() => {
      let width = props.width || formContext?.width
      width = Array.isArray(width) ? width : [width]
      const labelClazz = width && (width[0] as string)
      let labelPosition = props.labelPosition || formContext?.labelPosition
      let clazz = ''
      if (labelPosition) {
        labelPosition = Array.isArray(labelPosition) ? labelPosition : [labelPosition]
        clazz = labelPosition.join(' ')
      }
      if (labelClazz && Number.isNaN(Number.parseInt(labelClazz, 10))) {
        clazz += ' ' + labelClazz
      }
      return clazz
    })

    const contentClass = computed(() => {
      let width = props.width || formContext?.width
      width = Array.isArray(width) ? width : [width]
      const contentClazz = width && (width[1] as string)
      if (contentClazz && Number.isNaN(Number.parseInt(contentClazz, 10))) {
        return contentClazz
      }
      return ''
    })

    const itemGap = computed(() => {
      return props.gap || formContext?.itemGap
    })

    const sizeClass = computed<ComponentSize>(() => {
      return props.size || formContext?.size || HL.value.size
    })

    const formItemClass = computed(() => [
      {
        [namespace.value]: true,
        'form-item-feedback': formContext?.statusIcon,
        'is-error': validateState.value === 'error',
        'is-validating': validateState.value === 'validating',
        'is-success': validateState.value === 'success',
        'is-required': isRequired.value || props.required,
        'is-no-asterisk': formContext?.hideRequiredAsterisk,
      },
      sizeClass.value ? sizeClass.value : '',
      formContext?.requireAsteriskPosition === 'right' ? 'asterisk-right' : 'asterisk-left',
    ])

    const fieldValue = computed(() => {
      const model = formContext?.model
      if (!model || !props.prop) {
        return
      }

      return getProp(model, props.prop).value
    })

    const normalizedRules = computed(() => {
      const { required } = props

      const rules: FormItemRule[] = []

      if (props.rules) {
        rules.push(...ensureArray(props.rules))
      }

      const formRules = formContext?.rules
      if (formRules && props.prop) {
        const _rules = getProp<Arrayable<FormItemRule> | undefined>(
          formRules,
          props.prop,
        ).value
        if (_rules) {
          rules.push(...ensureArray(_rules))
        }
      }

      if (required !== undefined) {
        const requiredRules = rules
          .map((rule, i) => [rule, i] as const)
          .filter(([rule]) => Object.keys(rule).includes('required'))

        if (requiredRules.length > 0) {
          for (const [rule, i] of requiredRules) {
            if (rule.required === required) continue
            rules[i] = { ...rule, required }
          }
        } else {
          rules.push({ required })
        }
      }

      return rules
    })

    const validateEnabled = computed(() => normalizedRules.value.length > 0)

    const getFilteredRule = (trigger: string) => {
      const rules = normalizedRules.value
      return (
        rules
          .filter(rule => {
            if (!rule.trigger || !trigger) return true
            if (Array.isArray(rule.trigger)) {
              return rule.trigger.includes(trigger)
            } else {
              return rule.trigger === trigger
            }
          })
        // exclude trigger
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .map(({ trigger, ...rule }): RuleItem => rule)
      )
    }

    const isRequired = computed(() =>
      normalizedRules.value.some(rule => rule.required),
    )

    const shouldShowError = computed(() => {
      return validateStateDebounced.value === 'error' && props.showMessage && formContext.showMessage
    })

    const currentLabel = computed(() => (formContext?.labelPrefix || '') + (props.label || '') + (formContext?.labelSuffix || ''))

    const setValidationState = (state: FormItemValidateState) => {
      validateState.value = state
    }

    const onValidationFailed = (error: FormValidateFailure) => {
      const { errors, fields } = error
      if (!errors || !fields) {
        console.error(error)
      }

      setValidationState('error')
      validateMessage.value = errors
        ? errors?.[0]?.message ?? `${props.prop} is required`
        : ''

      formContext?.emit('validate', props.prop, false, validateMessage.value)
    }
    const onValidationSucceeded = () => {
      setValidationState('success')
      formContext?.emit('validate', props.prop, true, '')
    }

    const doValidate = async (rules: RuleItem[]): Promise<true> => {
      const modelName = propString.value
      const validator = new AsyncValidator({
        [modelName]: rules,
      })
      return validator
        .validate({ [modelName]: fieldValue.value }, { firstFields: true })
        .then(() => {
          onValidationSucceeded()
          return true as const
        })
        .catch((err: FormValidateFailure) => {
          onValidationFailed(err as FormValidateFailure)
          return Promise.reject(err)
        })
    }
    const validate: FormItemContext['validate'] = async (trigger, callback) => {
      // skip validation if its resetting
      if (isResettingField || !props.prop) {
        return false
      }

      const hasCallback = isFunction(callback)
      if (!validateEnabled.value) {
        callback?.(false)
        return false
      }


      const rules = getFilteredRule(trigger)
      if (rules.length === 0) {
        callback?.(true)
        return true
      }

      setValidationState('validating')

      return doValidate(rules)
        .then(() => {
          callback?.(true)
          return true as const
        })
        .catch((err: FormValidateFailure) => {
          const { fields } = err
          callback?.(false, fields)
          return hasCallback ? false : Promise.reject(fields)
        })
    }

    const clearValidate: FormItemContext['clearValidate'] = () => {
      setValidationState('')
      validateMessage.value = ''
      isResettingField = false
    }

    const resetField: FormItemContext['resetField'] = async () => {
      const model = formContext?.model
      if (!model || !props.prop) return

      const computedValue = getProp(model, props.prop)
      // prevent validation from being triggered
      isResettingField = true

      computedValue.value = clone(initialValue)

      await nextTick()
      clearValidate()
      isResettingField = false
    }

    const addInputId: FormItemContext['addInputId'] = (id: string) => {
      if (!inputIds.value.includes(id)) {
        inputIds.value.push(id)
      }
    }

    const removeInputId: FormItemContext['removeInputId'] = (id: string) => {
      inputIds.value = inputIds.value.filter(listId => listId !== id)
    }

    watch(
      () => props.error,
      val => {
        validateMessage.value = val || ''
        setValidationState(val ? 'error' : '')
      },
      { immediate: true },
    )

    watch(
      () => props.validateStatus,
      val => setValidationState(val || ''),
    )

    const formItemContext: FormItemContext = reactive({
      ...toRefs(props),
      size: sizeClass,
      labelId,
      inputIds,
      isGroup,
      addInputId,
      removeInputId,
      validateState,
      $el: formItemRef,
      resetField,
      clearValidate,
      validate,
    })

    provide(formItemContextKey, formItemContext)

    onMounted(() => {
      if (props.prop) {
        formContext?.addField(formItemContext)
        initialValue = clone(fieldValue.value)
      }
    })
    onBeforeUnmount(() => {
      formContext?.removeField(formItemContext)
    })

    return {
      formItemRef,
      formItemClass,
      validate,
      resetField,
      clearValidate,
      validateState,
      hasLabel,
      labelId,
      inputIds,
      isGroup,
      shouldShowError,
      formContext,
      labelStyle,
      contentStyle,
      labelClass,
      contentClass,
      validateMessage,
      labelFor,
      itemGap,
      currentLabel,
    }
  },
})
</script>
