import { withInstall } from '@hongluan-ui/utils'
import Alert from './src/alert.vue'

export const HlAlert = withInstall(Alert)
export default HlAlert

export * from './src/alert'
export type { AlertInstance } from './src/instance'
