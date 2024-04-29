<template>
  <hl-row layout="grid" count="xxl:count-4 xl:count-3 lg:count-2" gap="var(--lg)" gap-y="var(--lg)" dir="vertical">
    <hl-col v-for="item in items" :key="item.title" span="col">
      <hl-panel class="multi-card" borderless header-height="calc(var(--xxs) * 18)">
        <template #header>
          <div class="panel-header-left">
            <hl-icon type="primary" size="xl"><two-inbox /></hl-icon>
          </div>
          <div class="panel-title">
            <h4>项目名称</h4>
          </div>
          <div class="panel-header-right">
            <hl-dropdown>
              <hl-icon><two-more /></hl-icon>
              <template #dropdown>
                <hl-dropdown-menu>
                  <hl-dropdown-item>
                    查看详情
                  </hl-dropdown-item>
                  <hl-dropdown-item>
                    更新进度
                  </hl-dropdown-item>
                </hl-dropdown-menu>
              </template>
            </hl-dropdown>
          </div>
        </template>
        <div class="card-content">
          <div class="p-b-md">本次任务将总结上一季度收集和反馈的建议，进行一次从视觉交互到软件性能的优化工作。</div>
          <div class="card-description">
            <hl-progress show-as="line" :percentage="75" stroke-width="var(--xxs)" text="Progress" />
          </div>
          <hl-group class="card-tools" indent="-8px">
            <hl-thumb round bordered size="sm" type="primary" effect="light">
              <span>A</span>
            </hl-thumb>
            <hl-thumb round bordered size="sm" type="danger" effect="light">
              <span>B</span>
            </hl-thumb>
            <hl-thumb round bordered size="sm" type="warning" effect="light">
              <span>C</span>
            </hl-thumb>
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

