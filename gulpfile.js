const gulp = require('gulp')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const del = require('del')
const params = require('yargs').argv

sass.compiler = require('node-sass')

gulp.task('build:scss', () =>
  gulp
    .src(['./src/**/*.scss', '!./src/common/styles/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(
      rename({
        extname: '.wxss'
      })
    )
    .pipe(gulp.dest('./dist'))
)

gulp.task('build:others', () =>
  gulp.src('./src/**/*.!(md|scss)').pipe(gulp.dest('./dist'))
)

gulp.task('build:js', () => gulp.src('./src/**/*.js').pipe(gulp.dest('./dist')))

gulp.task('build:json', () =>
  gulp.src('./src/**/*.json').pipe(gulp.dest('./dist'))
)

gulp.task('build:wxml', () =>
  gulp.src('./src/**/*.wxml').pipe(gulp.dest('./dist'))
)

gulp.task('build:assets', () =>
  gulp.src('./src/**/*.!(js|scss|json|wxml|md)').pipe(gulp.dest('./dist'))
)

gulp.task('clean', () => del(['./dist']))

gulp.task('auto', () => {
  const { parallel } = gulp

  gulp.watch('./src/**/*.scss', parallel('build:scss'))
  gulp.watch('./src/**/*.js', parallel('build:js'))
  gulp.watch('./src/**/*.json', parallel('build:json'))
  gulp.watch('./src/**/*.wxml', parallel('build:wxml'))
  gulp.watch('./src/**/*.!(js|scss|json|wxml|md)', parallel('build:assets'))
})

// 迁移新项目时，一键将所有的wxss转成scss文件
gulp.task('rename:wxss', () => {
  const system = params.s

  if (!system) {
    throw new Error('A system name must be specified!')
  }

  return gulp
    .src(`./src/${system}/**/*.wxss`)
    .pipe(
      rename({
        extname: '.scss'
      })
    )
    .pipe(gulp.dest(`./src/${system}`))
})

// 谨慎使用！！！删除wxss文件
gulp.task('remove:wxss', () => {
  const system = params.s

  if (!system) {
    throw new Error('A system name must be specified!')
  }

  return del([`./src/${system}/**/*.wxss`])
})

gulp.task('init', gulp.series('rename:wxss', 'remove:wxss'))

gulp.task(
  'default',
  gulp.series('clean', gulp.parallel('build:scss', 'build:others', 'auto'))
)
