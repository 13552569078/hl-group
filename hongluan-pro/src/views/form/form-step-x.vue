<template>
  <hl-panel class="main-panel">
    <template #header>
      <div class="panel-header-left">
        <hl-icon><two-server /></hl-icon>
      </div>
      <div class="panel-title"><h4>分步表单 - 横向</h4></div>
      <div class="panel-header-right"></div>
    </template>
    <hl-row align="items-center" class="m-t-lg">
      <hl-col span="xl:col-18 lg:col-16">
        <hl-steps :active="step" align-center round>
          <hl-step title="活动按期开始" description="2021-08-09" />
          <hl-step title="通过审核" description="2021-08-10" />
          <hl-step title="项目创建成功" description="2021-08-12" />
          <hl-step title="初始化项目" description="2021-08-15" />
        </hl-steps>
      </hl-col>
    </hl-row>
    <hl-row style="margin-top: 8vh" class="m-b-lg">
      <hl-col span="xl:col-12 xl:offset-5 lg:col-16 lg:offset-3 ">
        <hl-form ref="form" v-model="formData" :width="['lg:col-4', 'lg:col-20']" :label-position="['lg:items-right items-left', 'items-top']" item-gap="var(--md)">
          <hl-form-item label="姓名">
            <hl-input v-model="formData.name" placeholder="请输入" block />
          </hl-form-item>
          <hl-form-item label="性别">
            <hl-radio-group v-model="formData.sex" gap="var(--md)" type="primary" size="md">
              <hl-radio label="male">男</hl-radio>
              <hl-radio label="female">女</hl-radio>
              <hl-radio label="unknown">未知</hl-radio>
            </hl-radio-group>
          </hl-form-item>
          <hl-form-item label="证件类型">
            <hl-select v-model="formData.credentials" placeholder="请选择" class="w-auto sm:w-full">
              <hl-option label="身份证" value="IdCard" />
              <hl-option label="护照" value="Passport" />
            </hl-select>
          </hl-form-item>
          <hl-form-item label="生日">
            <hl-date-picker v-model="formData.birthday" type="date" placeholder="选择日期" class="w-auto sm:w-full" />
          </hl-form-item>
          <hl-form-item label="通讯地址">
            <hl-input v-model="formData.address" placeholder="请输入" block />
          </hl-form-item>

          <hl-form-item offset="lg:offset-4">
            <hl-button type="primary" class="m-r-md" @click="onSubmit">{{ stepLabel }}</hl-button>
            <hl-button @click="onCancel">取消</hl-button>
          </hl-form-item>
        </hl-form>
      </hl-col>
    </hl-row>
  </hl-panel>
</template>

<script lang="ts">
import { HlMessage } from 'hongluan-ui'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const step = ref(1)
    const formData = ref({
      name: '',
      sex: '',
      credentials: '',
      birthday: '',
      address: '',
    })
    const stepLabel = computed(() => step.value === 4 ? '立即创建' : '下一步')

    const onSubmit = () => {
      if (step.value < 4) {
        step.value++
      } else {
        HlMessage({
          type: 'success',
          message: '提交成功',
        })
      }
    }

    const onCancel = () => {
      step.value = 1
    }

    return {
      step,
      formData,
      stepLabel,
      onSubmit,
      onCancel,
    }
  },
})
</script>
