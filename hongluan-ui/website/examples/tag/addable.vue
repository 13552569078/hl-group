<template>
  <hl-group gap="var(--sm)" wrap>
    <hl-tag v-for="tag in dynamicTags" :key="tag" closable :disable-transitions="false" @close="handleClose(tag)">
      {{ tag }}
    </hl-tag>
    <hl-input
      v-if="inputVisible"
      ref="saveTagInput"
      v-model="inputValue"
      class="input-new-tag"
      size="sm"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <hl-link v-else size="sm" @click="showInput">+ New Tag</hl-link>
  </hl-group>
</template>

<script lang="ts" setup>
import { ref, nextTick } from 'vue'

const dynamicTags = ref(['标签一', '标签二', '标签三'])
const inputVisible = ref(false)
const inputValue = ref('')
const saveTagInput = ref(null)

const handleClose = tag => {
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    saveTagInput.value.focus()
  })
}

const handleInputConfirm = () => {
  let val = inputValue.value
  if (val) {
    dynamicTags.value.push(val)
  }
  inputVisible.value = false
  inputValue.value = ''
}

</script>

<style>
  .input-new-tag {
    width: 90px;
  }
</style>
