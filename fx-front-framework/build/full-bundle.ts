import path from 'path'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { rollup } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import esbuild from 'rollup-plugin-esbuild'
import replace from '@rollup/plugin-replace'
import filesize from 'rollup-plugin-filesize'
import { parallel } from 'gulp'
import { version } from '../packages/fx-front-framework/version'
import { PCFrameworkAlias } from './plugins/pc-framework-alias'
import { epRoot, epOutput } from './utils/paths'
import { generateExternal, writeBundles } from './utils/rollup'

import { withTaskName } from './utils/gulp'
import { BUNDLE_NAME, HB_BUNDLE_NAME, HB_LIB, HL_BUNDLE_NAME, HL_LIB } from './utils/constants'

export const buildFull = (minify: boolean) => async () => {
  const bundle = await rollup({
    input: path.resolve(epRoot, 'index.ts'),
    plugins: [
      await PCFrameworkAlias(),
      nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }),
      DefineOptions(),
      vue({
        isProduction: true,
      }),
      vueJsx(),
      commonjs(),
      esbuild({
        minify,
        sourceMap: minify,
        target: 'es2018',
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),

        // options
        preventAssignment: true,
      }),
      filesize(),
    ],
    external: await generateExternal({ full: true }),
  })
  const banner = `/*! Pc FXYJ Framework UI v${version} */\n`
  await writeBundles(bundle, [
    {
      format: 'umd',
      file: path.resolve(epOutput, `dist/index.full${minify ? '.min' : ''}.js`),
      exports: 'named',
      name: BUNDLE_NAME,
      globals: {
        vue: 'Vue',
        echarts: 'echarts',
        [HL_LIB]: HL_BUNDLE_NAME,
        [HB_LIB]: HB_BUNDLE_NAME,
      },
      sourcemap: minify,
      banner,
    },
    {
      format: 'esm',
      file: path.resolve(
        epOutput,
        `dist/index.full${minify ? '.min' : ''}.mjs`,
      ),
      sourcemap: minify,
      banner,
    },
  ])
}

export const buildFullBundle = parallel(
  withTaskName('buildFullMinified', buildFull(true)),
  withTaskName('buildFull', buildFull(false)),
)
