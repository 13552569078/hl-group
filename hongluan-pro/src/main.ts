import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import HongluanUI from 'hongluan-ui'
import HongluanBusinessUI from 'hongluan-business-ui'
import PcFxFramework from 'pc-fx-framework'
import InlineSvg from 'vue-inline-svg'
import { SourceDisplayer } from '@directives'

// import { i18n } from './i18n'
// console.log(i18n.global.messages)

import './assets/styles/index.scss'
import './assets/styles/utils/source-editor.scss'
import 'nprogress/nprogress.css'
import 'hongluan-ui/theme/dark/colors.css'

import * as svgIcons from '@hongluan-ui/icons'

const app = createApp(App)

Object.keys(svgIcons).forEach(key => {
  app.component(key, (svgIcons as any)[key])
})

app.use(router)
app.use(store)
app.use(HongluanUI)
app.use(PcFxFramework)
app.use(HongluanBusinessUI)
app.component('InlineSvg', InlineSvg)
app.directive('source', SourceDisplayer)
// app.use(i18n)

app.mount('#app')

export default app
