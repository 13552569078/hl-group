<template>
  <hl-row layout="grid" count="xxl:count-4 xl:count-3 lg:count-2" gap="var(--lg)" gap-y="var(--lg)" dir="vertical">
    <hl-col v-for="item in items" :key="item.title" span="col">
      <hl-panel class="multi-card float-header" style="--card-padding: var(--xxl)" header-height="calc(var(--xxs) * 18)">
        <template #header>
          <div class="panel-title"></div>
          <div class="panel-header-right">
            <hl-dropdown>
              <hl-icon><two-more /></hl-icon>
              <template #dropdown>
                <hl-dropdown-menu>
                  <hl-dropdown-item>
                    查看详情
                  </hl-dropdown-item>
                  <hl-dropdown-item>
                    打电话
                  </hl-dropdown-item>
                  <hl-dropdown-item>
                    发短信
                  </hl-dropdown-item>
                </hl-dropdown-menu>
              </template>
            </hl-dropdown>
          </div>
        </template>
        <hl-group full="full-x" align="items-middle" dir="vertical" gap="var(--lg)">
          <hl-thumb round type="primary" size="xxl">
            <span>{{ item.face }}</span>
            <hl-badge v-if="item.online" type="danger" position="rt" dot />
          </hl-thumb>
          <hl-group full="full-x" align="items-middle" dir="vertical" gap="var(--xxs)">
            <h4>{{ item.name }}</h4>
            <p class="text-secondary">{{ item.address }}</p>
          </hl-group>
          <hl-group gap="var(--sm)">
            <hl-button type="primary" effect="light" equal round>
              <template #icon>
                <hl-icon><two-book /></hl-icon>
              </template>
            </hl-button>
            <hl-button type="primary" effect="light" equal round>
              <template #icon>
                <hl-icon><two-copy /></hl-icon>
              </template>
            </hl-button>
            <hl-button type="primary" effect="light" equal round>
              <template #icon>
                <hl-icon><two-good /></hl-icon>
              </template>
            </hl-button>
          </hl-group>
        </hl-group>
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

