import { vRipple } from './src/directive'

import type { App } from 'vue'

// installer and everything in all
export const HlRipple = {
  install(app: App) {
    app.directive('ripple', vRipple)
  },
  directive: vRipple,
}

export default HlRipple
export { vRipple, vRipple as HlRippleDirective }
