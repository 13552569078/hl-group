<template>
  <hl-header ref="header">
    <nav class="header-wrap">
      <router-link :to="`/${lang}`" class="nav-logo" style="width: 160px">
        <!-- logo -->
        <slot>
          <h5 class="m-l-sm">繁星PC组件库</h5>
          <hl-tag size="sm" class="version">
            {{ version }}
          </hl-tag>
        </slot>
      </router-link>

      <!-- nav -->
      <ul class="nav-item m-r-md">
        <li v-show="isComponentPage" class=""></li>
        <li>
          <hl-dropdown split="link">
            生态产品
            <template #dropdown>
              <hl-dropdown-menu>
                <hl-dropdown-item>
                  <a active-class="active" href="http://hl.front.etcc.group/" target="_blank" style="position: relative"> 鸿鸾基础组件 </a>
                </hl-dropdown-item>
                <hl-dropdown-item>
                  <a active-class="active" :href="businessUrl" target="_blank" style="position: relative"> 鸿鸾业务组件 </a>
                </hl-dropdown-item>
                <hl-dropdown-item>
                  <a active-class="active" href="http://pro.front.etcc.group/" target="_blank" style="position: relative"> 鸿鸾Pro </a>
                </hl-dropdown-item>
                <hl-dropdown-item>
                  <a active-class="active" :href="hooksUrl" target="_blank" style="position: relative"> Hooks </a>
                </hl-dropdown-item>
                <hl-dropdown-item>
                  <a active-class="active" :href="onePictureUrl" target="_blank">
                    {{ langConfig.onepictureComponents }}
                  </a>
                </hl-dropdown-item>
              </hl-dropdown-menu>
            </template>
          </hl-dropdown>
        </li>
      </ul>
    </nav>
  </hl-header>
</template>
<script>
import { version } from 'fx-front-framework'
import { Language } from '../enums/language'
import compoLang from '../i18n/component.json'

export default {
  components: {},
  data() {
    return {
      active: '',
      versions: [],
      version,
      verDropdownVisible: true,
      langDropdownVisible: true,
      langs: {
        [Language.CN]: '中文',
      },
    }
  },

  computed: {
    lang() {
      return this.$route.path.split('/')[1] || Language.CN
    },
    displayedLang() {
      return this.langs[this.lang] || '中文'
    },
    langConfig() {
      return compoLang.filter(config => config.lang === this.lang)[0]['header']
    },
    isComponentPage() {
      return /^component/.test(this.$route.name)
    },
    themeLabel() {
      const curTheme = this.themes.find(t => t.mark === this.currentTheme)
      return curTheme ? curTheme.label : ''
    },
    isGithub() {
      return __IS_GITHUB__ ? true : false
    },
    businessUrl() {
      return __IS_GITHUB__ ? '/hongluan-business-ui/' : 'http://hb.front.etcc.group/'
    },
    onePictureUrl() {
      return __IS_GITHUB__ ? '/hongluan-onepicture-ui/' : 'http://ho.front.etcc.group/'
    },
    proUrl() {
      return __IS_GITHUB__ ? '/hongluan-pro/' : 'http://pro.front.etcc.group/'
    },
    hooksUrl() {
      return __IS_GITHUB__ ? '/hongluan-hooks/' : 'http://hooks.front.etcc.group/'
    },
  },
  created() {
    // const xhr = new XMLHttpRequest()
    // xhr.onreadystatechange = () => {
    //   if (xhr.readyState === 4 && xhr.status === 200) {
    //     const versions = JSON.parse(xhr.responseText)
    //     this.versions = Object.keys(versions).reduce((prev, next) => {
    //       prev[next] = versions[next]
    //       return prev
    //     }, {})
    //   }
    // }
    // xhr.open('GET', '/versions.json')
    // xhr.send()
  },
  methods: {
    switchVersion(version) {
      if (version === this.version) return
      location.href = `${location.origin}/${this.versions[version]}/${location.hash} `
    },

    switchLang(targetLang) {
      if (this.lang === targetLang) return
      localStorage.setItem('ELEMENT_LANGUAGE', targetLang)
      this.$router.push(this.$route.path.replace(this.lang, targetLang))
    },

    handleVerDropdownToggle(visible) {
      this.verDropdownVisible = visible
    },

    handleLangDropdownToggle(visible) {
      this.langDropdownVisible = visible
    },
  },
}
</script>
<style lang="scss" scoped>
</style>
