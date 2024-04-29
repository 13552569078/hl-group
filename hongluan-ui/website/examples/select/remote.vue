<template>
  <hl-select
    v-model="value"
    multiple
    filterable
    remote
    reserve-keyword
    placeholder="隐藏后缀Icon"
    :remote-method="remoteMethod"
    :loading="loading"
    clearable
  >
    <hl-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
  </hl-select>
  <hl-select
    v-model="value"
    multiple
    filterable
    remote
    reserve-keyword
    placeholder="显示后缀Icon"
    class="m-l-md"
    remote-show-suffix
    :remote-method="remoteMethod"
    :loading="loading"
    clearable
  >
    <hl-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    <template #suffix="{ className }">
      <!--这里必须添加class，用来控制后缀Icon和清除Icon的切换-->
      <hl-icon :class="className">
        <two-navigation />
      </hl-icon>
    </template>
  </hl-select>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TwoNavigation } from '@hongluan-ui/icons'

const options = ref([])
const value = ref([])
const list = ref([])
const loading = ref(false)
const states = ref([
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
])

const remoteMethod = query => {
  if (query) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      options.value = list.value.filter(item => {
        return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1
      })
    }, 200)
  } else {
    options.value = []
  }
}

onMounted(() => {
  list.value = states.value.map(item => {
    return { value: `value:${item}`, label: `label:${item}` }
  })
})

</script>
