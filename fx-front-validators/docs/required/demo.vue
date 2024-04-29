<template>
  <hl-form ref="formRef" :model="form" :rules="rules">
    <hl-form-item label="活动名称" prop="name">
      <hl-input v-model="form.name" placeholder="请输入活动名称" />
    </hl-form-item>
    <hl-form-item>
      <hl-button type="primary" @click="valid">校验</hl-button>
    </hl-form-item>
  </hl-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { HlForm, HlFormItem, HlInput, HlButton } from 'hongluan-ui'
import { required } from '../../src'

export default defineComponent({
  components: { HlForm, HlFormItem, HlInput, HlButton },
  setup() {
    const formRef = ref()
    const form = reactive({ name: '' })
    const rules = {
      name: [required()],
    }

    const valid = () => {
      formRef.value.validate()
    }

    return {
      form,
      rules,
      formRef,
      valid,
    }
  },
})
</script>
