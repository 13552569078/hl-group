import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/source-editor',
    name: 'source-editor',
    component: () => import('../views/source/editor.vue'),
    meta: {
      title: '查看源码',
    },
  },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/visualized/dashboard.vue'),
    meta: {
      title: 'Dasboard',
    },
  },
  {
    path: '/panel-template',
    name: 'panel-template',
    component: () => import('../views/visualized/panel-template.vue'),
    meta: {
      title: '面板模板',
    },
  },
  {
    path: '/modal',
    name: 'modal-template',
    component: () => import('../views/visualized/modal-template.vue'),
    meta: {
      title: '模态窗模板',
    },
  },
  {
    path: '/chart',
    name: 'chart-template',
    component: () => import('../views/visualized/chart-template.vue'),
    meta: {
      title: '图表模板',
    },
  },
  {
    path: '/1920x1080',
    name: '1920x1080',
    component: () => import('../views/visualized/1920x1080.vue'),
    meta: {
      title: '1920 x 1080',
    },
  },
  {
    path: '/1920*4x1080*2',
    name: '1920*4x1080*2',
    component: () => import('../views/visualized/1920-4x1080-2.vue'),
    meta: {
      title: '1920*4 x 1080*2',
    },
  },
  {
    path: '/1920*4x1080*3',
    name: '1920*4x1080*3',
    component: () => import('../views/visualized/1920-4x1080-3.vue'),
    meta: {
      title: '1920*4 x 1080*3',
    },
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/visualized/test/result-empty.vue'),
    meta: {
      title: '演示页面-可视化',
    },
  },
  {
    path: '/jc',
    name: 'jc',
    component: () => import('../views/visualized/jc.vue'),
    meta: {
      title: '演示页面-可视化',
    },
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise(resolve => {
      if (savedPosition) {
        return savedPosition
      } else {
        if (from.meta.saveSrollTop) {
          const top: number = document.documentElement.scrollTop || document.body.scrollTop
          resolve({ left: 0, top })
        }
      }
    })
  },
})

router.beforeEach(to => {
  to.meta.title ? (document.title = to.meta.title as string) : '' // 动态title
})

// router.afterEach(() => {
// })

export default router
