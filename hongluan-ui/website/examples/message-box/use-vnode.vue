<template>
  <hl-button class="m-r-md" @click="open">VNode</hl-button>
  <hl-button @click="open1">动态属性</hl-button>
</template>

<script lang="ts" setup>
import { h, ref } from 'vue'
import { HlMessageBox, HlSwitch } from 'hongluan-ui'

const open = () => {
  HlMessageBox({
    title: 'Message',
    message: h('p', null, [
      h('span', null, 'Message can be '),
      h('i', { style: 'color: teal' }, 'VNode'),
    ]),
  })
}

const open1 = () => {
  const checked = ref<boolean | string | number>(false)
  HlMessageBox({
    title: 'Message',
    // Should pass a function if VNode contains dynamic props
    message: () =>
      h(HlSwitch, {
        modelValue: checked.value,
        'onUpdate:modelValue': (val: boolean | string | number) => {
          checked.value = val
        },
      }),
  })
}
</script>
