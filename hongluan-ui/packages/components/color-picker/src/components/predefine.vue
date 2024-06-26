<template>
  <hl-group class="predefine" wrap gap="var(--xxs)">
    <div
      v-for="(item, index) in rgbaColors"
      :key="colors[index]"
      class="predefine-item"
      :class="{ 'is-selected': item.selected }"
      @click="handleSelect(index)"
    >
      <div :style="{ backgroundColor: item.value }"></div>
    </div>
  </hl-group>
</template>

<script lang="ts">
import { defineComponent, inject, ref, watch, watchEffect } from 'vue'
import HlGroup from '@hongluan-ui/components/group'
import { colorPickerContextKey } from '../color-picker'
import Color from '../utils/color'

import type { PropType, Ref } from 'vue'

export default defineComponent({
  components: { HlGroup },
  props: {
    colors: {
      type: Array as PropType<string[]>,
      required: true,
    },
    color: {
      type: Object as PropType<Color>,
      required: true,
    },
  },
  setup(props) {
    const { currentColor } = inject(colorPickerContextKey)!

    const rgbaColors = ref(parseColors(props.colors, props.color)) as Ref<Color[]>

    watch(
      () => currentColor.value,
      val => {
        const color = new Color()
        color.fromString(val)

        rgbaColors.value.forEach(item => {
          item.selected = color.compare(item)
        })
      },
    )
    watchEffect(() => {
      rgbaColors.value = parseColors(props.colors, props.color)
    })

    function handleSelect(index: number) {
      props.color.fromString(props.colors[index])
    }
    function parseColors(colors: string[], color: Color) {
      return colors.map(value => {
        const c = new Color()
        c.enableAlpha = true
        c.format = 'rgba'
        c.fromString(value)
        c.selected = c.value === color.value
        return c
      })
    }
    return {
      rgbaColors,
      handleSelect,
    }
  },
})
</script>
