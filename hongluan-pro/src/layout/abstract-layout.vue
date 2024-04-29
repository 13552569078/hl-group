<template>
  <component :is="whichLayout">
    <router-view v-slot="{ Component }">
      <transition>
        <component :is="Component" />
      </transition>
    </router-view>
  </component>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, onMounted, shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'

const LayoutMap: Record<string, any> = {
  'default': defineAsyncComponent(() => import('./layout-default.vue')),
  'uk2': defineAsyncComponent(() => import('./layout-uk2.vue')),
  'uk2a': defineAsyncComponent(() => import('./layout-uk2a.vue')),
  'cecloud': defineAsyncComponent(() => import('./layout-cecloud.vue')),
  'dark': defineAsyncComponent(() => import('./layout-dark.vue')),
  'fx': defineAsyncComponent(() => import('./layout-fx.vue')),
}

export default defineComponent({
  setup() {
    const route = useRoute()
    let whichLayout = shallowRef()

    const initLayout = () => {
      if (route.query.layout) {
        whichLayout.value = LayoutMap[route.query.layout as string]
      } else {
        whichLayout.value = LayoutMap['default']
      }
    }

    const initStyle = () => {
      const currentRoute = `${route.query.layout ?? 'default'}`

      // for dev
      if (import.meta.env.DEV) {
        const styles = document.getElementsByTagName('style')
        for(let i = styles.length - 1; i >= 0 ; i--) {
          const styleContent = styles[i].innerText
          if (styleContent.indexOf('--layout') > -1) {
            if (styleContent.indexOf(`--layout: "${currentRoute}";`) === -1) {
              styles[i].setAttribute('media', 'max-width: 1px')
            } else {
              styles[i].removeAttribute('media')
            }
          }
        }
      } else {
        // for prod
        const links = document.getElementsByTagName('link')
        const deferredLinks: HTMLLinkElement[] = []
        for(let i = links.length - 1; i >= 0 ; i--) {
          if (/layout-.+\.css$/.test(links[i].href)) {
            if (links[i].href.indexOf(`layout-${currentRoute}.`) > -1) {
              links[i].disabled = false
            } else {
              deferredLinks.push(links[i])
            }
          }
          if (/main.+\.css$/.test(links[i].href)) { // 特殊处理首页引入css，因为登录页需要用
            if (currentRoute === 'default') {
              links[i].disabled = false
            } else {
              deferredLinks.push(links[i])
            }
          }
        }
        window.setTimeout(() => {
          deferredLinks.forEach(link => {
            link.disabled = true
          })
        }, 300)
      }
    }

    watch(() => route.query.layout, () => {
      initLayout()
      initStyle()
    })

    initLayout()

    onMounted(() => {
      initStyle()
    })

    return {
      whichLayout,
    }
  },
})
</script>
