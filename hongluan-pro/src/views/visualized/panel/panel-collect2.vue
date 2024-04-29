<template show-source>
  <hv-panel title="信息集成卡片2">
    <hl-row layout="grid" count="count-2" gap="var(--md)" class="m-t-md">
      <hl-col span="col">
        <hl-checkbox v-model="checkbox" label="1" custom class="display-flex">
          <hl-group class="card-flag top bg-light checked:bg-hover checked:border-primary" gap="var(--sm)" align="items-middle" full="full-x" style="--card-padding: var(--sm)">
            <hl-icon fill size="lg" class="static">
              <fill-airplay />
            </hl-icon>
            <hl-group dir="vertical" gap="var(--xxs)">
              <hl-group align="items-middle">
                <h2 class="title" data-suffix="个" style="--suffix-offset: -0.1em; line-height: 1">75</h2>
              </hl-group>
              <span class="text-secondary">应急预案</span>
            </hl-group>
          </hl-group>
        </hl-checkbox>
      </hl-col>

      <hl-col span="col">
        <hl-checkbox v-model="checkbox" label="2" custom class="display-flex">
          <hl-group class="card-flag top bg-light checked:bg-hover checked:border-primary" gap="var(--sm)" align="items-middle" full="full-x" style="--card-padding: var(--sm)">
            <hl-icon fill size="lg" class="static">
              <fill-airplay />
            </hl-icon>
            <hl-group dir="vertical" gap="var(--xxs)">
              <hl-group align="items-middle">
                <h2 class="title" data-suffix="个" style="--suffix-offset: -0.1em; line-height: 1">75</h2>
              </hl-group>
              <span class="text-secondary">应急预案</span>
            </hl-group>
          </hl-group>
        </hl-checkbox>
      </hl-col>
    </hl-row>
  </hv-panel>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    const checkbox = ref(['1'])
    return {
      checkbox,
    }
  },
})
</script>
