<template>
  <div>
    <div class="demo-block" :class="[blockClass, { 'hover': hovering }]" @mouseenter="hovering = true" @mouseleave="hovering = false">
      <div class="source">
        <slot name="source"></slot>
      </div>
      <div ref="meta" class="meta">
        <div class="code-content">
          <hl-tabs v-if="$slots.highlightScss" v-model="activeName" type="line" @tab-click="handleClick">
            <hl-tab-pane label="VUE" name="VUE">
              <div class="highlight">
                <slot name="highlight"></slot>
              </div>
            </hl-tab-pane>
            <hl-tab-pane label="SCSS" name="SCSS">
              <div ref="metaScss" class="meta scss-code">
                <slot name="highlightScss"></slot>
              </div>
            </hl-tab-pane>
          </hl-tabs>
          <div v-else class="highlight">
            <slot name="highlight"></slot>
          </div>
        </div>
      </div>
      <div ref="control" class="demo-block-control" :class="{ 'is-fixed': fixedControl }" @click="isExpanded = !isExpanded">
        <transition name="text-slide">
          <span>{{ controlText }}</span>
        </transition>
        <div class="control-button-container">
          <hl-button
            v-show="isExpanded"
            ref="copyButton"
            type="link"
            class="copy-button"
            @click.stop="copy"
          >
            {{ langConfig['copy-button-text'] }}
          </hl-button>
          <hl-popover tooltip effect="dark" :content="langConfig['tooltip-text']">
            <template #reference>
              <hl-button
                v-show="isExpanded"
                type="link"
                class="run-online-button"
                @click.stop="goCodepen"
              >
                {{ langConfig['run-online-button-text'] }}
              </hl-button>
            </template>
          </hl-popover>
        </div>
      </div>
    </div>
    <div v-if="$slots.default" class="demo-description">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { nextTick } from 'vue'
