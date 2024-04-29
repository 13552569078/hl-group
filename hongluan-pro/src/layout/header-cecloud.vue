<template show-source>
  <hl-header>
    <div class="header-menu">
      <hl-icon size="md">
        <two-menu />
      </hl-icon>
    </div>
    <div class="logo">
      <img :src="logoCCUrl" alt="hongluan.ui" />
    </div>
    <hl-group align="items-middle">
      <span class="p-l-md p-r-md border-left border-dark">控制台</span>
      <hl-select v-model="value" placeholder="请选择" size="sm" fill>
        <template #prefix>
          <hl-icon>
            <fill-dot />
          </hl-icon>
        </template>
        <template v-for="item in options">
          <hl-option v-if="item.divider" :key="item.value" divider />
          <hl-option v-else :key="item.value" :label="item.label" :value="item.value" />
        </template>
      </hl-select>
    </hl-group>
    <hl-group class="header-left" gap="var(--xs)">
      <hl-button
        type="link"
        class="text-regular hover:text-primary"
        @click="openVisualizedPage"
      >可视化大屏</hl-button>
      <hl-button
        type="link"
        class="text-regular hover:text-primary"
        @click="openHl"
      >Hongluan.Ui</hl-button>
    </hl-group>
    <div class="header-right">
      <hl-group gap="var(--xs)" class="m-r-xxl">
        <hl-button type="primary" no-fill equal @click="openThemes = true">
          <hl-icon>
            <fill-editor-measure />
          </hl-icon>
        </hl-button>
        <hl-popover
          trigger="click"
          :show-arrow="false"
          popper-class="p-none notice-panel"
          width="calc(var(--xxl) * 9)"
          transition="dropdown"
          placement="bottom-end"
        >
          <template #reference>
            <hl-button type="primary" no-fill equal>
              <template #icon>
                <hl-icon>
                  <fill-mail />
                </hl-icon>
              </template>
              <hl-badge
                type="danger"
                position="rt"
                :offset="['5px', '5px']"
                :value="13"
                :max="99"
                round
              />
            </hl-button>
          </template>
          <hl-group
            dir="vertical"
            align="left between"
            full
            style="height: calc(var(--xxl) * 3)"
            class="panel-title bg-primary"
          >
            <hl-group full align="items-middle">
              <h1 class="text-inverse">通知</h1>
            </hl-group>
            <hl-tabs
              v-model="activeName"
              class="static"
              gap="var(--xl)"
              type="line"
              nav-padding="0"
              :show-pane="false"
              @tab-click="handleClick"
            >
              <hl-tab-pane label="系统消息 5" name="1" />
              <hl-tab-pane label="代办任务" name="2" />
            </hl-tabs>
          </hl-group>
          <hl-scrollbar height="calc(var(--xl) * 8)" class="m-t-lg m-b-lg">
            <hl-group full="full-x" class="panel-body" dir="vertical" gap="var(--md)">
              <hl-group
                v-for="(item, idx) in emails"
                :key="idx"
                class="data-collect cursor-pointer"
                gap="var(--sm)"
                full="full-x"
                style="--data-collect-padding: 0"
              >
                <template v-if="item.state">
                  <hl-icon fill size="sm" :type="item.type" effect="light" radius>
                    <component :is="'fill' + item.icon" />
                  </hl-icon>
                  <hl-group dir="vertical" full>
                    <span class="font-sm font-bold ellipsis">{{ item.title }}</span>
                    <span class="sub-title">{{ item.date }}</span>
                  </hl-group>
                  <hl-group class="static">
                    <hl-tag size="sm" type="primary">未读</hl-tag>
                  </hl-group>
                </template>
                <template v-else>
                  <hl-icon fill size="sm" effect="light" radius class="text-secondary">
                    <component :is="'fill' + item.icon" />
                  </hl-icon>
                  <hl-group dir="vertical" full>
                    <span class="font-sm text-secondary ellipsis">{{ item.title }}</span>
                    <span class="sub-title">{{ item.date }}</span>
                  </hl-group>
                  <hl-group class="static">
                    <hl-tag size="sm">已读</hl-tag>
                  </hl-group>
                </template>
              </hl-group>
            </hl-group>
          </hl-scrollbar>
          <hl-group
            full
            class="p-md border-top cursor-pointer hover:text-primary transition"
            align="items-center"
          >查看全部消息</hl-group>
        </hl-popover>
        <hl-button type="primary" no-fill equal @click="$emit('open-drawer', 'right', 'drawer')">
          <hl-icon>
            <fill-layout />
          </hl-icon>
        </hl-button>
      </hl-group>
      <div class="userinfo">
        <div>
          <span class="name">Hi，Song</span>
        </div>
        <hl-dropdown class="m-l-xs">
          <hl-thumb round type="primary" size="xxs" light>
            <span>松</span>
          </hl-thumb>
          <template #dropdown>
            <hl-dropdown-menu>
              <hl-dropdown-item>个人信息</hl-dropdown-item>
              <hl-dropdown-item>传输属性值</hl-dropdown-item>
              <hl-dropdown-item>已断线</hl-dropdown-item>
              <hl-dropdown-item disabled>待恢复</hl-dropdown-item>
              <hl-dropdown-item divider />
              <hl-dropdown-item>安全退出</hl-dropdown-item>
            </hl-dropdown-menu>
          </template>
        </hl-dropdown>
      </div>
    </div>
  </hl-header>
  <hl-dialog v-model="openThemes" body-class="p-xxl" width="calc(var(--xxl) * 24)">
    <template #header>
      <div class="panel-title">
        <h4>我的主题</h4>
      </div>
      <hl-group gap="var(--lg)" class="panel-header-right">
        <hl-button type="primary" effect="light" @click="openThemesShop">
          进入主题市场
        </hl-button>
        <hl-button equal no-fill @click="openThemes = false">
          <hl-icon><two-close /></hl-icon>
        </hl-button>
      </hl-group>
    </template>
    <hl-row layout="grid" count="lg:count-3" gap="var(--xl)" dir="vertical">
      <hl-col v-for="item in items" :key="item.title" span="col">
        <hl-panel
          class="page-theme-list cursor-pointer"
          padding="0"
          borderless
          style="--panel-radius: var(--radius-xxl); --panel-shadow: none"
        >
          <hl-group align="items-middle items-between" class="float-panel p-x-xl">
            <hb-avatar-list :data="item.userList" size="xxxs" indent="-12px" />
            <hl-group gap="var(--md)" class="static">
              <hl-button type="link" class="bg-element text-regular hover:text-primary" @click="$router.replace('?layout=' + item.themeName)">
                应用主题
                <template #icon>
                  <hl-icon>
                    <fill-heart />
                  </hl-icon>
                </template>
              </hl-button>
            </hl-group>
          </hl-group>
          <hl-icon class="w-full h-full" :color="item.mainColor" :style="item.styles">
            <inline-svg :src="ThemeThumb" />
          </hl-icon>
          <template #footer>
            <hl-group dir="vertical" gap="var(--xs)" class="p-y-md" full>
              <hl-group align="items-middle items-between" gap="var(--xs)">
                <hl-icon size="xxxs" type="primary" class="static" fill round>
                  <fill-user />
                </hl-icon>
                <h6 class="w-100 ellipsis">{{ item.title }}</h6>
                <hl-group align="items-middle" gap="var(--md)" class="static">
                  <hl-group align="items-middle" gap="var(--xxs)">
                    <hl-icon size="xs" class="text-secondary">
                      <fill-heart />
                    </hl-icon>
                    <span>22</span>
                  </hl-group>
                  <hl-group align="items-middle" gap="var(--xxs)">
                    <hl-icon size="xs" class="text-secondary">
                      <fill-star />
                    </hl-icon>
                    <span>13</span>
                  </hl-group>
                </hl-group>
              </hl-group>
            </hl-group>
          </template>
        </hl-panel>
      </hl-col>
    </hl-row>
  </hl-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { logoCCUrl } from '@/utils/icons'
