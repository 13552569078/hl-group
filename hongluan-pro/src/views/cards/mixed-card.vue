<template>
  <hl-row layout="flow" count="xxl:count-3 lg:count-2" gap="var(--lg)">
    <hl-col span="col">
      <hl-panel class="card-panel">
        <template #header>
          <div class="panel-title">
            <h4>卡片标题</h4>
          </div>
          <div class="panel-header-right">
            <hl-button no-fill equal>
              <hl-icon>
                <two-more />
              </hl-icon>
            </hl-button>
          </div>
        </template>
        <pie-4-chart />
        <hl-group dir="vertical" gap="var(--md)" full="full-x" class="m-t-lg">
          <hb-data-collect
            v-for="item in items"
            :key="item.title"
            gap="var(--sm)"
            :class="`bg-${item.type}-light-5`"
          >
            <hl-icon :type="item.type" size="lg" fill radius class="static">
              <component :is="'Fill' + item.icon" />
            </hl-icon>
            <hl-group dir="vertical" full="full-x">
              <h6 class="title">{{ item.title }}</h6>
              <span class="sub-title">{{ item.sub_title }}</span>
            </hl-group>
          </hb-data-collect>
        </hl-group>
      </hl-panel>
    </hl-col>
  </hl-row>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'
import Line3Chart from '../chart/line-chart/components/line3.vue'
import Column6Chart from '../chart/column-chart/components/column6.vue'
import Pie4Chart from '../chart/pie-chart/components/pie4.vue'

export default defineComponent({
  components: {
    Line3Chart,
    Column6Chart,
    Pie4Chart,
  },
  setup() {
    const items = ref([
      { icon: 'Calendar', title: '布拉德·西蒙斯', sub_title: 'HTML, JS, ReactJS', type: 'primary' },
      { icon: 'Briefcase', title: '杰西克拉克森', sub_title: 'ASP.NET', type: 'danger' },
      { icon: 'Inbox', title: '勒布朗·韦德', sub_title: 'PHP、Laravel、VueJS', type: 'warning' },
    ])
    return {
      items,
    }
  },
})
</script>
<style>
</style>
