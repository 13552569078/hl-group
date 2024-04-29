import { buildProps } from '@hongluan-ui/utils'
import type { ExtractPropTypes } from 'vue'
import type TimelineItem from './timeline-item.vue'

export const timelineItemProps = buildProps({
  timestamp: {
    type: String,
    default: '',
  },
  hideTimestamp: {
    type: Boolean,
    default: false,
  },
  type: String,
  color: {
    type: String,
    default: '',
  },
  icon: Object,
  dir: String,
  active: Boolean,
  gap: String,
} as const)

export type TimelineItemProps = ExtractPropTypes<typeof timelineItemProps>
export type TimelineItemInstance = InstanceType<typeof TimelineItem>
