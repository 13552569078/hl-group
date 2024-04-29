<template>
  <hl-row gap="var(--md)">
    <hl-col span="col">
      <hl-panel
        :fullscreen="maxStatus"
        :collapsed="minStatus"
      >
        <template #header>
          <div class="panel-title">
            这是一个标题
          </div>
          <div class="panel-header-right">
            <hl-button equal no-fill @click="min">
              <hl-icon><two-top /></hl-icon>
            </hl-button>
            <hl-button equal no-fill @click="max">
              <hl-icon><two-maximize /></hl-icon>
            </hl-button>
          </div>
        </template>
        <div>这是一段body信息</div>
        <template #footer>
          <hl-button class="m-r-md">取 消</hl-button>
          <hl-button type="primary">确 定</hl-button>
        </template>
      </hl-panel>
    </hl-col>
  </hl-row>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { TwoTop, TwoMaximize } from '@hongluan-ui/icons'

const maxStatus = ref<boolean | Record<string, string>>(false)
const minStatus = ref(false)

const min = () => {
  minStatus.value = !minStatus.value
}
const max = () => {
  if (maxStatus.value) {
    maxStatus.value = false
  } else {
    maxStatus.value = { top: 'var(--xxl)', left: 'var(--xxl)', right: 'var(--xxl)', bottom: 'var(--xxl)' }
  }
}

</script>
