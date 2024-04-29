import { createApp } from 'vue'
import App from './AppVisualized.vue'
import router from './router/visualized'
import store from './store'
import { HvPanel, HvModal } from './views/visualized/components'

import HongluanUI from 'hongluan-ui'
import HongluanBusinessUI from 'hongluan-business-ui'
import InlineSvg from 'vue-inline-svg'
import { SourceDisplayer } from '@directives'

import './assets/styles/index-visualized.scss'
import './assets/styles/utils/source-editor.scss'

// import { i18n } from './i18n'
// console.log(i18n.global.messages)

import * as svgIcons from '@hongluan-ui/icons'

const app = createApp(App)

Object.keys(svgIcons).forEach(key => {
  app.component(key, (svgIcons as any)[key])
})

app.use(router)
app.use(store)
app.use(HongluanUI)
app.use(HongluanBusinessUI)
app.component('InlineSvg', InlineSvg)
app.component('HvPanel', HvPanel)
app.component('HvModal', HvModal)
app.directive('source', SourceDisplayer)
// app.use(i18n)

app.mount('#app')

export default app
