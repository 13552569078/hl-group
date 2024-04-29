<template>
  <hl-autocomplete
    v-model="val"
    :fetch-suggestions="querySearchAsync"
    placeholder="请输入内容"
    class="w-xl block"
    @select="handleSelect"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const val = ref('')
const restaurants = ref([])
const loadAll = () => {
  return [
    {
      value: '三全鲜食（北新泾店）',
      address: '长宁区新渔路144号',
    },
    {
      value: 'Hot honey 首尔炸鸡（仙霞路）',
      address: '上海市长宁区淞虹路661号',
    },
    {
      value: '新旺角茶餐厅',
      address: '上海市普陀区真北路988号创邑金沙谷6号楼113',
    },
    { value: '泷千家(天山西路店)', address: '天山西路438号' },
    {
      value: '胖仙女纸杯蛋糕（上海凌空店）',
      address: '上海市长宁区金钟路968号1幢18号楼一层商铺18-101',
    },
    { value: '贡茶', address: '上海市长宁区金钟路633号' },
    {
      value: '豪大大香鸡排超级奶爸',
      address: '上海市嘉定区曹安公路曹安路1685号',
    },
    {
      value: '茶芝兰（奶茶，手抓饼）',
      address: '上海市普陀区同普路1435号',
    },
    { value: '十二泷町', address: '上海市北翟路1444弄81号B幢-107' },
    { value: '星移浓缩咖啡', address: '上海市嘉定区新郁路817号' },
    { value: '阿姨奶茶/豪大大', address: '嘉定区曹安路1611号' },
    { value: '新麦甜四季甜品炸鸡', address: '嘉定区曹安公路2383弄55号' },
  ]
}

let timeout
const querySearchAsync = (queryString, cb) => {
  var results = queryString
    ? restaurants.value.filter(createFilter(queryString))
    : restaurants.value

  clearTimeout(timeout)
  timeout = setTimeout(() => {
    cb(results)
  }, 3000)
}
const createFilter = queryString => {
  return restaurant => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
      0
    )
  }
}
const handleSelect = item => {
  console.log(item)
}
onMounted(() => {
  restaurants.value = loadAll()
})
</script>
