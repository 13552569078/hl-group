/* eslint-disable @typescript-eslint/no-var-requires */
const { compileTemplate, compileScript, TemplateCompiler, parse } = require('vue/compiler-sfc')

function stripScript(content) {
  const result = content.match(/<(script)[^>]*>([\s\S]+)<\/\1>/)
  return result && result[2] ? result[2].trim() : ''
}

function isSetupScript(content) {
  return /<(script).*setup.*>([\s\S]+)<\/\1>/.test(content)
}

function stripStyle(content) {
  const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/)
  return result && result[2] ? result[2].trim() : ''
}

// 编写例子时不一定有 template。所以采取的方案是剔除其他的内容
function stripTemplate(content) {
  content = content.trim()
  if (!content) {
    return content
  }
  return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim()
}

function pad(source) {
  return source
    .split(/\r?\n/)
    .map(line => `  ${line}`)
    .join('\n')
}

const templateReplaceRegex = /<template>([\s\S]+)<\/template>/g
function genInlineComponentText(template, script, isSetup = false) {

  if (isSetup) {
    const { descriptor } = parse(`<script lang="ts" setup>${script}</script>`)
    const result = compileScript(descriptor, {
      id: 'xx',
      inlineTemplate: false,
    })
    // 替换esm格式为commonjs格式
    script = result.content.replace('defineComponent as _defineComponent' , 'defineComponent: _defineComponent')
  }

  // https://github.com/vuejs/vue-loader/blob/423b8341ab368c2117931e909e2da9af74503635/lib/loaders/templateLoader.js#L46
  let source = template
  if (templateReplaceRegex.test(source)) {
    source = source.replace(templateReplaceRegex, '$1')
  }
  const finalOptions = {
    source: `${source}`,
    filename: 'inline-component', // TODO：这里有待调整
    compiler: TemplateCompiler,
    compilerOptions: {
      mode: 'function',
    },
    id: 'xxxx',
  }
  const compiled = compileTemplate(finalOptions)
  // tips
  if (compiled.tips && compiled.tips.length) {
    compiled.tips.forEach(tip => {
      console.warn(tip)
    })
  }
  // errors
  if (compiled.errors && compiled.errors.length) {
    console.error(
      `\n  Error compiling template:\n${pad(compiled.source)}\n` +
        compiled.errors.map(e => `  - ${e}`).join('\n') +
        '\n',
    )
  }
  let demoComponentContent = `
    ${(compiled.code).replace('return function render','function render')}
  `
  // todo: 这里采用了硬编码有待改进
  script = script.trim()
  if (script) {
    script = script
      .replace(/export\s+default/, 'const democomponentExport =')
      .replace(/import ({.*}) from 'vue'/g, (s, s1) => `const ${s1} = Vue`)
      .replace(/import ({.*}) from 'hongluan-ui'/g, (s, s1) => `const ${s1.replace(/ as /g, ': ')} = HongluanUI`)
      .replace(/import ({.*}) from '@hongluan-ui\/icons'/g, (s, s1) => `const ${s1} = HongluanUIIcons`)
  } else {
    script = 'const democomponentExport = {}'
  }

  demoComponentContent = `(function() {
    ${demoComponentContent}
    ${script}
    return {
      render,
      ...democomponentExport
    }
  })()`

  return demoComponentContent
}

module.exports = {
  stripScript,
  isSetupScript,
  stripStyle,
  stripTemplate,
  genInlineComponentText,
}
