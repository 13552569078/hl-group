import path from 'path'
import vue from '@vitejs/plugin-vue'
import VueMacros from 'unplugin-vue-macros/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import md from './plugins/vite-md-plugin'
import highlight from './plugins/vite-highlight-plugin'
import examples from './plugins/vite-examples-plugin'

export default ({ command }) => {
  const isProd = command !== 'serve'
  const vueBundle = isProd ? 'vue.esm-browser.prod.js' : 'vue.esm-browser.js'
  const isGithub = process.argv.indexOf('--github') > -1

  return {
    base: './',
    server: {
      port: 8080,
      host: '0.0.0.0',
    },
    plugins: [
      VueMacros({
        setupComponent: false,
        setupSFC: false,
        plugins: {
          vue: vue({
            include: [/\.vue$/, /\.md$/], // <--
          }),
          vueJsx: vueJsx(),
        },
      }),
      {
        ...md(),
        enforce: 'pre',
      },
      {
        ...highlight(),
        enforce: 'pre',
      },
      examples(),
    ],
    resolve: {
      alias: {
        vue: `vue/dist/${vueBundle}`,
        examples: path.resolve(__dirname),
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    define:{
      __IS_GITHUB__: JSON.stringify(isGithub),
    },
    build: {
      outDir: '../website-dist',
      rollupOptions: {
        output: {
          manualChunks: id => {
            if (id.includes('node_modules') && (id.includes('vue') || id.includes('@vue'))) {
              return 'vue'
            } else if (id.includes('node_modules') && id.includes('highlight')) {
              return 'highlight'
            } else if (id.includes('node_modules') && id.includes('hongluan-ui/icons')) {
              return 'hongluan-icons'
            } else if (id.includes('node_modules') && id.includes('hongluan')) {
              return 'hongluan'
            } else if (id.includes('node_modules')) {
              return 'vendor'
            }
          },
        },
      },
    },
  }
}
