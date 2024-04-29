<template>
  <hl-button class="m-r-md" @click="btnClick('center')">打开 Dialog</hl-button>
  <br><br>
  <hl-button class="m-r-md" @click="btnClick('left', 'drawer')">打开 左侧抽屉</hl-button>
  <hl-button class="m-r-md" @click="btnClick('right', 'drawer')">打开 右侧抽屉</hl-button>
  <hl-button class="m-r-md" @click="btnClick('bottom', 'drawer')">打开 底部抽屉</hl-button>
  <hl-button class="m-r-md" @click="btnClick('top', 'drawer')">打开 顶部抽屉</hl-button>
  <br><br>
  <hl-button class="m-r-md" @click="btnClick('fullscreen', 'drawer')">打开 全屏Dialog</hl-button>

  <hl-dialog
    v-model="dialogVisible"
    width="calc(var(--xxs) * 100)"
    :show-as="showAs"
    :placement="placement"
  >
    <template #header>
      <h4>自定义对话框title</h4>
    </template>
    <span style="height:100px;">对话框body信息</span>
    <template #footer>
      <span class="dialog-footer">
        <hl-button @click="dialogVisible = false">取 消</hl-button>
        <hl-button type="primary" class="m-l-md" @click="dialogVisible = false">确 定</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const dialogVisible = ref(false)
const showAs = ref('dialog')
const placement = ref('center')

const btnClick = (placementParam, showAsParam = 'dialog') => {
  placement.value = placementParam
  showAs.value = showAsParam
  dialogVisible.value = true
}
</script>
