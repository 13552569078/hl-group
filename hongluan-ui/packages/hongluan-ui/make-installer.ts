import { provideGlobalConfig } from '@hongluan-ui/hooks'
import { INSTALLED_KEY } from '@hongluan-ui/constants'
import { version } from './version'
import type { App, Plugin } from '@vue/runtime-core'
import type { ConfigProviderContext } from '@hongluan-ui/tokens'


export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App, options?: ConfigProviderContext) => {
    if (app[INSTALLED_KEY]) return

    app[INSTALLED_KEY] = true
    components.forEach(c => app.use(c))

    if (options) provideGlobalConfig(options, app, true)
  }

  return {
    version,
    install,
  }
}
