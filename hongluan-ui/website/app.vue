<template>
  <hl-config-provider :locale="locale">
    <div id="app" :class="{ 'is-component': isComponent }">
      <router-view />
    </div>
  </hl-config-provider>
</template>

<script>
import zhLocale from '@hongluan-ui/locale/lang/zh-cn'
import { Language } from './enums/language'

const THEMES = [
  { mark: 'light', label: '默认' },
  { mark: 'dark', label: '暗色' },
]

export default {
  name: 'App',

  provide: {
    themes: THEMES,
  },
  data() {
    return {
      locale: zhLocale,
      themes: THEMES,
    }
  },
  computed: {
    lang() {
      return this.$route.path.split('/')[1] || Language.CN
    },
    isComponent() {
      return /^component-/.test(this.$route.name || '')
    },
  },

  watch: {
    // lang(val) {
    //   localize(val)
    // },
  },

  mounted() {
    // localize(this.lang)
  },

  methods: {
  },
}
</script>
