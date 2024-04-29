import { withInstall } from '@hongluan-ui/utils'
import Breadcrumb from './src/breadcrumb.vue'

export const HlBreadcrumb = withInstall(Breadcrumb)
export default HlBreadcrumb

export * from './src/breadcrumb'
export * from './src/breadcrumb-item'
export type {
  BreadcrumbInstance,
  BreadcrumbItemInstance,
} from './src/instances'
