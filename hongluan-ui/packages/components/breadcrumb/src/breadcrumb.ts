import type { Slots } from 'vue'
import type { ExtractPropTypes } from 'vue'

export interface IBreadcrumbProps {
  separator: string
  slots: Slots
}

export const breadcrumbProps = {
  /**
   * @description separator character
   */
  separator: {
    type: String,
    default: '/',
  },
} as const
export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>
