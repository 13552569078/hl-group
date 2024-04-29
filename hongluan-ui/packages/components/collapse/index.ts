import { withInstall } from '@hongluan-ui/utils'
import Collapse from './src/collapse.vue'

export const HlCollapse = withInstall(Collapse)
export default HlCollapse

export * from './src/collapse'
export * from './src/collapse-item'
export type { CollapseInstance, CollapseItemInstance } from './src/instance'
