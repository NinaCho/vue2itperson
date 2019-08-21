/**
 * 快速创建页面、组件
 *
 * npm run create --p=order --sys=home [--f=folder]
 *
 * @desc      Create Page or Component Automatically
 * @author     sumy
 * @date      2019-07-16
 */

const gulp = require('gulp')
const rename = require('gulp-rename')
const replace = require('gulp-replace')
const params = require('yargs').argv
const path = require('path')
const through2 = require('through2')
const { firstLetterToUpperCase, getCurrentDate } = require('./utils')

const defaultSystem = 'main'

if (!params.p && !params.c) {
  throw new Error('请传递正确的参数')
}

let type
let fileName
let system = params.s

if (params.p) {
  type = 'page'
  fileName = params.p

  system = defaultSystem
} else {
  type = 'component'
  fileName = params.c

  system = system || defaultSystem
}

const folder = params.f || fileName
const dist = `../src/${system}/${type}s/${folder}/`

// 替换JS中的模板
gulp
  .src(path.resolve(__dirname, `tpl/${type}/tpl.js`))
  .pipe(replace('[MODULE]', firstLetterToUpperCase(fileName)))
  .pipe(replace('[DATE]', getCurrentDate()))
  .pipe(rename({ basename: fileName, extname: '.js' }))
  .pipe(gulp.dest(path.resolve(__dirname, dist)))

// 在scss头部自动引入theme.scss
gulp
  .src(path.resolve(__dirname, `tpl/${type}/tpl.scss`))
  .pipe(
    replace(
      '// [@IMPORT]',
      `@import '../../${system ? '../' : ''}common/styles/themes.scss';`
    )
  )
  .pipe(
    rename(p => {
      p.basename = fileName
    })
  )
  .pipe(gulp.dest(path.resolve(__dirname, dist)))

// 复制其他文件
gulp
  .src(path.resolve(__dirname, `tpl/${type}/tpl.!(js|scss)`))
  .pipe(
    rename(p => {
      p.basename = fileName
    })
  )
  .pipe(gulp.dest(path.resolve(__dirname, dist)))

const isExist = (data, page) => {
  const index = data.findIndex(d => d === page)

  return index !== -1
}

// 将添加的page，写入app.json文件
if (type === 'page') {
  gulp
    .src(path.resolve(__dirname, '../src/app.json'))
    .pipe(
      through2.obj(function(chunk, enc, callback) {
        const { contents } = chunk
        const data = JSON.parse(contents.toString())

        if (!system || system === defaultSystem) {
          const { pages } = data
          const route = system
            ? `${defaultSystem}/pages/${folder}/${fileName}`
            : `pages/${folder}/${fileName}`

          if (pages) {
            const exist = isExist(pages, route)

            !exist && pages.push(route)
          } else {
            data.pages = [route]
          }
        } else {
          const { subPackages } = data
          const route = `pages/${folder}/${fileName}`

          if (!subPackages || subPackages.length === 0) {
            data.subPackages = [
              {
                root: system,
                pages: [route]
              }
            ]
          } else {
            const index = subPackages.findIndex(s => s.root === system)

            if (index === -1) {
              subPackages.push({
                root: system,
                pages: [route]
              })
            } else {
              const exist = isExist(subPackages[index].pages, route)

              if (!exist) {
                subPackages[index].pages.push(route)
              }
            }
          }
        }

        chunk.contents = Buffer.from(JSON.stringify(data), 'utf8')

        this.push(chunk)
        callback()
      })
    )
    .pipe(gulp.dest(path.resolve(__dirname, '../src')))
}
