<template>
  <hl-input-number
    v-model="num"
    :min="1"
    :max="10"
    indent
    merge
    class="m-r-md"
    style="width: 180px"
    @change="handleChange"
  >
    <template #prefix>¥</template>
    <template #suffix>元</template>
  </hl-input-number>
  <hl-input-number
    v-model="num"
    controls-position="left"
    indent
    deep-merge
    class="m-r-md"
    :min="1"
    :max="10"
    @change="handleChange"
  >
    <template #prefix><hl-icon><two-heart /></hl-icon></template>
    <template #suffix>个</template>
  </hl-input-number>
  <hl-input-number
    v-model="num"
    controls-position="right"
    indent
    deep-merge
    :min="1"
    :max="10"
    @change="handleChange"
  >
    <template #suffix><hl-icon><two-heart /></hl-icon></template>
  </hl-input-number>
  <br><br>
  <hl-input-number
    v-model="num"
    controls-position="inner"
    :min="1"
    :max="10"
    @change="handleChange"
  >
    <template #icon-decrease>
      <hl-icon><two-arrow-left /></hl-icon>
    </template>
    <template #icon-increase>
      <hl-icon><two-arrow-right /></hl-icon>
    </template>
  </hl-input-number>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { TwoHeart, TwoArrowLeft, TwoArrowRight } from '@hongluan-ui/icons'

const num = ref(1)
const handleChange = value => {
  console.log(value)
}

</script>
