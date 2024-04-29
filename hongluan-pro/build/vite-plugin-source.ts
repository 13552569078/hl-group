import type { Plugin } from 'vite'
import { escape } from 'querystring'

export default function SourceDisplayer(): Plugin {

  return {
    name: 'vite-plugin-source-displayer', // 必须的，将会在 warning 和 error 中显示
    transform(src, id) {
      const result = {
        code: src,
        map: null,
      }
      if (id.endsWith('.vue')) {
        const lines = src.split('\n')
        let tplStart, params
        for(let i=0; i<lines.length; i++){
          if (lines[i].trim().startsWith('<template show-source')) {
            const matches = lines[i].trim().match(/show-source(?:=["'](.*)["'])?/)
            if (matches[1]) params = matches[1]
            tplStart = i
            break
          }
        }
        if (!isNaN(+tplStart)) {
          const sourceStr = Buffer.from(escape(src)).toString('base64')
          const uuid = Date.now().toString(36) + Math.random().toString(36).substring(2)
          lines[tplStart + 1] = lines[tplStart + 1].replace(/(<\s*[^>]+\s*)/, (_, $1) => $1 + ` v-source="{id: '${uuid}', params: '${params}', source: '${sourceStr}'}" `)
        }
        result.code = lines.join('\n')
      }
      return result
    },
  }
}
