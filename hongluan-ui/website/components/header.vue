<template>
  <hl-header ref="header">
    <nav>
      <router-link :to="`/${lang}`" class="nav-logo">
        <!-- logo -->
        <slot>
          <svg
            viewBox="0 0 140 30"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <title>logo</title>
            <defs>
              <linearGradient id="linearGradient-1" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop stop-color="#7A66FF" offset="0%" />
                <stop stop-color="#4436FF" offset="100%" />
              </linearGradient>
              <linearGradient id="linearGradient-2" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop stop-color="#3AE4E0" offset="0%" />
                <stop stop-color="#1BC5BD" offset="100%" />
              </linearGradient>
            </defs>
            <g id="logo" fill-rule="nonzero">
              <path
                d="M25.2259303,1.68179061 L25.2259303,28.3182713 C25.2259303,29.2470644 24.4729947,30 23.5442016,30 C23.1623289,30 22.7918264,29.8700347 22.493634,29.6314808 L5.84583355,16.3132404 C5.12056799,15.733028 5.00297921,14.6747289 5.58319166,13.9494634 C5.66077277,13.852487 5.74885717,13.7644026 5.84583355,13.6868215 L22.493634,0.368581135 C23.2188996,-0.211631318 24.2771986,-0.0940425373 24.8574111,0.63122303 C25.095965,0.929415469 25.2259303,1.29991796 25.2259303,1.68179061 Z"
                fill="url(#linearGradient-1)"
                opacity="0.8"
              />
              <path
                d="M0,1.68179061 L0,28.3182713 C0,29.2470644 0.752935578,30 1.68172868,30 C2.06360133,30 2.43410383,29.8700347 2.73229626,29.6314808 L19.3800967,16.3132404 C20.1053623,15.733028 20.2229511,14.6747289 19.6427386,13.9494634 C19.5651575,13.852487 19.4770731,13.7644026 19.3800967,13.6868215 L2.73229626,0.368581135 C2.0070307,-0.211631318 0.948731662,-0.0940425373 0.368519209,0.63122303 C0.129965257,0.929415469 0,1.29991796 0,1.68179061 Z"
                fill="url(#linearGradient-2)"
                opacity="0.8"
              />
              <path
                d="M50.8966294,9 C53.3785568,9 55.402923,10.9590523 55.5077499,13.4151788 L55.512014,13.6153846 L55.512014,16.3846154 C55.512014,18.9336219 53.4456359,21 50.8966294,21 C48.414702,21 46.3903358,19.0409477 46.285509,16.5848212 L46.2812448,16.3846154 L46.2812448,13.6153846 C46.2812448,11.0663781 48.3476229,9 50.8966294,9 Z M73.0504756,9 C75.1172654,9 76.8667599,10.3585027 77.4547255,12.2312746 L75.4493863,12.231035 C74.9706111,11.4031635 74.0755916,10.8461538 73.0504756,10.8461538 C71.5756932,10.8461538 70.3701732,11.999003 70.2859457,13.4526713 L70.2812448,13.6153846 L70.2812448,16.3846154 C70.2812448,17.9140193 71.5210716,19.1538462 73.0504756,19.1538462 C74.5252579,19.1538462 75.7307779,18.000997 75.8150054,16.5473287 L75.8197063,16.3846154 L75.8197063,15.9230769 L73.9735525,15.9230769 C73.4637512,15.9230769 73.0504756,15.5098013 73.0504756,15 L73.0504756,14.0769231 L77.6658602,14.0769231 L77.6658602,16.3846154 C77.6658602,18.9336219 75.5994821,21 73.0504756,21 C70.5685481,21 68.5441819,19.0409477 68.4393551,16.5848212 L68.4350909,16.3846154 L68.4350909,13.6153846 C68.4350909,11.0663781 70.501469,9 73.0504756,9 Z M89.6658602,9.46153846 L89.6658602,16.3846154 C89.6658602,17.9140193 90.905687,19.1538462 92.4350909,19.1538462 C93.9098733,19.1538462 95.1153933,18.000997 95.1996208,16.5473287 L95.2043217,16.3846154 L95.2043217,9.46153846 L97.0504756,9.46153846 L97.0504756,16.3846154 C97.0504756,18.9336219 94.9840975,21 92.4350909,21 C89.9531635,21 87.9287973,19.0409477 87.8239705,16.5848212 L87.8197063,16.3846154 L87.8197063,9.46153846 L89.6658602,9.46153846 Z M128.435091,9.46153846 L128.435091,16.3846154 C128.435091,17.9140193 129.674918,19.1538462 131.204322,19.1538462 C132.679104,19.1538462 133.884624,18.000997 133.968852,16.5473287 L133.973552,16.3846154 L133.973552,9.46153846 L135.819706,9.46153846 L135.819706,16.3846154 C135.819706,18.9336219 133.753328,21 131.204322,21 C128.722394,21 126.698028,19.0409477 126.593201,16.5848212 L126.588937,16.3846154 L126.588937,9.46153846 L128.435091,9.46153846 Z M122.435091,18.3318548 C123.046853,18.3318548 123.542783,18.8277855 123.542783,19.4395471 C123.542783,20.0513086 123.046853,20.5472394 122.435091,20.5472394 C121.823329,20.5472394 121.327399,20.0513086 121.327399,19.4395471 C121.327399,18.8277855 121.823329,18.3318548 122.435091,18.3318548 Z M37.0504756,9.46153846 L37.0504756,14.0769231 L42.5889371,14.0769231 L42.5889371,9.46153846 L44.4350909,9.46153846 L44.4350909,19.6153846 C44.4350909,20.1251859 44.0218153,20.5384615 43.512014,20.5384615 L42.5889371,20.5384615 L42.5889371,15.9230769 L37.0504756,15.9230769 L37.0504756,19.6153846 C37.0504756,20.1251859 36.6371999,20.5384615 36.1273986,20.5384615 L35.2043217,20.5384615 L35.2043217,9.46153846 L37.0504756,9.46153846 Z M59.2043217,9.46153846 L64.7427832,17.3112729 L64.7427832,9.46153846 L66.5889371,9.46153846 L66.5889371,19.6153846 C66.5889371,20.1251859 66.1756615,20.5384615 65.6658602,20.5384615 L64.7427832,20.5384615 L59.2043217,12.6945424 L59.2043217,19.6153846 C59.2043217,20.1251859 58.7910461,20.5384615 58.2812448,20.5384615 L57.3581679,20.5384615 L57.3581679,9.46153846 L59.2043217,9.46153846 Z M110.896629,9.46153846 L116.435091,17.3112729 L116.435091,9.46153846 L118.281245,9.46153846 L118.281245,19.6153846 C118.281245,20.1251859 117.867969,20.5384615 117.358168,20.5384615 L116.435091,20.5384615 L110.896629,12.6945424 L110.896629,19.6153846 C110.896629,20.1251859 110.483354,20.5384615 109.973552,20.5384615 L109.050476,20.5384615 L109.050476,9.46153846 L110.896629,9.46153846 Z M81.3581679,9.46153846 L81.3581679,18.6923077 L86.8966294,18.6923077 L86.8966294,19.6153846 C86.8966294,20.1251859 86.4833538,20.5384615 85.9735525,20.5384615 L79.512014,20.5384615 L79.512014,9.46153846 L81.3581679,9.46153846 Z M139.512014,9.46153846 L139.512014,19.6153846 C139.512014,20.1251859 139.098738,20.5384615 138.588937,20.5384615 L137.66586,20.5384615 L137.66586,9.46153846 L139.512014,9.46153846 Z M103.512014,9.46153846 L107.204322,20.5384615 L105.358168,20.5384615 L104.435091,17.7692308 L100.742783,17.7692308 L99.8197063,20.5384615 L97.9735525,20.5384615 L101.66586,9.46153846 L103.512014,9.46153846 Z M50.8966294,10.8461538 C49.421847,10.8461538 48.2163271,11.999003 48.1320996,13.4526713 L48.1273986,13.6153846 L48.1273986,16.3846154 C48.1273986,17.9140193 49.3672255,19.1538462 50.8966294,19.1538462 C52.3714118,19.1538462 53.5769318,18.000997 53.6611592,16.5473287 L53.6658602,16.3846154 L53.6658602,13.6153846 C53.6658602,12.0859807 52.4260333,10.8461538 50.8966294,10.8461538 Z M102.588937,12.2307692 L101.358476,15.9230769 L103.819399,15.9230769 L102.588937,12.2307692 Z"
                fill="currentColor"
              />
            </g>
          </svg>
          <hl-dropdown>
            <hl-tag size="sm" class="version">{{ version }}</hl-tag>
            <template #dropdown>
              <hl-dropdown-menu>
                <hl-dropdown-item
                  v-for="v in versions"
                  :key="v.version"
                  @click="switchVersion(v)"
                >
                  {{ v.version }}
                </hl-dropdown-item>
              </hl-dropdown-menu>
            </template>
          </hl-dropdown>
        </slot>
      </router-link>

      <!-- nav -->
      <ul class="nav-item">
        <li v-show="isComponentPage" class></li>
        <li>
          <a
            :class="{'text-primary': $route.path.match(/guide|changelog/)}"
            :href="`#/${lang}/guide/overview`"
          >
            指南
          </a>
        </li>
        <li>
          <a
            :class="{'text-primary': !$route.path.match(/guide|changelog/)}"
            :href="`#/${lang}/component/overview`"
          >
            组件
          </a>
        </li>
        <li>
          <hl-dropdown>
            生态产品
            <span class="caret"></span>
            <template #dropdown>
              <hl-dropdown-menu>
                <hl-dropdown-item v-if="!isGithub">
                  <a
                    active-class="active"
                    href="http://gallery.front.etcc.group"
                    target="_blank"
                    style="position: relative"
                  >组件展厅&nbsp;&nbsp;<img :src="newImg"></a>
                </hl-dropdown-item>
                <hl-dropdown-item>
                  <a
                    active-class="active"
                    :href="businessUrl"
                    target="_blank"
                    style="position: relative"
                  >{{ langConfig.businessComponents }}</a>
                </hl-dropdown-item>
                <hl-dropdown-item>
                  <a
                    active-class="active"
                    :href="themeEditorUrl"
                    target="_blank"
                    style="position: relative"
                  >主题编辑器</a>
                </hl-dropdown-item>
                <hl-dropdown-item>
                  <a
                    active-class="active"
                    :href="iconsUrl"
                    target="_blank"
                    style="position: relative"
                  >Icons</a>
                </hl-dropdown-item>
                <hl-dropdown-item>
                  <a
                    active-class="active"
                    :href="hooksUrl"
                    target="_blank"
                    style="position: relative"
                  >Hooks</a>
                </hl-dropdown-item>
              </hl-dropdown-menu>
            </template>
          </hl-dropdown>
        </li>

        <li>
          <hl-icon size="lg" class="cursor-pointer" @click="switchTheme(currentTheme != 'dark' ? 'dark' : 'light')">
            <two-sun v-if="currentTheme != 'dark'" />
            <two-moon v-else />
          </hl-icon>
        </li>
      </ul>
    </nav>
  </hl-header>
