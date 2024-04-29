<template>
  <hv-panel title="塔罗卡片">
    <hl-group full="full-x" gap="var(--md)" class="m-t-md">
      <hl-group v-for="(item, index) in overviewList" :key="index" dir="vertical" class="card-tarot" full="full-x">
        <cite class="dom-frame"><cite class="dom-frame"></cite></cite>
        <h2 class="title">{{ item.percent }}</h2>
        <div class="number">
          <em>{{ item.supervised }}</em> / {{ item.total }}
        </div>
        <div class="separator">
          <svg viewBox="0 0 106 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g stroke="none" stroke-width="1" fill="currentColor" fill-rule="evenodd">
              <rect fill-opacity="0.3" x="0" y="6.7" width="40" height="0.5" />
              <rect fill-opacity="0.3" x="66" y="6.7" width="40" height="0.5" />
              <path d="M60.4246212,7.07106781 L53,-0.353553391 L45.5753788,7.07106781 L53,14.495689 L60.4246212,7.07106781 Z M53,0.353 L59.718,7.071 L53,13.789 L46.282,7.071 L53,0.353 Z" fill-opacity="0.3" fill-rule="nonzero" />
              <path d="M57.9497475,7.07106781 L53,2.12132034 L48.0502525,7.07106781 L53,12.0208153 L57.9497475,7.07106781 Z M53,3.535 L56.536,7.071 L53,10.607 L49.464,7.071 L53,3.535 Z" fill-rule="nonzero" />
            </g>
          </svg>
        </div>
        <div class="label">{{ item.title }}</div>
      </hl-group>
    </hl-group>
  </hv-panel>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MonitorEventIndex',
  components: {
  },
  setup() {
    const overviewList = ref(BASIC)

    return {
      overviewList,
    }
  },
})

const BASIC = [
  {
    dict: 'GAS_WELL',
    title: '燃气井监测',
    total: 200,
    supervised: 150,
    percent: '75.00%',
  },
  {
    dict: 'GAS_STATION',
    title: '调压站监测',
    total: 16,
    supervised: 6,
    percent: '37.50%',
  },
  {
    dict: 'GAS_USER',
    title: '燃气用户监测',
    total: 15000,
    supervised: 50,
    percent: '0.33%',
  },
]
</script>
