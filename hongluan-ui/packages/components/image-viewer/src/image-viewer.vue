<template>
  <teleport to="body" :disabled="!teleported">
    <transition name="viewer-fade">
      <div
        ref="wrapper"
        :tabindex="-1"
        :class="namespace"
        :style="{ zIndex: computedZIndex }"
      >
        <div
          class="image-viewer-mask"
          @click.self="hideOnClickModal && hide()"
        ></div>

        <!-- ACTIONS -->
        <hl-group gap="var(--sm)" align="items-middle items-around" class="image-viewer-tools">
          <hl-group v-if="$slots['tools-before']" class="tools-group">
            <slot name="tools-before" :index="activeIndex"></slot>
          </hl-group>
          <hl-group gap="var(--xs)" class="tools-group">
            <hl-icon @click="handleActions('zoomOut')">
              <system-zoom-out />
            </hl-icon>
            <hl-icon @click="handleActions('zoomIn')">
              <system-zoom-in />
            </hl-icon>
            <hl-icon name="Refresh" @click="handleActions('anticlockwise')">
              <system-refresh />
            </hl-icon>
            <hl-icon @click="toggleMode">
              <system-maximize v-if="mode.icon === 'Maximize'" />
              <system-minimize v-if="mode.icon === 'Minimize'" />
            </hl-icon>
          </hl-group>
          <hl-group v-if="!isSingle" gap="var(--xs)" class="tools-group">
            <hl-icon :class="{ 'is-disabled': !infinite && isFirst }" @click="prev">
              <system-arrow-left />
            </hl-icon>
            <hl-icon :class="{ 'is-disabled': !infinite && isLast }" @click="next">
              <system-arrow-right />
            </hl-icon>
          </hl-group>
          <hl-group class="tools-group">
            <hl-icon @click="hide">
              <system-close />
            </hl-icon>
          </hl-group>
          <hl-group v-if="$slots['tools-after']" class="tools-group">
            <slot name="tools-after" :index="activeIndex"></slot>
          </hl-group>
        </hl-group>
        <!-- CANVAS -->
        <div class="image-viewer-canvas">
          <img
            v-for="(url, i) in urlList"
            v-show="i === activeIndex"
            :ref="(el) => (imgRefs[i] = el)"
            :key="url"
            :src="url"
            :style="imgStyle"
            class="image-viewer-img"
            @load="handleImgLoad"
            @error="handleImgError"
            @mousedown="handleMouseDown"
          >
        </div>
        <slot></slot>
      </div>
    </transition>
  </teleport>
</template>

<script lang='ts'>
import { defineComponent, computed, ref, onMounted, watch, nextTick, effectScope, shallowRef } from 'vue'
import { isNumber, useEventListener } from '@vueuse/core'
import { throttle } from 'lodash-unified'
import { keysOf } from '@hongluan-ui/utils'
import { EVENT_CODE } from '@hongluan-ui/constants'
import { useLocale, useNamespace, useZIndex } from '@hongluan-ui/hooks'
import HlIcon from '@hongluan-ui/components/icon'
import HlGroup from '@hongluan-ui/components/group'
import {
  SystemClose,
  SystemArrowLeft,
  SystemArrowRight,
  SystemZoomIn,
  SystemZoomOut,
  SystemRefresh,
  SystemMaximize,
  SystemMinimize,
} from '@hongluan-ui/components/system-icon'
import { imageViewerProps } from './image-viewer'

import type { CSSProperties } from 'vue'
import type { ImageViewerAction, ImageViewerMode } from './image-viewer'

const modes: Record<'CONTAIN' | 'ORIGINAL', ImageViewerMode> = {
  CONTAIN: {
    name: 'contain',
    icon: 'Maximize',
  },
  ORIGINAL: {
    name: 'original',
    icon: 'Minimize',
  },
}

