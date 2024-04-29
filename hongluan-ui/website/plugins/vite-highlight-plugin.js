
const highlightRegex = /highlight\.js[/\\]lib[/\\]index.js/
export default function HighlightPlugin() {
  return {
    name: 'transform-highlight-languages',
    transform(src, id) {
      if (highlightRegex.test(id)) {
        const lines = src.split(/\n/)
        for(let i = lines.length - 1; i >= 0; i--){
          if (lines[i].indexOf('languages') > -1 && !/bash|shell|css|xml|less|scss|typescript|javascript|json/.test(lines[i])) {
            lines.splice(i, 1)
          }
        }
        return {
          code: lines.join('\n'),
          map: null,
        }
      }
    },
  }
}
