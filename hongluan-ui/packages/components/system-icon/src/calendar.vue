<template>
  <component :is="CustomIcon" v-if="CustomIcon" />
  <svg
    v-else
    viewBox="0 0 22 22"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    name="SystemCalendar"
    class="icon-system"
    :style="{
      '--stroke-width': borderWidth,
      '--fill-opacity': opacity,
    }"
  >
    <defs v-if="gradient">
      <linearGradient
        id="calendar"
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
    <g :stroke="gradient ? 'url(#calendar)' : 'currentColor'">
      <path d="M3.4,3 L18.6,3 C19.649341,3 20.5,3.84568436 20.5,4.88888889 L20.5,18.1111111 C20.5,19.1543156 19.649341,20 18.6,20 L3.4,20 C2.35065898,20 1.5,19.1543156 1.5,18.1111111 L1.5,4.88888889 C1.5,3.84568436 2.35065898,3 3.4,3 Z M6.5,1 L6.5,5 M15.5,1 L15.5,5 M1.5,8 L20.5,8 M3.5,3 L18.5,3 C19.6045695,3 20.5,3.8954305 20.5,5 L20.5,8 L20.5,8 L1.5,8 L1.5,5 C1.5,3.8954305 2.3954305,3 3.5,3 Z" />
    </g>
  </svg>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useCustomIcon } from './use-custom'

export default defineComponent({
  name: 'SystemCalendar',
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
    const { CustomIcon } = useCustomIcon('SystemCalendar')
    return {
      CustomIcon,
    }
  },
})
</script>
