<template>
  <hl-row>
    <hl-col span="col-18">
      <hl-checkbox-group v-model="checkList" dir="horizontal" gap="var(--md)" wrap>
        <hl-checkbox label="复选框 A" />
        <hl-checkbox label="复选框 B" />
        <hl-checkbox label="复选框 C" />
        <hl-checkbox label="禁用" disabled />
        <hl-checkbox label="选中且禁用" disabled />
      </hl-checkbox-group>
    </hl-col>

    <hl-col span="col-6">
      <hl-checkbox-group v-model="checkList" dir="vertical" gap="var(--md)">
        <hl-checkbox label="复选框 A" />
        <hl-checkbox label="复选框 B" />
        <hl-checkbox label="复选框 C" />
        <hl-checkbox label="禁用" disabled />
        <hl-checkbox label="选中且禁用" disabled />
      </hl-checkbox-group>
    </hl-col>
  </hl-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const checkList = ref(['选中且禁用', '复选框 A'])

</script>
