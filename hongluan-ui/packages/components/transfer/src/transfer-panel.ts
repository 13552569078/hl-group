import { buildProps, definePropType } from '@hongluan-ui/utils'
import { transferCheckedChangeFn, transferProps } from './transfer'

import type { ExtractPropTypes, VNode } from 'vue'
import type { TransferDataItem, TransferKey } from './transfer'
import type TransferPanel from './transfer-panel.vue'

export interface TransferPanelState {
  checked: TransferKey[]
  allChecked: boolean
  query: string
  inputHover: boolean
  checkChangeByUser: boolean
}

export const CHECKED_CHANGE_EVENT = 'checked-change'

export const transferPanelProps = buildProps({
  data: transferProps.data,
  optionRender: {
    type: definePropType<(option: TransferDataItem) => VNode | VNode[]>(
      Function,
    ),
  },
  placeholder: String,
  title: String,
  mark: String,
  filterable: Boolean,
  format: transferProps.format,
  filterMethod: transferProps.filterMethod,
  filterProps: transferProps.filterProps,
  confirmMethod: transferProps.confirmMethod,
  defaultChecked: transferProps.leftDefaultChecked,
  props: transferProps.props,
  showButtons: Boolean,
} as const)
export type TransferPanelProps = ExtractPropTypes<typeof transferPanelProps>

export const transferPanelEmits = {
  [CHECKED_CHANGE_EVENT]: transferCheckedChangeFn,
}
export type TransferPanelEmits = typeof transferPanelEmits

export type TransferPanelInstance = InstanceType<typeof TransferPanel>