export default defineComponent({
  name: 'ImageViewer',
  components: {
    HlIcon,
    HlGroup,
    SystemClose,
    SystemArrowLeft,
    SystemArrowRight,
    SystemZoomIn,
    SystemZoomOut,
    SystemRefresh,
    SystemMaximize,
    SystemMinimize,
  },
  props: imageViewerProps,
  emits: ['close', 'switch'],

  setup(props, { emit }) {
    const { namespace } = useNamespace('image-viewer')
    const { nextZIndex } = useZIndex()

    const { t } = useLocale()
    const wrapper = ref<HTMLDivElement>()
    const imgRefs = ref<HTMLImageElement[]>([])

    const scopeEventListener = effectScope()

    const loading = ref(true)
    const activeIndex = ref(props.initialIndex)
    const mode = shallowRef<ImageViewerMode>(modes.CONTAIN)

    const transform = ref({
      scale: 1,
      deg: 0,
      offsetX: 0,
      offsetY: 0,
      enableTransition: false,
    })

    const isSingle = computed(() => {
      const { urlList } = props
      return urlList.length <= 1
    })

    const isFirst = computed(() => {
      return activeIndex.value === 0
    })

    const isLast = computed(() => {
      return activeIndex.value === props.urlList.length - 1
    })

    const currentImg = computed(() => {
      return props.urlList[activeIndex.value]
    })

    const imgStyle = computed(() => {
      const { scale, deg, offsetX, offsetY, enableTransition } = transform.value
      let translateX = offsetX / scale
      let translateY = offsetY / scale

      switch (deg % 360) {
        case 90:
        case -270:
          [translateX, translateY] = [translateY, -translateX]
          break
        case 180:
        case -180:
          [translateX, translateY] = [-translateX, -translateY]
          break
        case 270:
        case -90:
          [translateX, translateY] = [-translateY, translateX]
          break
      }
      const style: CSSProperties = {
        transform: `scale(${scale}) rotate(${deg}deg) translate(${translateX}px, ${translateY}px)`,
        transition: enableTransition ? 'transform .3s' : '',
      }
      if (mode.value.name === modes.CONTAIN.name) {
        style.maxWidth = style.maxHeight = '100%'
      }
      return style
    })

    const computedZIndex = computed(() => {
      return isNumber(props.zIndex) ? props.zIndex : nextZIndex()
    })

    function hide() {
      unregisterEventListener()
      emit('close')
    }

    function registerEventListener() {
      const keydownHandler = throttle((e: KeyboardEvent) => {
        switch (e.code) {
          // ESC
          case EVENT_CODE.esc:
            hide()
            break
          // SPACE
          case EVENT_CODE.space:
            toggleMode()
            break
          // LEFT_ARROW
          case EVENT_CODE.left:
            prev()
            break
          // UP_ARROW
          case EVENT_CODE.up:
            handleActions('zoomIn')
            break
          // RIGHT_ARROW
          case EVENT_CODE.right:
            next()
            break
          // DOWN_ARROW
          case EVENT_CODE.down:
            handleActions('zoomOut')
            break
        }
      })

      const mousewheelHandler = throttle((e: WheelEvent) => {
        const delta = e.deltaY || e.deltaX
        handleActions(delta < 0 ? 'zoomIn' : 'zoomOut', {
          zoomRate: props.zoomRate,
          enableTransition: false,
        })
      })


      scopeEventListener.run(() => {
        useEventListener(document, 'keydown', keydownHandler)
        useEventListener(document, 'wheel', mousewheelHandler)
      })
    }

    function unregisterEventListener() {
      scopeEventListener.stop()
    }

    function handleImgLoad() {
      loading.value = false
    }

    function handleImgError(e: Event) {
      loading.value = false
      ;(e.target as HTMLImageElement).alt = t('hl.image.error')
    }

    function handleMouseDown(e: MouseEvent) {
      if (loading.value || e.button !== 0 || !wrapper.value) return
      transform.value.enableTransition = false

      const { offsetX, offsetY } = transform.value
      const startX = e.pageX
      const startY = e.pageY

      const dragHandler = throttle((ev: MouseEvent) => {
        transform.value = {
          ...transform.value,
          offsetX: offsetX + ev.pageX - startX,
          offsetY: offsetY + ev.pageY - startY,
        }
      })
      const removeMousemove = useEventListener(
        document,
        'mousemove',
        dragHandler,
      )
      useEventListener(document, 'mouseup', () => {
        removeMousemove()
      })

      e.preventDefault()
    }

    function reset() {
      transform.value = {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false,
      }
    }

    function toggleMode() {
      if (loading.value) return

      const modeNames = keysOf(modes)
      const modeValues = Object.values(modes)
      const currentMode = mode.value.name
      const index = modeValues.findIndex(i => i.name === currentMode)
      const nextIndex = (index + 1) % modeNames.length
      mode.value = modes[modeNames[nextIndex]]

      reset()
    }

    function setActiveItem(index: number) {
      const len = props.urlList.length
      activeIndex.value = (index + len) % len
    }

    function prev() {
      if (isFirst.value && !props.infinite) return
      setActiveItem(activeIndex.value - 1)
    }

    function next() {
      if (isLast.value && !props.infinite) return
      setActiveItem(activeIndex.value + 1)
    }

    function handleActions(action: ImageViewerAction, options = {}) {
      if (loading.value) return
      const { zoomRate, rotateDeg, enableTransition } = {
        zoomRate: props.zoomRate,
        rotateDeg: 90,
        enableTransition: true,
        ...options,
      }
      switch (action) {
        case 'zoomOut':
          if (transform.value.scale > 0.2) {
            transform.value.scale = Number.parseFloat(
              (transform.value.scale / zoomRate).toFixed(3),
            )
          }
          break
        case 'zoomIn':
          if (transform.value.scale < 7) {
            transform.value.scale = Number.parseFloat(
              (transform.value.scale * zoomRate).toFixed(3),
            )
          }
          break
        case 'clockwise':
          transform.value.deg += rotateDeg
          break
        case 'anticlockwise':
          transform.value.deg -= rotateDeg
          break
      }
      transform.value.enableTransition = enableTransition
    }

    watch(currentImg, () => {
      nextTick(() => {
        const $img = imgRefs.value[0]
        if (!$img?.complete) {
          loading.value = true
        }
      })
    })

    watch(activeIndex, val => {
      reset()
      emit('switch', val)
    })

    onMounted(() => {
      registerEventListener()
      // add tabindex then wrapper can be focusable via Javascript
      // focus wrapper so arrow key can't cause inner scroll behavior underneath
      wrapper.value?.focus?.()
    })

    return {
      namespace,
      activeIndex,
      wrapper,
      imgRefs,
      isSingle,
      isFirst,
      isLast,
      currentImg,
      imgStyle,
      mode,
      computedZIndex,
      handleActions,
      prev,
      next,
      hide,
      toggleMode,
      setActiveItem,
      handleImgLoad,
      handleImgError,
      handleMouseDown,
    }
  },
})
</script>
