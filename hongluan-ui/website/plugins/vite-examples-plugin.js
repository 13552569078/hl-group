import fs from 'fs'
import path from 'path'

function touch(path) {
  const time = new Date()

  try {
    fs.utimesSync(path, time, time)
  }
  catch (err) {
    fs.closeSync(fs.openSync(path, 'w'))
  }
}

let i = 0

function VitePluginExamplesReload() {

  let root = process.cwd()
  let timer, examplesDir

  const pathPlatform = process.platform === 'win32' ? path.win32 : path.posix

  function clear() {
    clearTimeout(timer)
  }
  function schedule(fn) {
    clear()
    timer = setTimeout(fn, 500)
  }

  return {
    name: `vite-plugin-examples-reload:${i++}`,
    apply: 'serve',
    config(c) {
      if (!c.server)
        c.server = {}
      if (!c.server.watch)
        c.server.watch = {}
      c.server.watch.disableGlobbing = false
    },
    configResolved(config) {
      root = config.root
      examplesDir = pathPlatform.resolve(root, 'examples/**/*.vue')
    },
    configureServer(server) {
      server.watcher.add([examplesDir])
      server.watcher.on('change', file => {
        if (file.indexOf('website/examples') > -1) {
          let mdPaths = file.replace('/examples/', '/docs/zh-CN/component/').split('/')
          let mdFile = mdPaths.slice(0, mdPaths.length - 1).join('/') + '.md'
          schedule(() => {
            touch(mdFile)
          })
        }
      },
      )
    },
  }
}

export default VitePluginExamplesReload
