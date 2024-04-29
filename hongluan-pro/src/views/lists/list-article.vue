<template>
  <hl-row layout="grid" count="xxl:count-4 xl:count-3 lg:count-2" gap="var(--lg)" gap-y="var(--lg)" dir="vertical">
    <hl-col v-for="item in items" :key="item.title" span="col">
      <hl-panel class="multi-card float-header full-thumb" borderless header-height="calc(var(--xxs) * 18)">
        <template #header>
          <div class="panel-title"></div>
          <div class="panel-header-right">
            <hl-dropdown>
              <hl-icon><two-more /></hl-icon>
              <template #dropdown>
                <hl-dropdown-menu>
                  <hl-dropdown-item>
                    分享
                    <template #icon>
                      <hl-icon><fill-share /></hl-icon>
                    </template>
                  </hl-dropdown-item>
                  <hl-dropdown-item>
                    复制链接
                    <template #icon>
                      <hl-icon><fill-copy /></hl-icon>
                    </template>
                  </hl-dropdown-item>
                  <hl-dropdown-item>
                    收藏
                    <template #icon>
                      <hl-icon><fill-heart /></hl-icon>
                    </template>
                  </hl-dropdown-item>
                </hl-dropdown-menu>
              </template>
            </hl-dropdown>
          </div>
        </template>

        <hl-thumb full :src="url" fit="cover" class="card-thumb" />
        <div class="card-content">
          <div class="card-title">卡片大标题区域只允许一行</div>
          <div class="card-description">当按钮附有状态色的情况下，你可以在加上 effect = "light" 属性即可使它的颜色淡。</div>
          <hl-group class="card-tools" full="full-x" align="items-between">
            <hl-button type="primary" icon-position="left" class="static" effect="light">
              <span>查看详情</span>
              <hl-icon><two-search /></hl-icon>
            </hl-button>
            <hl-button effect="light" equal>
              <hl-icon><two-tag /></hl-icon>
            </hl-button>
          </hl-group>
        </div>
      </hl-panel>
    </hl-col>
  </hl-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const url = ref(
      'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNHB4IiBoZWlnaHQ9IjNweCIgdmlld0JveD0iMCAwIDQgMyIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDx0aXRsZT7nn6nlvaI8L3RpdGxlPgogICAgPGcgaWQ9Iumhtemdoi0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBkPSJNMCwwIEw0LDAgTDQsMyBMMCwzIEwwLDAgWiIgaWQ9IuefqeW9oiIgZmlsbD0iI0Y2RjhGRSI+PC9wYXRoPgogICAgPC9nPgo8L3N2Zz4=',
    )
    const items = ref([
      { face: '宏博', name: '夏宏博', address: 'HTML, JS, ReactJS', online: false },
      { face: '志强', name: '赵志强', address: 'ASP.NET', online: true },
      { face: '元龙', name: '夏元龙', address: 'PHP, Laravel, VueJS', online: false },
      { face: '鸿祯', name: '赵鸿祯', address: 'Python, ReactJS', online: false },
      { face: '美玲', name: '焦美玲', address: 'Vue, Javascript', online: false },
      { face: '倩秀', name: '向倩秀', address: 'Javascript, SQLite', online: false },
      { face: '欣艳', name: '池欣艳', address: 'PHP, Vue, Artisan CLI', online: false },
      { face: '溪蓝', name: '冷溪蓝', address: 'Laravel, SQLite, Python', online: false },
    ])
    return {
      url,
      items,
    }
  },
})
</script>

