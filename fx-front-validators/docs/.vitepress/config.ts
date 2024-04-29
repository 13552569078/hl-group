import { defineConfig } from 'vitepress'
import pkgJson from '../../package.json'

export default defineConfig({
  title: `繁星表单验证规则库(${pkgJson.version})`,
  description: '前端常用表单验证规则',
  themeConfig: {
    nav: [
      { text: "鸿鸾", link: "http://home.front.etcc.group/" },
    ],
    sidebar: [{
      text: '项目介绍',
      link: '/',
    }, {
      text: '模块',
      collapsable: true,
      children: [
        {
          text: 'required',
          link: '/required/'
        },
        {
          text: 'int',
          link: '/int/'
        },
        {
          text: 'float',
          link: '/float/'
        },
        {
          text: 'string',
          link: '/string/'
        },
      ]
    }],
  },
  markdown: {
    lineNumbers: true
  }
})