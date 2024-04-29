<template>
  <div
    :class="[
      namespace,
      panelClass,
    ]"
    :style="panelStyle"
  >
    <div
      v-if="$slots.header"
      :class="['panel-header', headerClass ? headerClass : '']"
      :style="headerStyle"
    >
      <slot name="header"></slot>
    </div>
    <div :class="['panel-body', bodyClass ? bodyClass : '']" :style="bodyStyle">
      <slot></slot>
    </div>
    <div
      v-if="$slots.footer"
      :class="['panel-footer', footerClass ? footerClass : '']"
      :style="footerStyle"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, watchEffect, ref } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'
import { panelProps, usePanelProps } from './panel'

export default defineComponent({
  name: 'Panel',
  props: panelProps,
  setup(props) {
    const { namespace } = useNamespace('panel')
    let panelStyle = ref<string[]>([]), panelClass = ref<Record<string, unknown>>({})

    watchEffect(() => {
      const panelProps = usePanelProps(props)
      panelStyle.value = panelProps.panelStyle
      panelClass.value = panelProps.panelClass
    })

    return {
      namespace,
      panelStyle,
      panelClass,
    }
  },
})
</script>
