<template>
  <hl-tooltip
    ref="popper"
    :visible="showPicker"
    :show-arrow="false"
    :fallback-placements="['bottom', 'top', 'right', 'left']"
    :offset="popperOffset"
    :gpu-acceleration="false"
    :popper-class="[namespace + '-picker-popper', popperClass]"
    :stop-popper-mouse-event="false"
    :teleported="teleported"
    trigger="click"
    transition="dropdown"
    persistent
  >
    <template #content>
      <hl-group
        v-click-outside="hide"
        :class="namespace + '-panel'"
        dir="vertical"
        full="full-x"
        gap="var(--xs)"
      >
        <sv-panel ref="svPanel" :color="color" />
        <hl-group gap="var(--xs)">
          <hl-group dir="vertical" full="full-x" gap="var(--xxs)">
            <hue-slider ref="hue" :color="color" />
            <alpha-slider v-if="showAlpha" ref="alpha" :color="color" />
          </hl-group>
          <div v-if="showAlpha" class="current-color" :style="`background-color: ${customInput}`"></div>
        </hl-group>
        <predefine
          v-if="predefine"
          ref="predefine"
          :color="color"
          :colors="predefine"
          class="m-t-xs"
        />
        <hl-group align="items-between" gap="var(--xs)" class="m-t-xs">
          <hl-input
            v-model="customInput"
            :validate-event="false"
            size="sm"
            fill
            block
            spellcheck="false"
            @keyup.enter="handleConfirm"
            @blur="handleConfirm"
          />
          <hl-group class="static">
            <hl-button size="sm" type="link" @click="clear">{{ t('hl.colorpicker.clear') }}</hl-button>
            <hl-button
              type="primary"
              size="sm"
              @click="confirmValue"
            >
              {{ t('hl.colorpicker.confirm') }}
            </hl-button>
          </hl-group>
        </hl-group>
      </hl-group>
    </template>
    <template #default>
      <div
        :id="buttonId"
        :class="[
          namespace + '-picker',
          colorDisabled ? 'is-disabled' : '',
          colorSize,
        ]"
        role="button"
        :aria-label="buttonAriaLabel"
        :aria-labelledby="buttonAriaLabelledby"
        :aria-description="
          t('hl.colorpicker.description', { color: modelValue || '' })
        "
        :tabindex="tabindex"
        @keydown.enter="handleTrigger"
      >
        <div v-if="colorDisabled" class="picker-mask"></div>
        <div class="picker-trigger" @click="handleTrigger">
          <span
            class="picker-color"
            :style="{
              backgroundColor: displayedColor,
            }"
          >
            <hl-icon
              v-show="modelValue || showPanelColor"
              :class="['picker-icon']"
            >
              <system-arrow-down />
            </hl-icon>
            <hl-icon v-if="!modelValue && !showPanelColor" :class="['picker-empty', 'icon-close']">
              <system-close />
            </hl-icon>
          </span>
        </div>
      </div>
    </template>
  </hl-tooltip>
</template>

<script lang="ts" setup>
import {
  computed,
  nextTick,
  onMounted,
  provide,
  reactive,
  ref,
  watch,
} from 'vue'
import { debounce } from 'lodash-unified'
import HlButton from '@hongluan-ui/components/button'
import HlIcon from '@hongluan-ui/components/icon'
import HlGroup from '@hongluan-ui/components/group'
import { ClickOutside as vClickOutside } from '@hongluan-ui/directives'
import { useLocale, useNamespace, useConsistentProp, useFormItemInputId, useFormItem } from '@hongluan-ui/hooks'
import HlTooltip from '@hongluan-ui/components/tooltip'
import HlInput from '@hongluan-ui/components/input'
import { UPDATE_MODEL_EVENT } from '@hongluan-ui/constants'
import { debugWarn } from '@hongluan-ui/utils'
import { SystemArrowDown, SystemClose } from '@hongluan-ui/components/system-icon'
import AlphaSlider from './components/alpha-slider.vue'
import HueSlider from './components/hue-slider.vue'
import Predefine from './components/predefine.vue'
import SvPanel from './components/sv-panel.vue'
import Color from './utils/color'
import {
  colorPickerContextKey,
  colorPickerEmits,
  colorPickerProps,
} from './color-picker'
import type { TooltipInstance } from '@hongluan-ui/components/tooltip'

defineOptions({
  name: 'ColorPicker',
})
const props = defineProps(colorPickerProps)
const emit = defineEmits(colorPickerEmits)

