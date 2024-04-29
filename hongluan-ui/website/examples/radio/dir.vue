<template>
  <hl-row>
    <hl-col span="col">
      <hl-radio-group v-model="radio" dir="horizontal" gap="var(--md)" type="primary">
        <hl-radio label="a">备选项</hl-radio>
        <hl-radio label="b">备选项</hl-radio>
        <hl-radio label="c">备选项</hl-radio>
      </hl-radio-group>
    </hl-col>

    <hl-col span="col">
      <hl-radio-group v-model="radio" dir="vertical" gap="var(--md)" type="primary">
        <hl-radio label="a">备选项</hl-radio>
        <hl-radio label="b">备选项</hl-radio>
        <hl-radio label="c">备选项</hl-radio>
      </hl-radio-group>
    </hl-col>
  </hl-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const radio = ref('a')

</script>
