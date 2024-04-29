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
        let content = tokens[idx + 2].type === 'inline' ? tokens[idx + 2].content : ''
        if (content) {
          content = fs.readFileSync(path.resolve(__dirname, '../examples/' + content.trim() + '.vue')).toString()
        }
        return `<demo-block fs ${tokens[idx].info.trim().indexOf('demo-fs-dark') > -1 ? 'dark' : ''}>
          ${description ? `<div>${md.render(description)}</div>` : ''}
          <!--fx-demo: ${content}:fx-demo-->
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
        return `<demo-block dark>
        ${description ? `<div>${md.render(description)}</div>` : ''}
        <!--fx-demo: ${content}:fx-demo-->
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
        return `<demo-block>
        ${description ? `<div>${md.render(description)}</div>` : ''}
        <!--fx-demo: ${content}:fx-demo-->
        `
      }
      return '</demo-block>'
    },
  })

  md.use(mdContainer, 'tabs', {
    validate(params) {
      return params.trim().match(/^tabs\s*(.*)$/)
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^tabs\s*(.*)$/)
      if (tokens[idx].nesting === 1) {
        let content = ['<div class="tab-items">']
        for(let i = idx + 1; i < tokens.length; i++) {
          let t = tokens[i]
          if (t.type === 'container_tabs_close') break
          else {
            content.push(`<span class="tab-title" data-idx="${i-idx}">${t.info}</span>`)
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
        tokens[idx].attrJoin('class', 'md-tip')
      }
      return slf.renderToken(tokens, idx, _options, env, slf)
    },
  })
  md.use(mdContainer, 'warning', {
    render(tokens, idx, _options, env, slf) {
      if (tokens[idx].nesting === 1) {
        tokens[idx].attrJoin('class', 'md-warning')
      }
      return slf.renderToken(tokens, idx, _options, env, slf)
    },
  })
}
