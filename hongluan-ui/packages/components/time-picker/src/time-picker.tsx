import { computed, defineComponent, provide, ref } from 'vue'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import { useConsistentProp } from '@hongluan-ui/hooks'
import { DEFAULT_FORMATS_TIME } from './constants'
import Picker from './common/picker.vue'
import TimePickPanel from './time-picker-com/panel-time-pick.vue'
import TimeRangePanel from './time-picker-com/panel-time-range.vue'
import { timePickerDefaultProps } from './common/props'
dayjs.extend(customParseFormat)

export default defineComponent({
  name: 'TimePicker',
  install: null,
  props: {
    ...timePickerDefaultProps,
    isRange: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const commonPicker = ref<InstanceType<typeof Picker>>()
    const [type, Panel] = props.isRange
      ? ['timerange', TimeRangePanel]
      : ['time', TimePickPanel]

    const modelUpdater = (value: any) => ctx.emit('update:modelValue', value)
    provide('PopperOptions', props.popperOptions)
    ctx.expose({
      /**
       * @description focus on the input element
       */
      focus: (e: FocusEvent | undefined) => {
        commonPicker.value?.handleFocusInput(e)
      },
      /**
       * @description blur from the input element
       */
      blur: (e: FocusEvent | undefined) => {
        commonPicker.value?.handleBlurInput(e)
      },
      /**
       * @description opens the picker element
       */
      handleOpen: () => {
        commonPicker.value?.handleOpen()
      },
      /**
       * @description closes the picker element
       */
      handleClose: () => {
        commonPicker.value?.handleClose()
      },
      popperPaneRef: computed(() => {
        return commonPicker.value?.popperPaneRef
      }),
    })

    return () => {
      const format = props.format ?? DEFAULT_FORMATS_TIME
      const { size, disabled, fill } = useConsistentProp()
      return (
        <Picker
          {...props}
          ref={commonPicker}
          type={type}
          format={format}
          size={size.value}
          disabled={disabled.value}
          fill={fill.value}
          onUpdate:modelValue={modelUpdater}
        >
          {{
            default: (props: any) => <Panel {...props} />,
            icon: ctx.slots.icon,
          }}
        </Picker>
      )
    }
  },
})
