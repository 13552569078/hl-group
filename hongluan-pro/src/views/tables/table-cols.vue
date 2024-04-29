<template>
  <hl-group full class="min-h-full" gap="var(--lg)">
    <org-tree />
    <org-table />
  </hl-group>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import OrgTree from './table-cols/tree.vue'
import OrgTable from './table-cols/table.vue'

export default defineComponent({
  components: {
    OrgTree,
    OrgTable,
  },
  setup() {
    return {
    }
  },
})
</script>
