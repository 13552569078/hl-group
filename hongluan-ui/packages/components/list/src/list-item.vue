<template>
  <div ref="listItemRef" :class="[namespace, type ? type : '']">
    <span v-if="$slots.prefix" class="item-prefix">
      <slot name="prefix"></slot>
    </span>
    <span class="item-content">
      <slot></slot>
    </span>
    <span v-if="$slots.suffix" class="item-suffix">
      <slot name="suffix"></slot>
    </span>
  </div>
</template>

<script lang='ts'>
import { defineComponent, getCurrentInstance, inject, onMounted, ref } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'

import type { PropType } from 'vue'

export default defineComponent({
  name: 'ListItem',
  props: {
    type: String,
    to: {
      type: [String, Object] as PropType<string | Record<string, unknown>>,
      default: '',
    },
    replace: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['select-item'],
  setup(props) {
    const { namespace } = useNamespace('list-item')
    const instance = getCurrentInstance()
    const router = instance.appContext.config.globalProperties.$router
    const listItemRef = ref(null)

    const { selectItem } = inject('ListComponnetContext')

    onMounted(() => {
      listItemRef.value.addEventListener('click', (evt: Event) => {
        selectItem(evt)
        if (!props.to || !router) return
        props.replace ? router.replace(props.to) : router.push(props.to)
      })
    })

    return {
      namespace,
      listItemRef,
    }
  },
})
</script>
