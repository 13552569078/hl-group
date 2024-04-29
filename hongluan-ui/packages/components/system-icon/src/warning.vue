<template>
  <component :is="CustomIcon" v-if="CustomIcon" />
  <svg
    v-else
    viewBox="0 0 22 22"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    class="icon-system"
    name="SystemWarning"
    :style="{
      '--stroke-width': borderWidth,
      '--fill-opacity': opacity,
    }"
  >
    <defs v-if="gradient">
      <linearGradient
        id="warning"
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
    <g :stroke="gradient ? 'url(#warning)' : 'currentColor'">
      <path d="M10.135496,2.98793701 L1.1413783,17.9928438 C0.857533791,18.4663823 1.01451889,19.0784556 1.49201433,19.3599479 C1.64751279,19.4516171 1.82506242,19.5 2.00596028,19.5 L19.9941956,19.5 C20.549686,19.5 21,19.0534178 21,18.5025307 C21,18.323132 20.9512128,18.1470537 20.8587776,17.9928438 L11.8646599,2.98793701 C11.5808154,2.51439857 10.9636274,2.35871441 10.486132,2.6402067 C10.3418221,2.72528002 10.2212802,2.84482302 10.135496,2.98793701 Z M11,9 L11,12 M11,15.5 L11.01,15.5" />
    </g>
  </svg>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useCustomIcon } from './use-custom'

export default defineComponent({
  name: 'SystemWarning',
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
    const { CustomIcon } = useCustomIcon('SystemWarning')
    return {
      CustomIcon,
    }
  },
})
</script>
