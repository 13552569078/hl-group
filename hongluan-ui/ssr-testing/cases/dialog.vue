<template>
  <hl-button
    type="text"
    @click="dialogVisible = true"
  >
    click to open the Dialog
  </hl-button>

  <hl-dialog v-model="dialogVisible" title="Tips" width="30%">
    <span>This is a message</span>
    <template #footer>
      <span class="dialog-footer">
        <hl-button
          style="margin-right: 10px"
          @click="dialogVisible = false"
        >Cancel</hl-button>
        <hl-button
          type="primary"
          @click="dialogVisible = false"
        >Confirm</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const dialogVisible = ref(true)
</script>
