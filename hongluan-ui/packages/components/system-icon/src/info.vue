<template>
  <component :is="CustomIcon" v-if="CustomIcon" />
  <svg
    v-else
    viewBox="0 0 22 22"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    class="icon-system"
    name="SystemInfo"
    :style="{
      '--stroke-width': borderWidth,
      '--fill-opacity': opacity,
    }"
  >
    <defs v-if="gradient">
      <linearGradient
        id="info"
        x1="50%"
        y1="0%"
        x2="50%"
        y2="100%"
        gradientUnits="userSpaceOnUse"
      >
        <stop :style="{ stopColor: startColor ? startColor : 'var(--icon-start-color)' }" offset="0%" />
        <stop stop-color="currentColor" offset="100%" />
      </linearGradient>
    </defs>
    <g :stroke="gradient ? 'url(#info)' : 'currentColor'">
      <path d="M11,21 C16.5228475,21 21,16.5228475 21,11 C21,10.3293212 20.9339755,9.67406333 20.8080718,9.04037141 C20.1649528,5.80346047 17.9594709,3.12924671 15.0106393,1.83674328 C13.7829108,1.29861717 12.4263283,1 11,1 C5.4771525,1 1,5.4771525 1,11 C1,16.5228475 5.4771525,21 11,21 Z M11,11 L11,15 M11,7 L11.01,7" />
    </g>
  </svg>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useCustomIcon } from './use-custom'

export default defineComponent({
  name: 'SystemInfo',
  props: {
    gradient: {
      type: Boolean,
    },
    borderWidth: {
      type: [Number, String],
      default: '',
    },
    opacity: {
      type: [Number, String],
      default: '',
    },
    startColor: {
      type: String,
      default: '',
    },
  },
  setup() {
    const { CustomIcon } = useCustomIcon('SystemInfo')
    return {
      CustomIcon,
    }
  },
})
</script>
