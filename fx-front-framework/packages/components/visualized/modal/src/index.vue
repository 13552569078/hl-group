<template>
  <!-- 面板内容 begin-->
  <hl-panel class="page-panel" :body-padding="bodyPadding" borderless :style="[bodyHeight ? `--panel-body-height: ${bodyHeight}` : '', width ? `width: ${width}` : '']">
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
        <hl-icon v-if="showClose" @click="$emit('close')">
          <two-close />
        </hl-icon>
      </div>
    </template>
    <slot></slot>
  </hl-panel>
  <!-- 面板内容 end-->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { HlPanel, HlIcon } from 'hongluan-ui'
import { TwoClose } from '@hongluan-ui/icons'

export default defineComponent({
  name: 'VModal',
  components: { HlPanel, HlIcon, TwoClose },
  props: {
    title: {
      type: String,
      default: '',
    },
    width: {
      type: String,
      default: '',
    },
    bodyHeight: {
      type: String,
      default: '',
    },
    bodyPadding: {
      type: String,
      default: '',
    },
    showClose: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['close'],
  setup() {
    return {}
  },
})
</script>
