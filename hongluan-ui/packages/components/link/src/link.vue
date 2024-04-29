<template>
  <a
    :class="{
      [namespace]: true,
      'is-underline': underline === true && !disabled,
      'is-hover-underline': underline === 'hover' && !disabled,
      'is-disabled': disabled,
      [type]: true
    }"
    :href="disabled || !href ? undefined : href"
    @click="handleClick"
  >
    <slot v-if="$slots.prefix" name="prefix"></slot>
    <span v-if="$slots.default">
      <slot></slot>
    </span>

    <slot v-if="$slots.suffix" name="suffix"></slot>
  </a>
</template>

<script lang="ts" setup>
import { useNamespace } from '@hongluan-ui/hooks'
import { linkEmits, linkProps } from './link'

defineOptions({
  name: 'Link',
})
const props = defineProps(linkProps)
const emit = defineEmits(linkEmits)

const { namespace } = useNamespace('link')

function handleClick(event: MouseEvent) {
  if (!props.disabled) emit('click', event)
}
</script>
