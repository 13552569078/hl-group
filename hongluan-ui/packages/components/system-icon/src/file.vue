<template>
  <component :is="CustomIcon" v-if="CustomIcon" />
  <svg
    v-else
    viewBox="0 0 22 22"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    class="icon-system"
    name="SystemFile"
    :style="{
      '--stroke-width': borderWidth,
      '--fill-opacity': opacity,
    }"
  >
    <defs v-if="gradient">
      <linearGradient
        id="file"
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
    <g :stroke="gradient ? 'url(#file)' : 'currentColor'">
      <path d="M3,3 C3,1.8954305 3.8954305,1 5,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,16.1715729 C19,16.7020059 18.7892863,17.2107137 18.4142136,17.5857864 L15.5857864,20.4142136 C15.2107137,20.7892863 14.7020059,21 14.1715729,21 L5,21 C3.8954305,21 3,20.1045695 3,19 L3,3 Z M19,16 L14,16 L14,21" />
    </g>
  </svg>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useCustomIcon } from './use-custom'

export default defineComponent({
  name: 'SystemFile',
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
    const { CustomIcon } = useCustomIcon('SystemFile')
    return {
      CustomIcon,
    }
  },
})
</script>
