import chalk from 'chalk'
import gulp from 'gulp'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import fs from 'fs'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import rename from 'gulp-rename'
import { epOutput } from '../../build/utils/paths'
import { COMP_PREFIX } from '../../build/utils/constants'

import path from 'path'

const noElPrefixFile = /(index|base|display|normalize|typography)/

const sass = gulpSass(dartSass)
const distFolder = path.resolve(__dirname, 'dist')
const distBundle = path.resolve(epOutput, 'theme')

/**
 * compile theme-chalk scss & minify
 * not use sass.sync().on('error', sass.logError) to throw exception
 * @returns
 */
function compile(isDark = false) {
  console.log('building theme: ' + (isDark ? 'dark' : 'light'))
  return gulp
    .src([`./src/*.scss`, '!./src/components.scss'])
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(
      cleanCSS({}, details => {
        console.log(
          `${chalk.cyan(details.name)}: ${chalk.yellow(
            details.stats.originalSize / 1000,
          )} KB -> ${chalk.green(details.stats.minifiedSize / 1000)} KB`,
        )
      }),
    )
    .pipe(
      rename(path => {
        if (!noElPrefixFile.test(path.basename)) {
          path.basename = `${COMP_PREFIX}-${path.basename}`
        }
      }),
    )
    .pipe(gulp.dest(isDark ? `${distFolder}/dark` : `${distFolder}`))
}

function compileFile(path: string, dist: string) {
  return gulp
    .src([path])
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(
      cleanCSS({}, details => {
        console.log(
          `${chalk.cyan(details.name)}: ${chalk.yellow(
            details.stats.originalSize / 1000,
          )} KB -> ${chalk.green(details.stats.minifiedSize / 1000)} KB`,
        )
      }),
    )
    .pipe(gulp.dest(dist))
}

// function startDark(cb) {
//   fs.renameSync('./src/common/config.scss', './src/common/config-light.scss')
//   fs.renameSync('./src/common/config-dark.scss', './src/common/config.scss')
//   cb()
// }
// function stopDark(cb) {
//   fs.renameSync('./src/common/config.scss', './src/common/config-dark.scss')
//   fs.renameSync('./src/common/config-light.scss', './src/common/config.scss')
//   cb()
// }

/**
 * copy from packages/theme/lib to dist/theme
 */
function copyToLib() {
  return gulp.src(distFolder + '/**').pipe(gulp.dest(distBundle))
}

/**
 * copy source file to packages
 */

function copySourceToLib() {
  return gulp.src('./src/**').pipe(gulp.dest(path.resolve(distBundle, './scss')))
}

// function delDarkIndex(cb) {
//   fs.unlinkSync(path.resolve(distBundle, './scss/index-dark.scss'))
//   cb()
// }


export const build = gulp.series(
  () => compile(),
  // startDark,
  // () => compile(true),
  // stopDark,
  () => compileFile('./src/dark/colors.scss', `${distFolder}/dark`),
  copyToLib,
  copySourceToLib,
  // delDarkIndex,
)

export default build
