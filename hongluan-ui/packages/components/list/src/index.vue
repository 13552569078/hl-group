<template>
  <hl-group
    ref="hlGroupRef"
    dir="vertical"
    :class="[
      namespace,
      border,
      {
        hover: hover,
        indent: indent,
        merge: merge,
      },
    ]"
    :style="[
      gap ? `--list-gap: ${gap}` : '',
      itemGap ? `--list-item-gap: ${itemGap}` : '',
    ]"
  >
    <slot></slot>
  </hl-group>
</template>
<script lang="ts">
import { defineComponent, provide, ref } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'
import HlGroup from '@hongluan-ui/components/group'

import type { ComponentPublicInstance } from 'vue'

export default defineComponent({
  name: 'List',
  components: { HlGroup },
  props: {
    hover: Boolean,
    indent: Boolean,
    merge: Boolean,
    gap: String,
    itemGap: String,
    border: {
      type: String,
      default: '',
      validator: (val: string) => ['', 'bordered', 'border-x'].includes(val),
    },
  },
  setup() {
    const { namespace } = useNamespace('list')
    const hlGroupRef = ref<ComponentPublicInstance>(null)

    const selectItem = (evt: Event) => {
      Array.prototype.slice.call(hlGroupRef.value.$el.querySelectorAll(`.${namespace.value}-item`))
        .forEach((item: HTMLElement) => {
          if (item.classList.contains('is-active')) {
            item.classList.remove('is-active')
          }
        })
      ;(evt.currentTarget as HTMLElement).classList.add('is-active')
    }

    provide('ListComponnetContext', {
      selectItem,
    })

    return {
      namespace,
      hlGroupRef,
    }
  },
})
</script>
