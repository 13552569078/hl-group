<template>
  <hl-scrollbar
    :key="menuId"
    tag="ul"
    role="menu"
    class="cascader-menu"
    wrap-class="cascader-menu-wrap"
    :view-class="[
      'cascader-menu-list',
      isEmpty && 'is-empty'
    ]"
    @mousemove="handleMouseMove"
    @mouseleave="clearHoverZone"
  >
    <hl-cascader-node
      v-for="node in nodes"
      :key="node.uid"
      :node="node"
      :menu-id="menuId"
      @expand="handleExpand"
    />
    <div
      v-if="isEmpty"
      class="cascader-menu-empty-text"
    >
      {{ t('hl.cascader.noData') }}
    </div>
    <div v-if="isLoading" class="cascader-menu-empty-text is-loading">
      <hl-spinner />
      {{ t('hl.cascader.loading') }}
    </div>
    <div v-else-if="isEmpty" class="cascader-menu-empty-text">
      {{ t('hl.cascader.noData') }}
    </div>

    <svg
      v-else-if="panel?.isHoverMenu"
      ref="hoverZone"
      class="cascader-menu-hover-zone"
    />
  </hl-scrollbar>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, inject, ref } from 'vue'
import HlScrollbar from '@hongluan-ui/components/scrollbar'
import HlSpinner from '@hongluan-ui/components/spinner'
import HlCascaderNode from './node.vue'
import { useLocale } from '@hongluan-ui/hooks'
import { generateId } from '@hongluan-ui/utils'
import { CASCADER_PANEL_INJECTION_KEY } from './types'

import type { PropType } from 'vue'
import type { Nullable, TimeoutHandle } from '@hongluan-ui/utils'
import type { CascaderNode } from './types'

export default defineComponent({
  name: 'CascaderMenu',

  components: {
    HlScrollbar,
    HlCascaderNode,
    HlSpinner,
  },

  props: {
    nodes: {
      type: Array as PropType< CascaderNode[]>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },

  setup (props) {
    const { t } = useLocale()
    const instance = getCurrentInstance()
    const id = generateId()
    let activeNode: Nullable<HTMLElement> = null
    let hoverTimer: Nullable<TimeoutHandle> = null

    const panel = inject(CASCADER_PANEL_INJECTION_KEY)

    const hoverZone = ref<null | SVGSVGElement>(null)
    const isLoading = computed(() => !panel.initialLoaded)
    const isEmpty = computed(() => !props.nodes.length)
    const menuId = computed(() => `cascader-menu-${id}-${props.index}`)

    const handleExpand = (e: MouseEvent) => {
      activeNode = e.target as HTMLElement
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!panel.isHoverMenu || !activeNode || !hoverZone.value) return

      if (activeNode.contains(e.target as HTMLElement)) {
        clearHoverTimer()

        const el = instance.vnode.el as HTMLElement
        const { left } = el.getBoundingClientRect()
        const { offsetWidth, offsetHeight } = el
        const startX = e.clientX - left
        const top = activeNode.offsetTop
        const bottom = top + activeNode.offsetHeight

        hoverZone.value.innerHTML = `
          <path style="pointer-events: auto;" fill="transparent" d="M${startX} ${top} L${offsetWidth} 0 V${top} Z" />
          <path style="pointer-events: auto;" fill="transparent" d="M${startX} ${bottom} L${offsetWidth} ${offsetHeight} V${bottom} Z" />
        `
      } else if (!hoverTimer) {
        hoverTimer = window.setTimeout(clearHoverZone, panel.config.hoverThreshold)
      }
    }

    const clearHoverTimer = () => {
      if (!hoverTimer) return
      clearTimeout(hoverTimer)
      hoverTimer = null
    }

    const clearHoverZone = () => {
      if (!hoverZone.value) return
      hoverZone.value.innerHTML = ''
      clearHoverTimer()
    }

    return {
      panel,
      hoverZone,
      isEmpty,
      isLoading,
      menuId,
      t,
      handleExpand,
      handleMouseMove,
      clearHoverZone,
    }
  },
})

</script>

