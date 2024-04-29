<template>
  <div
    v-show="data.ready"
    :class="[
      namespace,
      {
        'is-active': data.active,
        'carousel-item-card': type === 'card',
        'is-in-stage': data.inStage,
        'is-hover': data.hover,
        'is-animating': data.animating,
      }]"
    :style="itemStyle"
    @click="handleItemClick"
  >
    <div
      v-if="type === 'card'"
      v-show="!data.active"
      class="carousel-mask"
    ></div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted, inject, computed, toRefs, getCurrentInstance, onUnmounted } from 'vue'
import { debugWarn } from '@hongluan-ui/utils'
import { useNamespace } from '@hongluan-ui/hooks'
import { carouselContextKey } from '@hongluan-ui/tokens'
import { carouselItemProps } from './carousel-item'

import type { CarouselItemStates } from '@hongluan-ui/tokens'

const CARD_SCALE = 0.83
const COMPONENT_NAME = 'CarouselItem'
export default defineComponent({
  name: 'CarouselItem',
  props: carouselItemProps,
  setup(props) {
    const { namespace } = useNamespace('carousel-item')

    // inject
    const carouselContext = inject(carouselContextKey)
    // instance
    const instance = getCurrentInstance()
    if (!carouselContext) {
      debugWarn(
        COMPONENT_NAME,
        'usage: <hl-carousel></hl-carousel-item></hl-carousel>',
      )
    }

    if (!instance) {
      debugWarn(
        COMPONENT_NAME,
        'compositional hook can only be invoked inside setups',
      )
    }

    // data
    const data = reactive<CarouselItemStates>({
      hover: false,
      translate: 0,
      scale: 1,
      active: false,
      ready: false,
      inStage: false,
      animating: false,
    })

    // computed
    const parentDirection = computed(() => {
      return carouselContext.direction
    })

    const itemStyle = computed(() => {
      const translateType =
        parentDirection.value === 'vertical' ? 'translateY' : 'translateX'
      const value = `${translateType}(${data.translate}${carouselContext.itemsWidthUnit}) scale(${data.scale})`
      const style = {
        transform: value,
        width: carouselContext.showMultiple.value ? Number.parseFloat(String(carouselContext.itemsWidth)) + carouselContext.itemsWidthUnit : '',
      }
      return style
    })

    // methods

    function processIndex(index: number, activeIndex: number, length: number) {
      if (activeIndex === 0 && index === length - 1) {
        return -1
      } else if (activeIndex === length - 1 && index === 0) {
        return length
      } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
        return length + 1
      } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
        return -2
      }
      return index
    }

    function calcCardTranslate(index: number, activeIndex: number) {
      const parentWidth = carouselContext.root.value?.offsetWidth || 0
      if (data.inStage) {
        return (
          (parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1)) / 4
        )
      } else if (index < activeIndex) {
        return (-(1 + CARD_SCALE) * parentWidth) / 4
      } else {
        return ((3 + CARD_SCALE) * parentWidth) / 4
      }
    }

    function calcTranslate(index: number, activeIndex: number, isVertical: boolean) {
      const distance = (isVertical ? carouselContext.root.value?.offsetHeight : carouselContext.root.value?.offsetWidth) || 0
      return distance * (index - activeIndex)
    }

    const translateItem = (
      index: number,
      activeIndex: number,
      oldIndex: number,
      distance: number,
      isAnimating: boolean,
    ) => {
      const parentType = carouselContext.type
      const length = carouselContext.items.value.length
      if (parentType !== 'card' && oldIndex !== undefined && !carouselContext.showMultiple.value) {
        data.animating = index === activeIndex || index === oldIndex
      }
      if (index !== activeIndex && length > 2 && carouselContext.loop) {
        index = processIndex(index, activeIndex, length)
      }
      if (parentType === 'card') {
        if (parentDirection.value === 'vertical') {
          debugWarn(
            'Carousel', 'vertical direction is not supported in card mode',
          )
        }
        data.inStage = Math.round(Math.abs(index - activeIndex)) <= 1
        data.active = index === activeIndex
        data.translate = calcCardTranslate(index, activeIndex)
        data.scale = data.active ? 1 : CARD_SCALE
      } else {
        if (carouselContext.showMultiple.value) {
          data.animating = isAnimating
          data.translate = distance
        } else {
          data.active = index === activeIndex
          const isVertical = parentDirection.value === 'vertical'
          data.translate = calcTranslate(index, activeIndex, isVertical)
        }
      }
      data.ready = true
    }

    function handleItemClick() {
      if (carouselContext && carouselContext.type === 'card') {
        const index = carouselContext.items.value
          .map(d => d.uid)
          .indexOf(instance.uid)
        carouselContext.setActiveItem(index)
      }
    }

    // lifecycle
    onMounted(() => {
      carouselContext.addItem({
        uid: instance.uid,
        props,
        states: data,
        translateItem,
      })
    })

    onUnmounted(() => {
      carouselContext.removeItem(instance.uid)
    })

    return {
      namespace,
      data,
      itemStyle,
      translateItem,
      type: carouselContext.type,
      handleItemClick,
    }
  },
})
</script>
