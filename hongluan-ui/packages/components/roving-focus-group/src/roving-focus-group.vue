<template>
  <hl-focus-group-collection>
    <hl-roving-focus-group-impl v-bind="$attrs">
      <slot></slot>
    </hl-roving-focus-group-impl>
  </hl-focus-group-collection>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HlRovingFocusGroupImpl from './roving-focus-group-impl.vue'
import { HlCollection as HlFocusGroupCollection } from './roving-focus-group'

export default defineComponent({
  name: 'RovingFocusGroup',
  components: {
    HlFocusGroupCollection,
    HlRovingFocusGroupImpl,
  },
})
</script>
