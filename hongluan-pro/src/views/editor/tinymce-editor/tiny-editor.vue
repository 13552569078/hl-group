<template>
  <div class="tiny-editor">
    <tiny-editor :id="id" v-model="content" :init="setting" @init="initTiny" />
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, reactive, ref, watch } from 'vue'
/* ------------tinymce strat-------------- */
import TinyEditor from '@tinymce/tinymce-vue'

import type { Editor } from 'tinymce'
// 主题
import 'tinymce/themes/silver'

// 样式
import 'tinymce/skins/content/default/content.min.css'
import 'tinymce/skins/ui/oxide/skin.min.css'
import 'tinymce/skins/ui/oxide/content.min.css'

// 插件
import 'tinymce/plugins/link' // 链接插件
import 'tinymce/plugins/image' // 图片插件
import 'tinymce/plugins/media' // 媒体插件
import 'tinymce/plugins/table' // 表格插件
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/quickbars' // 快速栏插件
import 'tinymce/plugins/fullscreen' // 全屏插件
import 'tinymce/plugins/autoresize' // 全屏插件

/**
 * 注：
 * 5.3.x版本需要额外引进图标，没有所有按钮就会显示not found
 */
import 'tinymce/icons/default/icons'

// 本地化
import '@/utils/tinymce/langs/zh_CN'

/* ------------tinymce end-------------- */
export default defineComponent({
  components: {
    TinyEditor,
  },
  inject: ['clickToolbar'],
  props: {
    initValue: {
      type: String,
      default: '',
    },
    id: {
      type: [String, Number],
      default: '',
    },
    option: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const content = ref(props.initValue)
    const setting = reactive({
      menubar: false,
      auto_focus: true,
      branding: false,
      statusbar: false,
      contextmenu: false,
      // inline: true,
      // fixed_toolbar_container: '.tool-bar',
      toolbar: false,
      // "undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image media table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |",
      table_toolbar: 'tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
      quickbars_insert_toolbar: false,
      quickbars_selection_toolbar:
        'Title-1 Title-2 Title-3 | bold italic CustomInsertLink unlink',
      plugins: 'link media lists fullscreen quickbars autoresize table',
      height: 200,
      language: 'zh_CN',
      content_style: 'body {font-size: 14px; font-family: PingFangSC-Regular, PingFang SC; font-weight: 400; color: #5D6C8E; line-height: 22px;} a { color: #0000ee; } p,a,ul,li {margin-block-start: 0; margin-block-end: 0; clear: both} p img { width: 160px; };',
      ...props.option,
    })

    const clickToolbar = inject<(command: string) => void>('clickToolbar')

    const initTiny = (e: any, editor: Editor) => {
      editor.ui.registry.addButton('CustomInsertLink', {
        icon: 'link',
        onAction: () => {
          clickToolbar?.('InsertLink')
        },
      })
      editor.ui.registry.addButton('Title-1', {
        text: '一级标题',
        onAction: () => {
          clickToolbar?.('Title-1')
        },
      })
      editor.ui.registry.addButton('Title-2', {
        text: '二级标题',
        onAction: () => {
          clickToolbar?.('Title-2')
        },
      })
      editor.ui.registry.addButton('Title-3', {
        text: '三级标题',
        onAction: () => {
          clickToolbar?.('Title-3')
        },
      })
    }

    watch(content, () => {
      emit('change', content.value)
    })

    return {
      content,
      setting,
      initTiny,
    }
  },
})
</script>
<style lang="scss" scoped>
.tiny-editor {
  width: 100%;
}
</style>
