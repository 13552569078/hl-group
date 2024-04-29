
import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import glob from 'fast-glob'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import Inspect from 'vite-plugin-inspect'
import mkcert from 'vite-plugin-mkcert'
import VueMacros from 'unplugin-vue-macros/vite'
import esbuild from 'rollup-plugin-esbuild'

import './vite.init'
import type { Plugin } from 'vite'
import type { ComponentResolver } from 'unplugin-vue-components/types'
import type { ProjectManifest } from '@pnpm/types'

const projRoot = path.resolve(__dirname, '..')
const pkgRoot = path.resolve(projRoot, 'packages')
const epRoot = path.resolve(pkgRoot, 'hongluan-ui')
const epPackage = path.resolve(epRoot, 'package.json')

const esbuildPlugin = (): Plugin => ({
  ...esbuild({
    target: 'chrome64',
    include: /\.vue$/,
    loaders: {
      '.vue': 'js',
    },
  }),
  enforce: 'post',
})

export const getPackageManifest = (pkgPath: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(pkgPath) as ProjectManifest
}

export const getPackageDependencies = (
  pkgPath: string,
): Record<'dependencies' | 'peerDependencies', string[]> => {
  const manifest = getPackageManifest(pkgPath)
  const { dependencies = {}, peerDependencies = {} } = manifest

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies),
  }
}

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  let { dependencies } = getPackageDependencies(epPackage)
  dependencies = dependencies.filter(dep => !dep.startsWith('@types/')) // exclude dts deps
  const optimizeDeps = (
    await glob(['dayjs/(locale|plugin)/*.js'], {
      cwd: path.resolve(projRoot, 'node_modules'),
    })
  ).map(dep => dep.replace(/\.js$/, ''))

  return {
    resolve: {
      alias: [
        {
          find: /^hongluan-ui(\/(es|lib))?$/,
          replacement: path.resolve(epRoot, 'index.ts'),
        },
        {
          find: /^hongluan-ui\/(es|lib)\/(.*)$/,
          replacement: `${pkgRoot}/$2`,
        },
      ],
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    server: {
      host: true,
      port: 3009,
      https: !!env.HTTPS,
    },
    plugins: [
      VueMacros({
        setupComponent: false,
        setupSFC: false,
        plugins: {
          vue: vue(),
          vueJsx: vueJsx(),
        },
      }),
      esbuildPlugin(),

      Components({
        include: `${__dirname}/**`,
        resolvers: [
          name => {
            if (name.startsWith('Hl'))
              return { importName: name, path: 'hongluan-ui' }
          },
          name => {
            if (name.startsWith('Two') || name.startsWith('Fill') || name.startsWith('File'))
              return { importName: name, path: '@hongluan-ui/icons' }
          },
          {
            type: 'directive',
            resolve: (name: string) => {
              return resolveDirective(name)
            },
          },
        ] as ComponentResolver[],
        dts: false,
      }),
      mkcert(),
      Inspect(),
    ],

    optimizeDeps: {
      include: ['vue', '@vue/shared', ...dependencies, ...optimizeDeps],
    },
    esbuild: {
      target: 'chrome64',
    },
  }
})

function resolveDirective(name: string): any {
  const directives: Record<string, { importName: string; styleName: string; }> = {
    Loading: { importName: 'HlLoadingDirective', styleName: 'loading' },
    Popover: { importName: 'HlPopoverDirective', styleName: 'popover' },
    Ripple: { importName: 'HlRippleDirective', styleName: 'ripple' },
    InfiniteScroll: { importName: 'HlInfiniteScroll', styleName: 'infinite-scroll' },
  }

  const directive = directives[name]
  if (!directive)
    return

  return {
    name: directive.importName,
    from: `hongluan-ui`,
    sideEffects: false,
  }
}
