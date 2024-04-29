import { createApp, nextTick } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import HongluanUI from 'hongluan-ui'
import HongluanBusinessUI from 'hongluan-business-ui'
import PcFxyjFramework from 'fx-front-framework'
import App from './app.vue'
import routes from './route.config'
import demoBlock from './components/demo-block'
import demoTabs from './components/demo-tabs'
// import MainFooter from './components/footer'
import MainHeader from './components/header'
import SideNav from './components/side-nav'
import RightNav from './components/right-nav'
// import FooterNav from './components/footer-nav'
import title from './i18n/title'
import { initIcons } from './icons'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'highlight.js/styles/atom-one-dark.css'
import './assets/styles/doc.scss'
import '../packages/theme/src/visualized.scss'
import '../packages/theme/src/index.scss'
dayjs.locale('zh-cn') // todo: locale based on Doc site lang

const app = createApp(App)

app.component('DemoBlock', demoBlock)
app.component('DemoTabs', demoTabs)
// app.component('MainFooter', MainFooter)
app.component('MainHeader', MainHeader)
app.component('SideNav', SideNav)
// app.component('FooterNav', FooterNav)
app.component('RightNav', RightNav)

initIcons(app)

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
app.use(HongluanUI)
app.use(HongluanBusinessUI)
app.use(PcFxyjFramework)
app.use(router)
router.isReady().then(() => {

  router.afterEach(async route => {
    await nextTick()
    const data = title[route.meta.lang]
    for (let val in data) {
      if (new RegExp('^' + val, 'g').test(route.name)) {
        document.title = data[val]
        return
      }
    }
    document.title = '繁星PC组件库'
  })

})

app.mount('#app')
