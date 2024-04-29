import { computed, defineComponent, provide, reactive, ref, toRef } from 'vue'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat.js'
import advancedFormat from 'dayjs/plugin/advancedFormat.js'
import localeData from 'dayjs/plugin/localeData.js'
import weekOfYear from 'dayjs/plugin/weekOfYear.js'
import weekYear from 'dayjs/plugin/weekYear.js'
import dayOfYear from 'dayjs/plugin/dayOfYear.js'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter.js'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore.js'
import { DEFAULT_FORMATS_DATE, DEFAULT_FORMATS_DATEPICKER, CommonPicker, timePickerDefaultProps } from '@hongluan-ui/components/time-picker'
import { ROOT_PICKER_INJECTION_KEY } from '@hongluan-ui/tokens'
import { useConsistentProp } from '@hongluan-ui/hooks'

import { datePickerProps } from './props/date-picker'
import { getPanel } from './panel-utils'


dayjs.extend(localeData)
dayjs.extend(advancedFormat)
dayjs.extend(customParseFormat)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
dayjs.extend(dayOfYear)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

export default defineComponent({
  name: 'DatePicker',
  install: null,
  props: {
    ...timePickerDefaultProps,
    ...datePickerProps,
  },
  emits: ['update:modelValue'],

  setup(props, { expose, emit, slots }) {
    provide('PopperOptions', reactive(toRef(props, 'popperOptions')))
    provide(ROOT_PICKER_INJECTION_KEY, {
      slots,
    })
    const commonPicker = ref<InstanceType<typeof CommonPicker>>()
    const refProps = {
      focus: (focusStartInput = true) => {
        commonPicker.value?.focus(focusStartInput)
      },
      handleOpen: () => {
        commonPicker.value?.handleOpen()
      },
      handleClose: () => {
        commonPicker.value?.handleClose()
      },
      popperPaneRef: computed(() => {
        return commonPicker.value?.popperPaneRef
      }),
    }

    expose(refProps)
    const onModelValueUpdated = (val: any) => {
      emit('update:modelValue', val)
    }

    return () => {
      // since props always have all defined keys on it, {format, ...props} will always overwrite format
      // pick props.format or provide default value here before spreading
      const format = props.format ?? (DEFAULT_FORMATS_DATEPICKER[props.type as keyof typeof DEFAULT_FORMATS_DATEPICKER] || DEFAULT_FORMATS_DATE)
      const { size, disabled, fill } = useConsistentProp()
      const Component = getPanel(props.type)
      return (
        <CommonPicker
          {...props}
          format={format}
          type={props.type}
          size={size.value}
          disabled={disabled.value}
          fill={fill.value}
          ref={commonPicker}
          onUpdate:modelValue={onModelValueUpdated}
        >
          {{
            default: (scopedProps: /**FIXME: remove any type */ any) => (
              <Component {...scopedProps} />
            ),
            icon: slots.icon,
            'range-separator': slots['range-separator'],
          }}
        </CommonPicker>
      )
    }
  },
})
