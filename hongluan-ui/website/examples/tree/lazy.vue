<template>
  <hl-tree :props="props" :load="loadNode" lazy show-checkbox />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = ref({
  label: 'name',
  children: 'zones',
  isLeaf: 'leaf',
})
const loadNode = (node, resolve) => {
  if (node.level === 0) {
    return resolve([{ name: 'region' }])
  }
  if (node.level > 1) return resolve([])

  setTimeout(() => {
    const data = [
      {
        name: 'leaf',
        leaf: true,
      },
      {
        name: 'zone',
      },
    ]

    resolve(data)
  }, 2000)
}
</script>