</template>
<script>
import { Language } from '../enums/language'
import compoLang from '../i18n/component.json'
import docVersions from '../versions.json'
import newImg from '../assets/images/new.gif?url'

export default {
  components: {},
  inject: ['themes'],
  data() {
    const nowDoc = docVersions.find(d => location.pathname.indexOf(d.dir) !== -1) || docVersions[0]
    return {
      newImg,
      currentTheme: '',
      active: '',
      versions: docVersions,
      version: nowDoc.version,
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
    hooksUrl() {
      return __IS_GITHUB__ ? '/hongluan-hooks/' : 'http://hooks.front.etcc.group/'
    },
    iconsUrl() {
      return __IS_GITHUB__ ? '/hongluan-icons/' : 'http://icons.front.etcc.group/'
    },
    themeEditorUrl() {
      return __IS_GITHUB__ ? '/hongluan-theme-editor/' : 'http://theme.front.etcc.group/'
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
  mounted() {
    const theme = localStorage.getItem('$hl_theme')
    if (theme) {
      const hasTheme = this.themes.find(t => t.mark === theme)
      this.currentTheme = hasTheme ? theme : this.themes[0].mark
    } else {
      const defaultTheme = this.themes.find(t => t.default)
      this.currentTheme = defaultTheme ? defaultTheme.mark : this.themes[0].mark
    }
    this.switchTheme(this.currentTheme)
  },
  methods: {

    switchTheme(command) {
      if (command === 'dark') {
        document.querySelector('body').classList.add('dark-mode')
      } else {
        document.querySelector('body').classList.remove('dark-mode')
      }

      this.currentTheme = command
      localStorage.setItem('$hl_theme', command)
    },

    switchVersion(v) {
      if (v.version === this.version) return
      location.href = `${location.origin}/${__IS_GITHUB__ ? 'hongluan-ui/' : ''}${v.dir}/${location.hash} `
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
