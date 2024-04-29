<template>
  尺寸：<hl-radio-group v-model="size">
    <hl-radio label="sm">小</hl-radio>
    <hl-radio label="md">默认</hl-radio>
    <hl-radio label="lg">大</hl-radio>
  </hl-radio-group>
  <br><br>

  <hl-form ref="form" :model="sizeForm" :width="['md:col-4','col']" :size="size">
    <hl-form-item label="活动名称">
      <hl-input v-model="sizeForm.name" />
    </hl-form-item>
    <hl-form-item label="活动区域">
      <hl-select v-model="sizeForm.region" placeholder="请选择活动区域">
        <hl-option label="区域一" value="shanghai" />
        <hl-option label="区域二" value="beijing" />
      </hl-select>
    </hl-form-item>
    <hl-form-item label="活动时间">
      <hl-group merge indent>
        <hl-date-picker v-model="sizeForm.date1" type="date" placeholder="选择日期" />
        <hl-time-picker v-model="sizeForm.date2" placeholder="选择时间" />
      </hl-group>
    </hl-form-item>
    <hl-form-item label="活动性质">
      <hl-checkbox-group v-model="sizeForm.type">
        <hl-checkbox label="美食/餐厅线上活动" name="type" />
        <hl-checkbox label="地推活动" name="type" />
        <hl-checkbox label="线下主题活动" name="type" />
      </hl-checkbox-group>
    </hl-form-item>
    <hl-form-item label="特殊资源">
      <hl-radio-group v-model="sizeForm.resource">
        <hl-radio label="线上品牌商赞助" />
        <hl-radio label="线下场地免费" />
      </hl-radio-group>
    </hl-form-item>
    <hl-form-item offset="md:offset-4">
      <hl-button type="primary" class="m-r-sm" @click="onSubmit">立即创建</hl-button>
      <hl-button>取消</hl-button>
    </hl-form-item>
  </hl-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const size = ref('md')
const sizeForm = ref({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
const onSubmit = () => {
  console.log('submit!')
}
</script>
