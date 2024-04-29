<template>
  <hl-group dir="vertical" gap="0px" style="width: 800px;" full>
    <hl-group style="padding-top: 5px; padding-bottom: 5px;" dir="vertical" align="items-center" gap="0px">
      <div>输入文本</div>
    </hl-group>
    <hl-group dir="vertical" gap="var(--sm)" full>
      <hl-input class="static" placeholder="请输入"><template #surfix></template></hl-input>
      <hl-group dir="vertical" gap="var(--sm)">
        <hl-button type="primary" effect="light">
          <template #icon>
            <hl-icon type="primary" size="xs" style="border-radius: 4px;">
              <FillFolderAdd />
            </hl-icon>
          </template>添加附件
        </hl-button>
      </hl-group>
    </hl-group>
  </hl-group>
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
