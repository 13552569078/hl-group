<template>
  <form
    :class="{
      [namespace]: true,
      'inline': inline,
    }"
    :style="[
      gap ? `--form-gap:${gap}` : '',
    ]"
  >
    <slot></slot>
  </form>
</template>

<script lang="ts">
import { defineComponent, provide, watch, reactive, toRefs, computed } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'
import { debugWarn, isFunction } from '@hongluan-ui/utils'
import { formContextKey } from '@hongluan-ui/tokens'
import { formProps } from './form'
import { filterFields } from './utils'

import type { ValidateFieldsError } from 'async-validator'
import type { FormItemContext as FormItemCtx, FormContext, FormValidateCallback, FormValidationResult } from '@hongluan-ui/tokens'
import type { Arrayable } from '@hongluan-ui/utils'
import type { FormItemProp } from './form-item'

export interface Callback {
  (isValid?: boolean, invalidFields?: ValidateFieldsError): void
}
const COMPONENT_NAME = 'Form'
export default defineComponent({
  name: COMPONENT_NAME,
  props: formProps,
  emits: ['validate'],
  setup(props, { emit }) {
    const fields: FormItemCtx[] = []

    const addField: FormContext['addField'] = field => {
      fields.push(field)
    }

    const removeField: FormContext['removeField'] = field => {
      if (field.prop) {
        fields.splice(fields.indexOf(field), 1)
      }
    }

    const resetFields: FormContext['resetFields'] = (properties = []) => {
      if (!props.model) {
        debugWarn(COMPONENT_NAME, 'model is required for resetFields to work.')
        return
      }
      filterFields(fields, properties).forEach(field => field.resetField())
    }

    const clearValidate: FormContext['clearValidate'] = (props = []) => {
      filterFields(fields, props).forEach(field => field.clearValidate())
    }

    const isValidatable = computed(() => {
      const hasModel = !!props.model
      if (!hasModel) {
        debugWarn(COMPONENT_NAME, 'model is required for validate to work.')
      }
      return hasModel
    })

    const obtainValidateFields = (props: Arrayable<FormItemProp>) => {
      if (fields.length === 0) return []

      const filteredFields = filterFields(fields, props)
      if (!filteredFields.length) {
        debugWarn(COMPONENT_NAME, 'please pass correct props!')
        return []
      }
      return filteredFields
    }

    const validate = async (
      callback?: FormValidateCallback,
    ): FormValidationResult => validateField(undefined, callback)

    const doValidateField = async (
      props: Arrayable<FormItemProp> = [],
    ): Promise<boolean> => {
      if (!isValidatable.value) return false

      const fields = obtainValidateFields(props)
      if (fields.length === 0) return true

      let validationErrors: ValidateFieldsError = {}
      for (const field of fields) {
        try {
          await field.validate('')
        } catch (fields) {
          validationErrors = {
            ...validationErrors,
            ...(fields as ValidateFieldsError),
          }
        }
      }

      if (Object.keys(validationErrors).length === 0) return true
      return Promise.reject(validationErrors)
    }

    const validateField: FormContext['validateField'] = async (
      modelProps = [],
      callback,
    ) => {
      const shouldThrow = !isFunction(callback)

      try {
        const result = await doValidateField(modelProps)
        // When result is false meaning that the fields are not validatable
        if (result === true) {
          callback?.(result)
        }
        return result
      } catch (e) {
        if (e instanceof Error) throw e

        const invalidFields = e as ValidateFieldsError

        if (props.scrollToError) {
          scrollToField(Object.keys(invalidFields)[0])
        }
        callback?.(false, invalidFields)
        return shouldThrow && Promise.reject(invalidFields)
      }
    }

    const scrollToField = (prop: string) => {
      const field = filterFields(fields, prop)[0]
      if (field) {
        field.$el?.$el?.scrollIntoView()
      }
    }

    watch(
      () => props.rules,
      () => {
        if (props.validateOnRuleChange) {
          validate().catch(err => debugWarn(err))
        }
      },
      { deep: true },
    )

    const formContext = reactive({
      ...toRefs(props),
      emit,

      resetFields,
      clearValidate,
      validateField,
      addField,
      removeField,
    })

    provide(formContextKey, formContext)

    const { namespace } = useNamespace('form')

    return {
      namespace,
      validate, // export
      resetFields,
      clearValidate,
      validateField,
      scrollToField,
    }
  },
})
</script>
