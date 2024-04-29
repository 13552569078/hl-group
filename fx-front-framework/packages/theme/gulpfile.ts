import gulp from 'gulp'
import path from 'path'
import { epOutput } from '../../build/utils/paths'

const distBundle = path.resolve(epOutput, 'theme')

function copySourceToLib() {
  return gulp.src('./src/**').pipe(gulp.dest(path.resolve(distBundle)))
}

export const build = gulp.series(
  copySourceToLib,
)

export default build
