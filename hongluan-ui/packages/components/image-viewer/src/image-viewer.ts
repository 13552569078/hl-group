import { mutable, buildProps, definePropType, isNumber } from '@hongluan-ui/utils'
import type { ExtractPropTypes } from 'vue'
import type ImageViewer from './image-viewer.vue'

export type ImageViewerAction =
  | 'zoomIn'
  | 'zoomOut'
  | 'clockwise'
  | 'anticlockwise'
export interface ImageViewerMode {
  name: string
  icon: string
}
export const imageViewerProps = buildProps({
  urlList: {
    type: definePropType<string[]>(Array),
    default: () => mutable([] as const),
  },
  zIndex: {
    type: Number,
  },
  initialIndex: {
    type: Number,
    default: 0,
  },
  infinite: {
    type: Boolean,
    default: true,
  },
  hideOnClickModal: {
    type: Boolean,
    default: false,
  },
  teleported: {
    type: Boolean,
    default: false,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true,
  },
  zoomRate: {
    type: Number,
    default: 1.2,
  },
} as const)
export type ImageViewerProps = ExtractPropTypes<typeof imageViewerProps>

export const imageViewerEmits = {
  close: () => true,
  switch: (index: number) => isNumber(index),
}
export type ImageViewerEmits = typeof imageViewerEmits
export type ImageViewerInstance = InstanceType<typeof ImageViewer>
