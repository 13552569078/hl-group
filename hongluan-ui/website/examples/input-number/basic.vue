<template>
  <hl-input-number
    v-model="num"
    :min="1"
    :max="10"
    label="描述文字"
    indent
    merge
    @change="handleChange"
  />
  <hl-input-number
    v-model="num"
    class="m-l-lg"
    style="width:180px"
    :min="1"
    :max="10"
    label="描述文字"
    gap="var(--sm)"
    round
    @change="handleChange"
  />
  <hl-input-number
    v-model="num"
    class="m-l-lg"
    style="width: var(--xxl)"
    dir="vertical"
    :min="1"
    :max="10"
    label="描述文字"
    indent
    merge
    @change="handleChange"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(1)
const handleChange = value => {
  console.log(value)
}
</script>
