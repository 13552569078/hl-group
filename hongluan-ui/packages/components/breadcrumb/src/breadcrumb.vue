<template>
  <div
    ref="breadcrumb"
    :class="`${namespace}-breadcrumb`"
    aria-label="Breadcrumb"
    role="navigation"
  >
    <slot></slot>
    <slot name="icon"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref, onMounted } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'
import { BreadcrumbKey } from '@hongluan-ui/tokens'
import { breadcrumbProps } from './breadcrumb'

import type { IBreadcrumbProps } from './breadcrumb'

export default defineComponent({
  name: 'Breadcrumb',
  props: breadcrumbProps,
  setup(props, { slots }) {
    const { namespace } = useNamespace()
    const breadcrumb = ref<HTMLDivElement>()

    provide<IBreadcrumbProps>(BreadcrumbKey, { separator: props.separator, slots })

    onMounted(() => {
      const items = breadcrumb.value.querySelectorAll(`.${namespace.value}-breadcrumb-item`)
      if (items.length) {
        const lastItem = items[items.length - 1]
        lastItem.setAttribute('aria-current', 'page')
        while(slots.icon && lastItem.nextSibling) {
          breadcrumb.value.removeChild(lastItem.nextSibling)
        }
      }
    })

    return {
      namespace,
      breadcrumb,
    }
  },
})
</script>
