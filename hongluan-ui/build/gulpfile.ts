import path from 'path'
import fs from 'fs'
import { mkdir, copyFile } from 'fs/promises'
import { series, parallel } from 'gulp'
import { copy } from 'fs-extra'
import { run } from './utils/process'
import { runTask, withTaskName } from './utils/gulp'
import { buildOutput, epOutput, epPackage, epRoot, projRoot } from './utils/paths'
import { buildConfig } from './build-info'
import type { TaskFunction } from 'gulp'
import type { Module } from './build-info'

export const copyFiles: TaskFunction = done => {
  const copySourceCode = async () => {
    // replace dist path because doc website vite must use index.ts
    const packageContent =
      fs.readFileSync(`${epOutput}/package.json`, 'utf-8')
        .replace(`"main": "index.ts"`, `"main": "lib/index.js"`)
        .replace(`"module": "index.ts"`, `"module": "es/index.mjs"`)
    fs.writeFileSync(`${epOutput}/package.json`, packageContent, 'utf-8')
  }

  Promise.all([
    copyFile(epPackage, path.join(epOutput, 'package.json')),
    copyFile(
      path.resolve(epRoot, 'README.md'),
      path.resolve(epOutput, 'README.md'),
    ),
    copyFile(
      path.resolve(projRoot, 'global.d.ts'),
      path.resolve(epOutput, 'global.d.ts'),
    ),
  ]).then(() => {
    copySourceCode()
    done()
  })
}

export const copyTypesDefinitions: TaskFunction = done => {
  const src = path.resolve(buildOutput, 'types')
  const copyTypes = (module: Module) =>
    withTaskName(`copyTypes:${module}`, () =>
      copy(src, buildConfig[module].output.path, { recursive: true }),
    )

  return parallel(copyTypes('esm'), copyTypes('cjs'))(done)
}

export const copyFullStyle = async () => {
  await mkdir(path.resolve(epOutput, 'dist'), { recursive: true })
  await copyFile(
    path.resolve(epOutput, 'theme/index.css'),
    path.resolve(epOutput, 'dist/index.css'),
  )
  // await copyFile(
  //   path.resolve(epOutput, 'theme/dark/index.css'),
  //   path.resolve(epOutput, 'dist/index-dark.css'),
  // )
}

export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(epOutput, { recursive: true })),

  parallel(
    runTask('buildModules'),
    runTask('buildFullBundle'),
    runTask('generateTypesDefinitions'),
    series(
      withTaskName('buildTheme', () =>
        run('pnpm run -C packages/theme build'),
      ),
      copyFullStyle,
    ),
  ),

  parallel(copyTypesDefinitions, copyFiles),
)

export * from './types-definitions'
export * from './modules'
export * from './full-bundle'

