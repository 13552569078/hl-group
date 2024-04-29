<template>
  <hl-button class="m-r-md" @click="centerDialogVisible = true">点击打开 Dialog</hl-button>

  <hl-dialog
    v-model="centerDialogVisible"
    title="提示"
    width="30%"
    destroy-on-close
  >
    <span>需要注意在 Dialog 打开前是这条内容和下面的内容都是不会被渲染的</span>
    <strong>额外的内容</strong>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="centerDialogVisible = false">取 消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="centerDialogVisible = false">确 定</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const centerDialogVisible = ref(false)
</script>
