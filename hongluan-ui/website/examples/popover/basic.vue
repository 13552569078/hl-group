<template>
  <hl-popover placement="top-start" title="标题" :width="200" trigger="hover" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
    <template #reference>
      <hl-button class="m-r-md">hover 激活</hl-button>
    </template>
  </hl-popover>

  <hl-popover placement="bottom" title="标题" :width="200" trigger="click" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
    <template #reference>
      <hl-button class="m-r-md">click 激活</hl-button>
    </template>
  </hl-popover>

  <hl-popover
    ref="popover"
    placement="right"
    title="标题"
    :width="200"
    trigger="focus"
    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
  >
    <template #reference>
      <hl-button class="m-r-md">focus 激活</hl-button>
    </template>
  </hl-popover>

  <hl-popover
    placement="bottom"
    title="标题"
    :width="200"
    trigger="contextmenu"
    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
  >
    <template #reference>
      <hl-button class="m-r-md">右键激活</hl-button>
    </template>
  </hl-popover>
  <hl-popover
    :visible="visible"
    placement="bottom"
    title="Title"
    :width="200"
    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
  >
    <template #reference>
      <hl-button class="m-r-md" @click="visible = !visible">手工激活</hl-button>
    </template>
  </hl-popover>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)

</script>
