<template>
  <hl-panel>
    <h4>TinyMCE</h4>
    <hl-row gap="var(--lg)">
      <hl-col span="col-18">
        <hl-group align="items-between" block class="m-b-md">
          <editor-toolbar @click-toolbar="onClickToolbar" />
          <hl-group>
            <hl-button no-fill @click="addEditor">
              <hl-icon><two-plus /></hl-icon>
            </hl-button>
            <hl-button no-fill @click="delEditor">
              <hl-icon><two-close /></hl-icon>
            </hl-button>
          </hl-group>
        </hl-group>
        <template v-for="editor in editors" :key="editor.id">
          <hl-group dir="vertical" block :style="`padding-left: ${10 * (editor.level-1)}px`">
            <hl-input v-model="editor.title" fill />
            <tiny-editor
              :id="editor.id"
              :init-value="editor.content"
              class="m-t-sm m-b-xl"
              :option="editor.option"
              @change="val => editor.content = val"
            />
          </hl-group>
        </template>
      </hl-col>
      <hl-col span="col-6">
        <content-tpl @click="hanldeClickTpl" />
      </hl-col>
    </hl-row>
  </hl-panel>
  <link-dialog v-if="showLinkDialog" @cancel="showLinkDialog = false" @ok="insertLink" />
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue'
import tinymce from 'tinymce'
import EditorToolbar from './tinymce-editor/editor-toolbar.vue'
import TinyEditor from './tinymce-editor/tiny-editor.vue'
import LinkDialog from './link-dialog.vue'
import ContentTpl from './content-tpl.vue'

export default defineComponent({
  components: {
    EditorToolbar,
    TinyEditor,
    LinkDialog,
    ContentTpl,
  },
  setup() {

    const editors = ref([{ id: String(+new Date()), level: 1, title: '标题', content: '', option: {} }])
    const showLinkDialog = ref(false)
    let selectionText = ''

    // toolbar自定义操作
    const onClickToolbar = (command: string) => {
      if (command === 'InsertLink') {
        selectionText = tinymce.activeEditor.selection.getContent()
        showLinkDialog.value = true
        return
      }
      if (command === 'mceImage') {
        insertPic('https://pimg.39.net/yaopin/zycimg/11hxcu4pth3wu2019.jpg')
        return
      }
      tinymce.execCommand(command, false, '')

      // 段落拆分逻辑
      if (command.indexOf('Title-') > -1) {
        splitParagraph(+command[command.length - 1])
      }
    }
    const insertLink = ({ href, alt }: { href: string; alt: string; }) => {
      const html = `<a href="${href}" alt="${alt}" target="_blank">${selectionText}</a>`
      tinymce.activeEditor.selection.setContent(html)
      showLinkDialog.value = false
    }
    const insertPic = (url: string) => {
      const el = tinymce.activeEditor.dom.create('img', { src: url })
      const oldNode = tinymce.activeEditor.selection.getNode()
      oldNode.insertBefore(el, oldNode.childNodes[0])
    }
    // 段落拆分 主函数
    const splitParagraph = (command: number) => {
      const selectionText = tinymce.activeEditor.selection.getContent()
      // 如果没有选中内容
      if (!selectionText) return
      const id = tinymce.activeEditor?.id.replace(/#-/g, '')

      const separator = '$ParagraphSeparation$'
      tinymce.activeEditor.selection.setContent(separator)

      const activeEditorContentArr = tinymce.activeEditor.getContent().split(separator)
      // 标题文本
      const titleText = selectionText.replace(/<.*?>/g, '')
      const firstHalf = activeEditorContentArr[0] || ''
      const secondtHalf = activeEditorContentArr[1] || ''
      tinymce.activeEditor.setContent(firstHalf)

      // 插入的新节点
      const node = {
        level: command,
        id: String(+new Date()),
        title: titleText,
        content: secondtHalf,
        option: {},
      }

      const idx = editors.value.findIndex(e => e.id === id)
      editors.value.splice(idx + 1, 0 , node)

      console.log('......', node)
    }

    const hanldeClickTpl = (htmlStr: string) => {
      tinymce.activeEditor.insertContent(htmlStr)
    }


    const addEditor = () => {
      editors.value.push({
        level: 1,
        id: String(+new Date()),
        title: '标题',
        content: '',
        option: {},
      })
    }

    const delEditor = () => {
      editors.value.splice(editors.value.length - 1, 1)
    }

    provide('clickToolbar', onClickToolbar)

    return {
      editors,
      showLinkDialog,
      onClickToolbar,
      addEditor,
      delEditor,
      insertLink,
      hanldeClickTpl,
    }
  },
})
</script>

