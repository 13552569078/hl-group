<template>
  <hl-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</hl-checkbox>
  <hr>
  <hl-checkbox-group v-model="checkedCities" dir="vertical" gap="var(--md)" @change="handleCheckedCitiesChange">
    <hl-checkbox v-for="city in cities" :key="city" :label="city">{{ city }}</hl-checkbox>
  </hl-checkbox-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const cityOptions = ['上海', '北京', '广州', '深圳']

const checkAll = ref(false)
const checkedCities = ref(['上海', '北京'])
const cities = ref(cityOptions)
const isIndeterminate = ref(true)

const handleCheckAllChange = val => {
  checkedCities.value = val ? cityOptions : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = value => {
  let checkedCount = value.length
  checkAll.value = checkedCount === cities.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.value.length
}

</script>
