<template>
  <hl-row align="items-center" gap="var(--lg)" gap-y="var(--lg)">
    <hl-col span="xxl:col-12 xl:col-12">
      <hl-panel class="card-panel" body-padding="calc(var(--xxl) + var(--md));">
        <template #header>
          <div class="panel-header-left">
            <hl-icon><two-server /></hl-icon>
          </div>
          <div class="panel-title"><h4>基础表单</h4></div>
          <div class="panel-header-right"></div>
        </template>
        <hl-form ref="form" :model="formDataLeft" :width="['lg:col-5', 'lg:col-19']" :label-position="['items-left', 'items-top']" item-gap="var(--md)">
          <hl-form-item label="姓名">
            <hl-input v-model="formDataLeft.name" placeholder="请输入" block />
          </hl-form-item>
          <hl-form-item label="性别">
            <hl-radio-group v-model="formDataLeft.sex" gap="var(--md)" type="primary">
              <hl-radio label="male">男</hl-radio>
              <hl-radio label="female">女</hl-radio>
              <hl-radio label="unknown">未知</hl-radio>
            </hl-radio-group>
          </hl-form-item>
          <hl-form-item label="证件类型">
            <hl-select v-model="formDataLeft.credentials" placeholder="请选择" class="xl:w-full" block>
              <hl-option label="身份证" value="IdCard" />
              <hl-option label="护照" value="Passport" />
            </hl-select>
          </hl-form-item>
          <hl-form-item label="生日">
            <hl-date-picker v-model="formDataLeft.birthday" type="date" placeholder="选择日期" class="xl:w-full" block />
          </hl-form-item>
          <hl-form-item label="职业描述">
            <hl-input v-model="formDataLeft.description" native-type="textarea" rows="3" block />
          </hl-form-item>

          <hl-form-item label="通讯地址">
            <hl-input v-model="formDataLeft.address" placeholder="请输入" block />
          </hl-form-item>

          <hl-form-item label="" offset="lg:offset-5">
            <hl-button type="primary" class="m-r-md" @click="onSubmit('left')">立即创建</hl-button>
            <hl-button>取消</hl-button>
          </hl-form-item>
        </hl-form>
      </hl-panel>
    </hl-col>
    <hl-col span="xxl:col-12 xl:col-12">
      <hl-panel class="card-panel" body-padding="calc(var(--xxl) + var(--md));">
        <template #header>
          <div class="panel-header-left">
            <hl-icon><two-airplay /></hl-icon>
          </div>
          <div class="panel-title"><h5>基础表单</h5></div>
          <div class="panel-header-right"></div>
        </template>
        <hl-form ref="form" :model="formDataRight" :width="['col-24', 'col-24']" :label-position="['items-left', 'items-top']">
          <hl-form-item label="证件类型">
            <hl-select v-model="formDataRight.credentials" placeholder="请选择" class="xl:w-full" block>
              <hl-option label="身份证" value="IdCard" />
              <hl-option label="护照" value="Passport" />
            </hl-select>
          </hl-form-item>
          <hl-form-item label="生日">
            <hl-date-picker v-model="formDataRight.birthday" type="date" placeholder="选择日期" class="xl:w-full" block />
          </hl-form-item>
          <hl-form-item label="职业描述">
            <hl-input v-model="formDataRight.description" native-type="textarea" rows="3" block />
          </hl-form-item>

          <hl-form-item label="通讯地址">
            <hl-input v-model="formDataRight.address" placeholder="请输入" block />
          </hl-form-item>

          <hl-form-item label="">
            <hl-button type="primary" class="m-r-md" @click="onSubmit('right')">立即创建</hl-button>
            <hl-button>取消</hl-button>
          </hl-form-item>
        </hl-form>
      </hl-panel>
    </hl-col>
  </hl-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { HlMessage } from 'hongluan-ui'

export default defineComponent({
  setup() {
    const formDataLeft = ref({
      name: '',
      sex: '',
      credentials: '',
      birthday: '',
      description: '',
      address: '',
    })
    const formDataRight = ref({
      name: '',
      sex: '',
      credentials: '',
      birthday: '',
      description: '',
      address: '',
    })

    const onSubmit = (pos: string) => {
      HlMessage({
        type: 'success',
        message: `${pos === 'left' ? '左' : '右'}侧提交成功`,
      })
    }

    return {
      formDataLeft,
      formDataRight,
      onSubmit,
    }
  },
})
</script>
