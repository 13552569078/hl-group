import type { InjectionKey, SetupContext } from 'vue'
import type { RuleItem, ValidateError, ValidateFieldsError } from 'async-validator'
import type { ComponentSize } from '@hongluan-ui/constants'
import type {
  FormProps,
  FormEmits,
  FormItemProp,
  FormItemProps,
  FormItemValidateState,
} from '@hongluan-ui/components/form'
import type { Arrayable } from '@hongluan-ui/utils'

export interface FormItemRule extends RuleItem {
  trigger?: Arrayable<string>
}
export type FormRules = Partial<Record<string, Arrayable<FormItemRule>>>

export type FormValidationResult = Promise<boolean>
export type FormValidateCallback = (
  isValid: boolean,
  invalidFields?: ValidateFieldsError
) => void
export interface FormValidateFailure {
  errors: ValidateError[] | null
  fields: ValidateFieldsError
}

export type FormContext = FormProps & {
  emit: SetupContext<FormEmits>['emit']

  // expose
  addField: (field: FormItemContext) => void
  removeField: (field: FormItemContext) => void
  resetFields: (props?: Arrayable<FormItemProp>) => void
  clearValidate: (props?: Arrayable<FormItemProp>) => void
  validateField: (
    props?: Arrayable<FormItemProp>,
    callback?: FormValidateCallback
  ) => FormValidationResult
}

export interface FormItemContext extends FormItemProps {
  $el: { $el: HTMLElement | undefined; }
  size: ComponentSize
  validateState: FormItemValidateState
  isGroup: boolean
  labelId: string
  inputIds: string[]
  addInputId: (id: string) => void
  removeInputId: (id: string) => void
  validate: (trigger: string, callback?: FormValidateCallback) => FormValidationResult
  resetField(): void
  clearValidate(): void
}

// TODO: change it to symbol
export const formContextKey: InjectionKey<FormContext> = Symbol('Form')

export const formItemContextKey: InjectionKey<FormItemContext> = Symbol('FormItem')

export const FormEvents = {
  addField: 'form.addField',
  removeField: 'form.removeField',
} as const

export const FormItemEvents = {
  blur: 'blur',
  change: 'change',
} as const
