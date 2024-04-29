<template>
  <div ref="linkRef" :class="cls">
    <a :href="href" @click="handleClick">
      <slot>{{ title }}</slot>
    </a>
    <div v-if="$slots.sublist" :class="`anchor-sublist`">
      <slot name="sublist"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, ref } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'
import { anchorInjectionKey } from './types'

export default defineComponent({
  name: 'AnchorLink',
  props: {
    /**
     * @zh 锚点链接的文本内容
     * @en The text content of the anchor link
     */
    title: String,
    /**
     * @zh 锚点链接的地址
     * @en The address of the anchor link
     */
    href: String,
  },
  setup(props) {
    const { namespace } = useNamespace('anchor-link')
    const linkRef = ref<HTMLElement>()
    const context = inject(anchorInjectionKey, undefined)

    const cls = computed(() => [
      namespace.value,
      {
        [`is-active`]: context?.currentLink === props.href,
      },
    ])
    const handleClick = (e: MouseEvent) => context?.handleClick(e, props.href)

    onMounted(() => {
      if (props.href && linkRef.value) {
        context?.addLink(props.href, linkRef.value)
      }
    })

    return {
      cls,
      linkRef,
      handleClick,
    }
  },
})
</script>
