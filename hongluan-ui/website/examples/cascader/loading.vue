<template>
  <hl-cascader :props="props" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

let id = 0
const props = ref({
  lazy: true,
  lazyLoad(node, resolve) {
    const { level } = node
    setTimeout(() => {
      const nodes = Array.from({ length: level + 1 }).map(item => ({
        value: ++id,
        label: `选项${id}`,
        leaf: level >= 2,
      }))
      // 通过调用resolve将子节点数据返回，通知组件数据加载完成
      resolve(nodes)
    }, 1000)
  },
})
</script>
