import { HlInfiniteScroll } from '@hongluan-ui/components/infinite-scroll'
import { HlLoading } from '@hongluan-ui/components/loading'
import { HlMessage } from '@hongluan-ui/components/message'
import { HlMessageBox } from '@hongluan-ui/components/message-box'
import { HlNotification } from '@hongluan-ui/components/notification'
import { HlPopoverDirective } from '@hongluan-ui/components/popover'
import { HlRipple } from '@hongluan-ui/components/ripple'

import type { Plugin } from 'vue'

export default [
  HlInfiniteScroll,
  HlLoading,
  HlMessage,
  HlMessageBox,
  HlNotification,
  HlPopoverDirective,
  HlRipple,
] as Plugin[]

