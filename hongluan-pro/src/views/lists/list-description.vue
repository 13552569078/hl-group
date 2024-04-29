<template>
  <hl-row layout="grid" count="xxl:count-4 xl:count-3 lg:count-2" gap="var(--lg)" gap-y="var(--lg)" dir="vertical">
    <hl-col v-for="item in items" :key="item.title" span="col">
      <hl-panel class="multi-card" borderless header-height="calc(var(--xxs) * 18)">
        <template #header>
          <div class="panel-header-left">
            <hl-icon type="primary" size="xl"><two-inbox /></hl-icon>
          </div>
          <div class="panel-title">
            <h4>任务名称</h4>
          </div>
          <div class="panel-header-right">
            <hl-button no-fill equal>
              <hl-icon><two-more /></hl-icon>
            </hl-button>
          </div>
        </template>
        <div class="card-content">
          <div class="card-description">当按钮附有状态色的情况下，你可以在加上 effect = "light" 属性即可使它的颜色淡。</div>
          <hl-group class="card-tools" full="full-x" gap="var(--xs)" align="items-left">
            <hl-button type="primary" equal>
              <hl-icon><two-book /></hl-icon>
            </hl-button>
            <hl-button type="primary" icon="tag" effect="light" equal>
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
      items,
    }
  },
})
</script>