import ThemeThumb from '../assets/public/images/theme.svg?url'

export default defineComponent({
  name: 'LayoutHeader',
  emits: ['open-drawer'],
  setup() {
    const activeName = ref('1')
    const emails = ref([
      { state: 1, type: 'danger', icon: 'Calendar', title: '流动中国', sender: 'test@sina.com', date: '2021-09-09' },
      { state: 1, type: 'primary', icon: 'Briefcase', title: '被捧为"印太沙皇"的他', sender: 'liwu@sohu.com', date: '2021-11-09' },
      { state: 1, type: 'success', icon: 'Inbox', title: '救援人员正稀释', sender: 'wanglei12@fb.com', date: '2021-11-10' },
      { state: 1, type: 'warning', icon: 'Application', title: '神舟十二号撤离空间站组合体', sender: 'aother@google.com', date: '2021-11-11' },
      { state: 1, type: 'info', icon: 'Print', title: '中国"驱逐"立陶宛驻华大使', sender: 'yesyes@outlook.com', date: '2021-12-09' },
      { state: 0, type: 'danger', icon: 'Server', title: '英国议会禁止中国大使参加活动', sender: 'nonono@ms.com', date: '2021-12-10' },
      { state: 0, type: 'primary', icon: 'Box', title: '塔利班代理副总理', sender: 'te222t@chineren.com', date: '2021-12-21' },
      { state: 0, type: 'warning', icon: 'ChartDoughnut', title: '首次大规模演习', sender: '222test@sina.com', date: '2021-12-31' },
    ])

    const todos = ref([
      { title: '完成Hongluan UI基础设计', date: '2021-09-09', finished: false },
      { title: '完成Hongluan Pro页面开发"', date: '2021-11-09', finished: false },
      { title: '完成监测预警App开发"', date: '2021-11-10', finished: false },
      { title: '完成应急微前端拆分', date: '2021-11-11', finished: false },
      { title: '优化Hongluan UI样式', date: '2021-12-09', finished: false },
      { title: '同步更新Hongluan Pro代码', date: '2021-12-10', finished: false },
      { title: '完成连云港一张图开发', date: '2021-12-21', finished: false },
      { title: '一张图新版组件库设计', date: '2021-12-31', finished: false },
    ])
    const options = ref([
      {
        value: '选项1',
        label: '北京',
      },
      {
        value: '选项2',
        label: '上海',
      },
      {
        value: '选项3',
        label: '广东',
      },
      {
        value: '选项4',
        label: '天津',
      },
      {
        value: '选项5',
        label: '河北',
      },
    ])
    const value = ref('')
    const openVisualizedPage = () => {
      window.open('/visualized/index.html', '_blank')
    }
    const openHl = () => {
      window.open('http://hl.front.etcc.group/', '_blank')
    }
    const openThemesShop = () => {
      window.open('http://localhost:4000/#themes', '_blank')
    }
    const openThemes = ref(false)
    const items = ref([
      {
        logo: '宏博',
        title: 'UK3主题-亮色',
        mainColor: '#40a9ff',
        styles: '--theme-thumb-header: #fff; --theme-thumb-aside: #242939; --theme-thumb-body: #eaf1f7; --theme-thumb-panel: #fff;',
        themeName: 'default',
        userList: [
          {
            'title': '宏博',
            'url': 'https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg',
          },
          {
            'title': '李维',
            'url': 'https://png.pngtree.com/png-clipart/20190614/original/pngtree-female-avatar-vector-icon-png-image_3725439.jpg',
          },
        ],
      },
      {
        logo: '宏博',
        title: 'UK3主题-暗色',
        mainColor: '#40a9ff',
        styles: '--theme-thumb-header: #1e1e2d; --theme-thumb-aside: #1e1e2d; --theme-thumb-body: #151521; --theme-thumb-panel: #1e1e2d;',
        themeName: 'dark',
        userList: [
          {
            'title': '宏博',
            'url': 'https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg',
          },
          {
            'title': '李维',
            'url': 'https://png.pngtree.com/png-clipart/20190614/original/pngtree-female-avatar-vector-icon-png-image_3725439.jpg',
          },
        ],
      },
      {
        logo: '宏博',
        title: '安全应急MIS端主题',
        mainColor: '#47A0FC',
        styles: '--theme-thumb-header: #3653DE; --theme-thumb-aside: #ffffff; --theme-thumb-body: #eef2f9; --theme-thumb-panel: #ffffff;',
        themeName: 'uk2',
        userList: [
          {
            'title': '宏博',
            'url': 'https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg',
          },
          {
            'title': '李维',
            'url': 'https://png.pngtree.com/png-clipart/20190614/original/pngtree-female-avatar-vector-icon-png-image_3725439.jpg',
          },
        ],
      },
      {
        logo: '宏博',
        title: '淮安客户定制主题',
        mainColor: '#47A0FC',
        styles: '--theme-thumb-header: #3D63C3; --theme-thumb-aside: #1e2f5e; --theme-thumb-body: #eef2f9; --theme-thumb-panel: #ffffff;',
        themeName: 'uk2a',
        userList: [
          {
            'title': '宏博',
            'url': 'https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg',
          },
          {
            'title': '李维',
            'url': 'https://png.pngtree.com/png-clipart/20190614/original/pngtree-female-avatar-vector-icon-png-image_3725439.jpg',
          },
        ],
      },
      {
        logo: '宏博',
        title: '繁星平台主题',
        mainColor: '#36A4FF',
        styles: '--theme-thumb-header: #4bbafd; --theme-thumb-aside: #f9fafe; --theme-thumb-body: #f3f4fb; --theme-thumb-panel: #ffffff;',
        themeName: 'fx',
        userList: [
          {
            'title': '宏博',
            'url': 'https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg',
          },
          {
            'title': '李维',
            'url': 'https://png.pngtree.com/png-clipart/20190614/original/pngtree-female-avatar-vector-icon-png-image_3725439.jpg',
          },
        ],
      },
      {
        logo: '宏博',
        title: '电子云管控台主题',
        mainColor: '#0046ff',
        styles: '--theme-thumb-header: #ffffff; --theme-thumb-aside: #ffffff; --theme-thumb-body: #f2f3f4; --theme-thumb-panel: #ffffff;',
        themeName: 'cecloud',
        userList: [
          {
            'title': '宏博',
            'url': 'https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-users-icon-png-image_4144740.jpg',
          },
          {
            'title': '李维',
            'url': 'https://png.pngtree.com/png-clipart/20190614/original/pngtree-female-avatar-vector-icon-png-image_3725439.jpg',
          },
        ],
      },
    ])

    return {
      activeName,
      logoCCUrl,
      emails,
      todos,
      openVisualizedPage,
      options,
      value,
      openThemesShop,
      openThemes,
      items,
      ThemeThumb,
      openHl,
    }
  },
})
</script>
