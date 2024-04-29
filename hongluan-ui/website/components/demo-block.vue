<template>
  <div>
    <div
      class="demo-block"
      :class="[blockClass, { 'hover': hovering }]"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
    >
      <div class="source">
        <component :is="demos['../../../examples/' + pathName + '.vue'].default" v-if="fs" />
        <slot v-else name="source"></slot>
      </div>
      <div ref="meta" class="meta">
        <div class="code-content">
          <hl-tabs
            v-if="$slots.highlightScss"
            v-model="activeName"
            type="line"
            class="code-tabs"
            @tab-click="handleClick"
          >
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
            <pre><code class="html">{{ sourceCode }}</code></pre>
          </div>
        </div>
      </div>
      <div
        ref="control"
        class="demo-block-control"
        :class="{ 'is-fixed': fixedControl }"
        @click="isExpanded = !isExpanded"
      >
        <transition name="text-slide">
          <span>{{ controlText }}</span>
        </transition>
        <div v-show="isExpanded" class="control-button-container">
          <hl-popover tooltip effect="dark" :content="langConfig['copy-button-text']">
            <template #reference>
              <hl-button type="link" @click.stop="copy">
                <template #icon>
                  <hl-icon>
                    <fill-copy />
                  </hl-icon>
                </template>
              </hl-button>
            </template>
          </hl-popover>

          <hl-popover tooltip effect="dark" :content="langConfig['tooltip-text']">
            <template #reference>
              <hl-button type="link" @click.stop="goCodepen">
                <template #icon>
                  <hl-icon>
                    <fill-play />
                  </hl-icon>
                </template>
              </hl-button>
            </template>
          </hl-popover>
        </div>
      </div>
    </div>
    <div v-if="$slots.default" class="doc-tip">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import { nextTick } from 'vue'
import hljs from 'highlight.js'
import clipboardCopy from 'clipboard-copy'
import compoLang from '../i18n/component.json'
import { utoa } from '../util'

export default {
  props: {
    dark: Boolean,
    fs: Boolean,
    demos: Object,
    pathName: String,
    sourceCode: String,
  },
  data() {
    return {
      activeName: 'VUE',
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
      return `demo-${this.lang
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
      if (this.$el.querySelectorAll('.code-tabs .tabs-item').length > 0) {
        return (
          this.$el.getElementsByClassName('tabs-item')[0].clientHeight +
          this.$el.getElementsByClassName('highlight')[0].clientHeight
        )
      }
      return this.$el.getElementsByClassName('highlight')[0].clientHeight
    },
    demoCodeUrl() {
      return import.meta.env.DEV ? 'http://localhost:8082' : (__IS_GITHUB__ ? '/hongluan-play' : 'http://play.front.etcc.group')
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
          '.page-component__scroll > .scrollbar-wrap',
        )
        this.scrollParent &&
          this.scrollParent.addEventListener('scroll', this.scrollHandler)
        this.scrollHandler()
      }, 200)
    },
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
      const res = clipboardCopy(this.sourceCode)

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
      const MAIN_FILE_NAME = 'App.vue'

      const code = decodeURIComponent(this.sourceCode)
      const originCode = {
        [MAIN_FILE_NAME]: code,
      }

      const encoded = utoa(JSON.stringify(originCode))
      const link = `${this.demoCodeUrl}/#${encoded}`
      window.open(link, '_blank')
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
