<template>
  <transition-group
    tag="ul"
    :class="[
      'upload-list',
      'list-' + listType,
      { 'is-disabled': disabled }
    ]"
    name="list"
  >
    <li
      v-for="file in files"
      :key="file.uid || file.name"
      :class="[
        'item',
        'is-' + file.status,
        { focusing },
      ]"
      tabindex="0"
      @keydown.delete="!disabled && handleRemove(file)"
      @focus="focusing = true"
      @blur="focusing = false"
      @click="focusing = false"
    >
      <slot :file="file">
        <slot name="file-preview" :file="file">
          <img
            v-if="file.status !== 'uploading' && ['card', 'picture'].includes(listType)"
            class="item-thumb"
            :src="file.url"
            alt=""
          >
        </slot>
        <slot name="file-icon" :file="file">
          <hl-icon :type="file.status" class="file-icon">
            <system-file />
          </hl-icon>
        </slot>
        <div class="item-content">
          <a class="item-name" @click="handlePreview(file)">
            {{ file.name }}
          </a>
          <hl-progress
            v-if="file.status === 'uploading'"
            :show-as="listType === 'card' ? 'circle' : 'line'"
            :percentage="Number(file.percentage)"
          />
        </div>
        <div class="item-status">
          <hl-icon
            :class="{
              'icon-status': true,
              'success': listType === 'text',
              'icon-check': ['card', 'picture'].includes(listType)
            }"
          >
            <system-checked />
          </hl-icon>
          <hl-icon v-if="!disabled" class="icon-close" :title="t('hl.upload.deleteTip')" @click="handleRemove(file)">
            <system-close />
          </hl-icon>
          <!-- Due to close btn only appears when li gets focused disappears after li gets blurred, thus keyboard navigation can never reach close btn-->
          <!-- This is a bug which needs to be fixed -->
          <!-- TODO: Fix the incorrect navigation interaction -->
        </div>

        <span v-if="listType === 'card'" class="item-actions">
          <span
            class="item-preview"
            @click.prevent="handlePreview(file)"
          >
            <hl-icon name="ZoomIn">
              <system-zoom-in />
            </hl-icon>
          </span>
          <span
            v-if="!disabled"
            class="item-delete"
            @click="handleRemove(file)"
          >
            <hl-icon>
              <system-close />
            </hl-icon>
          </span>
        </span>
      </slot>
    </li>
    <slot name="append"></slot>
  </transition-group>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import HlProgress from '@hongluan-ui/components/progress'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemChecked, SystemZoomIn, SystemClose, SystemFile } from '@hongluan-ui/components/system-icon'
import { useLocale, useConsistentProp } from '@hongluan-ui/hooks'

import { uploadListEmits, uploadListProps } from './upload-list'
import type { UploadFile } from './upload'

defineOptions({
  name: 'UploadList',
})

defineProps(uploadListProps)
const emit = defineEmits(uploadListEmits)

const { t } = useLocale()
const { disabled } = useConsistentProp()

const focusing = ref(false)

const handleRemove = (file: UploadFile) => {
  emit('remove', file)
}
</script>
