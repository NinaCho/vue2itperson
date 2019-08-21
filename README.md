# wechat-components

### 项目依赖

- Node.js V10+ (LTS)
- VS Code

### VSCode 插件

在Visual Studio Code中安装一下插件

**小程序**

- 【wxml】提供 jsx 风格的代码格式化
- 【miniapp】提供 wxml 的语法高亮（代码片段功能已被禁用）
- 【wechat-snippet】小程序代码片段

**语法检查**

- ESLint
- stylelint

**格式化工具**

- Prettier

**辅助工具**

- Auto Import
- Auto Rename Tag
- Auto Close Tag

### 运行项目

**全局安装 eslint、stylelint、gulp**

- [windows] `npm install -g eslint stylelint gulp`
- [Mac] `sudo npm install -g eslint stylelint gulp`

**项目根目录下安装依赖**

- `npm install`

**启动项目**

- `npm start`

导入项目下的 dist 目录至微信小程序开发工具，编译预览

### 一键创建页面或组件

**创建页面，自动在 app.json 中添加路由**

默认主目录main
> 创建页面

`npm run create -- --f=子目录 --p=页面名称`

> 创建组件

`npm run create -- --c=组件名称`
公用组件
`npm run create -- --s=common --c=组件名称`


| 参数 | 含义                                                 | 默认值                                    | 是否必填 |
| ---- | :--------------------------------------------------- | :---------------------------------------- | :------: |
| p    | [page] 页面名称                                  | 无                                        |    是    |
| c    | [component] 组件名称（组件所在的文件夹与文件名同名） | 无                                        |    是    |
| f    | [folder] 目录名（pages下目录名）                  | 无                                        |    否    |

**注意事项**

- 分包的 root 名称必须与文件夹同名，使用前请先将 app.json 中的配置修正
