import { Loading } from './src/service'
import { vLoading } from './src/directive'

import type { App } from 'vue'

// installer and everything in all
export const HlLoading = {
  install(app: App) {
    app.directive('loading', vLoading)
    app.config.globalProperties.$loading = Loading
  },
  directive: vLoading,
  service: Loading,
}

export default HlLoading
export { vLoading, vLoading as HlLoadingDirective, Loading as HlLoadingService }

export * from './src/types'
export type { LoadingInstance } from './src/loading'
