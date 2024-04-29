<template show-source>
  <hv-modal title="视频资源" width="calc(var(--xxl) * 10)">
    <hl-popover placement="bottom" :width="400" trigger="click" class="m-r-lg" popper-class="p-none">
      <template #reference>
        <hl-button>打开一个Table气泡</hl-button>
      </template>
      <hl-panel outlineless>
        <template #header>
          <div class="panel-title">这是一个标题</div>
          <div class="panel-header-right">
            <hl-icon>
              <two-close />
            </hl-icon>
          </div>
        </template>
        <div>这是一段body信息</div>
        <template #footer>
          <hl-button class="m-r-md" @click="dialogVisible = false">取 消</hl-button>
          <hl-button type="primary" @click="dialogVisible = false">确 定</hl-button>
        </template>
      </hl-panel>
    </hl-popover>
  </hv-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    return {}
  },
})
</script>

