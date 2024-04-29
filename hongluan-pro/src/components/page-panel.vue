<template>
  <hl-panel class="page-panel">
    <template #header>
      <div class="panel-title"><h4>{{ title }}</h4></div>
      <div class="panel-header-right">
        <hl-button no-fill equal>
          <template #icon>
            <hl-icon><two-more /></hl-icon>
          </template>
        </hl-button>
      </div>
    </template>
    <slot></slot>
  </hl-panel>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: [String, Number],
  },
})
</script>

