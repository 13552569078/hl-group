<template>
  <fx-file-upload
    v-model:ids="ids"
    file-service="http://swan-gateway-xixian-dev.k8s.etcc.group/demo/files"
    accept=".png,.jpg,.PNG,.JPG,.PDF,pdf,.xlsx,.xls,.doc,.docx"
    :limit="5"
    list-type="text"
  />
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const ids = ref('')

    return {
      ids,
    }
  },
})
</script>
