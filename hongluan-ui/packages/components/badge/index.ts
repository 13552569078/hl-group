import { withInstall } from '@hongluan-ui/utils'
import Badge from './src/badge.vue'

export const HlBadge = withInstall(Badge)
export default HlBadge

export * from './src/badge'
export type { BadgeInstance } from './src/instance'
