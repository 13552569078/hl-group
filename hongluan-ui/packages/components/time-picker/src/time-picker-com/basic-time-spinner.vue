<template>
  <div class="time-spinner" :class="{ 'has-seconds': showSeconds }">
    <template v-if="!arrowControl">
      <hl-scrollbar
        v-for="item in spinnerItems"
        :key="item"
        :ref="(scollbar) => setRef(scollbar, item)"
        class="spinner-wrapper"
        wrap-style="max-height: inherit;"
        view-class="spinner-list"
        noresize
        tag="ul"
        @mouseenter="emitSelectRange(item)"
        @mousemove="adjustCurrentSpinner(item)"
      >
        <li
          v-for="(disabled, key) in timeList[item]"
          :key="key"
          class="spinner-item"
          :class="{ 'active': key === timePartials[item], disabled }"
          @click="handleClick(item, { value: key, disabled })"
        >
          <template v-if="item === 'hours'">
            {{ ('0' + (amPmMode ? (key % 12 || 12) : key )).slice(-2) }}{{ getAmPmFlag(key) }}
          </template>
          <template v-else>
            {{ ('0' + key).slice(-2) }}
          </template>
        </li>
      </hl-scrollbar>
    </template>
    <template v-if="arrowControl">
      <div
        v-for="item in spinnerItems"
        :key="item"
        class="spinner-wrapper is-arrow"
        @mouseenter="emitSelectRange(item)"
      >
        <hl-button
          v-repeat-click="onDecrement"
          no-fill
          size="sm"
          class="spinner-arrow up bg-transparent hover:text-hover"
        >
          <template #icon>
            <hl-icon>
              <system-arrow-up />
            </hl-icon>
          </template>
        </hl-button>
        <hl-button
          v-repeat-click="onIncrement"
          no-fill
          size="sm"
          class="spinner-arrow down bg-transparent hover:text-hover"
        >
          <template #icon>
            <hl-icon>
              <system-arrow-down />
            </hl-icon>
          </template>
        </hl-button>

        <ul class="spinner-list group-item">
          <li
            v-for="(time, key) in arrowControlTimeList[item]"
            :key="key"
            class="spinner-item"
            :class="{ 'active': time === timePartials[item], 'disabled': timeList[item][time] }"
          >
            <template v-if="typeof time === 'number'">
              <template v-if="item === 'hours'">
                {{ ('0' + (amPmMode ? time % 12 || 12 : time)).slice(-2)
                }}{{ getAmPmFlag(time) }}
              </template>
              <template v-else>
                {{ ('0' + time).slice(-2) }}
              </template>
            </template>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, unref, watch } from 'vue'
import { debounce } from 'lodash-unified'
import { vRepeatClick } from '@hongluan-ui/directives'
import HlScrollbar from '@hongluan-ui/components/scrollbar'
import HlButton from '@hongluan-ui/components/button'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemArrowUp, SystemArrowDown } from '@hongluan-ui/components/system-icon'
import { timeUnits } from '../constants'
import { buildTimeList } from '../utils'
import { basicTimeSpinnerProps } from '../props/basic-time-spinner'
import { getTimeLists } from '../composables/use-time-picker'

import type { Ref } from 'vue'
import type { ScrollbarInstance } from '@hongluan-ui/components/scrollbar'
import type { TimeUnit } from '../constants'
import type { TimeList } from '../utils'

const props = defineProps(basicTimeSpinnerProps)
const emit = defineEmits(['change', 'select-range', 'set-option'])

const { getHoursList, getMinutesList, getSecondsList } = getTimeLists(
  props.disabledHours,
  props.disabledMinutes,
  props.disabledSeconds,
)

// data
let isScrolling = false

const currentScrollbar = ref<TimeUnit>()
const listHoursRef = ref<ScrollbarInstance>()
const listMinutesRef = ref<ScrollbarInstance>()
const listSecondsRef = ref<ScrollbarInstance>()
const listRefsMap: Record<TimeUnit, Ref<ScrollbarInstance | undefined>> = {
  hours: listHoursRef,
  minutes: listMinutesRef,
  seconds: listSecondsRef,
}

// computed
const spinnerItems = computed(() => {
  return props.showSeconds ? timeUnits : timeUnits.slice(0, 2)
})

const timePartials = computed<Record<TimeUnit, number>>(() => {
  const { spinnerDate } = props
  const hours = spinnerDate.hour()
  const minutes = spinnerDate.minute()
  const seconds = spinnerDate.second()
  return { hours, minutes, seconds }
})

const timeList = computed(() => {
  const { hours, minutes } = unref(timePartials)
  return {
    hours: getHoursList(props.role),
    minutes: getMinutesList(hours, props.role),
    seconds: getSecondsList(hours, minutes, props.role),
  }
})

const arrowControlTimeList = computed<Record<TimeUnit, TimeList>>(() => {
  const { hours, minutes, seconds } = unref(timePartials)

  return {
    hours: buildTimeList(hours, 23),
    minutes: buildTimeList(minutes, 59),
    seconds: buildTimeList(seconds, 59),
  }
})

const debouncedResetScroll = debounce(type => {
  isScrolling = false
  adjustCurrentSpinner(type)
}, 200)

