<template>
  <hl-form ref="formRef" :model="form" :rules="rules">
    <hl-form-item label="整数校验" prop="name">
      <hl-input v-model="form.name" placeholder="整数校验" />
    </hl-form-item>
    <hl-form-item label="整数范围校验" prop="name2">
      <hl-input v-model="form.name2" placeholder="整数范围校验" />
    </hl-form-item>
    <hl-form-item>
      <hl-button type="primary" @click="valid">校验</hl-button>
    </hl-form-item>
  </hl-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { HlForm, HlFormItem, HlInput, HlButton } from 'hongluan-ui'
import { required, isInt, intRange } from '../../src'

export default defineComponent({
  components: { HlForm, HlFormItem, HlInput, HlButton },
  setup() {
    const formRef = ref()
    const form = reactive({ name: '' })
    const rules = {
      name: [required(), isInt()],
      name2: [intRange({ val: 20, open: false }, null)],
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
