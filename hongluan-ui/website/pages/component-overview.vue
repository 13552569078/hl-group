<template>
  <div v-for="(item, keyy) in navsComponnetData['zh-CN']" :key="keyy" class="w-full m-t-xxl p-xxl">
    <h2>组件概览</h2>
    <p class="m-t-lg p-b-xxl">Hongluan 是基于 <a href="https://v3.cn.vuejs.org/" target="_blank">VUE3</a>的一套<code>响应式</code><code>高可控</code>的前端UI框架。它为每个组件集成了尺寸、间距等语义化类型。甚至能让你离开CSS并且直接在HTML标记语言中组合出任意的设计。</p>
    <template v-if="item.groups">
      <template v-for="(group, key) in item.groups" :key="key">
        <h4 class="m-y-lg" @click="expandMenu">{{ group.groupName }}</h4>
        <hl-row layout="grid" count="xl:count-3 lg:count-2" gap="var(--lg)" class="m-b-xxl">
          <template v-for="(navItem, keey) in group.list" :key="keey">
            <hl-col v-if="!navItem.hidden" class="col border p-lg radius-lg display-flex flex-col hover:border-primary transition">
              <h5 class="m-b-md">{{ navItem.title }}</h5>
              <router-link
                :to="navItem.path.replace('/component/', '')"
                exact
                class="display-flex h-full p-md w-full items-middle items-center"
                style="background-color: var(--primary-light)"
              >
                <hl-thumb :src="svgs['../assets/component-thumb/' + navItem.thumb]?.default" class="w-full h-auto bg-content" style="box-shadow: 0 4px 16px 0 rgba(10,99,171,0.12);" />
              </router-link>
            </hl-col>
          </template>
        </hl-row>
      </template>
    </template>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import navsComponnetData from '../nav.component.json'
export default defineComponent({
  components: {
  },
  setup() {
    const svgs = import.meta.globEager('../assets/component-thumb/*.svg')

    return {
      navsComponnetData,
      svgs,
    }
  },
})
</script>

<style scoped>
</style>

