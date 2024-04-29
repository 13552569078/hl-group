<template>
  <hv-panel title="资源投入">
    <template #action> </template>
    <hl-group full="full-x" gap="var(--md)" class="m-t-md">
      <hl-group v-for="(item, index) in card" :key="index" dir="vertical" class="card-tarot" full="full-x">
        <cite class="dom-frame"><cite class="dom-frame"></cite></cite>
        <h4 class="font-din" :data-suffix="item.suffix" style="--suffix-offset: calc(var(--xxs) * -0.5)">{{ item.total }}</h4>
        <div class="separator">
          <svg viewBox="0 0 106 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g stroke="none" stroke-width="1" fill="currentColor" fill-rule="evenodd">
              <rect fill-opacity="0.3" x="0" y="6.7" width="40" height="0.5" />
              <rect fill-opacity="0.3" x="66" y="6.7" width="40" height="0.5" />
              <path
                d="M60.4246212,7.07106781 L53,-0.353553391 L45.5753788,7.07106781 L53,14.495689 L60.4246212,7.07106781 Z M53,0.353 L59.718,7.071 L53,13.789 L46.282,7.071 L53,0.353 Z"
                fill-opacity="0.3"
                fill-rule="nonzero"
              />
              <path
                d="M57.9497475,7.07106781 L53,2.12132034 L48.0502525,7.07106781 L53,12.0208153 L57.9497475,7.07106781 Z M53,3.535 L56.536,7.071 L53,10.607 L49.464,7.071 L53,3.535 Z"
                fill-rule="nonzero"
              />
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
  components: {},
  setup() {
    const card = ref([
      {
        title: '研判人员',
        total: 200,
        suffix: '人',
      },
      {
        title: '协同处置部门',
        total: 16,
        suffix: '家',
      },
      {
        title: '权属单位',
        total: 3,
        suffix: '家',
      },
    ])
    return {
      card,
    }
  },
})
</script>
