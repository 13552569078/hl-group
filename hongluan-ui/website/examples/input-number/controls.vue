<template>
  <hl-group gap="var(--md)">
    <hl-input-number
      v-model="num"
      :min="1"
      :max="10"
      fill
      block
      indent
      merge
      @change="handleChange"
    />
    <hl-input-number
      v-model="num"
      controls-position="inner"
      :min="1"
      :max="10"
      round
      @change="handleChange"
    />
    <hl-input-number
      v-model="num"
      controls-position="left"
      :min="1"
      :max="10"
      gap="5px"
      @change="handleChange"
    />
    <hl-input-number
      v-model="num"
      controls-position="right"
      :min="1"
      :max="10"
      gap="5px"
      size="lg"
      @change="handleChange"
    />
  </hl-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const num = ref(1)
const handleChange = value => {
  console.log(value)
}
</script>
