import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import AbstractLayout from '../layout/abstract-layout.vue'
import Empty from '../layout/empty.vue'
import Inbox from '../views/inbox/inbox.vue'

const pages = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/dashboard/dashboard.vue'),
    meta: {
      title: '仪表盘',
    },
  },
  {
    path: '/workbench',
    name: 'workbench',
    component: () => import('../views/workbench/workbench.vue'),
    meta: {
      title: '工作台',
    },
  },
  {
    path: '/form-base',
    name: 'form-base',
    component: () => import('../views/form/form-base.vue'),
    meta: {
      title: '基础表单',
    },
  },
  {
    path: '/form-step-x',
    name: 'form-step-x',
    component: () => import('../views/form/form-step-x.vue'),
    meta: {
      title: '分步表单-横向',
    },
  },
  {
    path: '/form-step-y',
    name: 'form-step-y',
    component: () => import('../views/form/form-step-y.vue'),
    meta: {
      title: '分步表单-纵向',
    },
  },
  {
    path: '/form-zone',
    name: 'form-zone',
    component: () => import('../views/form/form-zone.vue'),
    meta: {
      title: '分区表单',
    },
  },
  {
    path: '/form-multiple',
    name: 'form-multiple',
    component: () => import('../views/form/form-multiple.vue'),
    meta: {
      title: '综合表单',
    },
  },
  {
    path: '/fx-table-base',
    name: 'fx-table-base',
    component: () => import('../views/tables/fx-table-base.vue'),
    meta: {
      title: '繁星基础表格',
    },
  },
  {
    path: '/table-base',
    name: 'table-base',
    component: () => import('../views/tables/table-base.vue'),
    meta: {
      title: '基础表格',
    },
  },
  {
    path: '/table-inner-scroll',
    name: 'table-inner-scroll',
    component: () => import('../views/tables/table-inner-scroll.vue'),
    meta: {
      title: '内部滚动表格',
    },
  },
  {
    path: '/table-tabs',
    name: 'table-tabs',
    component: () => import('../views/tables/table-tabs.vue'),
    meta: {
      title: '页签式表格',
    },
  },
  {
    path: '/table-tabs-card',
    name: 'table-tabs-card',
    component: () => import('../views/tables/table-tabs-card.vue'),
    meta: {
      title: '卡片页签式表格',
    },
  },
  {
    path: '/table-cols',
    name: 'table-cols',
    component: () => import('../views/tables/table-cols.vue'),
    meta: {
      title: '分栏式表格',
    },
  },
  {
    path: '/table-cols-inner-scroll',
    name: 'table-cols-inner-scroll',
    component: () => import('../views/tables/table-cols-inner-scroll.vue'),
    meta: {
      title: '分栏式内部滚动表格',
    },
  },
  {
    path: '/table-cols-inner-scroll2',
    name: 'table-cols-inner-scroll2',
    component: () => import('../views/tables/table-cols-inner-scroll2.vue'),
    meta: {
      title: '分栏式内部滚动表格2',
    },
  },
  {
    path: '/list-user',
    name: 'list-user',
    component: () => import('../views/lists/list-user.vue'),
    meta: {
      title: '用户列表',
    },
  },
  {
    path: '/list-article',
    name: 'list-article',
    component: () => import('../views/lists/list-article.vue'),
    meta: {
      title: '文章列表',
    },
  },
  {
    path: '/list-article2',
    name: 'list-article2',
    component: () => import('../views/lists/list-article2.vue'),
    meta: {
      title: '文章列表',
    },
  },
  {
    path: '/list-product',
    name: 'list-product',
    component: () => import('../views/lists/list-product.vue'),
    meta: {
      title: '产品列表',
    },
  },
  {
    path: '/list-project',
    name: 'list-project',
    component: () => import('../views/lists/list-project.vue'),
    meta: {
      title: '项目列表',
    },
  },
  {
    path: '/list-description',
    name: 'list-description',
    component: () => import('../views/lists/list-description.vue'),
    meta: {
      title: '描述列表',
    },
  },
  {
    path: '/list-files',
    name: 'list-files',
    component: () => import('../views/lists/list-files.vue'),
    meta: {
      title: '文件列表',
    },
  },
  {
    path: '/list-task',
    name: 'list-task',
    component: () => import('../views/lists/list-task.vue'),
    meta: {
      title: '任务列表',
    },
  },
  {
    path: '/list-task2',
    name: 'list-task2',
    component: () => import('../views/lists/list-task2.vue'),
    meta: {
      title: '任务列表2',
    },
  },
  {
    path: '/info-card',
    name: 'info-card',
    component: () => import('../views/cards/info-card.vue'),
    meta: {
      title: '信息卡片',
    },
  },
  {
    path: '/table-card',
    name: 'table-card',
    component: () => import('../views/cards/table-card.vue'),
    meta: {
      title: '表格卡片',
    },
  },
  {
    path: '/nav-card',
    name: 'nav-card',
    component: () => import('../views/cards/nav-card.vue'),
    meta: {
      title: '导航卡片',
    },
  },
  {
    path: '/article-card',
    name: 'article-card',
    component: () => import('../views/cards/article-card.vue'),
    meta: {
      title: '文章卡片',
    },
  },
  {
    path: '/mixed-card',
    name: 'mixed-card',
    component: () => import('../views/cards/mixed-card.vue'),
    meta: {
      title: '混合卡片',
    },
  },
  {
    path: '/detail-multiple',
    name: 'detail-multiple',
    component: () => import('../views/detail/detail-multiple.vue'),
    meta: {
      title: '信息展示',
    },
  },
  {
    path: '/detail-task',
    name: 'detail-task',
    component: () => import('../views/detail/detail-task.vue'),
    meta: {
      title: '任务详情',
    },
  },
  {
    path: '/detail-step',
    name: 'detail-step',
    component: () => import('../views/detail/detail-step.vue'),
    meta: {
      title: '步骤详情页',
    },
  },
  {
    path: '/profile-user',
    name: 'profile-user',
    component: () => import('../views/detail/profile-user.vue'),
    meta: {
      title: '用户信息',
    },
  },

  {
    path: '/profile-enterprise',
    name: 'profile-enterprise',
    component: () => import('../views/detail/profile-enterprise.vue'),
    meta: {
      title: '企业信息',
    },
  },

  {
    path: '/search-result',
    name: 'search-result',
    component: () => import('../views/detail/search-result.vue'),
    meta: {
      title: '搜索结果',
    },
  },

  {
    path: '/faq',
    name: 'faq',
    component: () => import('../views/detail/faq.vue'),
    meta: {
      title: 'FAQ',
    },
  },

  {
    path: '/line-chart',
    name: 'line-chart',
    component: () => import('../views/chart/line-chart/chart.vue'),
    meta: {
      title: '折线图',
    },
  },
  {
    path: '/column-chart',
    name: 'column-chart',
    component: () => import('../views/chart/column-chart/chart.vue'),
    meta: {
      title: '柱状图',
    },
  },
  {
    path: '/pie-chart',
    name: 'pie-chart',
    component: () => import('../views/chart/pie-chart/chart.vue'),
    meta: {
      title: '饼状图',
    },
  },
  {
    path: '/other-chart',
    name: 'other-chart',
    component: () => import('../views/chart/other-chart/chart.vue'),
    meta: {
      title: '其他图',
    },
  },
  {
    path: '/icon-twotones',
    name: 'icon-twotones',
    component: () => import('../views/icons/twotones.vue'),
    meta: {
      title: '双色图标',
    },
  },
  {
    path: '/icon-fill',
    name: 'icon-fill',
    component: () => import('../views/icons/fill.vue'),
    meta: {
      title: '填充图标',
    },
  },
  {
    path: '/icon-files',
    name: 'icon-files',
    component: () => import('../views/icons/files.vue'),
    meta: {
      title: '文件类型',
    },
  },
  {
    path: '/modals',
    name: 'modals',
    component: () => import('../views/popup/modal/modals.vue'),
    meta: {
      title: '模态窗',
    },
  },
  {
    path: '/modeless',
    name: 'modeless',
    component: () => import('../views/popup/modeless/modeless.vue'),
    meta: {
      title: '浮窗',
    },
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('../views/calendar/calendar.vue'),
    meta: {
      title: '日历（FullCalendar）',
    },
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('../views/editor/editor.vue'),
    meta: {
      title: '富文本编辑器',
    },
  },
]
const routes = [
  {
    path: '/',
    name: 'index',
    component: AbstractLayout,
    redirect: '/verify/sign-in',
    children: pages,
  },
  {
    path: '/verify',
    name: 'verify',
    component: Empty,
    children: [
      {
        path: 'sign-up',
        name: 'sign-up',
        component: () => import('../views/verify/sign-up.vue'),
        meta: {
          title: '注册',
        },
      },
      {
        path: 'sign-in',
        name: 'sign-in',
        component: () => import('../views/verify/sign-in.vue'),
        meta: {
          title: '登录',
        },
      },
      {
        path: 'sign-up-step',
        name: 'sign-up-step',
        component: () => import('../views/verify/sign-up-step.vue'),
        meta: {
          title: '分步注册',
        },
      },
      {
        path: 'verify-sms',
        name: 'verify-sms',
        component: () => import('../views/verify/verify-sms.vue'),
        meta: {
          title: '短信验证',
        },
      },
      {
        path: 'verify-mail',
        name: 'verify-mail',
        component: () => import('../views/verify/verify-mail.vue'),
        meta: {
          title: '邮件验证',
        },
      },
      {
        path: 'retrieve-password',
        name: 'retrieve-password',
        component: () => import('../views/verify/retrieve-password.vue'),
        meta: {
          title: '找回密码',
        },
      },
      {
        path: 'reset-password',
        name: 'reset-password',
        component: () => import('../views/verify/reset-password.vue'),
        meta: {
          title: '重设密码',
        },
      },
      {
        path: 'result-mail',
        name: 'result-mail',
        component: () => import('../views/verify/result-mail.vue'),
        meta: {
          title: '邮件反馈',
        },
      },
    ],
  },
  {
    path: '/result',
    name: 'result',
    component: Empty,
    children: [
      {
        path: 'result-404',
        name: 'result-404',
        component: () => import('../views/result/result-404.vue'),
        meta: {
          title: 'Error 404',
        },
      },

      {
        path: 'result-500',
        name: 'result-500',
        component: () => import('../views/result/result-500.vue'),
        meta: {
          title: 'Error 500',
        },
      },

      {
        path: 'result-empty',
        name: 'result-empty',
        component: () => import('../views/result/result-empty.vue'),
        meta: {
          title: 'Empty',
        },
      },

      {
        path: 'result-maintenance',
        name: 'result-maintenance',
        component: () => import('../views/result/result-maintenance.vue'),
        meta: {
          title: '维护中',
        },
      },

      {
        path: 'updating',
        name: 'updating',
        component: () => import('../views/result/updating.vue'),
        meta: {
          title: '热更新',
        },
      },

      {
        path: 'result-error',
        name: 'result-error',
        component: () => import('../views/result/result-error.vue'),
        meta: {
          title: '结果反馈-失败',
        },
      },

      {
        path: 'result-success',
        name: 'result-success',
        component: () => import('../views/result/result-success.vue'),
        meta: {
          title: '结果反馈-成功',
        },
      },
    ],
  },

  {
    path: '/source-editor',
    name: 'source-editor',
    component: () => import('../views/source/editor.vue'),
    meta: {
      title: '查看源码',
    },
  },
  {
    path: '/inbox',
    name: 'inbox',
    component: Inbox,
    redirect: '/inbox/list',
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('../views/inbox/list.vue'),
        meta: {
          title: '消息列表',
        },
      },
      {
        path: 'detail',
        name: 'detail',
        component: () => import('../views/inbox/detail.vue'),
        meta: {
          title: '消息详情',
        },
      },
      {
        path: 'send',
        name: 'send',
        component: () => import('../views/inbox/send.vue'),
        meta: {
          title: '发送消息',
        },
      },
    ],
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
  NProgress.start()
  to.meta.title ? (document.title = to.meta.title as string) : '' // 动态title
})

router.afterEach(() => {
  NProgress.done()
})

export default router
