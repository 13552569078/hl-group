<template>
  <div
    ref="container"
    :class="[
      namespace,
      round && 'round',
      radius && 'radius',
      bordered && 'bordered',
      effect ? effect : '',
      size,
      $attrs.class,
      type,
      full && 'full',
    ]"
    :style="$attrs.style"
  >
    <img
      v-if="imageSrc !== undefined && !hasLoadError"
      class="thumb-inner"
      v-bind="attrs"
      :src="imageSrc"
      :loading="loading"
      :style="imageStyle"
      :class="{ 'thumb-preview': preview, 'is-loading': isLoading }"
      @click="clickHandler"
      @load="handleLoad"
      @error="handleError"
    >
    <slot v-else></slot>
    <slot v-if="src && isLoading" name="placeholder">
      <hl-spinner class="thumb-placeholder" />
    </slot>
    <slot v-else-if="src && hasLoadError" name="error">
      <div class="thumb-error">{{ t('hl.image.error') }}</div>
    </slot>
    <template v-if="preview">
      <image-viewer
        v-if="showViewer"
        :z-index="zIndex"
        :initial-index="imageIndex"
        :url-list="previewSrcList"
        :infinite="infinite"
        :zoom-rate="zoomRate"
        :hide-on-click-modal="hideOnClickModal"
        :teleported="teleported"
        :close-on-press-escape="closeOnPressEscape"
        @close="closeViewer"
        @switch="switchViewer"
      >
        <div v-if="$slots.viewer">
          <slot name="viewer"></slot>
        </div>
        <template v-if="$slots['tools-after']" #tools-after="imgData">
          <slot name="tools-after" v-bind="imgData"></slot>
        </template>
        <template v-if="$slots['tools-before']" #tools-before="imgData">
          <slot name="tools-before" v-bind="imgData"></slot>
        </template>
      </image-viewer>
    </template>
  </div>
</template>

<script lang='ts'>
import {
  defineComponent,
  computed,
  ref,
  onMounted,
  watch,
  nextTick,
} from 'vue'
import { isString } from '@vue/shared'
import { isClient, useEventListener, useThrottleFn } from '@vueuse/core'
import { getScrollContainer, isInContainer, isElement } from '@hongluan-ui/utils'
import { useAttrs, useLocale, useNamespace } from '@hongluan-ui/hooks'
import ImageViewer from '@hongluan-ui/components/image-viewer'
import HlSpinner from '@hongluan-ui/components/spinner'
import { thumbProps } from './thumb'

let prevOverflow = ''

export default defineComponent({
  name: 'Thumb',
  components: {
    ImageViewer,
    HlSpinner,
  },
  inheritAttrs: false,
  props: thumbProps,
  emits: ['error', 'switch', 'close', 'load', 'show'],
  setup(props, { emit }) {
    const { namespace } = useNamespace('thumb')
    const { t } = useLocale()
    // init here
    const attrs = useAttrs()
    const imageSrc = ref<string | undefined>()
    const hasLoadError = ref(false)
    const isLoading = ref(true)

    const showViewer = ref(false)
    const container = ref<HTMLElement | null>(null)
    const _scrollContainer = ref<HTMLElement | Window>()

    const supportLoading = isClient && 'loading' in HTMLImageElement.prototype
    let stopScrollListener: (() => void) | undefined
    let stopWheelListener: (() => void) | undefined

    const imageStyle = computed<any>(() => {
      const { fit } = props
      if (isClient && fit) {
        return { objectFit: fit }
      }
      return {}
    })

    const preview = computed(() => {
      const { previewSrcList } = props
      return Array.isArray(previewSrcList) && previewSrcList.length > 0
    })
    const teleported = computed(() => {
      return props.appendToBody || props.previewTeleported
    })
    const imageIndex = computed(() => {
      const { previewSrcList, initialIndex } = props
      let previewIndex = initialIndex
      if (initialIndex > previewSrcList.length - 1) {
        previewIndex = 0
      }
      return previewIndex
    })
    const isManual = computed(() => {
      if (props.loading === 'eager') return false
      return (!supportLoading && props.loading === 'lazy') || props.lazy
    })

    const loadImage = () => {
      if (!isClient) return
      // reset status
      isLoading.value = true
      hasLoadError.value = false
      imageSrc.value = props.src
    }

    function handleLoad(event: Event) {
      isLoading.value = false
      hasLoadError.value = false
      emit('load', event)
    }

    function handleError(event: Event) {
      isLoading.value = false
      hasLoadError.value = true
      emit('error', event)
    }

    function handleLazyLoad() {
      if (isInContainer(container.value, _scrollContainer.value)) {
        loadImage()
        removeLazyLoadListener()
      }
    }

    const lazyLoadHandler = useThrottleFn(handleLazyLoad, 200)

    async function addLazyLoadListener() {
      if (!isClient) return

      await nextTick()

      const { scrollContainer } = props
      if (isElement(scrollContainer)) {
        _scrollContainer.value = scrollContainer
      } else if (isString(scrollContainer) && scrollContainer !== '') {
        _scrollContainer.value = document.querySelector<HTMLElement>(scrollContainer) ?? undefined
      } else if (container.value) {
        _scrollContainer.value = getScrollContainer(container.value)
      }

      if (_scrollContainer.value) {
        stopScrollListener = useEventListener(
          _scrollContainer,
          'scroll',
          lazyLoadHandler,
        )
        setTimeout(() => handleLazyLoad(), 100)
      }
    }

    function removeLazyLoadListener() {
      if (!isClient || !_scrollContainer.value || !lazyLoadHandler) return

      stopScrollListener?.()
      _scrollContainer.value = undefined
    }

    function wheelHandler(e: WheelEvent) {
      if (!e.ctrlKey) return

      if (e.deltaY < 0) {
        e.preventDefault()
        return false
      } else if (e.deltaY > 0) {
        e.preventDefault()
        return false
      }
    }

    function clickHandler() {
      // don't show viewer when preview is false
      if (!preview.value) return

      stopWheelListener = useEventListener('wheel', wheelHandler, {
        passive: false,
      })

      // prevent body scroll
      prevOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      showViewer.value = true
      emit('show')
    }

    function closeViewer() {
      stopWheelListener?.()
      document.body.style.overflow = prevOverflow
      showViewer.value = false
      emit('close')
    }

    function switchViewer(val: number) {
      emit('switch', val)
    }

    watch(() => props.src, () => {
      if (isManual.value) {
      // reset status
        isLoading.value = true
        hasLoadError.value = false
        removeLazyLoadListener()
        addLazyLoadListener()
      } else {
        loadImage()
      }
    })

    onMounted(() => {
      if (isManual.value) {
        nextTick(addLazyLoadListener)
      } else {
        loadImage()
      }
    })

    return {
      namespace,
      imageSrc,
      attrs,
      teleported,
      isLoading,
      hasLoadError,
      showViewer,
      imageStyle,
      preview,
      imageIndex,
      clickHandler,
      closeViewer,
      switchViewer,
      container,
      handleError,
      handleLoad,
      t,
    }
  },
})
</script>
