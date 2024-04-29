# PC端封装的业务组件，工具类，Hooks等

v1.3  pc-fx-framework ====> fx-front-framework

## 负责人：孙雁鸣（打包，发布等）

## 0. 使用原则
- 所有两个项目以上中使用到的组件，都可以提取到组件库中
- 所有较为通用的函数，hooks等，都可以提取到组件库中
- 鼓励所有人对此组件库做出贡献

## 1. 文件夹介绍
- build：build脚本文件，Gulp + Rollup
- packages：主要源码
  - components：组件源码
  - directives：指令源码
  - hooks：hooks源码
  - fx-front-framework：总导出目录
  - theme：样式源码
  - tokens：TS类型源码
  - utils：工具函数等源码
- scripts：上传文档以及发布组件库脚本
- typings：存放volar插件global.d.ts声明文件
- website：文档网站

## 2. 安装过程
1. 全局安装pnpm：npm install -g pnpm
2. 执行pnpm i

- 安装时遇到大量包请求报错，请先查看 .npmrc 文件中是否配置了「代理」，如果是，则先将代理配置为本机代理 或 注释掉代理配置，再执行安装；
- 安装过程慢的话，可以自己设置不同的npm registry或者修改.npmrc文件中的代理地址；
- 如安装后报错「sh: vite: command not found」，则可能是依赖未装全，建议切换到 npm 官方源，配置翻墙代理后，再进行安装；完整安装后，node_modules 项目数应该在 930+；

## 3. 使用说明

### 新建组件步骤
1. 在components目录下新建文件夹，文件夹结构参考：`hello-world`
2. 在components/index.ts中添加导出
3. 在fx-front-framework/components.ts中添加导出
4. 在typings/global.d.ts添加类型声明

### 新建指令（Directives）步骤
1. 在directives目录下新建文件夹，文件夹结构参考：`focus`
2. 在directives/index.ts中添加导出

### 新建hook（Hooks）步骤
1. 在hooks目录下新建文件夹，文件夹结构参考：`use-focus`
2. 在hooks/index.ts中添加导出

### 新建token步骤
1. 在tokens目录下新建文件，文件参考：`test.ts`
2. 在tokens/index.ts中添加导出

### 新建util步骤
1. 在utils目录下新建文件
2. 在utils/index.ts中添加导出

### 新建样式步骤
1. 在theme文件夹新建相应的scss文件

### 新建文档（Doc）步骤
1. 在website/docs/zh-CN目录下新建*.md文件
2. 在website/nav.config.json里添加对应的路由
  - markdown中支持 `:::demo-fs <directory>/<filename> :::` 语法，默认的文件夹位置在website/examples目录下，请参考test.md文件
  - `nav.config.json` 中的path对应的是.md文件的名称


### 调试过程
1. 编写好对应的文档后，执行pnpm website-dev命令
2. 打开对应的文档地址，查看效果

### 打包发布过程
1. 升级版本：修改packages/fx-front-framework/package.json中的版本号
2. （可选）升级依赖（hongluan系列）版本，全局搜索对应的组件库名称，修改版本号
3. 执行pnpm build命令
4. 设置相应的NPM Registry地址（默认地址为公司的私有仓库）
5. 执行pnpm pub命令

### 构建帮助文档过程
1. 执行pnpm website-build命令
2. 拷贝website-dist目录下的文件到相应的静态服务器
