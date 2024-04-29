/* eslint-disable @typescript-eslint/no-var-requires */
const {
  stripScript,
  stripTemplate,
  genInlineComponentText,
} = require('./util')
const md = require('./config')

module.exports = function(source) {
  let content = md.render(source)
  const startTag = '<!--fx-demo:'
  const startTagLen = startTag.length
  const endTag = ':fx-demo-->'
  const endTagLen = endTag.length

  let componenetsString = ''
  let id = 0 // demo 的 id
  let output = [] // 输出的内容
  let start = 0 // 字符串开始位置

  let commentStart = content.indexOf(startTag)
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen)
  while (commentStart !== -1 && commentEnd !== -1) {
    output.push(content.slice(start, commentStart))

    const commentContent = content.slice(commentStart + startTagLen, commentEnd)
    const html = stripTemplate(commentContent)
    const script = stripScript(commentContent)
    let demoComponentContent = genInlineComponentText(html, script)
    const demoComponentName = `fx-demo${id}`
    output.push(`<template #source><${demoComponentName} /></template>`)
    componenetsString += `${JSON.stringify(demoComponentName)}: ${demoComponentContent},`

    // 处理demo-fs中的源代码高亮部分
    const demoBlockStart = content.lastIndexOf('<demo-block', commentStart)
    const demoBlockEnd = content.indexOf('</demo-block>', commentEnd)
    if (demoBlockStart > -1 && /<demo-block\s*fs/.test(content.slice(demoBlockStart, demoBlockEnd))) {
      let demoCodeFs = content.slice(commentEnd + endTagLen, demoBlockEnd)
      if (demoCodeFs.trim().length) {
        content = content.replace(
          demoCodeFs,
          `<template #highlight><pre v-pre><code class="html">${md.utils.escapeHtml(commentContent)}</code></pre></template>`,
        )
      }
    }

    // 重新计算下一次的位置
    id++
    start = commentEnd + endTagLen
    commentStart = content.indexOf(startTag, start)
    commentEnd = content.indexOf(endTag, commentStart + startTagLen)
  }

  // 仅允许在 demo 不存在时，才可以在 Markdown 中写 script 标签
  // todo: 优化这段逻辑

  let pageScript = ''
  if (componenetsString) {
    pageScript = `<script lang="ts">
      import * as Vue from 'vue';
      import * as HongluanUI from 'hongluan-ui';
      import * as HongluanBusinessUI from 'hongluan-business-ui';
      import * as HongluanUIIcons from '@hongluan-ui/icons';
      export default {
        name: 'component-doc',
        components: {
          ${componenetsString}
        }
      }
    </script>`
  } else if (content.indexOf('<script>') === 0) { // 硬编码，有待改善
    start = content.indexOf('</script>') + '</script>'.length
    pageScript = content.slice(0, start)
  }

  output.push(content.slice(start))
  const result = `
    <template>
      <section>
      ${output.join('')}
      </section>
      <right-nav />
    </template>
    ${pageScript}
  `
  // console.log('resul--------\n', result)
  return result
}
