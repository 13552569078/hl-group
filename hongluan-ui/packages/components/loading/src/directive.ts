import { isRef, ref, type Ref } from 'vue'
import { isObject, isString, hyphenate } from '@vue/shared'
import { Loading } from './service'
import type { Directive, DirectiveBinding, UnwrapRef } from 'vue'
import type { LoadingOptions } from './types'
import type { LoadingInstance } from './loading'

const INSTANCE_KEY = Symbol('Loading')

export type LoadingBinding = boolean | UnwrapRef<LoadingOptions>
export interface ElementLoading extends HTMLElement {
  [INSTANCE_KEY]?: {
    instance: LoadingInstance
    options: LoadingOptions
  }
}

const createInstance = (
  el: ElementLoading,
  binding: DirectiveBinding<LoadingBinding>,
) => {
  const vm = binding.instance as Record<string, any>

  const getBindingProp = <K extends keyof LoadingOptions>(
    key: K,
  ): LoadingOptions[K] =>
    isObject(binding.value) ? binding.value[key] : undefined

  const resolveExpression = (key: any) => {
    const data = (isString(key) && vm?.[key]) || key
    if (data) return ref(data)
    else return data
  }

  const getProp = <K extends keyof LoadingOptions>(name: K) =>
    resolveExpression(
      getBindingProp(name) ||
        el.getAttribute(`loading-${hyphenate(name)}`),
    )

  const fullscreen =
    getBindingProp('fullscreen') ?? binding.modifiers.fullscreen

  const options: LoadingOptions = {
    text: getProp('text'),
    svg: getProp('svg'),
    svgViewBox: getProp('svgViewBox'),
    spinner: getProp('spinner'),
    background: getProp('background'),
    customClass: getProp('customClass'),
    fullscreen,
    target: getBindingProp('target') ?? (fullscreen ? undefined : el),
    body: getBindingProp('body') ?? binding.modifiers.body,
    lock: getBindingProp('lock') ?? binding.modifiers.lock,
  }
  el[INSTANCE_KEY] = {
    options,
    instance: Loading(options),
  }
}

const updateOptions = (
  newOptions: UnwrapRef<LoadingOptions>,
  originalOptions: LoadingOptions,
) => {
  for (const key of (Object.keys(originalOptions) as (keyof LoadingOptions)[])) {
    if (isRef(originalOptions[key]))
      (originalOptions[key] as Ref<unknown>).value = newOptions[key]
  }
}

export const vLoading: Directive<ElementLoading, LoadingBinding> = {
  mounted(el, binding) {
    if (binding.value) {
      createInstance(el, binding)
    }
  },
  updated(el, binding) {
    const instance = el[INSTANCE_KEY]
    if (binding.oldValue !== binding.value) {
      if (binding.value && !binding.oldValue) {
        createInstance(el, binding)
      } else if (binding.value && binding.oldValue) {
        if (isObject(binding.value))
          updateOptions(binding.value, instance!.options)
      } else {
        instance?.instance.close()
      }
    }
  },
  unmounted(el) {
    el[INSTANCE_KEY]?.instance.close()
  },
}
