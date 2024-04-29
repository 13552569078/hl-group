<template>
  <hl-checkbox-group v-model="checkedCities" :min="1" :max="2">
    <hl-checkbox v-for="city in cities" :key="city" :label="city">{{ city }}</hl-checkbox>
  </hl-checkbox-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const cityOptions = ['上海', '北京', '广州', '深圳']

const checkedCities = ref(['上海', '北京'])
const cities = ref(cityOptions)

</script>
