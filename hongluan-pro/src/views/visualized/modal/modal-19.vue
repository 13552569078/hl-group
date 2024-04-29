<template show-source>
  <hl-group gap="var(--sm)" class="bg-content">
    <hb-data-collect gap="var(--sm)" radius="0" class="border border-transparent hover:border-primary" @click="show = !show">
      <hl-icon type="primary" effect="light" size="lg" fill class="static">
        <fill-Firm />
      </hl-icon>
      <hl-group dir="vertical" full="full-x" class="content">
        <transition name="slideTop">
          <div v-show="show" class="float-number" style="animation-duration: 0.6s">+18</div>
        </transition>
        <h2 class="font-din">75</h2>
        <span class="text-secondary">接入数据</span>
      </hl-group>
    </hb-data-collect>

    <hb-data-collect gap="var(--sm)" radius="0" class="border border-transparent hover:border-primary">
      <hl-icon type="primary" effect="light" size="lg" fill class="static">
        <fill-Firm />
      </hl-icon>
      <hl-group dir="vertical" full="full-x" class="content">
        <h2 class="font-din">75</h2>
        <span class="text-secondary">报警信息</span>
      </hl-group>
    </hb-data-collect>

    <hb-data-collect gap="var(--sm)" radius="0" class="border border-transparent hover:border-primary">
      <hl-icon type="primary" effect="light" size="lg" fill class="static">
        <fill-Firm />
      </hl-icon>
      <hl-group dir="vertical" full="full-x" class="content">
        <h2 class="font-din">75</h2>
        <span class="text-secondary">报警研判</span>
      </hl-group>
    </hb-data-collect>

    <hl-group class="border border-transparent hover:border-primary">
      <hb-data-collect gap="var(--sm)" radius="0">
        <hl-icon type="warning" effect="light" size="lg" fill class="static">
          <fill-Firm />
        </hl-icon>
        <hl-group dir="vertical" full="full-x" class="content">
          <h2 class="font-din">75</h2>
          <span class="text-secondary">自动办结</span>
        </hl-group>
      </hb-data-collect>
      <hb-data-collect gap="var(--sm)" radius="0">
        <hl-icon type="warning" effect="light" size="lg" fill class="static">
          <fill-Firm />
        </hl-icon>
        <hl-group dir="vertical" full="full-x" class="content">
          <h2 class="font-din">75</h2>
          <span class="text-secondary">事件中心处置</span>
        </hl-group>
      </hb-data-collect>
    </hl-group>
  </hl-group>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    const show = ref(false)
    return {
      show,
    }
  },
})
</script>

