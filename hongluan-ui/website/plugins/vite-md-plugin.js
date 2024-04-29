import path from 'path'
import fs from 'fs'
import md from '../md-loader'

const markdownRegex = /\.md$/
export default function MarkdownPlugin() {
  return {
    name: 'transform-markdown',
    transform(src, id) {
      if (markdownRegex.test(id)) {
        const componentId = path.basename(id, '.md')
        const isExist = fs.existsSync(path.resolve(__dirname, `../examples/${componentId}`))

        let code = md(src)
        if (isExist) {
          code = `<script setup>const demos = import.meta.globEager('../../../examples/${componentId}/*.vue')</script>` + code
        }

        return {
          code,
          map: null,
        }
      }
    },
  }
}
