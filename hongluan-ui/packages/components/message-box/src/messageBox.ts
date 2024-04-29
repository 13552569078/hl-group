import { createVNode, render, watch } from 'vue'
import { isClient } from '@vueuse/core'
import {
  isVNode,
  isString,
  hasOwn,
  isObject,
  isUndefined,
  isFunction,
  isElement,
  debugWarn,
} from '@hongluan-ui/utils'
import MessageBoxConstructor from './index.vue'

import type { AppContext, ComponentPublicInstance, VNode } from 'vue'
import type {
  Action,
  Callback,
  MessageBoxState,
  MessageBox as IMessageBox,
  MessageBoxOptions,
  MessageBoxData,
  MessageBoxShortcutMethod,
} from './message-box.type'

// component default merge props & data

const messageInstance = new Map<
ComponentPublicInstance<{ doClose: () => void; }>, // marking doClose as function
{
  options: any
  callback: Callback | undefined
  resolve: (res: any) => void
  reject: (reason?: any) => void
}
>()

const getAppendToElement = (props: any): HTMLElement => {
  let appendTo: HTMLElement | null = document.body
  if (props.appendTo) {
    if (isString(props.appendTo)) {
      appendTo = document.querySelector<HTMLElement>(props.appendTo)
    }
    if (isElement(props.appendTo)) {
      appendTo = props.appendTo
    }

    // should fallback to default value with a warning
    if (!isElement(appendTo)) {
      debugWarn(
        'MessageBox',
        'the appendTo option is not an HTMLElement. Falling back to document.body.',
      )
      appendTo = document.body
    }
  }
  return appendTo
}

const initInstance = (
  props: any,
  container: HTMLElement,
  appContext: AppContext | null = null,
) => {
  const vnode = createVNode(
    MessageBoxConstructor,
    props,
    isFunction(props.message) || isVNode(props.message)
      ? {
        default: isFunction(props.message)
          ? props.message
          : () => props.message,
      }
      : null,
  )
  vnode.appContext = appContext
  render(vnode, container)
  getAppendToElement(props).appendChild(container.firstElementChild!)
  return vnode.component
}

const genContainer = () => {
  return document.createElement('div')
}

const showMessage = (options: any, appContext?: AppContext | null) => {
  const container = genContainer()
  // Adding destruct method.
  // when transition leaves emitting `vanish` evt. so that we can do the clean job.
  options.onVanish = () => {
    // not sure if this causes mem leak, need proof to verify that.
    // maybe calling out like 1000 msg-box then close them all.
    // because we split overlay and message box body, so we need remove them all
    // console.log(options.appendTo, getAppendToElement(options))
    getAppendToElement(options).removeChild(document.querySelector(`[msg-box-id='${vm.messageBoxId}']`)!)
    getAppendToElement(options).removeChild(document.querySelector(`[msg-overlay-id='${vm.messageBoxId}']`)!)

    messageInstance.delete(vm) // Remove vm to avoid mem leak.
    // here we were suppose to call document.body.removeChild(container.firstElementChild)
    // but render(null, container) did that job for us. so that we do not call that directly
  }

  options.onAction = (action: Action) => {
    const currentMsg = messageInstance.get(vm)!
    let resolve: Action | { value: string; action: Action; }
    if (options.showInput) {
      resolve = { value: vm.inputValue, action }
    } else {
      resolve = action
    }
    if (options.callback) {
      options.callback(resolve, instance!.proxy)
    } else {
      if (action === 'cancel' || action === 'close') {
        if (options.distinguishCancelAndClose && action !== 'cancel') {
          currentMsg.reject('close')
        } else {
          currentMsg.reject('cancel')
        }
      } else {
        currentMsg.resolve(resolve)
      }
    }
  }

  const instance = initInstance(options, container, appContext)!

  // This is how we use message box programmably.
  // Maybe consider releasing a template version?
  // get component instance like v2.
  const vm = instance.proxy as ComponentPublicInstance<
  {
    [k: string]: any
    messageBoxId: number
    visible: boolean
    doClose: () => void
  } & MessageBoxState
  >

  for (const prop in options) {
    if (hasOwn(options, prop) && !hasOwn(vm.$props, prop)) {
      vm[prop as keyof ComponentPublicInstance] = options[prop]
    }
  }

  watch(() => vm.icon, (newVal, oldVal) => {
    if (isVNode(newVal)) {
      // Override slots since message is vnode type.
      instance.slots.icon = () => [newVal]
    } else if(isVNode(oldVal) && !isVNode(newVal)){
      delete instance.slots.icon
    }
  }, {
    immediate: true,
  })

  // change visibility after everything is settled
  vm.visible = true
  return vm
}

async function MessageBox(
  options: MessageBoxOptions,
  appContext?: AppContext | null
): Promise<MessageBoxData>
function MessageBox(
  options: MessageBoxOptions | string | VNode,
  appContext: AppContext | null = null,
): Promise<{ value: string; action: Action; } | Action> {
  if (!isClient) return Promise.reject()
  let callback: Callback | undefined
  if (isString(options) || isVNode(options)) {
    options = {
      message: options,
    }
  } else {
    callback = options.callback
  }

  return new Promise((resolve, reject) => {
    const vm = showMessage(
      options,
      appContext ?? (MessageBox as IMessageBox)._context,
    )
    // collect this vm in order to handle upcoming events.
    messageInstance.set(vm, {
      options,
      callback,
      resolve,
      reject,
    })
  })
}

const MESSAGE_BOX_VARIANTS = ['alert', 'confirm'] as const
const MESSAGE_BOX_DEFAULT_OPTS: Record<
  typeof MESSAGE_BOX_VARIANTS[number],
Partial<MessageBoxOptions>
> = {
  alert: { closeOnPressEscape: false, closeOnClickModal: false },
  confirm: { showCancelButton: true },
  // prompt: { showCancelButton: true, showInput: true },
}

MESSAGE_BOX_VARIANTS.forEach(boxType => {
  (MessageBox as IMessageBox)[boxType] = messageBoxFactory(
    boxType,
  ) as MessageBoxShortcutMethod

})

function messageBoxFactory(boxType: typeof MESSAGE_BOX_VARIANTS[number]) {
  return (
    message: string | VNode,
    title: string | MessageBoxOptions,
    options?: MessageBoxOptions,
    appContext?: AppContext | null,
  ) => {
    let titleOrOpts = ''
    if (isObject(title)) {
      options = title as MessageBoxOptions
      titleOrOpts = ''
    } else if (isUndefined(title)) {
      titleOrOpts = ''
    } else {
      titleOrOpts = title as string
    }

    return MessageBox(
      Object.assign(
        {
          title: titleOrOpts,
          message,
          type: '',
          ...MESSAGE_BOX_DEFAULT_OPTS[boxType],
        },
        options,
        {
          boxType,
        },
      ),
      appContext,
    )
  }
}

MessageBox.close = () => {
  // instance.setupInstall.doClose()
  // instance.setupInstall.state.visible = false

  messageInstance.forEach((_, vm) => {
    vm.doClose()
  })

  messageInstance.clear()
}

;(MessageBox as IMessageBox)._context = null

export default MessageBox as IMessageBox
