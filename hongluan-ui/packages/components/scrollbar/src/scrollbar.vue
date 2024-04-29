<template>
  <div ref="scrollbarRef" :class="namespace">
    <div
      ref="wrapRef"
      :class="[
        wrapClass,
        'scrollbar-wrap',
        native ? '' : 'scrollbar-wrap-hidden',
      ]"
      :style="style"
      @scroll="handleScroll"
    >
      <component
        :is="tag"
        ref="resizeRef"
        :class="['scrollbar-view', viewClass]"
        :style="viewStyle"
      >
        <slot></slot>
      </component>
    </div>
    <template v-if="!native">
      <bar
        ref="barRef"
        :height="sizeHeight"
        :width="sizeWidth"
        :always="always"
        :ratio-x="ratioX"
        :ratio-y="ratioY"
      />
    </template>
  </div>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  provide,
  ref,
  watch,
  reactive,
  onUpdated,
} from 'vue'
import { useResizeObserver, useEventListener } from '@vueuse/core'
import { debugWarn, addUnit, isNumber, isObject } from '@hongluan-ui/utils'
import { useNamespace } from '@hongluan-ui/hooks'
import { scrollbarContextKey } from '@hongluan-ui/tokens'
import Bar from './bar.vue'

import { scrollbarProps } from './scrollbar'
import type { StyleValue, CSSProperties } from 'vue'

export default defineComponent({
  name: 'Scrollbar',
  components: {
    Bar,
  },
  props: scrollbarProps,
  emits: ['scroll', 'at-end'],

  setup(props, { emit }) {
    let stopResizeObserver: (() => void) | undefined = undefined
    let stopResizeListener: (() => void) | undefined = undefined
    let oldScrollTop = Number.MAX_SAFE_INTEGER

    const scrollbarRef = ref<HTMLDivElement>()
    const wrapRef = ref<HTMLDivElement>()
    const resizeRef = ref<HTMLElement>()
    const barRef = ref()

    const sizeWidth = ref('0')
    const sizeHeight = ref('0')
    const moveX = ref(0)
    const moveY = ref(0)
    const ratioY = ref(1)
    const ratioX = ref(1)
    const SCOPE = 'Scrollbar'
    const GAP = 0 // top 2 + bottom 2 of bar instance

    const style = computed<StyleValue>(() => {
      const style: CSSProperties = {}
      if (props.height) style.height = addUnit(props.height)
      if (props.maxHeight) style.maxHeight = addUnit(props.maxHeight)
      return [props.wrapStyle, style]
    })

    const handleScroll = () => {
      if (wrapRef.value) {
        barRef.value?.handleScroll(wrapRef.value)

        emit('scroll', {
          scrollTop: wrapRef.value.scrollTop,
          scrollLeft: wrapRef.value.scrollLeft,
        })

        if (wrapRef.value.scrollTop > oldScrollTop && wrapRef.value.scrollTop + wrapRef.value.offsetHeight + props.distance >= wrapRef.value.scrollHeight) {
          emit('at-end', { vertical: true })
        }
        oldScrollTop = wrapRef.value.scrollTop
      }
    }

    function scrollTo(xCord: number, yCord?: number): void
    function scrollTo(options: ScrollToOptions): void
    function scrollTo(arg1: unknown, arg2?: number) {
      if (isObject(arg1)) {
        wrapRef.value.scrollTo(arg1)
      } else if (isNumber(arg1) && isNumber(arg2)) {
        wrapRef.value.scrollTo(arg1, arg2)
      }
    }

    const setScrollTop = (value: number) => {
      if (!isNumber(value)) {
        debugWarn(SCOPE, 'value must be a number')
        return
      }
      wrapRef.value.scrollTop = value
    }

    const setScrollLeft = (value: number) => {
      if (!isNumber(value)) {
        debugWarn(SCOPE, 'value must be a number')
        return
      }
      wrapRef.value.scrollLeft = value
    }

    const update = () => {
      if (!wrapRef.value) return

      const offsetHeight = wrapRef.value.offsetHeight - GAP
      const offsetWidth = wrapRef.value.offsetWidth - GAP

      const originalHeight = offsetHeight ** 2 / wrapRef.value.scrollHeight
      const originalWidth = offsetWidth ** 2 / wrapRef.value.scrollWidth
      const height = Math.max(originalHeight, props.minSize)
      const width = Math.max(originalWidth, props.minSize)

      ratioY.value =
        originalHeight / (offsetHeight - originalHeight) / (height / (offsetHeight - height))
      ratioX.value =
        originalWidth / (offsetWidth - originalWidth) / (width / (offsetWidth - width))

      sizeHeight.value = height + GAP < offsetHeight ? `${height}px` : ''
      sizeWidth.value = width + GAP < offsetWidth ? `${width}px` : ''
    }

    watch(
      () => props.noresize,
      noresize => {
        if (noresize) {
          stopResizeObserver?.()
          stopResizeListener?.()
        } else {
          ({ stop: stopResizeObserver } = useResizeObserver(resizeRef, update))
          stopResizeListener = useEventListener('resize', update)
        }
      },
      { immediate: true },
    )

    provide(
      scrollbarContextKey,
      reactive({
        scrollbarElement: scrollbarRef,
        wrapElement: wrapRef,
      }),
    )

    onMounted(() => {
      if (!props.native) {
        nextTick(() => {
          update()
        })
      }
    })
    onUpdated(() => update())

    const { namespace } = useNamespace('scrollbar')
    return {
      namespace,
      scrollbarRef,
      wrapRef,
      resizeRef,
      barRef,

      moveX,
      moveY,
      ratioX,
      ratioY,
      sizeWidth,
      sizeHeight,
      style,
      update,
      handleScroll,
      setScrollTop,
      setScrollLeft,
      scrollTo,
    }
  },
})
</script>
