import { withInstall } from '@hongluan-ui/utils'
import Popper from './src/popper.vue'

import HlPopperArrow from './src/arrow.vue'
import HlPopperTrigger from './src/trigger.vue'
import HlPopperContent from './src/content.vue'

export { HlPopperArrow, HlPopperTrigger, HlPopperContent }

export const HlPopper = withInstall(Popper)
export default HlPopper

export * from './src/popper'
export * from './src/trigger'
export * from './src/content'
export * from './src/arrow'
export { useDeprecateAppendToBody } from './src/deprecation'

export type { Placement, Options } from '@popperjs/core'
