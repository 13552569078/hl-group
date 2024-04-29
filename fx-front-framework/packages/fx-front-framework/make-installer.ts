import { setConfig } from '@fx-front-framework/utils/config'
import { version } from './version'

import type { App, Plugin } from 'vue'
import type { InstallOptions } from '@fx-front-framework/utils/config'

const makeInstaller = (components: Plugin[] = []) => {
  const apps: App[] = []

  const install = (app: App, opts: InstallOptions) => {
    const defaultInstallOpt: InstallOptions = {
      visualized: {
        basicPX: 1,
      },
    }

    const option = Object.assign(defaultInstallOpt, opts)
    if (apps.includes(app)) return
    apps.push(app)

    components.forEach(c => {
      app.use(c)
    })

    app.config.globalProperties.$FX = option
    // app.provide() ? is this better? I think its not that flexible but worth implement
    setConfig(option)
  }

  return {
    version,
    install,
  }
}

export default makeInstaller
