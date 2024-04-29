<template>
  <component :is="CustomIcon" v-if="CustomIcon" />
  <svg
    v-else
    viewBox="0 0 22 22"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    class="icon-system"
    name="SystemSelectArrow"
    :style="{
      '--stroke-width': borderWidth,
      '--fill-opacity': opacity,
    }"
  >
    <defs v-if="gradient">
      <linearGradient
        id="select_arrow"
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
    <g :stroke="gradient ? 'url(#select_arrow)' : 'currentColor'">
      <polyline points="4 7.5 11 14.5 18 7.5" />
    </g>
  </svg>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useCustomIcon } from './use-custom'

export default defineComponent({
  name: 'SystemSelectArrow',
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
    const { CustomIcon } = useCustomIcon('SystemSelectArrow')
    return {
      CustomIcon,
    }
  },
})
</script>
