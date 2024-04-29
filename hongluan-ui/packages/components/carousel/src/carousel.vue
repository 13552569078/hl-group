<template>
  <div
    ref="root"
    :class="carouselClasses"
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave"
  >
    <div class="carousel-container" :style="{ height: height, width: showMultiple ? containerWidth : ''}">
      <transition v-if="arrowDisplay" name="carousel-arrow-left">
        <button
          v-show="(arrow === 'always' || data.hover) && (props.loop || data.activeIndex > 0)"
          type="button"
          class="carousel-arrow left"
          @mouseenter="handleButtonEnter('left')"
          @mouseleave="handleButtonLeave"
          @click.stop="throttledArrowClick(data.activeIndex - 1, 'previous')"
        >
          <hl-icon>
            <system-arrow-left />
          </hl-icon>
        </button>
      </transition>
      <transition v-if="arrowDisplay" name="carousel-arrow-right">
        <button
          v-show="(arrow === 'always' || data.hover) && (props.loop || data.activeIndex < items.length - 1)"
          type="button"
          class="carousel-arrow right"
          @mouseenter="handleButtonEnter('right')"
          @mouseleave="handleButtonLeave"
          @click.stop="throttledArrowClick(data.activeIndex + 1, 'next')"
        >
          <hl-icon>
            <system-arrow-right />
          </hl-icon>
        </button>
      </transition>
      <slot></slot>
    </div>
    <div v-if="indicatorPosition !== 'none' && !showMultiple" :class="indicatorsClasses">
      <template v-if="indicatorType !== 'custom'">
        <div
          v-for="(item, index) in items"
          :key="index"
          :class="[
            'carousel-indicator',
            'carousel-indicator-' + direction,
            {'is-active': index === data.activeIndex },
          ]"
          @mouseenter="throttledIndicatorHover(index)"
          @click.stop="handleIndicatorClick(index)"
        >
          <button :class="indicatorsButtonClasses">
            <span v-if="hasLabel">{{ item.props.label }}</span>
          </button>
        </div>
      </template>
      <slot name="indicator"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  computed,
  ref,
  provide,
  onMounted,
  onBeforeUnmount,
  watch,
  nextTick,
  toRef,
  shallowRef,
  getCurrentInstance,
} from 'vue'
import { throttle } from 'lodash-unified'
import { useResizeObserver } from '@vueuse/core'
import { useNamespace, useOrderedChildren } from '@hongluan-ui/hooks'
import { debugWarn } from '@hongluan-ui/utils/error'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemArrowLeft,SystemArrowRight } from '@hongluan-ui/components/system-icon'
import { carouselContextKey, carouselIndicatorContextKey } from '@hongluan-ui/tokens'
import { carouselProps } from './carousel'

import type { CarouselItemContext } from '@hongluan-ui/tokens'

