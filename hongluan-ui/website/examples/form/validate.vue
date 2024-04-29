<template>
  <hl-form
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    :label-position="['items-right', 'items-left']"
    gap="var(--lg)"
    item-gap="var(--md)"
    :width="['md:col-6','md:col-18']"
  >
    <hl-form-item label="活动名称" prop="name">
      <hl-group deep-merge indent>
        <hl-input v-model="ruleForm.name" />
        <hl-select placeholder="团队" class="static w-sm" />
      </hl-group>
    </hl-form-item>
    <hl-form-item label="活动地点" prop="location">
      <hl-cascader v-model="ruleForm.location" :options="locations" />
    </hl-form-item>
    <hl-form-item label="活动区域" prop="region">
      <hl-select v-model="ruleForm.region" placeholder="请选择活动区域">
        <hl-option label="区域一" value="shanghai" />
        <hl-option label="区域二" value="beijing" />
      </hl-select>
    </hl-form-item>
    <hl-form-item label="活动时间" required>
      <hl-row>
        <hl-col :span="12">
          <hl-form-item prop="date1">
            <hl-date-picker v-model="ruleForm.date1" type="date" placeholder="选择日期" block />
          </hl-form-item>
        </hl-col>
        <hl-col :span="12">
          <hl-form-item prop="date2">
            <hl-time-picker v-model="ruleForm.date2" placeholder="选择时间" block />
          </hl-form-item>
        </hl-col>
      </hl-row>
    </hl-form-item>
    <hl-form-item label="即时配送" prop="delivery">
      <hl-switch v-model="ruleForm.delivery" type="primary" />
    </hl-form-item>
    <hl-form-item label="活动性质" prop="type">
      <hl-checkbox-group v-model="ruleForm.type">
        <hl-checkbox label="美食/餐厅线上活动" name="type" />
        <hl-checkbox label="地推活动" name="type" />
      </hl-checkbox-group>
    </hl-form-item>
    <hl-form-item label="特殊资源" prop="resource">
      <hl-radio-group v-model="ruleForm.resource">
        <hl-radio label="线上品牌商赞助" />
        <hl-radio label="线下场地免费" />
      </hl-radio-group>
    </hl-form-item>
    <hl-form-item label="活动形式" prop="desc">
      <hl-input v-model="ruleForm.desc" native-type="textarea" block />
    </hl-form-item>
    <hl-form-item offset="md:offset-6">
      <hl-button type="primary" class="m-r-sm" @click="submitForm('ruleForm')">立即创建</hl-button>
      <hl-button class="m-r-sm" @click="resetForm('ruleForm')">重置</hl-button>
    </hl-form-item>
  </hl-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const ruleForm = ref({
  location: [],
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})
const rules = ref({
  name: [
    { required: true, message: '请输入活动名称', trigger: 'blur' },
    {
      min: 3,
      max: 5,
      message: '长度在 3 到 5 个字符',
      trigger: 'blur',
    },
  ],
  location: [{ required: true, message: '请选择活动地点', trigger: 'change' }],
  region: [{ required: true, message: '请选择活动区域', trigger: 'change' }],
  date1: [
    {
      type: 'date',
      required: true,
      message: '请选择日期',
      trigger: 'change',
    },
  ],
  date2: [
    {
      type: 'date',
      required: true,
      message: '请选择时间',
      trigger: 'change',
    },
  ],
  type: [
    {
      type: 'array',
      required: true,
      message: '请至少选择一个活动性质',
      trigger: 'change',
    },
  ],
  resource: [{ required: true, message: '请选择活动资源', trigger: 'change' }],
  desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }],
})
const locations = ref([
  {
    value: 'BJ',
    label: '北京',
    children: [
      { value: 'HD', label: '海淀区' },
      { value: 'XW', label: '宣武区' },
      {
        value: 'CW',
        label: '崇文区',
        children: [
          { value: 'WFJ', label: '王府井' },
          { value: 'DD', label: '东单' },
        ],
      },
    ],
  },
])
const ruleFormRef = ref(null)

const submitForm = () => {
  ruleFormRef.value.validate(valid => {
    if (valid) {
      alert('submit!')
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
const resetForm = () => {
  ruleFormRef.value.resetFields()
}

</script>