const getAmPmFlag = (hour: number) => {
  const shouldShowAmPm = !!props.amPmMode
  if (!shouldShowAmPm) return ''
  const isCapital = props.amPmMode === 'A'
  // todo locale
  let content = hour < 12 ? ' am' : ' pm'
  if (isCapital) content = content.toUpperCase()
  return content
}

const emitSelectRange = (type: TimeUnit) => {
  let range

  switch (type) {
    case 'hours':
      range = [0, 2]
      break
    case 'minutes':
      range = [3, 5]
      break
    case 'seconds':
      range = [6, 8]
      break
  }
  const [left, right] = range

  emit('select-range', left, right)
  currentScrollbar.value = type
}

const adjustCurrentSpinner = (type: TimeUnit) => {
  adjustSpinner(type, unref(timePartials)[type])
}

const adjustSpinners = () => {
  adjustCurrentSpinner('hours')
  adjustCurrentSpinner('minutes')
  adjustCurrentSpinner('seconds')
}

const getScrollbarElement = (el: HTMLElement) =>
  el.querySelector(`.scrollbar-wrap`) as HTMLElement

const adjustSpinner = (type: TimeUnit, value: number) => {
  if (props.arrowControl) return
  const scrollbar = unref(listRefsMap[type])
  if (scrollbar && scrollbar.$el) {
    getScrollbarElement(scrollbar.$el).scrollTop = Math.max(
      0,
      value * typeItemHeight(type),
    )
  }
}

const typeItemHeight = (type: TimeUnit): number => {
  const scrollbar = unref(listRefsMap[type])
  return scrollbar?.$el.querySelector('li').offsetHeight || 0
}

const onIncrement = () => {
  scrollDown(1)
}

const onDecrement = () => {
  scrollDown(-1)
}

const scrollDown = (step: number) => {
  if (!currentScrollbar.value) {
    emitSelectRange('hours')
  }

  const label = currentScrollbar.value!
  const now = unref(timePartials)[label]
  const total = currentScrollbar.value === 'hours' ? 24 : 60
  const next = findNextUnDisabled(label, now, step, total)

  modifyDateField(label, next)
  adjustSpinner(label, next)
  nextTick(() => emitSelectRange(label))
}

const findNextUnDisabled = (
  type: TimeUnit,
  now: number,
  step: number,
  total: number,
) => {
  let next = (now + step + total) % total
  const list = unref(timeList)[type]
  while (list[next] && next !== now) {
    next = (next + step + total) % total
  }
  return next
}

const modifyDateField = (type: TimeUnit, value: number) => {
  const list = unref(timeList)[type]
  const isDisabled = list[value]
  if (isDisabled) return

  const { hours, minutes, seconds } = unref(timePartials)

  let changeTo
  switch (type) {
    case 'hours':
      changeTo = props.spinnerDate.hour(value).minute(minutes).second(seconds)
      break
    case 'minutes':
      changeTo = props.spinnerDate.hour(hours).minute(value).second(seconds)
      break
    case 'seconds':
      changeTo = props.spinnerDate.hour(hours).minute(minutes).second(value)
      break
  }
  emit('change', changeTo)
}

const handleClick = (
  type: TimeUnit,
  { value, disabled }: { value: number; disabled: boolean; },
) => {
  if (!disabled) {
    modifyDateField(type, value)
    emitSelectRange(type)
    adjustSpinner(type, value)
  }
}

const handleScroll = (type: TimeUnit) => {
  isScrolling = true
  debouncedResetScroll(type)
  const value = Math.min(
    Math.round(
      (getScrollbarElement(unref(listRefsMap[type])!.$el).scrollTop -
        (scrollBarHeight(type) * 0.5 - 10) / typeItemHeight(type) +
        3) /
        typeItemHeight(type),
    ),
    type === 'hours' ? 23 : 59,
  )
  modifyDateField(type, value)
}

const scrollBarHeight = (type: TimeUnit) => {
  return unref(listRefsMap[type])!.$el.offsetHeight
}

const bindScrollEvent = () => {
  const bindFunction = (type: TimeUnit) => {
    const scrollbar = unref(listRefsMap[type])
    if (scrollbar && scrollbar.$el) {
      getScrollbarElement(scrollbar.$el).onscroll = () => {
        // TODO: scroll is emitted when set scrollTop programmatically
        // should find better solutions in the future!
        handleScroll(type)
      }
    }
  }
  bindFunction('hours')
  bindFunction('minutes')
  bindFunction('seconds')
}

onMounted(() => {
  nextTick(() => {
    !props.arrowControl && bindScrollEvent()
    adjustSpinners()
    // set selection on the first hour part
    if (props.role === 'start') emitSelectRange('hours')
  })
})

const setRef = (scrollbar: ScrollbarInstance, type: TimeUnit) => {
  listRefsMap[type].value = scrollbar
}

emit('set-option', [`${props.role}_scrollDown`, scrollDown])
emit('set-option', [`${props.role}_emitSelectRange`, emitSelectRange])

watch(
  () => props.spinnerDate,
  () => {
    if (isScrolling) return
    adjustSpinners()
  },
)
</script>
