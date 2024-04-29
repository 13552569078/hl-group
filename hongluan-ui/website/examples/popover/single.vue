<template>
  <div>
    <hl-button
      v-for="i in 3"
      :key="i"
      class="m-r-md"
      @mouseover="(e) => (buttonRef = e.currentTarget)"
      @click="visible = !visible"
    >
      Click to open tooltip
    </hl-button>
  </div>

  <hl-popover
    ref="tooltipRef"
    :visible="visible"
    :popper-options="{
      modifiers: [
        {
          name: 'computeStyles',
          options: {
            adaptive: false,
            enabled: false,
          },
        },
      ],
    }"
    :virtual-ref="buttonRef"
    virtual-triggering
    trigger="click"
    popper-class="singleton-tooltip"
  >
    <span> Some content </span>
  </hl-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'


const buttonRef = ref()
const tooltipRef = ref()

const visible = ref(false)

</script>

