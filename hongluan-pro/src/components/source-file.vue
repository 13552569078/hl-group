<template>
  <hl-dropdown>
    <slot></slot>
    <template #dropdown>
      <hl-dropdown-menu>
        <hl-dropdown-item @click="copyAll">Copy All</hl-dropdown-item>
        <hl-dropdown-item v-if="template" @click="copyTemplate">Copy Template</hl-dropdown-item>
        <hl-dropdown-item v-if="script" @click="copyScript">Copy Script</hl-dropdown-item>
        <hl-dropdown-item v-if="style" @click="copyStyle">Copy Style</hl-dropdown-item>
      </hl-dropdown-menu>
    </template>
  </hl-dropdown>
</template>
<script>
import { computed, defineComponent } from 'vue'
import { copyText } from 'vue3-clipboard'
import { HlMessage } from 'hongluan-ui'

export default defineComponent({
  name: 'SourceFileCopyer',
  props:{
    source: {
      required: true,
      type: String,
    },
    template: {
      type: [Boolean, Array],
      default: true,
    },
    script: {
      type: [Boolean, Array],
      default: true,
    },
    style: {
      type: [Boolean, Array],
      default: true,
    },
  },
  setup(props) {

    const modules = import.meta.globEager('../views/**/*.vue', { raw: true })
    console.log('modules=====>', modules)

    const copyAll = () => {
      copyText(result, undefined, error => {
        if (error) {
          HlMessage.error('拷贝失败')
        } else {
          HlMessage.success('拷贝成功')
        }
      })
    }
    const copyTemplate = () => {
      const template = /(<template>[\s\S]*<\/template>)/.exec(content)
      copyText(template ? template[1] : '', undefined, error => {
        if (error) {
          HlMessage.error('拷贝失败')
        } else {
          HlMessage.success('拷贝成功')
        }
      })
    }
    const copyScript = () => {
      const script = /(<script.*>[\s\S]*<\/script>)/.exec(content)
      copyText(script ? script[1] : '', undefined, error => {
        if (error) {
          HlMessage.error('拷贝失败')
        } else {
          HlMessage.success('拷贝成功')
        }
      })
    }
    const copyStyle = () => {
      const style = /(<style.*>[\s\S]*<\/style>)/.exec(content)
      copyText(style ? style[1] : '', undefined, error => {
        if (error) {
          HlMessage.error('拷贝失败')
        } else {
          HlMessage.success('拷贝成功')
        }
      })
    }
    return {
      copyAll,
      copyTemplate,
      copyScript,
      copyStyle,
    }
  },
})
</script>
