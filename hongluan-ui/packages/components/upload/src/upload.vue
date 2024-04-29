<template>
  <div
    :class="[
      namespace,
      drag && 'is-drag'
    ]"
    :style="[
      gap ? `--upload-item-gap: ${gap}` : '',
    ]"
  >
    <upload-list
      v-if="listType === 'card' && showFileList"
      :disabled="uploadDisabled"
      :list-type="listType"
      :files="uploadFiles"
      :handle-preview="onPreview"
      @remove="handleRemove"
    >
      <template v-if="$slots.file" #default="{ file }">
        <slot name="file" :file="file"></slot>
      </template>
      <template v-if="$slots['file-preview']" #file-preview="{ file }">
        <slot name="file-preview" :file="file"></slot>
      </template>
      <template v-if="$slots['file-icon']" #file-icon="{ file }">
        <slot name="file-icon" :file="file"></slot>
      </template>
    </upload-list>
    <upload-content
      ref="uploadRef"
      :type="type"
      :drag="drag"
      :action="action"
      :multiple="multiple"
      :with-credentials="withCredentials"
      :headers="headers"
      :method="method"
      :name="name"
      :data="data"
      :accept="accept"
      :file-list="uploadFiles"
      :auto-upload="autoUpload"
      :list-type="listType"
      :disabled="uploadDisabled"
      :limit="limit"
      :http-request="httpRequest"
      :before-upload="beforeUpload"
      :on-exceed="onExceed"
      :on-start="handleStart"
      :on-progress="handleProgress"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-remove="handleRemove"
    >
      <template #default>
        <slot v-if="$slots.trigger" name="trigger"></slot>
        <slot v-if="!$slots.trigger && $slots.default"></slot>
      </template>
    </upload-content>
    <slot v-if="$slots.trigger"></slot>
    <slot name="tip"></slot>
    <upload-list
      v-if="listType !== 'card' && showFileList"
      :disabled="uploadDisabled"
      :list-type="listType"
      :files="uploadFiles"
      :handle-preview="onPreview"
      @remove="handleRemove"
    >
      <template v-if="$slots.file" #default="{ file }">
        <slot name="file" :file="file"></slot>
      </template>
      <template v-if="$slots['file-icon']" #file-icon="{ file }">
        <slot name="file-icon" :file="file"></slot>
      </template>
    </upload-list>
  </div>
</template>
<script lang="ts" setup>
import { provide, onBeforeUnmount, toRef, shallowRef } from 'vue'
import { uploadContextKey } from '@hongluan-ui/tokens'
import { useConsistentProp, useNamespace } from '@hongluan-ui/hooks'

import UploadList from './upload-list.vue'
import UploadContent from './upload-content.vue'
import { useHandlers } from './use-handlers'
import { uploadProps } from './upload'
import type { UploadContentInstance } from './upload-content'

defineOptions({
  name: 'Upload',
})

const props = defineProps(uploadProps)
const { disabled: uploadDisabled } = useConsistentProp()
const { namespace } = useNamespace('upload')

const uploadRef = shallowRef<UploadContentInstance>()
const {
  abort,
  submit,
  clearFiles,
  uploadFiles,
  handleStart,
  handleError,
  handleRemove,
  handleSuccess,
  handleProgress,
} = useHandlers(props, uploadRef)

onBeforeUnmount(() => {
  uploadFiles.value.forEach(({ url }) => {
    if (url?.startsWith('blob:')) URL.revokeObjectURL(url)
  })
})

provide(uploadContextKey, {
  accept: toRef(props, 'accept'),
})

defineExpose({
  /** @description cancel upload request */
  abort,
  /** @description upload the file list manually */
  submit,
  /** @description clear the file list  */
  clearFiles,
  /** @description select the file manually */
  handleStart,
  /** @description remove the file manually */
  handleRemove,
})
</script>
