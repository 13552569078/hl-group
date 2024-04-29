<template>
  <hl-form
    :model="formInline"
    :width="['col-24','col-24']"
    class="hl-row grid grid-direction-vertical xl:count-3 lg:count-2"
    style="--row-gap-y: var(--md); --row-gap-x:var(--md)"
  >
    <hl-form-item label="表单名称">
      <hl-input v-model="formInline.user" placeholder="表单名称" block />
    </hl-form-item>
    <hl-form-item label="表单名称">
      <hl-select v-model="formInline.region" placeholder="活动区域" block>
        <hl-option label="区域一" value="shanghai" />
        <hl-option label="区域二" value="beijing" />
      </hl-select>
    </hl-form-item>
    <hl-form-item label="表单名称">
      <hl-input v-model="formInline.user" placeholder="表单名称" block />
    </hl-form-item>
    <hl-form-item label="表单名称">
      <hl-input v-model="formInline.user" placeholder="表单名称" block />
    </hl-form-item>
    <hl-form-item label="表单名称">
      <hl-input v-model="formInline.user" placeholder="表单名称" block />
    </hl-form-item>
    <hl-form-item label="表单名称">
      <hl-input v-model="formInline.user" placeholder="表单名称" block />
    </hl-form-item>
  </hl-form>

  <hl-form
    :model="formInline"
    :width="['col-5','col-19']"
    gap="var(--md)"
    class="hl-row grid grid-direction-vertical xl:count-2 lg:count-2 m-t-xxl"
    style="--row-gap-y: var(--md); --row-gap-x:var(--md)"
  >
    <hl-form-item label="表单名称">
      <hl-input v-model="formInline.user" placeholder="表单名称" block />
    </hl-form-item>
    <hl-form-item label="活动区域">
      <hl-select v-model="formInline.region" placeholder="活动区域" block>
        <hl-option label="区域一" value="shanghai" />
        <hl-option label="区域二" value="beijing" />
      </hl-select>
    </hl-form-item>
    <hl-form-item label="表单名称">
      <hl-input v-model="formInline.user" placeholder="表单名称" block />
    </hl-form-item>
    <hl-form-item label="表单名称">
      <hl-input v-model="formInline.user" placeholder="表单名称" block />
    </hl-form-item>
    <hl-form-item label="表单名称">
      <hl-input v-model="formInline.user" placeholder="表单名称" block />
    </hl-form-item>
    <hl-form-item label="表单名称">
      <hl-input v-model="formInline.user" placeholder="表单名称" block />
    </hl-form-item>
  </hl-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const formInline = ref({
  user: '',
  region: '',
})
</script>
