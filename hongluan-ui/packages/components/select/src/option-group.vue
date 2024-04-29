<template>
  <li v-show="visible" :class="namespace">
    <strong class="select-group-title">{{ label }}</strong>
    <ul>
      <slot></slot>
    </ul>
  </li>
</template>

<script lang="ts">
import { defineComponent, provide, inject, ref, reactive, toRefs, getCurrentInstance, onMounted, toRaw, watch } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'
import { selectGroupKey, selectKey } from './token'

export default defineComponent({
  name: 'OptionGroup',
  componentName: 'OptionGroup',

  props: {
    label: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const { namespace } = useNamespace('option-group')
    const visible = ref(true)
    const instance = getCurrentInstance()
    const children = ref([])

    provide(
      selectGroupKey,
      reactive({
        ...toRefs(props),
      }),
    )

    const select = inject(selectKey)

    onMounted(() => {
      children.value = flattedChildren(instance.subTree)
    })

    // get all instances of options
    const flattedChildren = node => {
      const children = []
      if (Array.isArray(node.children)) {
        node.children.forEach(child => {
          if (
            child.type &&
            child.type.name === 'Option' &&
            child.component &&
            child.component.proxy
          ) {
            children.push(child.component.proxy)
          } else if (child.children?.length) {
            children.push(...flattedChildren(child))
          }
        })
      }
      return children
    }

    const { groupQueryChange } = toRaw(select)
    watch(
      groupQueryChange,
      () => {
        visible.value = children.value.some(option => option.visible === true)
      },
      { flush: 'post' },
    )

    return {
      namespace,
      visible,
    }
  },
})
</script>
