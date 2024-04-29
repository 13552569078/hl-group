<template show-source>
  <hv-panel title="旗帜卡片">
    <hl-group full="full-x" gap="var(--md)" class="m-t-md">
      <hl-group class="card-flag" full="full-x" align="items-middle" dir="vertical" style="--card-padding-x: var(--xxs)">
        <hl-icon size="xs" fill>
          <fill-Hazard />
        </hl-icon>
        <span class="m-t-xxs text-secondary">危险源</span>
        <h2 class="font-din m-t-xxs" style="--suffix-offset: -0.1em" data-suffix="个">75</h2>
      </hl-group>
      <hl-group class="card-flag" full="full-x" align="items-middle" dir="vertical" style="--card-padding-x: var(--xxs)">
        <hl-icon size="xs" fill>
          <fill-Firm />
        </hl-icon>
        <span class="m-t-xxs text-secondary">集贸市场</span>
        <h2 class="font-din m-t-xxs" style="--suffix-offset: -0.1em" data-suffix="个">34</h2>
      </hl-group>
      <hl-group class="card-flag" full="full-x" align="items-middle" dir="vertical" style="--card-padding-x: var(--xxs)">
        <hl-icon size="xs" fill>
          <fill-Box />
        </hl-icon>
        <span class="m-t-xxs text-secondary">密闭空间</span>
        <h2 class="font-din m-t-xxs" style="--suffix-offset: -0.1em" data-suffix="个">37</h2>
      </hl-group>
      <hl-group class="card-flag" full="full-x" align="items-middle" dir="vertical" style="--card-padding-x: var(--xxs)">
        <hl-icon size="xs" fill>
          <fill-Shield />
        </hl-icon>
        <span class="m-t-xxs text-secondary">防护目标</span>
        <h2 class="font-din m-t-xxs" style="--suffix-offset: -0.1em" data-suffix="个">28</h2>
      </hl-group>
    </hl-group>
  </hv-panel>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    return {}
  },
})
</script>
