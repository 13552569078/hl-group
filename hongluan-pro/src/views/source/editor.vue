<template>
  <prism-editor
    v-model="content"
    class="source-editor"
    :highlight="highlighter"
    line-numbers
  />
</template>

<script>
import { defineComponent, onBeforeUnmount, ref } from 'vue'
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css' // import the styles somewhere

import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism-twilight.css'

const CHARMAP = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"', '$ace$': '{' }
const escape2Html = str => {
  return str.replace(/&(lt|gt|nbsp|amp|quot);/ig, (_, t) => CHARMAP[t]).replace(/\$ace\$/ig, _ => CHARMAP[_])
}

export default defineComponent({
  components: {
    PrismEditor,
  },
  setup() {
    const content = ref('')
    const code = localStorage.getItem('$source-code') ?? ''
    content.value = escape2Html(code).replace(/\s*show-source\s*([^>]*)?/, '')

    const highlighter = code => {
      return highlight(code, languages.js)
    }

    onBeforeUnmount(() => {
      // localStorage.removeItem('$source-code')
    })

    return {
      content,
      highlighter,
    }
  },
})
</script>

<style lang="scss" scoped>
.source-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #25303f;
  color: #ccc;

  /* you must provide font-family font-size line-height. Example:*/
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
  height: 100vh;
  width: 100vw;
  overflow-y: auto;
}
</style>
<style>
body {
  padding: 0;
  margin: 0;
  overflow-y: hidden;
}
#amapContainer {
  display: none;
}
</style>

