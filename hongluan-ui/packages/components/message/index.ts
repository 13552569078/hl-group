import { withInstallFunction } from '@hongluan-ui/utils'

import Message from './src/method'

export const HlMessage = withInstallFunction(Message, '$message')
export default HlMessage

export * from './src/message'
