<template>
  <hl-aside :class="collapse">
    <hl-group block dir="vertical" class="h-full">
      <div class="aside-logo">
        <img :src="logoUrl" alt="hongluan.ui" />
        <h1>鸿鸾PRO</h1>
        <span class="sub-title">{{ version }}</span>
      </div>
      <hl-group class="index-button p-l-lg p-r-md" align="items-middle items-between" gap="var(--sm)">
        <hl-icon size="md">
          <svg viewBox="0 0 20 20">
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <path d="M19.3333333,0.66653161 L19.3333333,15.3240894 L0.66666666,15.3240894 L0.66666666,0.66653161 L19.3333333,0.66653161 Z M13.75,7.5 L6.25,7.5 L6.25,9.5 L13.75,9.5 L13.75,7.5 Z" fill="#D5E2FB" fill-rule="nonzero"/>
              <path d="M0.66666666,15.3240894 L0.66666666,0.66653161 L19.3333333,0.66653161 L19.3333333,15.3240894 L0.66666666,15.3240894 Z M2.66666666,2.66653161 L2.66666666,13.3240894 L17.3333333,13.3240894 L17.3333333,2.66653161 L2.66666666,2.66653161 Z" fill="#FFFFFF" fill-rule="nonzero"/>
              <polygon fill="#FFFFFF" fill-rule="nonzero" points="2.66666666 17.3240894 2.66666666 19.3240894 17.3333333 19.3240894 17.3333333 17.3240894"/>
            </g>
          </svg>
        </hl-icon>
        <span class="font-bold font-lg text-inverse w-full">首页</span>
        <hl-icon size="xs" class="cursor-pointer text-inverse static" @click="isCollapse=!isCollapse">
          <fill-circle-right v-show="isCollapse" />
          <fill-circle-left v-show="!isCollapse" />
        </hl-icon>
      </hl-group>
      <div class="scrollable no-thumb">
        <hl-menu :default-active="defaultActive" :unique-opened="true" :router="true" :collapse="isCollapse">
          <hl-menu-item-group>
            <template #title>DASHBOARD</template>
            <hl-menu-item :index="getMenuLink('dashboard')">
              <hl-icon class="item-icon"><Two-layer /></hl-icon>
              <template #title>仪表盘</template>
            </hl-menu-item>
            <hl-menu-item :index="getMenuLink('workbench')">
              <hl-icon class="item-icon"><Two-airplay /></hl-icon>
              <template #title>工作台</template>
            </hl-menu-item>
          </hl-menu-item-group>

          <hl-menu-item-group>
            <template #title>Pages</template>
            <hl-sub-menu index="forms" :popper-append-to-body="true" :fallback-placements="['right-start']">
              <template #title>
                <hl-icon class="item-icon"><Two-edit /></hl-icon>
                <span>表单页</span>
              </template>
              <hl-menu-item :index="getMenuLink('form-base')">基础表单</hl-menu-item>
              <hl-menu-item :index="getMenuLink('form-step-x')">分步表单-横向</hl-menu-item>
              <hl-menu-item :index="getMenuLink('form-step-y')">分步表单-纵向</hl-menu-item>
              <hl-menu-item :index="getMenuLink('form-zone')">分区表单</hl-menu-item>
              <hl-menu-item :index="getMenuLink('form-multiple')">综合表单</hl-menu-item>
            </hl-sub-menu>

            <hl-sub-menu index="tables" :popper-append-to-body="true" :fallback-placements="['right-start']">
              <template #title>
                <hl-icon class="item-icon"><Two-page /></hl-icon>
                <span>表格页</span>
              </template>
              <hl-menu-item :index="getMenuLink('fx-table-base')">基础表格</hl-menu-item>
              <hl-menu-item :index="getMenuLink('table-inner-scroll')"><span>内部滚动表格</span></hl-menu-item>
              <hl-menu-item :index="getMenuLink('table-tabs')">页签式表格</hl-menu-item>
              <hl-menu-item :index="getMenuLink('table-tabs-card')">卡片页签式表格</hl-menu-item>
              <hl-menu-item :index="getMenuLink('table-cols')">分栏式表格</hl-menu-item>
              <hl-menu-item :index="getMenuLink('table-cols-inner-scroll')"><span>分栏式内部滚动表格</span></hl-menu-item>
              <hl-menu-item :index="getMenuLink('table-cols-inner-scroll2')"><span>分栏式内部滚动表格2</span></hl-menu-item>
            </hl-sub-menu>

            <hl-sub-menu index="lists" :popper-append-to-body="true" :fallback-placements="['right-start']">
              <template #title>
                <hl-icon class="item-icon"><Two-Server /></hl-icon>
                <span>列表页</span>
              </template>
              <hl-menu-item :index="getMenuLink('list-user')">用户列表</hl-menu-item>
              <hl-menu-item :index="getMenuLink('list-article2')">文章列表</hl-menu-item>
              <hl-menu-item :index="getMenuLink('list-article')"><span>文章列表</span></hl-menu-item>
              <hl-menu-item :index="getMenuLink('list-product')">产品列表</hl-menu-item>
              <hl-menu-item :index="getMenuLink('list-project')">项目列表</hl-menu-item>
              <hl-menu-item :index="getMenuLink('list-description')">描述列表</hl-menu-item>
              <hl-menu-item :index="getMenuLink('list-files')">文件列表</hl-menu-item>
              <hl-menu-item :index="getMenuLink('list-task')"><span>任务列表</span></hl-menu-item>
              <hl-menu-item :index="getMenuLink('list-task2')"><span>任务列表2</span><hl-badge value="新" type="danger" class="m-l-lg static" /></hl-menu-item>
            </hl-sub-menu>

            <hl-sub-menu index="detail" :popper-append-to-body="true" :fallback-placements="['right-start']">
              <template #title>
                <hl-icon class="item-icon"><Two-BookOpen /></hl-icon>
                <span>详情页</span>
              </template>
              <hl-menu-item :index="getMenuLink('detail-multiple')">信息展示</hl-menu-item>
              <hl-menu-item :index="getMenuLink('detail-task')">任务详情</hl-menu-item>
              <hl-menu-item :index="getMenuLink('detail-step')">步骤详情</hl-menu-item>
              <hl-menu-item :index="getMenuLink('profile-user')">用户</hl-menu-item>
              <hl-menu-item :index="getMenuLink('profile-enterprise')">企业信息</hl-menu-item>
              <hl-menu-item :index="getMenuLink('search-result')">搜索结果</hl-menu-item>
              <hl-menu-item :index="getMenuLink('faq')">FAQ</hl-menu-item>
            </hl-sub-menu>

            <hl-sub-menu index="result" :popper-append-to-body="true" :fallback-placements="['right-start']">
              <template #title>
                <hl-icon class="item-icon"><Two-warning /></hl-icon>
                <span>结果页</span>
              </template>
              <hl-menu-item index="/result/result-404">Error 404</hl-menu-item>
              <hl-menu-item index="/result/result-500">Error 500</hl-menu-item>
              <hl-menu-item index="/result/result-empty">Empty</hl-menu-item>
              <hl-menu-item index="/result/result-maintenance">维护中</hl-menu-item>
              <hl-menu-item index="/result/updating">热更新</hl-menu-item>
              <hl-menu-item index="/result/result-success">结果反馈-成功</hl-menu-item>
              <hl-menu-item index="/result/result-error">结果反馈-失败</hl-menu-item>
            </hl-sub-menu>

            <hl-sub-menu index="verify" :popper-append-to-body="true" :fallback-placements="['right-start']">
              <template #title>
                <hl-icon class="item-icon"><Two-Preview /></hl-icon>
                <span>注册登录</span>
              </template>
              <hl-menu-item index="/verify/sign-up">注册</hl-menu-item>
              <hl-menu-item index="/verify/sign-in">登录</hl-menu-item>
              <hl-menu-item index="/verify/sign-up-step">分步注册</hl-menu-item>
              <hl-menu-item index="/verify/retrieve-password">找回密码</hl-menu-item>
              <hl-menu-item index="/verify/reset-password">重设密码</hl-menu-item>
              <hl-menu-item index="/verify/verify-sms">短信验证</hl-menu-item>
              <hl-menu-item index="/verify/verify-mail">邮件验证</hl-menu-item>
              <hl-menu-item index="/verify/sign-up-confirm">信息确认</hl-menu-item>
              <hl-menu-item index="/verify/result-mail">结果反馈邮件</hl-menu-item>
            </hl-sub-menu>
          </hl-menu-item-group>

          <hl-menu-item-group>
            <template #title>WIDGETS</template>
            <hl-sub-menu index="4" :popper-append-to-body="true" :fallback-placements="['right-start']">
              <template #title>
                <hl-icon class="item-icon"><Two-copy /></hl-icon>
                <span>卡片</span>
              </template>
              <hl-menu-item :index="getMenuLink('info-card')">信息列表</hl-menu-item>
              <hl-menu-item :index="getMenuLink('data-card')">数据统计</hl-menu-item>
              <hl-menu-item :index="getMenuLink('table-card')">表格</hl-menu-item>
              <hl-menu-item :index="getMenuLink('mixed-card')">混合</hl-menu-item>
              <hl-menu-item :index="getMenuLink('article-card')">文章</hl-menu-item>
              <hl-menu-item :index="getMenuLink('nav-card')">导航</hl-menu-item>
            </hl-sub-menu>

            <hl-sub-menu index="6" :popper-append-to-body="true" :fallback-placements="['right-start']">
              <template #title>
                <hl-icon class="item-icon"><Two-box /></hl-icon>
                <span>弹窗</span>
              </template>
              <hl-menu-item :index="getMenuLink('modeless')">浮窗</hl-menu-item>
              <hl-menu-item :index="getMenuLink('modals')">模态窗</hl-menu-item>
            </hl-sub-menu>

            <hl-sub-menu index="chart" :popper-append-to-body="true" :fallback-placements="['right-start']">
              <template #title>
                <hl-icon class="item-icon"><Two-ChartPie /></hl-icon>
                <span>图表</span>
              </template>
              <hl-menu-item :index="getMenuLink('line-chart')">折线图</hl-menu-item>
              <hl-menu-item :index="getMenuLink('column-chart')">柱状图</hl-menu-item>
              <hl-menu-item :index="getMenuLink('pie-chart')">饼状图</hl-menu-item>
              <hl-menu-item :index="getMenuLink('other-chart')">其他图</hl-menu-item>
            </hl-sub-menu>

            <hl-sub-menu index="11" :popper-append-to-body="true" :fallback-placements="['right-start']">
              <template #title>
                <hl-icon class="item-icon"><Two-Smile /></hl-icon>
                <span>图标</span>
              </template>
              <hl-menu-item :index="getMenuLink('icon-Two')">Two</hl-menu-item>
              <hl-menu-item :index="getMenuLink('icon-Two')">Two</hl-menu-item>
              <hl-menu-item :index="getMenuLink('icon-files')">Files</hl-menu-item>
            </hl-sub-menu>
          </hl-menu-item-group>
          <hl-menu-item-group>
            <template #title>APPS</template>
            <hl-menu-item :index="getMenuLink('calendar')">
              <hl-icon class="item-icon"><Two-Calendar /></hl-icon>
              <template #title>日历</template>
            </hl-menu-item>
            <hl-menu-item :index="getMenuLink('chat')">
              <hl-icon class="item-icon"><Two-Talk /></hl-icon>
              <template #title>聊天</template>
            </hl-menu-item>
            <hl-menu-item :index="getMenuLink('editor')">
              <hl-icon class="item-icon"><Two-box /></hl-icon>
              <template #title>编辑器</template>
            </hl-menu-item>
            <hl-menu-item index="inbox">
              <hl-icon class="item-icon"><Two-mail /></hl-icon>
              <template #title>消息邮箱</template>
            </hl-menu-item>
          </hl-menu-item-group>

          <hl-menu-item-group>
            <template #title>LAYOUT</template>
            <hl-sub-menu index="10" :popper-append-to-body="true" :fallback-placements="['right-start']">
              <template #title>
                <hl-icon class="item-icon"><Two-Application /></hl-icon>
                <span>框架</span>
              </template>
              <hl-menu-item index="table">欢迎</hl-menu-item>
              <hl-menu-item index="table">提示</hl-menu-item>
              <hl-menu-item index="table">表单</hl-menu-item>
            </hl-sub-menu>
          </hl-menu-item-group>
        </hl-menu>
      </div>
    </hl-group>
  </hl-aside>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { logoUrl } from '@/utils/icons'
import packageJson from '../../package.json'

export default defineComponent({
  name: 'LayoutMenu',
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const isCollapse = ref(false)

    const route = useRoute()
    const defaultActive = ref('form-base')

    const getMenuLink = (path: string) => {
      let fullPath = path
      if (document.location.hash.includes('?')) {
        fullPath += document.location.hash.substring(document.location.hash.indexOf('?'))
      }
      return fullPath
    }

    onMounted(() => {
      if (route.name) {
        defaultActive.value = route.name as string
      }
    })

    return {
      version: packageJson.version,
      defaultActive,
      getMenuLink,
      logoUrl,
      isCollapse,
    }
  },
})
</script>
