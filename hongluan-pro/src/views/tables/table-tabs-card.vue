<template>
  <div>
    <card />
    <card-table />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Card from './table-tabs-card/card.vue'
import CardTable from './table-tabs-card/table.vue'

export default defineComponent({
  components: {
    Card,
    CardTable,
  },
  setup() {
    return {
    }
  },
})
</script>
