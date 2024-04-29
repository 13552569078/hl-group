import { computed, defineComponent, h } from 'vue'
import { buildProps, definePropType, isString } from '@hongluan-ui/utils'
import type { CSSProperties, ExtractPropTypes } from 'vue'

export const sliderMarkerProps = buildProps({
  mark: {
    type: definePropType<
    | string
    | {
      style: CSSProperties
      label: any
    }
    >([String, Object]),
    default: undefined,
  },
} as const)
export type SliderMarkerProps = ExtractPropTypes<typeof sliderMarkerProps>

export default defineComponent({
  name: 'SliderMarker',
  props: sliderMarkerProps,
  setup(props) {
    const label = computed(() => {
      return isString(props.mark) ? props.mark : props.mark!.label
    })
    const style = computed(() =>
      isString(props.mark) ? undefined : props.mark!.style,
    )

    return () =>
      h(
        'div',
        {
          class: 'slider-marks-text',
          style: style.value,
        },
        label.value,
      )
  },
})
