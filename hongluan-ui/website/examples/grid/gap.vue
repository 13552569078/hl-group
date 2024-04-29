<template>
  <hl-group gap="var(--md)">
    <hl-select v-model="value" clearable placeholder="gap 属性">
      <template v-for="item in options">
        <hl-option v-if="item.divider" :key="item.value" divider />
        <hl-option v-else :key="item.value" :label="item.label" :value="item.value" />
      </template>
    </hl-select>
    <hl-select v-model="valueX" clearable placeholder="gap-x 属性">
      <template v-for="item in options">
        <hl-option v-if="item.divider" :key="item.value" divider />
        <hl-option v-else :key="item.value" :label="item.label" :value="item.value" />
      </template>
    </hl-select>
    <hl-select v-model="valueY" clearable placeholder="gap-y 属性">
      <template v-for="item in options">
        <hl-option v-if="item.divider" :key="item.value" divider />
        <hl-option v-else :key="item.value" :label="item.label" :value="item.value" />
      </template>
    </hl-select>
  </hl-group>
  <hl-row class="show-col m-t-md" :gap="value" :gap-x="valueX" :gap-y="valueY">
    <hl-col span="md:col-8">
      <em>item</em>
    </hl-col>
    <hl-col span="md:col-8">
      <em>item</em>
    </hl-col>
    <hl-col span="md:col-8">
      <em>item</em>
    </hl-col>
    <hl-col span="md:col-8">
      <em>item</em>
    </hl-col>
    <hl-col span="md:col-8">
      <em>item</em>
    </hl-col>
    <hl-col span="md:col-8">
      <em>item</em>
    </hl-col>
  </hl-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const options = ref([
  {
    value: '0',
    label: 'none',
  },
  {
    divider: true,
  },
  {
    value: 'var(--sm)',
    label: 'var(--sm)',
  },
  {
    value: 'var(--md)',
    label: 'var(--md)',
  },
  {
    value: 'var(--lg)',
    label: 'var(--lg)',
  },
  {
    value: 'var(--xl)',
    label: 'var(--xl)',
  },
  {
    value: 'var(--xxl)',
    label: 'var(--xxl)',
  },
])
const value = ref('')
const valueX = ref('')
const valueY = ref('')

</script>
