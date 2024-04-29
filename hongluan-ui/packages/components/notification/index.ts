import { withInstallFunction } from '@hongluan-ui/utils'

import Notify from './src/notify'

export const HlNotification = withInstallFunction(Notify, '$notify')
export default HlNotification

export * from './src/notification'
