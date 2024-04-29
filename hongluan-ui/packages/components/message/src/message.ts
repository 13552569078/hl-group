import { isClient } from '@vueuse/core'
import { buildProp, definePropType, mutable } from '@hongluan-ui/utils'

import type { VNode, ExtractPropTypes, AppContext } from 'vue'
import type { Mutable } from '@hongluan-ui/utils'
import type MessageConstructor from './message.vue'

export const messageTypes = ['success', 'info', 'warning', 'error', 'danger'] as const
export type messageType = typeof messageTypes[number]

export const aligns = ['left', 'center', 'right'] as const
export interface MessageConfigContext {
  max?: number
}

export const messageDefaults = mutable({
  customClass: '',
  textAlign: 'left',
  dangerouslyUseHTMLString: false,
  duration: 3000,
  id: '',
  message: '',
  onClose: undefined,
  showClose: false,
  type: 'info',
  offset: 16,
  zIndex: 0,
  grouping: false,
  repeatNum: 1,
  appendTo: isClient ? document.body : (undefined as never),
} as const)

export const messageProps = {
  customClass: {
    type: String,
    default: messageDefaults.customClass,
  },
  textAlign: buildProp({
    type: String,
    values: aligns,
    default: messageDefaults.textAlign,
  } as const),
  dangerouslyUseHTMLString: {
    type: Boolean,
    default: messageDefaults.dangerouslyUseHTMLString,
  },
  duration: {
    type: Number,
    default: messageDefaults.duration,
  },
  id: {
    type: String,
    default: messageDefaults.id,
  },
  message: buildProp({
    type: definePropType<string | VNode | (() => VNode)>([
      String,
      Object,
      Function,
    ]),
    default: messageDefaults.message,
  }),
  icon: buildProp({
    type: definePropType<VNode>(Object),
  }),
  onClose: buildProp({
    type: definePropType<() => void>(Function),
    required: false,
  }),
  showClose: {
    type: Boolean,
    default: messageDefaults.showClose,
  },
  type: buildProp({
    type: String,
    values: messageTypes,
    default: messageDefaults.type,
  } as const),
  offset: {
    type: Number,
    default: messageDefaults.offset,
  },
  zIndex: {
    type: Number,
    default: messageDefaults.zIndex,
  },
  grouping: {
    type: Boolean,
    default: messageDefaults.grouping,
  },
  repeatNum: {
    type: Number,
    default: messageDefaults.repeatNum,
  },
} as const
export type MessageProps = ExtractPropTypes<typeof messageProps>

export const messageEmits = {
  destroy: () => true,
}
export type MessageEmits = typeof messageEmits

export type MessageInstance = InstanceType<typeof MessageConstructor>

export type MessageOptions = Partial<Mutable<
Omit<MessageProps, 'id'> & {
  appendTo?: HTMLElement | string
}
>>
export type MessageParams = MessageOptions | MessageOptions['message']
export type MessageParamsNormalized = Omit<MessageProps, 'id'> & {
  appendTo: HTMLElement
}
export type MessageOptionsWithType = Omit<MessageOptions, 'type'>
export type MessageParamsWithType =
  | MessageOptionsWithType
  | MessageOptions['message']

export interface MessageHandler {
  close: () => void
}

export type MessageFn = {
  (options?: MessageParams, appContext?: null | AppContext): MessageHandler
  closeAll(type?: messageType): void
}
export type MessageTypedFn = (
  options?: MessageParamsWithType,
  appContext?: null | AppContext
) => MessageHandler

export interface Message extends MessageFn {
  success: MessageTypedFn
  warning: MessageTypedFn
  info: MessageTypedFn
  error: MessageTypedFn
  danger: MessageTypedFn
}
