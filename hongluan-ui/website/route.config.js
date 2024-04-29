import navComponentConfig from './nav.component'
import navGuideConfig from './nav.guide'
import { Language } from './enums/language'

const getAsyncComponent = func => {
  return func
}

const LOAD_MAP = {
  [Language.CN]: name => {
    const components = import.meta.glob('./pages/*.vue')
    return getAsyncComponent(components[`./pages/${name}.vue`])
  },
}

const load = function(lang, path) {
  return LOAD_MAP[lang](path)
}

const LOAD_DOCS_MAP = {
  [Language.CN]: path => {
    const components = import.meta.glob('./docs/zh-CN/**/*.md')
    return getAsyncComponent(components[`./docs/zh-CN${path}.md`])
  },
}

const loadDocs = function(lang, path) {
  return LOAD_DOCS_MAP[lang](path)
}

const registerRoute = navConfig => {
  let route = []
  Object.keys(navConfig).forEach((lang, index) => {
    let navs = navConfig[lang]
    route.push({
      path: `/${ lang }`,
      redirect: `/${ lang }/guide/installation`,
      component: load(lang, 'index'),
      children: [],
    })
    navs.forEach(nav => {
      if (nav.href) return
      if (nav.groups) {
        nav.groups.forEach(group => {
          group.list.forEach(nav => {
            addRoute(nav, lang, index)
          })
        })
      } else if (nav.children) {
        nav.children.forEach(nav => {
          addRoute(nav, lang, index)
        })
      } else {
        addRoute(nav, lang, index)
      }
    })
  })
  function addRoute(page, lang, index) {
    const component = page.path === '/changelog'
      ? load(lang, 'changelog')
      : loadDocs(lang, page.path)
    let child = {
      path: page.path.slice(1),
      meta: {
        title: page.title || page.name,
        description: page.description,
        lang,
      },
      name: 'component-' + lang + (page.title || page.name),
      component: component.default || component,
    }

    route[index].children.push(child)
  }
  return route
}

let route = registerRoute(navComponentConfig)
route[0].children.push({
  component: () => import('./pages/component-overview.vue'),
  meta: { title: '组件总览', description: '', lang: 'zh-CN' },
  name: 'component-zh-CN组件总览',
  path: 'component/overview',
})
route[0].children.push(...registerRoute(navGuideConfig)[0].children)


let defaultPath = Language.CN + '/guide/overview'

route = route.concat([{
  path: '/',
  redirect: { path: `/${defaultPath}` },
}, {
  path: '/*',
  redirect: { path: `/${defaultPath}` },
}])
export default route
