<template>
  <hl-button class="m-r-md" @click="outerVisible = true">点击打开外层 Dialog</hl-button>

  <hl-dialog v-model="outerVisible" title="外层 Dialog" width="400px" destroy-on-close>
    <hl-dialog
      v-model="innerVisible"
      width="30%"
      title="内层 Dialog"
      append-to-body
    >
      <hl-button type="link" @click="open">点击打开 Message Box</hl-button>
    </hl-dialog>
    <template #footer>
      <div class="dialog-footer">
        <hl-button @click="outerVisible = false">取 消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="innerVisible = true">打开内层 Dialog</hl-button>
      </div>
    </template>
  </hl-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { HlMessageBox } from 'hongluan-ui'

const open = () => {
  HlMessageBox.alert('这是一段内容', '标题名称', {
    confirmButtonText: '确定',
  })
}
const outerVisible = ref(false)
const innerVisible = ref(false)

</script>
