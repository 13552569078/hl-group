<template>
  <hl-transfer
    v-model="value"
    filterable
    :filter-method="filterMethod"
    :filter-props="{ maxlength: 10 }"
    filter-placeholder="请输入城市拼音"
    :data="data"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const generateData = () => {
  const data = []
  const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都']
  const spell = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu']
  cities.forEach((city, index) => {
    data.push({
      label: city,
      key: index,
      spell: spell[index],
    })
  })
  return data
}
const data = ref(generateData())
const value = ref([])
const filterMethod = (query, item) => {
  return item.spell.indexOf(query) > -1
}

</script>
