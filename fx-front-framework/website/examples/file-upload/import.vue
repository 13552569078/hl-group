<template>
  <fx-file-upload
    text-button="导入"
    file-service="http://swan-gateway-xixian-dev.k8s.etcc.group/demo/files"
    list-type="text"
    :show-file-list="false"
    accept=".xls,.xlsx"
    @handleSuccess="handleSuccess"
  />
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const ids = ref('')
    const handleSuccess = () => {
      alert('导入成功')
    }

    return {
      ids,
      handleSuccess,
    }
  },
})
</script>
