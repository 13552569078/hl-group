/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const mdContainer = require('markdown-it-container')

module.exports = md => {
  md.use(mdContainer, 'demo-fs', {
    validate(params) {
      return params.trim().match(/^demo\-fs(?:-dark)?\s*(.*)$/)
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\-fs(?:-dark)?\s*(.*)$/)
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : ''
        let filePath = tokens[idx + 2].type === 'inline' ? tokens[idx + 2].content : '', code = ''
        if (filePath) {
          code = fs.readFileSync(path.resolve(__dirname, '../examples/' + filePath.trim() + '.vue')).toString()
        }
        code = md.utils.escapeHtml(code)

        return `<demo-block fs
          ${tokens[idx].info.trim().indexOf('demo-fs-dark') > -1 ? 'dark' : ''}
          :demos="demos"
          path-name="${filePath.trim()}"
          source-code="${code}"
        >
          ${description ? `<div>${md.render(description)}</div>` : ''}
          <!-- demo-block-mark -->
        `
      }
      return '</demo-block>'
    },
  })

  md.use(mdContainer, 'demo-dark', {
    validate(params) {
      return params.trim().match(/^demo\-dark\s*(.*)$/)
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\-dark\s*(.*)$/)
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : ''
        const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : ''
        return `<demo-block dark source-code="${md.utils.escapeHtml(content)}">
          ${description ? `<div>${md.render(description)}</div>` : ''}
          <!--hl-demo: ${content}:hl-demo-->
        `
      }
      return '</demo-block>'
    },
  })

  md.use(mdContainer, 'demo-gray', {
    validate(params) {
      return params.trim().match(/^demo\-gray\s*(.*)$/)
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\-gray\s*(.*)$/)
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : ''
        const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : ''
        return `<demo-block gray source-code="${md.utils.escapeHtml(content)}">
          ${description ? `<div>${md.render(description)}</div>` : ''}
          <!--hl-demo: ${content}:hl-demo-->
        `
      }
      return '</demo-block>'
    },
  })

  md.use(mdContainer, 'demo', {
    validate(params) {
      return params.trim().match(/^demo\s*(.*)$/)
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : ''
        const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : ''
        return `<demo-block source-code="${md.utils.escapeHtml(content)}">
          ${description ? `<div>${md.render(description)}</div>` : ''}
          <!--hl-demo: ${content}:hl-demo-->
        `
      }
      return '</demo-block>'
    },
  })

  md.use(mdContainer, 'demo-tabs', {
    validate(params) {
      return params.trim().match(/^demo\-tabs\s*(.*)$/)
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\-tabs\s*(.*)$/)
      if (tokens[idx].nesting === 1) {
        let content = ['<div class="tab-items">']
        for(let i = idx + 1; i < tokens.length; i++) {
          let t = tokens[i]
          if (t.type === 'container_tabs_close') break
          else {
            content.push(`<div class="tab-title" data-idx="${i - idx}">${t.info}</div>`)
          }
        }
        content.push('</div>')
        return `<demo-tabs class="${m[1]}">${content.join('')}`
      }
      return '</demo-tabs>'
    },
  })

  md.use(mdContainer, 'tip', {
    render(tokens, idx, _options, env, slf) {
      if (tokens[idx].nesting === 1) {
        tokens[idx].attrJoin('class', 'doc-tip')
      }
      return slf.renderToken(tokens, idx, _options, env, slf)
    },
  })

  md.use(mdContainer, 'warning', {
    render(tokens, idx, _options, env, slf) {
      if (tokens[idx].nesting === 1) {
        tokens[idx].attrJoin('class', 'doc-tip warning')
      }
      return slf.renderToken(tokens, idx, _options, env, slf)
    },
  })

  md.use(mdContainer, 'danger', {
    render(tokens, idx, _options, env, slf) {
      if (tokens[idx].nesting === 1) {
        tokens[idx].attrJoin('class', 'doc-tip danger')
      }
      return slf.renderToken(tokens, idx, _options, env, slf)
    },
  })
}
