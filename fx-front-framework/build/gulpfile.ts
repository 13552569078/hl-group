import path from 'path'
import fs from 'fs'
import { series, parallel } from 'gulp'
import { run } from './utils/process'
import { withTaskName } from './utils/gulp'
import { buildOutput, epOutput, epPackage, projRoot } from './utils/paths'
import { buildConfig } from './build-info'
import type { TaskFunction } from 'gulp'
import type { Module } from './build-info'

const runTask = (name: string) =>
  withTaskName(name, () => run(`pnpm run build ${name}`))

export const copyFiles = () => {
  const copyTypings = async () => {
    const src = path.resolve(projRoot, 'typings', 'global.d.ts')
    await run(`cp ${src} ${epOutput}`)
  }

  const copySourceCode = async () => {
    // replace dist path because vite must use index.ts
    const packageContent =
      fs.readFileSync(`${epOutput}/package.json`, 'utf-8')
        .replace(`"main": "index.ts"`, `"main": "lib/index.js"`)
        .replace(`"module": "index.ts"`, `"module": "es/index.mjs"`)
    fs.writeFileSync(`${epOutput}/package.json`, packageContent, 'utf-8')
  }

  return Promise.all([
    run(`cp ${epPackage} ${path.join(epOutput, 'package.json')}`),
    run(`cp README.md ${epOutput}`),
    copyTypings(),
    copySourceCode(),
  ])
}

export const copyTypesDefinitions: TaskFunction = done => {
  const src = `${buildOutput}/types/`
  const copy = (module: Module) =>
    withTaskName(`copyTypes:${module}`, () =>
      run(`rsync -a ${src} ${buildConfig[module].output.path}/`),
    )

  return parallel(copy('esm'), copy('cjs'))(done)
}

export const copyFullStyle = async () => {
  await run(`mkdir -p ${epOutput}/dist`)
}

export default series(
  withTaskName('clean', () => run('pnpm run clean')),

  parallel(
    runTask('buildModules'),
    runTask('buildFullBundle'),
    runTask('generateTypesDefinitions'),
    // runTask('buildHelper'),
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
// export * from './helper'
