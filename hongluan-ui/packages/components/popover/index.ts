import { withInstall, withInstallDirective } from '@hongluan-ui/utils'

import Popover from './src/popover.vue'
import PopoverDirective, { VPopover } from './src/directive'

export const HlPopoverDirective = withInstallDirective(
  PopoverDirective,
  VPopover,
)

export const HlPopover = withInstall(Popover, {
  directive: HlPopoverDirective,
})
export default HlPopover

export * from './src/popover'
