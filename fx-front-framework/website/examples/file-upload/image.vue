<template>
  <fx-file-upload
    v-model:ids="ids"
    list-type="card"
    accept=".png,.jpg,.PNG,.JPG"
    :limit="5"
    file-service="http://swan-gateway-xixian-dev.k8s.etcc.group/demo/files"
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
