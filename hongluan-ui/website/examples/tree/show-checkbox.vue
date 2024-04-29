<template>
  <hl-tree :props="props" :load="loadNode" lazy show-checkbox @check-change="handleCheckChange" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = ref({
  label: 'name',
  children: 'zones',
})
const count = ref(1)

const handleCheckChange = (data, checked, indeterminate) => {
  console.log(data, checked, indeterminate)
}
const handleNodeClick = data => {
  console.log(data)
}
const loadNode = (node, resolve) => {
  if (node.level === 0) {
    return resolve([{ name: 'region1' }, { name: 'region2' }])
  }
  if (node.level > 3) return resolve([])

  var hasChild
  if (node.data.name === 'region1') {
    hasChild = true
  } else if (node.data.name === 'region2') {
    hasChild = false
  } else {
    hasChild = Math.random() > 0.5
  }

  setTimeout(() => {
    var data
    if (hasChild) {
      data = [
        {
          name: 'zone' + count.value++,
        },
        {
          name: 'zone' + count.value++,
        },
      ]
    } else {
      data = []
    }

    resolve(data)
  }, 500)
}

</script>
