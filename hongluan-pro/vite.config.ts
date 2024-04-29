import { ConfigEnv, defineConfig, UserConfigExport } from 'vite'
import vue from '@vitejs/plugin-vue'
import SvgLoader from 'vite-svg-loader'
import { viteMockServe } from "vite-plugin-mock";
import { resolve } from "path"
import SourceDisplayer from './build/vite-plugin-source';

export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    base: command === "serve" ? './' : '/',
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        "@hooks": resolve(__dirname, "./src/hooks"),
        "@components": resolve(__dirname, "./src/components"),
        "@directives": resolve(__dirname, "./src/directives")
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          rootPath: "http://localhost:3000/src",
        },
      },
    },
    server: {
      host:'0.0.0.0',
      open: false,
      port: 3000,
    },
    plugins: [
      {
        ...SourceDisplayer(),
        enforce: 'pre',
      },
      vue(),
      SvgLoader(),
      viteMockServe({
        mockPath: "mock",
        localEnabled: command === "serve",
        prodEnabled: command !== "serve",
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
        logger: true,
      }),
    ],
    build: {
      outDir: './dist',
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          visualized: resolve(__dirname, 'visualized/index.html')
        },
        output: {
          manualChunks: id => {
            if (id.includes('node_modules') && id.includes('fullcalendar')) {
              return 'fullcalendar'
            } else if (id.includes('node_modules') && id.includes('tinymce')) {
              return 'tinymce'
            } else if (id.includes('node_modules') && id.includes('@hongluan-ui/icons')) {
              return 'hl-icons'
            } else if (id.includes('node_modules') && id.includes('echarts')) {
              return 'echarts'
            } else if (id.includes('node_modules') && (id.includes('vue') || id.includes('@vue'))) {
              return 'vue'
            }
          },
        },
      },
    },
  }
}
