import { withInstall } from '@hongluan-ui/utils'
import ConfigProvider from './src/config-provider'

export const HlConfigProvider = withInstall(ConfigProvider)
export default HlConfigProvider

export * from './src/config-provider'
