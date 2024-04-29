import md from '../md-loader'

const markdownRegex = /\.md$/
export default function MarkdownPlugin() {
  return {
    name: 'transform-markdown',
    transform(src, id) {
      if (markdownRegex.test(id)) {
        return {
          code: md(src),
          map: null,
        }
      }
    },
  }
}