import hljs from 'highlight.js'
import clipboardCopy from 'clipboard-copy'
import compoLang from '../i18n/component.json'
import { stripScript, stripStyle, stripTemplate } from '../util'
const stripTemplateAndRemoveTemplate = code => {
  const result = stripTemplate(code)
  if (result.indexOf('<template>') === 0) {
    return result.replace(/^<template>/, '').replace(/<\/template>$/, '')
  }
  return result
}
export default {
  props: {
    dark: Boolean,
    fs: Boolean,
  },
  data() {
    return {
      activeName: 'VUE',
      codepen: {
        script: '',
        html: '',
        style: '',
      },
      hovering: false,
      isExpanded: false,
      fixedControl: false,
      scrollParent: null,
    }
  },

  computed: {
    lang() {
      return this.$route.path.split('/')[1]
    },

    langConfig() {
      return compoLang.filter(config => config.lang === this.lang)[0][
        'demo-block'
      ]
    },

    blockClass() {
      return `demo-${
        this.lang
      } demo-${this.$router.currentRoute.value.path.split('/').pop()} ${this.dark ? 'dark' : ''}`
    },

    iconClass() {
      return this.isExpanded ? 'hl-icon-caret-top' : 'hl-icon-caret-bottom'
    },

    controlText() {
      return this.isExpanded
        ? this.langConfig['hide-text']
        : this.langConfig['show-text']
    },

    codeArea() {
      return this.$el.getElementsByClassName('meta')[0]
    },

    codeAreaHeight() {
      if (this.$el.getElementsByClassName('tabs-item').length > 0) {
        return (
          this.$el.getElementsByClassName('tabs-item')[0].clientHeight +
          this.$el.getElementsByClassName('highlight')[0].clientHeight
        )
      }
      return this.$el.getElementsByClassName('highlight')[0].clientHeight
    },
  },

  watch: {
    isExpanded(val) {
      this.codeArea.style.height = val ? `${this.codeAreaHeight + 1}px` : '0'
      if (!val) {
        this.fixedControl = false
        this.$refs.control.style.left = '0'
        this.removeScrollHandler()
        return
      }
      setTimeout(() => {
        this.scrollParent = document.querySelector(
          '.page-component__scroll > .hl-scrollbar__wrap',
        )
        this.scrollParent &&
          this.scrollParent.addEventListener('scroll', this.scrollHandler)
        this.scrollHandler()
      }, 200)
    },
  },

  created() {
    const highlight = this.$slots.highlight()
    if (highlight && highlight[0]) {
      let code = ''
      let cur = highlight[0]
      if (cur.type === 'pre' && cur.children && cur.children[0]) {
        cur = cur.children[0]
        if (cur.type === 'code') {
          code = cur.children
        }
      }
      if (code) {
        this.codepen.html = stripTemplateAndRemoveTemplate(code)
        this.codepen.script = stripScript(code)
        this.codepen.style = stripStyle(code)
      }
    }
  },

  mounted() {
    nextTick(() => {
      let highlight = this.$el.getElementsByClassName('highlight')[0]
      if (this.$el.getElementsByClassName('description').length === 0) {
        highlight.style.width = '100%'
        highlight.borderRight = 'none'
      }
      try {
        hljs.highlightBlock(highlight.querySelector('code'))
      } catch (error) {
        console.log(error)
      }

      const scssEles = this.$el.getElementsByClassName('scss-code')
      highlight = scssEles.length ? scssEles[0] : null

      try {
        highlight && hljs.highlightBlock(highlight.querySelector('code'))
      } catch (error) {
        console.log(error)
      }
    })
  },

  beforeUnmount() {
    this.removeScrollHandler()
  },

  methods: {
    copy() {
      const res = clipboardCopy(`
<template>
${this.codepen.html}
</template>

<script>
${'  ' + this.codepen.script}
\<\/script>

<style>
${this.codepen.style}
</style>
`)

      res.then(() => {
        this.$message({
          showClose: true,
          message: this.langConfig['copy-success'],
          type: 'success',
        })
      }).catch(() => {
        this.$message({
          showClose: true,
          message: this.langConfig['copy-error'],
          type: 'error',
        })
      })
    },
    goCodepen() {
      // since 2.6.2 use code rather than jsfiddle https://blog.codepen.io/documentation/api/prefill/
      const { script, html, style } = this.codepen
      const resourcesTpl = '<scr' + 'ipt src="//unpkg.com/vue@next"></scr' + 'ipt>' +
        '\n<scr' + `ipt src="//unpkg.com/hongluan-ui/dist/index.full.js"></scr` + 'ipt>'
      let htmlTpl = `${resourcesTpl}\n<div id="app">\n${html.trim()}\n</div>`
      let cssTpl = `@import url("//unpkg.com/hongluan-ui/dist/index.css");\n${(style || '').trim()}\n`
      let jsTpl = script ? script.replace(/export default/, 'var Main =').trim().replace(/import ({.*}) from 'vue'/g, (s, s1) => `const ${s1} = Vue`).replace(/import ({.*}) from 'hongluan-ui'/g, (s, s1) => `const ${s1} = HongluanUI`) : 'var Main = {}'
      jsTpl += '\n;const app = Vue.createApp(Main);\napp.use(HongluanUI);\napp.mount("#app")'
      const data = {
        js: jsTpl,
        css: cssTpl,
        html: htmlTpl,
      }
      const form = document.getElementById('fiddle-form') || document.createElement('form')
      while (form.firstChild) {
        form.removeChild(form.firstChild)
      }
      form.method = 'POST'
      form.action = 'https://codepen.io/pen/define/'
      form.target = '_blank'
      form.style.display = 'none'

      const input = document.createElement('input')
      input.setAttribute('name', 'data')
      input.setAttribute('type', 'hidden')
      input.setAttribute('value', JSON.stringify(data))

      form.appendChild(input)
      document.body.appendChild(form)

      form.submit()
      document.body.removeChild(form)
    },

    scrollHandler() {
      const { top, bottom, left } = this.$refs.meta.getBoundingClientRect()
      this.fixedControl =
        bottom > document.documentElement.clientHeight &&
        top + 44 <= document.documentElement.clientHeight
    },

    removeScrollHandler() {
      this.scrollParent &&
        this.scrollParent.removeEventListener('scroll', this.scrollHandler)
    },
  },
}
</script>
<style lang="scss" scoped>
</style>
