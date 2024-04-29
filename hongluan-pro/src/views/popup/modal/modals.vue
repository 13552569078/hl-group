<template>
  <hl-row layout="grid" count="xxl:count-3 xl:count-2" gap="var(--lg)" dir="vertical">
    <hl-col span="col">
      <form-modal />
    </hl-col>
    <hl-col span="col">
      <table-modal />
    </hl-col>
    <hl-col span="col">
      <step-modal />
    </hl-col>
    <hl-col span="col">
      <detail-modal />
    </hl-col>
  </hl-row>
</template>

<script>
import { defineComponent } from 'vue'
import formModal from './components/form-modal.vue'
import tableModal from './components/table-modal.vue'
import stepModal from './components/step-modal.vue'
import detailModal from './components/detail-modal.vue'

export default defineComponent({
  components: {
    formModal,
    tableModal,
    stepModal,
    detailModal,
  },
  setup() {
    return {
    }
  },
})
</script>

