<template>
  <hl-dialog
    model-value="true"
    title="超级链接"
    width="calc(var(--xxl) * 13)"
    padding="var(--xl)"
    draggable
    @close="clear"
  >
    <hl-form>
      <hl-form-item label="地址(href)">
        <hl-input v-model="href" placeholder="http://www.example.com" block />
      </hl-form-item>
      <hl-form-item label="提示(alt)">
        <hl-input v-model="alt" placeholder="请输入提示信息" block />
      </hl-form-item>
    </hl-form>
    <template #footer>
      <hl-button class="m-r-md" @click="$emit('cancel')">取消</hl-button>
      <hl-button type="primary" @click="$emit('ok', { href, alt })">确定</hl-button>
    </template>
  </hl-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  emits: ['cancel', 'ok'],
  setup() {
    const href = ref('')
    const alt = ref('')

    const clear = () => {
      href.value = ''
      alt.value = ''
    }

    return {
      href,
      alt,
      clear,
    }

  },
})
</script>
