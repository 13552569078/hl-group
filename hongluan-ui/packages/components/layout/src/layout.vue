<template>
  <section
    ref="layoutRef"
    :class="{
      [namespace + '-layout'] : true,
      boxed,
      'fixed-header': fixedHeader,
      'full-header': fullHeader,
      'fixed-aside': fixedAside,
      'fixed-sub-header': fixedSubHeader,
      'full-sub-header': fullSubHeader,
      'fixed-footer': fixedFooter,
      'full-footer': fullFooter,
      'collapse-aside': menuCollapse || autoMenuCollapse,
    }"
  >
    <slot></slot>
  </section>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted, ref, provide, onBeforeUnmount } from 'vue'
import { isClient } from '@vueuse/core'
import { useNamespace } from '@hongluan-ui/hooks'
import { layoutKey } from '@hongluan-ui/tokens'

import type { VNode, Component } from 'vue'

export default defineComponent({
  name: 'Layout',
  props: {
    direction: {
      type: String,
      default: '',
    },
    boxed: Boolean,
    fixedHeader: Boolean,
    fullHeader: Boolean,
    fixedAside: Boolean,
    fixedSubHeader: Boolean,
    fullSubHeader: Boolean,
    fixedFooter: Boolean,
    fullFooter: Boolean,
  },
  setup(props, { slots }) {
    const { namespace } = useNamespace()
    const layoutRef = ref<HTMLElement>()
    const autoMenuCollapse = ref(false)
    const menuCollapse = ref(false)
    const isVertical = computed(() => {
      if (props.direction === 'vertical') {
        return true
      } else if (props.direction === 'horizontal') {
        return false
      }
      if (slots && slots.default) {
        const vNodes: VNode[] = slots.default()
        return vNodes.some(vNode => {
          const tag = (vNode.type as Component).name
          return tag === 'Header' || tag === 'Footer'
        })
      } else {
        return false
      }
    })

    let menuCollapseWidth: number
    let isResponsd = false

    const setMenuCollapse = (result: boolean) => {
      if (isResponsd) {
        menuCollapse.value = result
      }
    }

    const observer = isClient ? new ResizeObserver(entries => {
      entries.forEach(entry => {
        const target = entry.contentRect
        if (target.width <= menuCollapseWidth) {
          autoMenuCollapse.value = true
        } else {
          autoMenuCollapse.value = false
        }
      })
    }) : null

    const respondMenu = () => {
      const menuStyle = getComputedStyle(layoutRef.value)
      const asideWidth = Number.parseFloat(menuStyle.getPropertyValue('--layout-aside-respond-width'))
      if (!Number.isNaN(asideWidth) && asideWidth > 0) {
        menuCollapseWidth = asideWidth

        const docStyle = getComputedStyle(document.documentElement)
        const respond = docStyle.getPropertyValue('--feature-respond')
        if (respond.trim() === 'true') {
          observer?.observe(document.body)
          isResponsd = true
        }
      }
    }

    onMounted(() => {
      if (!isClient)return
      respondMenu()
    })

    onBeforeUnmount(() => {
      observer && observer.disconnect()
    })

    provide(layoutKey, {
      autoMenuCollapse,
      setMenuCollapse,
    })

    return {
      namespace,
      layoutRef,
      isVertical,
      autoMenuCollapse,
      menuCollapse,
      respondMenu,
    }
  },
})
</script>
