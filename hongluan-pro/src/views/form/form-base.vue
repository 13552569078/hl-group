<template show-source>
  <hl-panel class="main-panel">
    <template #header>
      <div class="panel-header-left">
        <hl-icon><two-news /></hl-icon>
      </div>
      <div class="panel-title"><h4>基础表单</h4></div>
      <div class="panel-header-right">
      </div>
    </template>
    <hl-row class="m-t-lg m-b-lg">
      <hl-col span="xl:col-12 xl:offset-5 lg:col-16 lg:offset-3">
        <hl-form ref="form" :model="formData" :width="['lg:col-4', 'lg:col-20']" :label-position="['lg:items-right items-left', 'items-top']" item-gap="var(--md)">
          <hl-form-item label="头像">
            <hl-upload action="http://192.168.31.150/up/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <hl-thumb v-if="imageUrl" radius :src="imageUrl" fit="cover" />
              <hl-thumb v-else size="xxxl" class="w-xs h-xs bg-light" radius>
                <hl-icon><two-upload /></hl-icon>
              </hl-thumb>
            </hl-upload>
          </hl-form-item>
          <hl-form-item label="姓名">
            <hl-input v-model="formData.name" placeholder="请输入姓名" block />
          </hl-form-item>
          <hl-form-item label="性别">
            <hl-radio-group v-model="formData.sex" gap="var(--md)" type="primary" size="md">
              <hl-radio label="male">男</hl-radio>
              <hl-radio label="female">女</hl-radio>
              <hl-radio label="unknown">未知</hl-radio>
            </hl-radio-group>
          </hl-form-item>
          <hl-form-item label="证件类型">
            <hl-select v-model="formData.credentials" placeholder="请选择类型" class="w-full-xl" clearable>
              <hl-option label="身份证" value="IdCard" />
              <hl-option label="护照" value="Passport" />
            </hl-select>
          </hl-form-item>
          <hl-form-item label="生日">
            <hl-date-picker v-model="formData.birthday" type="date" placeholder="选择日期" class="w-full-xl" />
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
          <hl-form-item offset="lg:offset-4">
            <hl-button type="primary" class="m-r-md" @click="onSubmit">立即创建</hl-button>
            <hl-button>取消</hl-button>
          </hl-form-item>
        </hl-form>
      </hl-col>
    </hl-row>
  </hl-panel>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { HlMessageBox, HlMessage } from 'hongluan-ui'

export default defineComponent({
  setup() {
    //基础组件绑定
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
    const imageUrl = ref('')

    const handleAvatarSuccess = (_: any, file: File & { raw: any; }) => {
      imageUrl.value = URL.createObjectURL(file.raw)
    }
    const beforeAvatarUpload = (file: File) => {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG) {
        HlMessageBox.alert('上传头像图片只能是 JPG 格式!' , '错误', {
          confirmButtonText: '确定',
          callback: (action: any) => {
            HlMessage({
              type: 'info',
              message: `action: ${action}`,
            })
          },
        })
      }
      if (!isLt2M) {
        alert('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }

    const onSubmit = () => {
      HlMessage({
        type: 'success',
        message: '提交成功',
      })
    }
    const num = ref(1)
    const handleChange = value => {
      console.log(value)
    }
    return {
      num,
      handleChange,
      imageUrl,
      formData,
      onSubmit,
      handleAvatarSuccess,
      beforeAvatarUpload,
    }
  },
})
</script>

<style>
</style>
