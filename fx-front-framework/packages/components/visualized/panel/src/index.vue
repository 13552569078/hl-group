<template>
  <div class="fx-v-panel" @mouseenter="enter()" @mouseleave="leave()">
    <hl-panel
      class="panel-card"
      padding="calc(var(--xxs) * 5)"
      borderless
      :collapsed="collapse"
      :style="bodyHeight ? `--panel-body-height: ${bodyHeight}` : ''"
    >
      <template #header>
        <div class="panel-header-left">
          <hl-icon size="lg">
            <svg viewBox="0 0 27 16" xmlns="http://www.w3.org/2000/svg">
              <g stroke="none" stroke-width="1" fill="#71F8FC" fill-rule="evenodd">
                <polygon points="23.6666667 0 27 0 19.3333333 16 16 16" />
                <polygon fill-opacity="0.7" points="15.6666667 0 19 0 11.3333333 16 8 16" />
                <polygon fill-opacity="0.4" points="7.66666667 0 11 0 3.33333333 16 5.69405634e-14 16" />
              </g>
            </svg>
          </hl-icon>
        </div>
        <h2 class="panel-title">
          <slot name="title">
            {{ title }}
          </slot>
        </h2>
        <div class="panel-header-right">
          <slot name="action"></slot>
        </div>
      </template>
      <slot></slot>
    </hl-panel>
    <hl-group
      v-if="isHovering() && (collapsable || sizes?.length)"
      dir="vertical"
      gap-y="var(--xxs)"
      :class="['action-bar', actionBarDir]"
      @mouseenter="enter()"
      @mouseleave="leave()"
    >
      <div class="icon-wrapper">
        <hl-icon v-if="collapsable" size="sm" class="cursor-pointer" @click="changeStatus">
          <fill-maximize2 v-if="!collapse" />
          <fill-minimize2 v-else />
        </hl-icon>
      </div>
      <hl-group
        v-if="sizes?.length && !collapse"
        class="size-options font-lg"
        dir="vertical"
        gap-y="var(--xxs)"
        align="items-middle"
      >
        <span
          v-for="s in sizes"
          :key="s"
          :class="{'active': currentSize === s}"
          @click="changeSize(s)"
        >
          {{ s }}
        </span>
      </hl-group>
    </hl-group>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { HlPanel, HlIcon, HlGroup } from 'hongluan-ui'
import { FillMaximize2, FillMinimize2 } from '@hongluan-ui/icons'
import { useHovering } from 'hongluan-hooks'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'VPanel',
  components: { HlPanel, HlIcon, HlGroup, FillMaximize2, FillMinimize2 },
  props: {
    title: {
      type: String,
      default: '',
    },
    bodyHeight: {
      type: String,
      default: '',
    },
    actionBarDir: {
      type: String as PropType<'left' | 'right'>,
      default: 'right',
    },
    collapsable: Boolean,
    sizes: Array,
    defaultSize: String,
  },
  emits: ['size-change', 'collapse-change'],
  setup(props, { emit }) {
    const collapse = ref(false)
    const currentSize = ref(props.defaultSize ?? (props.sizes?.[0] ?? ''))

    const { enter, leave, isHovering } = useHovering()

    const changeStatus = () => {
      collapse.value = !collapse.value
      emit('collapse-change', collapse.value)
    }
    const changeSize = (size: string) => {
      currentSize.value = size
      emit('size-change', size)
    }

    watch(() => props.defaultSize, val => {
      currentSize.value = val
    })

    return {
      collapse,
      currentSize,
      changeStatus,
      changeSize,
      enter,
      leave,
      isHovering,
    }
  },
})
</script>
