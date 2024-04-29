<template>
  <component :is="CustomIcon" v-if="CustomIcon" />
  <svg
    v-else
    viewBox="0 0 22 22"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    class="icon-system"
    name="SystemShow"
    :style="{
      '--stroke-width': borderWidth,
      '--fill-opacity': opacity,
    }"
  >
    <defs v-if="gradient">
      <linearGradient
        id="show"
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
    <g :stroke="gradient ? 'url(#show)' : 'currentColor'">
      <path d="M1,11 C1,10 4.63636364,4 11,4 C17.3636364,4 21,10 21,11 C21,12 17.3636364,18 11,18 C4.63636364,18 1,12 1,11 Z M11,14 C12.6568542,14 14,12.6568542 14,11 C14,9.34314575 12.6568542,8 11,8 C9.34314575,8 8,9.34314575 8,11 C8,12.6568542 9.34314575,14 11,14 Z" />
    </g>
  </svg>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useCustomIcon } from './use-custom'

export default defineComponent({
  name: 'SystemShow',
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
    const { CustomIcon } = useCustomIcon('SystemShow')
    return {
      CustomIcon,
    }
  },
})
</script>
