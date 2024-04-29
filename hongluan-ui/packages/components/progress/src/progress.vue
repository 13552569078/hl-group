<template>
  <div
    ref="progressRef"
    :class="[
      namespace,
      !showText ? 'no-label' : '',
      round ? 'round' : '',
      align ? align : '',
      showAs
    ]"
  >
    <slot v-if="showAs === 'line'" v-bind="slotData">
      <div class="progress-content">
        <span class="progress-label">{{ text }}</span>
        <span class="progress-percentage">{{ content }}</span>
      </div>
    </slot>
    <template v-if="showAs === 'stack'">
      <div class="progress-wrap">
        <div
          v-for="(item, index) in stack"
          :key="index"
          :class="['progress-bar', item.type ? item.type : '', item.striped ? 'striped' : '', item.active ? 'is-active' : '', item.indicating ? 'indicating' : '']"
          :style="{ width: item.percentage + '%' }"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          :aria-valuenow="item.percentage"
        >
          <slot v-bind="item">
            <span class="progress-label">
              {{ item.format ? item.format(item.percentage) : `${item.percentage}%` }}
            </span>
          </slot>
        </div>
      </div>
    </template>
    <div
      v-else-if="showAs === 'circle' || showAs === 'dashboard'"
      class="progress-circle"
      :style="[
        trackColor ? `--progress-track-bg-color: ${trackColor}` : '',
      ]"
    >
      <svg viewBox="0 0 100 100">
        <path :class="['progress-circle-track', type ? type : '']" :d="trackPath" fill="none" :stroke-linecap="strokeLinecap" :style="trailPathStyle" />
        <path :class="['progress-circle-path', type ? type : '']" :d="trackPath" fill="none" :stroke-linecap="strokeLinecap" :style="circlePathStyle" />
      </svg>
      <div class="progress-content">
        <slot v-bind="slotData">
          <span class="progress-percentage">{{ content }}</span>
          <span class="progress-label">{{ text }}</span>
        </slot>
      </div>
    </div>
    <div v-else class="progress-wrap" :style="[trackColor ? `--progress-track-bg-color: ${trackColor}` : '']">
      <div
        :class="['progress-bar', type ? type : '', striped ? 'striped' : '', active ? 'is-active' : '', indicating ? 'indicating' : '']"
        :style="[barStyle, strokeWidth ? `--progress-height: ${strokeWidth}` : '']"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        :aria-valuenow="percentage"
      >
        <slot v-if="showAs !== 'line'" v-bind="slotData">
          <span class="progress-label">{{ text }}</span>
          <span class="progress-percentage">{{ content }}</span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'
import { getStyle } from '@hongluan-ui/utils'
import { progressProps } from './progress'

import type { CSSProperties } from 'vue'

export default defineComponent({
  name: 'Progress',
  props: progressProps,
  setup(props) {
    const { namespace } = useNamespace('progress')
    const progressRef = ref<HTMLElement>(null)
    const pathWidth = ref('')

    const relativeStrokeWidth = computed(() => {
      let width: number
      if (props.strokeWidth) {
        width = Number.parseFloat(String(props.strokeWidth))
      } else {
        width = Number.parseFloat(pathWidth.value)
      }
      return Number.isNaN(width) ? 0 : width
    })

    const radius = computed(() => {
      if (props.showAs === 'circle' || props.showAs === 'dashboard') {
        return Number.parseInt(`${50 - relativeStrokeWidth.value / 2}`, 10)
      } else {
        return 0
      }
    })

    const trackPath = computed(() => {
      const r = radius.value
      const isDashboard = props.showAs === 'dashboard'
      return `
          M 50 50
          m 0 ${isDashboard ? '' : '-'}${r}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? '-' : ''}${r * 2}
          a ${r} ${r} 0 1 1 0 ${isDashboard ? '' : '-'}${r * 2}
          `
    })

    const perimeter = computed(() => 2 * Math.PI * radius.value)

    const rate = computed(() => props.showAs === 'dashboard' ? 0.75 : 1)

    const strokeDashoffset = computed(() => {
      const offset = (-1 * perimeter.value * (1 - rate.value)) / 2
      return `${offset}px`
    })

    const trailPathStyle = computed<CSSProperties>(() => {
      let style = {
        strokeDasharray: `${perimeter.value * rate.value}px, ${perimeter.value}px`,
        strokeDashoffset: strokeDashoffset.value,
      }
      if (props.strokeWidth) {
        const width = Number.parseFloat(String(props.strokeWidth))
        !Number.isNaN(width) && Object.assign(style, { strokeWidth: width })
      }
      return style
    })

    const circlePathStyle = computed<CSSProperties>(() => {
      let style = {
        strokeDasharray: `${perimeter.value * rate.value * (props.percentage / 100)}px, ${perimeter.value}px`,
        strokeDashoffset: strokeDashoffset.value,
        transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease',
      }
      if (props.strokeWidth) {
        const width = Number.parseFloat(String(props.strokeWidth))
        !Number.isNaN(width) && Object.assign(style, { strokeWidth: props.percentage ? width : 0 })
      }
      if (!props.percentage) {
        Object.assign(style, { strokeWidth: 0 })
      }
      if (props.color) {
        Object.assign(style, { stroke: getCurrentColor(props.percentage) })
      }
      return style
    })

    const barStyle = computed<CSSProperties>(() => {
      return {
        width: `${props.percentage}%`,
        '--progress-bar-bg-color': getCurrentColor(props.percentage),
      }
    })

    const getCurrentColor = (percentage: number) => {
      const { color } = props
      if (typeof color === 'function') {
        return color(percentage)
      } else if (typeof color === 'string') {
        return color
      } else {
        const span = 100 / color.length
        const seriesColors = color.map((seriesColor, index) => {
          if (typeof seriesColor === 'string') {
            return {
              color: seriesColor,
              percentage: (index + 1) * span,
            }
          }
          return seriesColor
        })
        const colors = seriesColors.sort((a, b) => a.percentage - b.percentage)

        for (const color of colors) {
          if (color.percentage > percentage) return color.color
        }
        return colors[colors.length - 1]?.color
      }
    }

    const stackBarStyle = computed(percentage => {
      return {
        width: `${percentage}%`,
      }
    })

    const content = computed(() => props.format(props.percentage))

    const slotData = computed(() => {
      return {
        text: props.text,
        percentage: props.percentage,
      }
    })

    onMounted(() => {
      const path = progressRef.value.querySelector('path') as unknown as HTMLElement
      pathWidth.value = getStyle(path, 'strokeWidth')
    })

    return {
      namespace,
      progressRef,
      barStyle,
      slotData,
      content,
      stackBarStyle,
      radius,
      trackPath,
      perimeter,
      rate,
      strokeDashoffset,
      trailPathStyle,
      circlePathStyle,
    }
  },
})
</script>