const { t } = useLocale()
const { namespace } = useNamespace('color')
const { form, formItem } = useFormItem()
const { inputId: buttonId, isLabeledByFormItem } = useFormItemInputId(
  props,
  {
    formItemContext: formItem,
  },
)
const hue = ref<InstanceType<typeof HueSlider>>()
const svPanel = ref<InstanceType<typeof SvPanel>>()
const alpha = ref<InstanceType<typeof AlphaSlider>>()
const popper = ref<TooltipInstance>()
// active-change is used to prevent modelValue changes from triggering.
let shouldActiveChange = true

// data
const color = reactive(
  new Color({
    enableAlpha: props.showAlpha,
    format: props.colorFormat || '',
    value: props.modelValue,
  }),
) as Color

const showPicker = ref(false)
const showPanelColor = ref(false)
const customInput = ref('')
// computed
const displayedColor = computed(() => {
  if (!props.modelValue && !showPanelColor.value) {
    return 'transparent'
  }
  return displayedRgb(color, props.showAlpha)
})
const { size: colorSize } = useConsistentProp()
const colorDisabled = computed(() => {
  return !!(props.disabled || form?.disabled)
})

const currentColor = computed(() => {
  return !props.modelValue && !showPanelColor.value ? '' : color.value
})
const popperPaneRef = computed(() => {
  return popper.value?.popperRef?.contentRef
})
const buttonAriaLabel = computed<string | undefined>(() => {
  return !isLabeledByFormItem.value
    ? props.label || t('hl.colorpicker.defaultLabel')
    : undefined
})
const buttonAriaLabelledby = computed<string | undefined>(() => {
  return isLabeledByFormItem.value ? formItem?.labelId : undefined
})

// methods
function displayedRgb(color: Color, showAlpha: boolean) {
  if (!(color instanceof Color)) {
    throw new TypeError('color should be instance of _color Class')
  }

  const { r, g, b } = color.toRgb()
  return showAlpha
    ? `rgba(${r}, ${g}, ${b}, ${color.get('alpha') / 100})`
    : `rgb(${r}, ${g}, ${b})`
}

function setShowPicker(value: boolean) {
  showPicker.value = value
}

const debounceSetShowPicker = debounce(setShowPicker, 100)

function hide() {
  debounceSetShowPicker(false)
  resetColor()
}

function resetColor() {
  nextTick(() => {
    if (props.modelValue) {
      color.fromString(props.modelValue)
    } else {
      color.value = ''
      nextTick(() => {
        showPanelColor.value = false
      })
    }
  })
}

function handleTrigger() {
  if (colorDisabled.value) return
  debounceSetShowPicker(!showPicker.value)
}

function handleConfirm() {
  color.fromString(customInput.value)
}

function confirmValue() {
  const value = color.value
  emit(UPDATE_MODEL_EVENT, value)
  emit('change', value)
  if (props.validateEvent) {
    formItem?.validate?.('change').catch(err => debugWarn(err))
  }
  debounceSetShowPicker(false)
  // check if modelValue change, if not change, then reset color.
  nextTick(() => {
    const newColor = new Color({
      enableAlpha: props.showAlpha,
      format: props.colorFormat || '',
      value: props.modelValue,
    })
    if (!color.compare(newColor)) {
      resetColor()
    }
  })
}

function clear() {
  debounceSetShowPicker(false)
  emit(UPDATE_MODEL_EVENT, null)
  emit('change', null)
  if (props.modelValue !== null && props.validateEvent) {
    formItem?.validate?.('change').catch(err => debugWarn(err))
  }
  resetColor()
}

onMounted(() => {
  if (props.modelValue) {
    customInput.value = currentColor.value
  }
})

// watch
watch(
  () => props.modelValue,
  newVal => {
    if (!newVal) {
      showPanelColor.value = false
    } else if (newVal && newVal !== color.value) {
      shouldActiveChange = false
      color.fromString(newVal)
    }
  },
)
watch(
  () => currentColor.value,
  val => {
    customInput.value = val
    shouldActiveChange && emit('activeChange', val)
    shouldActiveChange = true
  },
)

watch(
  () => color.value,
  () => {
    if (!props.modelValue && !showPanelColor.value) {
      showPanelColor.value = true
    }
  },
)

watch(
  () => showPicker.value,
  () => {
    nextTick(() => {
      hue.value?.update()
      svPanel.value?.update()
      alpha.value?.update()
    })
  },
)

provide(colorPickerContextKey, {
  currentColor,
})

defineExpose({
  /**
   * @description current color object
   */
  color,
  popperPaneRef,
})

</script>
