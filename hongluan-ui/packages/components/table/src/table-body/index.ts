import { addClass, removeClass } from '@hongluan-ui/utils'
import { isClient } from '@vueuse/core'
import {
  defineComponent,
  getCurrentInstance,
  h,
  watch,
  onUnmounted,
  onUpdated,
} from 'vue'
import { hColgroup } from '../h-helper'
import useLayoutObserver from '../layout-observer'
import useRender from './render-helper'
import { removePopper } from '../util'
import type { VNode } from 'vue'
import type { DefaultRow, Table } from '../table/defaults'
import defaultProps from './defaults'

export default defineComponent({
  name: 'TableBody',
  props: defaultProps,
  setup(props) {
    const instance = getCurrentInstance()
    const parent = instance.parent as Table<DefaultRow>

    const { wrappedRowRender, tooltipContent, tooltipTrigger } = useRender(
      props,
    )
    const { onColumnsChange, onScrollableChange } = useLayoutObserver(parent)

    watch(props.store.states.hoverRow, (newVal: any, oldVal: any) => {
      if (!props.store.states.isComplex.value || !isClient) return
      let raf = window.requestAnimationFrame
      if (!raf) {
        raf = fn => window.setTimeout(fn, 16)
      }
      raf(() => {
        const rows = instance.vnode.el.querySelectorAll('.table-row')
        const oldRow = rows[oldVal]
        const newRow = rows[newVal]
        if (oldRow) {
          removeClass(oldRow, 'hover-row')
        }
        if (newRow) {
          addClass(newRow, 'hover-row')
        }
      })
    })

    onUnmounted(() => {
      removePopper?.()
    })
    onUpdated(() => {
      removePopper?.()
    })

    return {
      onColumnsChange,
      onScrollableChange,
      wrappedRowRender,
      tooltipContent,
      tooltipTrigger,
    }
  },
  render() {
    const data = this.store.states.data.value || []
    return h(
      'table',
      {
        class: 'table-body',
        cellspacing: '0',
        cellpadding: '0',
        border: '0',
      },
      [
        hColgroup(this.store.states.columns.value),
        h('tbody', {}, [
          data.reduce((acc: VNode[], row) => {
            return acc.concat(
              this.wrappedRowRender(
                row,
                acc.length,
              ) as any,
            )
          }, []),
        ]),
      ],
    )
  },
})
