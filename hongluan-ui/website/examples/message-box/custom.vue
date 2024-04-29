<template>
  <hl-button type="link" @click="open">点击打开 Message Box</hl-button>
</template>

<script lang="ts" setup>
import { h } from 'vue'
import { HlMessageBox, HlMessage, HlIcon } from 'hongluan-ui'
import { TwoAirplay } from '@hongluan-ui/icons'

const open = () => {
  HlMessageBox({
    title: '消息',
    message: h('p', null, [
      h('span', null, '内容可以是 '),
      h('i', { style: 'color: teal' }, 'VNode'),
    ]),
    icon: h(HlIcon, { size: 'md' }, [h(TwoAirplay)]),
    showCancelButton: true,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true
        instance.confirmButtonText = '执行中...'
        setTimeout(() => {
          done()
          setTimeout(() => {
            instance.confirmButtonLoading = false
          }, 300)
        }, 3000)
      } else {
        done()
      }
    },
  }).then(action => {
    HlMessage({
      type: 'info',
      message: 'action: ' + action,
    })
  })
}
</script>