export default defineComponent({
  name: 'Carousel',
  components: {
    HlIcon,
    SystemArrowLeft,
    SystemArrowRight,
  },
  props: carouselProps,
  emits: ['change'],
  setup(props, { emit }) {
    const { namespace } = useNamespace('carousel')
    const {
      children: items,
      addChild,
      removeChild: removeItem,
    } = useOrderedChildren<CarouselItemContext>(
      getCurrentInstance()!,
      'CarouselItem',
    )

    // data
    const data = reactive<{
      activeIndex: number
      containerWidth: number
      timer: null | ReturnType<typeof setInterval>
      hover: boolean
      itemsIndexArray: Array<number>
      throttledArrowDirection: string
      itemsWidthUnit: string
    }>({
      activeIndex: -1,
      containerWidth: 0,
      timer: null,
      hover: false,
      itemsIndexArray :[],
      throttledArrowDirection: '',
      itemsWidthUnit: Number.isNaN(+props.itemsWidth) ? String(props.itemsWidth).replace(/[^a-zA-Z]/g,'') : 'px',//非数字获取单位
    })

    // refs
    const root = ref(null)

    // computed
    const arrowDisplay = computed(
      () => props.arrow !== 'never' && props.direction !== 'vertical',
    )
    // 可视区域是否显示多张
    const showMultiple = computed(() => {
      let state = props.itemsNumber !== 1 && props.direction === 'horizontal' && props.type !== 'card' && items.value.length - 2 >= props.itemsNumber ? true : false
      return state
    })
    // 计算itemsWidth
    const containerWidth = computed(() => {
      return props.itemsNumber * Number.parseFloat(String(props.itemsWidth)) + data.itemsWidthUnit
    })

    const hasLabel = computed(() => {
      return items.value.some(item => item.props.label.toString().length > 0)
    })

    const carouselClasses = computed(() => {
      const classes = [namespace.value, 'carousel-' + props.direction]
      if (props.type === 'card') {
        classes.push('carousel-card')
      }
      return classes
    })

    const indicatorsClasses = computed(() => {
      const classes = [
        'carousel-indicators',
        'carousel-indicators-' + props.direction,
        'carousel-indicators-' + props.indicatorType,
      ]
      if (hasLabel.value) {
        classes.push('carousel-indicators-labels')
      }
      if (props.indicatorPosition === 'outside' || props.type === 'card') {
        classes.push('carousel-indicators-outside')
      }
      return classes
    })

    const indicatorsButtonClasses = computed(() => {
      const classes = props.indicatorType === 'line' ? 'carousel-button' : 'carousel-dot'
      return classes
    })

    // methods
    function getitemsIndexArray() {
      // 多张显示时，拼索引数组，用索引计算移动距离
      let array = []
      for(let i = 0 ;i < Number(items.value.length - 1 ); i++) {
        array.push(i)
      }
      array.push(-1)
      return showMultiple.value ? array : []
    }

    const throttledArrowClick = throttle(
      (index, direction) => {
        data.throttledArrowDirection = direction
        if (showMultiple.value){
          data.itemsIndexArray = data.itemsIndexArray.map(itx => {
            if (itx === items.value.length - 2 && direction === 'previous') itx = -2
            if (itx === -1 && direction === 'next') itx = items.value.length - 1
            direction === 'previous' ? itx += 1 : itx -= 1
            return itx
          })
        }
        setActiveItem(index)
      },
      300,
      { trailing: true },
    )
    const throttledIndicatorHover = throttle(index => {
      handleIndicatorHover(index)
    }, 300)

    function pauseTimer() {
      if (data.timer) {
        clearInterval(data.timer)
        data.timer = null
      }
    }

    function startTimer() {
      if (props.interval <= 0 || !props.autoplay || data.timer) return
      data.timer = setInterval(() => playSlides(), props.interval)
    }

    const playSlides = () => {
      if (data.activeIndex < items.value.length - 1) {
        data.activeIndex = data.activeIndex + 1
      } else if (props.loop) {
        data.activeIndex = 0
      }
      showMultiple.value && throttledArrowClick(data.activeIndex + 1, 'next')
    }

    function setActiveItem(index: number | string) {
      if (typeof index === 'string') {
        const filteredItems = items.value.filter(item => item.props.name === index)
        if (filteredItems.length > 0) {
          index = items.value.indexOf(filteredItems[0])
        }
      }
      index = Number(index)
      if (Number.isNaN(index) || index !== Math.floor(index)) {
        debugWarn('Carousel', 'index must be an integer.')
        return
      }
      let length = items.value.length
      const oldIndex = data.activeIndex
      if (index < 0) {
        data.activeIndex = props.loop ? length - 1 : 0
      } else if (index >= length) {
        data.activeIndex = props.loop ? 0 : length - 1
      } else {
        data.activeIndex = index
      }
      if (oldIndex === data.activeIndex) {
        resetItemPosition(oldIndex)
      }
      resetTimer()
    }

    function resetItemPosition(oldIndex?: number) {
      const itemWidth = Number.parseFloat(String(props.itemsWidth))
      items.value.forEach((item, index) => {
        let itemsDistance = showMultiple.value ? itemWidth * data.itemsIndexArray[index] : 0
        let isAnimating = data.throttledArrowDirection === 'next' ?
          data.itemsIndexArray[index] === props.itemsNumber + 1 ? false : true
          : itemWidth * data.itemsIndexArray[index] === -itemWidth ? false : true
        item.translateItem(index, data.activeIndex, oldIndex, itemsDistance ,isAnimating)
      })
    }

    function addItem(item: CarouselItemContext) {
      addChild(item)
      data.itemsIndexArray = getitemsIndexArray()
    }

    function itemInStage(item: CarouselItemContext, index: number) {
      const length = items.value.length
      if (
        (index === length - 1 && item.states.inStage && items.value[0].states.active) ||
        (item.states.inStage &&
          items.value[index + 1] &&
          items.value[index + 1].states.active)
      ) {
        return 'left'
      } else if (
        (index === 0 && item.states.inStage && items.value[length - 1].states.active) ||
        (item.states.inStage &&
          items.value[index - 1] &&
          items.value[index - 1].states.active)
      ) {
        return 'right'
      }
      return false
    }

    function handleMouseEnter() {
      data.hover = true
      if (props.pauseOnHover) {
        pauseTimer()
      }
    }

    function handleMouseLeave() {
      data.hover = false
      startTimer()
    }

    function handleButtonEnter(arrow: 'left' | 'right') {
      if (props.direction === 'vertical') return
      items.value.forEach((item, index) => {
        if (arrow === itemInStage(item, index)) {
          item.states.hover = true
        }
      })
    }

    function handleButtonLeave() {
      if (props.direction === 'vertical') return
      items.value.forEach(item => {
        item.states.hover = false
      })
    }

    function handleIndicatorClick(index: number) {
      data.activeIndex = index
    }

    function handleIndicatorHover(index: number) {
      if (props.trigger === 'hover' && index !== data.activeIndex) {
        data.activeIndex = index
      }
    }

    function prev() {
      setActiveItem(data.activeIndex - 1)
    }

    function next() {
      setActiveItem(data.activeIndex + 1)
    }

    function resetTimer() {
      pauseTimer()
      startTimer()
    }

    // watch
    watch(
      () => data.activeIndex,
      (current, prev) => {
        resetItemPosition(prev)
        if (prev > -1) {
          emit('change', current, prev)
        }
      },
    )
    watch(
      () => props.autoplay,
      current => {
        current ? startTimer() : pauseTimer()
      },
    )
    watch(
      () => props.loop,
      () => {
        setActiveItem(data.activeIndex)
      },
    )

    watch(
      () => props.interval,
      () => {
        resetTimer()
      },
    )

    watch(
      () => items.value,
      () => {
        if (items.value.length > 0) setActiveItem(props.initialIndex)
      },
    )

    const resizeObserver = shallowRef<ReturnType<typeof useResizeObserver>>()
    // lifecycle
    onMounted(() => {

      resizeObserver.value = useResizeObserver(root.value, () => {
        resetItemPosition()
      })
      startTimer()
    })

    onBeforeUnmount(() => {
      pauseTimer()
      if (root.value && resizeObserver.value) resizeObserver.value.stop()
    })

    // provide
    provide(carouselContextKey, {
      root,
      direction: props.direction,
      type: props.type,
      items,
      loop: props.loop,
      addItem,
      removeItem,
      setActiveItem,
      showMultiple: toRef(showMultiple,'value'),
      itemsWidth: props.itemsWidth,
      itemsWidthUnit: data.itemsWidthUnit,
    })

    provide(carouselIndicatorContextKey, {
      activeIndex: toRef(data,'activeIndex'),
      handleIndicatorClick,
      throttledIndicatorHover,
    })

    return {
      data,
      props,
      items,

      arrowDisplay,
      carouselClasses,
      indicatorsClasses,
      indicatorsButtonClasses,
      hasLabel,
      containerWidth,
      showMultiple,

      handleMouseEnter,
      handleMouseLeave,
      handleIndicatorClick,
      throttledArrowClick,
      throttledIndicatorHover,
      handleButtonEnter,
      handleButtonLeave,

      prev,
      next,
      setActiveItem,

      root,
    }
  },

})
</script>
