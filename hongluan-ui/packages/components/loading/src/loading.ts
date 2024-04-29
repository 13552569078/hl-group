import { createApp, h, reactive, ref, createVNode, toRefs, Transition, vShow, withCtx, withDirectives } from 'vue'
import { removeClass } from '@hongluan-ui/utils'
import HlSpinner from '@hongluan-ui/components/spinner'
import { useNamespace } from '@hongluan-ui/hooks'

import type { LoadingOptionsResolved } from './types'

export function createLoadingComponent(options: LoadingOptionsResolved) {
  const { namespace } = useNamespace('loading-mask')
  let afterLeaveTimer: number

  const afterLeaveFlag = ref(false)
  const data = reactive({
    ...options,
    originalPosition: '',
    originalOverflow: '',
    visible: false,
  })

  function setText(text: string) {
    data.text = text
  }

  function destroySelf() {
    const target = data.parent
    if (!target.vLoadingAddClassList) {
      let loadingNumber: number | string | null =
        target.getAttribute('loading-number')
      loadingNumber = Number.parseInt(loadingNumber as any) - 1
      if (!loadingNumber) {
        removeClass(target, 'loading-parent-relative')
        target.removeAttribute('loading-number')
      } else {
        target.setAttribute('loading-number', loadingNumber.toString())
      }
      removeClass(target, 'loading-parent-hidden')
    }
    removeLoadingChild()
    loadingInstance.unmount()
  }
  function removeLoadingChild(): void {
    vm.$el?.parentNode?.removeChild(vm.$el)
  }

  function close() {
    if (options.beforeClose && !options.beforeClose()) return

    afterLeaveFlag.value = true
    clearTimeout(afterLeaveTimer)

    afterLeaveTimer = window.setTimeout(handleAfterLeave, 400)
    data.visible = false

    options.closed?.()
  }

  function handleAfterLeave() {
    if (!afterLeaveFlag.value) return
    const target = data.parent
    afterLeaveFlag.value = false
    target.vLoadingAddClassList = undefined
    destroySelf()
  }

  const hlLoadingComponent = {
    name: 'Loading',
    setup() {
      return () => {
        const svg = data.svg
        const spinner = h(
          'svg',
          {
            class: 'circular',
            viewBox: data.svgViewBox ? data.svgViewBox : '0 0 50 50',
            ...(svg ? { innerHTML: svg } : {}),
          },
          [
            h('circle', {
              class: 'path',
              cx: '25',
              cy: '25',
              r: '20',
              fill: 'none',
            }),
          ],
        )

        const noSpinner = h('i', { class: data.spinner })
        const definedSpinner = h(HlSpinner, typeof data.spinner === 'object' ? data.spinner : {})
        const spinnerText = data.text
          ? h('p', { class: 'loading-text' }, [data.text])
          : undefined

        return h(
          Transition,
          {
            name: 'loading-fade',
            onAfterLeave: handleAfterLeave,
          },
          {
            default: withCtx(() => [
              withDirectives(
                createVNode(
                  'div',
                  {
                    style: {
                      backgroundColor: data.background || '',
                    },
                    class: [
                      namespace.value,
                      data.customClass,
                      data.fullscreen ? 'is-fullscreen' : '',
                    ],
                  },
                  [
                    h(
                      'div',
                      {
                        class: 'loading-spinner',
                      },
                      [
                        !data.spinner ? spinner : (typeof data.spinner === 'object' ? definedSpinner : noSpinner),
                        spinnerText,
                      ],
                    ),
                  ],
                ),
                [[vShow, data.visible]],
              ),
            ]),
          },
        )
      }
    },
  }

  const loadingInstance = createApp(hlLoadingComponent)
  const vm = loadingInstance.mount(document.createElement('div'))

  return {
    ...toRefs(data),
    removeLoadingChild,
    setText,
    close,
    handleAfterLeave,
    vm,
    get $el(): HTMLElement {
      return vm.$el
    },
  }
}

export type LoadingInstance = ReturnType<typeof createLoadingComponent>
