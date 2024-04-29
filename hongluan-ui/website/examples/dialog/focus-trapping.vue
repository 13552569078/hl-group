<template>
  <hl-button type="link" @click="dialogVisible = true">打开对话框</hl-button>

  <div>
    <span class="m-r-sm">关闭对话框后，输入框自动获取焦点</span>
    <hl-input ref="inputRef" placeholder="Please input" />
  </div>

  <hl-dialog
    v-model="dialogVisible"
    destroy-on-close
    title="提示"
    width="30%"
    @close-auto-focus="handleCloseAutoFocus"
  >
    <span class="m-b-sm">请输入：</span>
    <hl-input placeholder="初始获取焦点" />
    <template #footer>
      <span class="dialog-footer">
        <hl-button class="m-r-md" @click="dialogVisible = false">取消</hl-button>
        <hl-button type="primary" @click="dialogVisible = false">确定</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const dialogVisible = ref(false)
const inputRef = ref()

const handleCloseAutoFocus = () => {
  inputRef.value?.focus()
}
</script>
