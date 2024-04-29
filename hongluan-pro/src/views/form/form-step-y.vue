<template>
  <hl-panel class="main-panel h-min-full">
    <template #header>
      <div class="panel-header-left">
        <hl-icon><two-server /></hl-icon>
      </div>
      <div class="panel-title"><h4>分步表单 - 纵向</h4></div>
      <div class="panel-header-right"></div>
    </template>
    <hl-row class="m-t-lg m-b-lg">
      <hl-col span="lg:col-8">
        <hl-row align="items-right" class="m-b-lg">
          <hl-col span="lg:col-16">
            <div class="p-xxs" style="height: 300px; min-width: 200px">
              <hl-steps dir="vertical" :active="step" block>
                <hl-step title="活动按期开始" description="2021-08-09">
                  <template #icon>
                    <hl-icon><two-home /></hl-icon>
                  </template>
                </hl-step>
                <hl-step title="通过审核" description="2021-08-10">
                  <template #icon>
                    <hl-icon><two-upload /></hl-icon>
                  </template>
                </hl-step>
                <hl-step title="项目创建成功" description="2021-08-12">
                  <template #icon>
                    <hl-icon><two-print /></hl-icon>
                  </template>
                </hl-step>
                <hl-step title="初始化项目" description="2021-08-15">
                  <template #icon>
                    <hl-icon><two-tag /></hl-icon>
                  </template>
                </hl-step>
              </hl-steps>
            </div>
          </hl-col>
        </hl-row>
      </hl-col>
      <hl-col span="lg:col-10">
        <hl-form ref="form" v-model="formData" :width="['lg:col-5', 'lg:col-19']" :label-position="['items-left lg:items-right', 'items-top']" item-gap="var(--md)">
          <hl-form-item label="姓名">
            <hl-input v-model="formData.name" placeholder="请输入" block />
          </hl-form-item>
          <hl-form-item label="性别">
            <hl-radio-group v-model="formData.sex" gap="var(--md)" type="primary" size="md">
              <hl-radio label="male">男</hl-radio>
              <hl-radio label="female">女</hl-radio>
              <hl-radio label="unknow">未知</hl-radio>
            </hl-radio-group>
          </hl-form-item>
          <hl-form-item label="证件类型">
            <hl-select v-model="formData.credentials" placeholder="请选择" class="xl:w-full">
              <hl-option label="身份证" value="IdCard" />
              <hl-option label="护照" value="Passport" />
            </hl-select>
          </hl-form-item>
          <hl-form-item label="生日">
            <hl-date-picker v-model="formData.birthday" type="date" placeholder="选择日期" class="xl:w-full" />
          </hl-form-item>
          <hl-form-item label="职业描述">
            <hl-input v-model="formData.description" native-type="textarea" rows="3" block />
          </hl-form-item>

          <hl-form-item label="通讯地址">
            <hl-input v-model="formData.address" placeholder="请输入" block />
          </hl-form-item>

          <hl-form-item label="经纬度">
            <hl-group dir="vertical" gap="var(--md)">
              <hl-group full="full-x">
                <hl-input v-model="formData.longitude" placeholder="请输入经度" block />
                <span class="hl-button no-fill">-</span>
                <hl-input v-model="formData.latitude" placeholder="请输入纬度" block />
              </hl-group>
              <hl-group>
                <hl-group full="full-x" merge indent>
                  <hl-input v-model="formData.coordinate1.x" placeholder="X" block />
                  <hl-input v-model="formData.coordinate1.y" placeholder="Y" block />
                  <hl-input v-model="formData.coordinate1.z" placeholder="Z" block />
                </hl-group>
                <span class="hl-button no-fill">&nbsp;</span>
                <hl-group full="full-x" merge indent>
                  <hl-input v-model="formData.coordinate2.x" placeholder="X" block />
                  <hl-input v-model="formData.coordinate2.y" placeholder="Y" block />
                  <hl-input v-model="formData.coordinate2.z" placeholder="Z" block />
                </hl-group>
              </hl-group>
            </hl-group>
          </hl-form-item>

          <hl-form-item offset="lg:offset-5">
            <hl-button type="primary" class="m-r-md" @click="onSubmit">{{ stepLabel }}</hl-button>
            <hl-button @click="onCancel">取消</hl-button>
          </hl-form-item>
        </hl-form>
      </hl-col>
    </hl-row>
  </hl-panel>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { HlMessage } from 'hongluan-ui'

export default defineComponent({
  setup() {
    const step = ref(1)
    const formData = ref({
      name: '',
      sex: '',
      credentials: '',
      birthday: '',
      description: '',
      address: '',
      longitude: '',
      latitude: '',
      coordinate1: {
        x: '',
        y: '',
        z: '',
      },
      coordinate2: {
        x: '',
        y: '',
        z: '',
      },
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
