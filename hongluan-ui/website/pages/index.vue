<template>
  <hl-layout
    :boxed="true"
    :fixed-aside="true"
    :fixed-header="true"
    :fixed-sub-header="false"
    :full-header="true"
    :full-sub-header="false"
  >
    <main-header v-if="lang !== 'play'" />
    <hl-container>
      <hl-aside>
        <hl-scrollbar ref="componentScrollBar">
          <side-nav :data="navsData[lang]" :base="`/${lang}`" />
        </hl-scrollbar>
      </hl-aside>
      <hl-main class="doc-content">
        <router-view />
      </hl-main>
    </hl-container>
  </hl-layout>
</template>
<script>
import bus from '../bus'
import navsComponnetData from '../nav.component.json'
import navsGuideData from '../nav.guide.json'
import { throttle } from 'throttle-debounce'

export default {
  data() {
    return {
      lang: this.$route.meta.lang,
      scrollTop: 0,
      showHeader: true,
      componentScrollBar: null,
      componentScrollBoxElement: null,
    }
  },
  computed: {
    showBackToTop() {
      return !this.$route.path.match(/backtop/)
    },
    navsData() {
      return this.$route.path.match(/guide|changelog/) ? navsGuideData : navsComponnetData
    },
  },
  watch: {
    '$route.path'() {
      // 触发伪滚动条更新
      // this.componentScrollBox.scrollTop = 0
      // this.$nextTick(() => {
      //   this.componentScrollBar.update()
      // })
    },
  },
  created() {
    bus.$on('nav-fade', val => {
      this.navFaded = val
    })
  },
  mounted() {
    this.componentScrollBar = this.$refs.componentScrollBar
    this.componentScrollBox =
      this.componentScrollBar.$el.querySelector('.scrollbar-wrap')
    this.throttledScrollHandler = throttle(300, this.handleScroll)
    this.componentScrollBox.addEventListener(
      'scroll',
      this.throttledScrollHandler,
    )
    document.body.classList.add('is-component')
    this.addContentObserver()
  },
  unmounted() {
    document.body.classList.remove('is-component')
  },
  beforeUnmount() {
    this.componentScrollBox.removeEventListener(
      'scroll',
      this.throttledScrollHandler,
    )
    this.observer.disconnect()
  },
  methods: {
    addContentObserver() {
      this.observer = new MutationObserver((mutationsList, observer) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            this.renderAnchorHref()
            this.goAnchor()
          }
        }
      })
      this.observer.observe(document.querySelector('.doc-content'), {
        childList: true,
      })
    },
    renderAnchorHref() {
      if (/changelog/g.test(location.href)) return
      const anchors = document.querySelectorAll('h2 a,h3 a,h4 a,h5 a')
      const basePath = location.href.split('#').splice(0, 2).join('#')
        ;[].slice.call(anchors).forEach(a => {
          const href = a.getAttribute('href')
          if (href.indexOf('#') === 0) {
            a.href = basePath + href
          }
        })
    },

    goAnchor() {
      if (location.href.match(/#/g).length > 1) {
        const anchor = location.href.match(/#[^#]+$/g)
        if (!anchor) return
        const elm = document.querySelector(anchor[0])
        if (!elm) return

        setTimeout(() => {
          this.componentScrollBox.scrollTop = elm.offsetTop
        }, 50)
      }
    },

    handleScroll() {
      const scrollTop = this.componentScrollBox.scrollTop
      if (this.showHeader !== this.scrollTop > scrollTop) {
        this.showHeader = this.scrollTop > scrollTop
      }
      if (scrollTop === 0) {
        this.showHeader = true
      }
      if (!this.navFaded) {
        bus.$emit('fade-nav')
      }
      this.scrollTop = scrollTop
    },
  },
}
</script>
