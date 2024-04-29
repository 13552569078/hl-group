<template>
  <hl-select
    ref="select"
    :model-value="value"
    :disabled="timeDisabled"
    :clearable="clearable"
    :size="timeSize"
    :effect="effect"
    :fill="timeFill"
    :placeholder="placeholder"
    default-first-option
    :filterable="editable"
    :teleported="teleported"
    @update:model-value="(event) => $emit('update:modelValue', event)"
    @change="(event) => $emit('change', event)"
    @blur="(event) => $emit('blur', event)"
    @focus="(event) => $emit('focus', event)"
  >
    <hl-option
      v-for="item in items"
      :key="item.value"
      :label="item.value"
      :value="item.value"
      :disabled="item.disabled"
    />
    <template #prefix>
      <slot name="prefix">
        <hl-icon>
          <system-clock />
        </hl-icon>
      </slot>
    </template>
  </hl-select>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import { useConsistentProp } from '@hongluan-ui/hooks'
import HlSelect from '@hongluan-ui/components/select'
import HlOption from '@hongluan-ui/components/option'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemClock } from '@hongluan-ui/components/system-icon'
import { timeSelectProps } from './time-select'
import { compareTime, formatTime, nextTime, parseTime } from './utils'

dayjs.extend(customParseFormat)

export default defineComponent({
  name: 'TimeSelect',
  components: { HlSelect, HlOption, HlIcon, SystemClock },
  props: timeSelectProps,
  emits: ['change', 'blur', 'focus', 'update:modelValue'],
  setup(props) {
    // computed
    const select = ref<typeof HlSelect>()
    const value = computed(() => props.modelValue)
    const start = computed(() => {
      const time = parseTime(props.start)
      return time ? formatTime(time) : null
    })

    const end = computed(() => {
      const time = parseTime(props.end)
      return time ? formatTime(time) : null
    })

    const step = computed(() => {
      const time = parseTime(props.step)
      return time ? formatTime(time) : null
    })

    const minTime = computed(() => {
      const time = parseTime(props.minTime || '')
      return time ? formatTime(time) : null
    })

    const maxTime = computed(() => {
      const time = parseTime(props.maxTime || '')
      return time ? formatTime(time) : null
    })
    const items = computed(() => {
      const result: { value: string; disabled: boolean; }[] = []
      if (props.start && props.end && props.step) {
        let current = start.value
        let currentTime: string
        while (current && end.value && compareTime(current, end.value) <= 0) {
          currentTime = dayjs(current, 'HH:mm').format(props.format)
          result.push({
            value: currentTime,
            disabled:
          compareTime(current, minTime.value || '-1:-1') <= 0 ||
          compareTime(current, maxTime.value || '100:100') >= 0,
          })
          current = nextTime(current, step.value!)
        }
      }
      return result
    })
    const popperPaneRef = computed(() => select.value?.popperPaneRef)
    const blur = () => {
      select.value?.blur?.()
    }
    const focus = () => {
      select.value?.focus?.()
    }

    const { size: timeSize, disabled: timeDisabled, fill: timeFill } = useConsistentProp()

    return {
      select,
      popperPaneRef,
      value,
      items,
      blur,
      focus,
      timeSize,
      timeDisabled,
      timeFill,
    }
  },
})
</script>
