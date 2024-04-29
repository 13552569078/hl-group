<template>
  <div
    :class="{
      ['upload-dragger']: true,
      'is-dragover': dragover,
    }"
    @drop.prevent="onDrop"
    @dragover.prevent="onDragover"
    @dragleave.prevent="dragover = false"
  >
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import { ref, inject } from 'vue'
import { uploadContextKey } from '@hongluan-ui/tokens'
import { throwError } from '@hongluan-ui/utils/error'
import { useConsistentProp } from '@hongluan-ui/hooks'
import { uploadDraggerEmits, uploadDraggerProps } from './upload-dragger'

const COMPONENT_NAME = 'UploadDrag'

defineOptions({
  name: COMPONENT_NAME,
})

defineProps(uploadDraggerProps)
const emit = defineEmits(uploadDraggerEmits)

const { disabled } = useConsistentProp()

const uploaderContext = inject(uploadContextKey)
if (!uploaderContext) {
  throwError(
    COMPONENT_NAME,
    'usage: <hl-upload><upload-dragger /></hl-upload>',
  )
}

const dragover = ref(false)

const onDrop = (e: DragEvent) => {
  if (disabled.value) return
  dragover.value = false

  const files = Array.from(e.dataTransfer.files)
  const accept = uploaderContext.accept.value
  if (!accept) {
    emit('file', files)
    return
  }

  const filesFiltered = files.filter(file => {
    const { type, name } = file
    const extension = name.includes('.') ? `.${name.split('.').pop()}` : ''
    const baseType = type.replace(/\/.*$/, '')
    return accept
      .split(',')
      .map(type => type.trim())
      .filter(type => type)
      .some(acceptedType => {
        if (acceptedType.startsWith('.')) {
          return extension === acceptedType
        }
        if (/\/\*$/.test(acceptedType)) {
          return baseType === acceptedType.replace(/\/\*$/, '')
        }
        if (/^[^/]+\/[^/]+$/.test(acceptedType)) {
          return type === acceptedType
        }
        return false
      })
  })

  emit('file', filesFiltered)
}

const onDragover = () => {
  if (!disabled.value) dragover.value = true
}
</script>
