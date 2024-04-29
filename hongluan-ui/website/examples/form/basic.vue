<template>
  <hl-form :model="form" :width="['col-6','col-15']" :label-position="['items-right', 'items-middle']" item-gap="var(--md)">
    <hl-form-item label="活动名称">
      <hl-input v-model="form.name" placeholder="请输入活动名称" />
    </hl-form-item>
    <hl-form-item label="活动区域">
      <hl-select v-model="form.region" placeholder="请选择活动区域">
        <hl-option label="区域一" value="shanghai" />
        <hl-option label="区域二" value="beijing" />
      </hl-select>
    </hl-form-item>
    <hl-form-item label="活动时间">
      <hl-date-picker v-model="form.date1" type="date" placeholder="选择日期" class="m-r-sm" />
    </hl-form-item>

    <hl-form-item label="特殊资源">
      <hl-radio-group v-model="form.resource" type="primary">
        <hl-radio label="1">线上品牌商赞助</hl-radio>
        <hl-radio label="2">线下场地免费</hl-radio>
      </hl-radio-group>
    </hl-form-item>
    <hl-form-item label="活动形式">
      <hl-input v-model="form.desc" native-type="textarea" :rows="3" block />
    </hl-form-item>
    <hl-form-item offset="offset-6">
      <hl-button type="primary" class="m-r-md" @click="onSubmit">立即创建</hl-button>
      <hl-button>取消</hl-button>
    </hl-form-item>
  </hl-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  region: 'shanghai',
  date1: '',
  type: [],
  resource: '1',
  desc: '',
})
const onSubmit = () => {
  console.log('submit!')
}

</script>
