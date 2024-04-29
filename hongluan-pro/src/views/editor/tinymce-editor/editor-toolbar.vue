<template>
  <div class="editor-toolbar flex-vertical">
    <ul class="toolbar-box">
      <li
        v-for="item in titleList"
        :key="item.command"
        class="title-item"
        @click="hanldeClickToolBtn(item)"
      >
        {{ item.title }}
      </li>
      <li
        v-for="(item, index) in execList"
        :key="index"
        @click="hanldeClickToolBtn(item)"
      >
        <hl-popover
          class="item"
          trigger="hover"
          tooltip
          :show-arrow="false"
          :content="item.title"
          placement="bottom-start"
        >
          <template #reference>
            <hl-icon>
              <component :is="'Two' + item.icon" />
            </hl-icon>
          </template>
        </hl-popover>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['click-toolbar'],
  setup(_, { emit }) {
    const titleList = [
      {
        title: '一级标题',
        command: 'Title-1',
      },
      {
        title: '二级标题',
        command: 'Title-2',
      },
      {
        title: '三级标题',
        command: 'Title-3',
      },
    ]
    const execList = [
      {
        icon: 'Bold',
        command: 'Bold',
        title: '加粗',
      },
      {
        icon: 'Underline',
        command: 'Underline',
        title: '下划线',
      },
      {
        icon: 'Italic',
        command: 'Italic',
        title: '斜体',
      },
      {
        icon: 'AlignLeft',
        command: 'JustifyLeft',
        title: '左对齐',
      },
      {
        icon: 'AlignCenter',
        command: 'JustifyCenter',
        title: '居中',
      },
      {
        icon: 'AlignRight',
        command: 'JustifyRight',
        title: '局右',
      },
      {
        icon: 'FilePicture',
        command: 'mceImage',
        title: '插入图片',
      },
      {
        icon: 'Link',
        command: 'InsertLink',
        title: '插入链接',
      },
    ]

    const hanldeClickToolBtn = (item: { command: string; }) => {
      emit('click-toolbar', item.command)
    }

    return {
      titleList,
      execList,
      hanldeClickToolBtn,
    }
  },
})
</script>
<style lang="scss" scoped>
.editor-toolbar {
  height: 32px;
  color: #5D6C8E;
  z-index: 1999;
  .toolbar-box {
    height: 100%;
    background: #fff;
    border-radius: 4px;
    display: flex;
    align-items: center;
    i {
      padding: 4px;
      font-size: 18px;
      margin: 0 6px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
    .title-item {
      margin: 0 6px;
      padding: 4px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
ol, ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
</style>
