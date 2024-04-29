import { createApp, nextTick } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import HongluanUI from 'hongluan-ui'
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
import 'highlight.js/styles/github-dark-dimmed.css'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
dayjs.locale('zh-cn') // todo: locale based on Doc site lang

import './assets/styles/doc.scss'
import './assets/styles/doc-dark.scss'

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
app.use(router)
router.isReady().then(() => {

  router.afterEach(async route => {
    window.scrollTo(0,0)
    await nextTick()
    const data = title[route.meta.lang]
    for (let val in data) {
      if (route.path.includes(`/${val}/`)) {
        document.title = data[val]
        return
      }
    }
    document.title = '鸿鸾UI组件库'
  })

})

app.mount('#app')
