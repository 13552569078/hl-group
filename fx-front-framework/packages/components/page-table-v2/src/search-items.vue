<template>
  <div ref="root" class="table-toolbar w-full">
    <hl-group align="items-middle" gap="var(--lg)" full="full-x" class="w-full">
      <div class="static">
        <slot name="content-header-left"></slot>
      </div>
      <!--搜索项显示区1-->
      <div ref="search-tags" class="toolbar-tags-wrap">
        <search-tag :tags="tags" :show-type="'limit'" :box-width="data.searchTagsW" @hideIt="judgeSearchTagHide" @clearEvent="clearSearchTag" />
      </div>
      <div class="static">
        <slot name="content-header-right"></slot>
      </div>
    </hl-group>
    <!--搜索项显示区2-->
    <search-tag v-if="data.searchTagHide" :tags="tags" :show-type="'all'" @clearEvent="clearSearchTag" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted, onBeforeUnmount, getCurrentInstance, ComponentInternalInstance, PropType } from 'vue'
import { HlGroup } from 'hongluan-ui'
import SearchTag from './search-tag.vue'
import { TagItem } from './types'

export interface DataInterface {
  searchTagHide: boolean
  myObserver: null | ResizeObserver
  searchTagsW: number
}

export default defineComponent({
  components: { SearchTag, HlGroup },
  props: {
    tags: {
      type: Array as PropType<TagItem[]>,
      default: () => [],
    },
  },
  emits: ['tagBoxHeight', 'clearTags'],
  setup(props, { emit }) {
    const data: DataInterface = reactive({
      searchTagHide: false,
      myObserver: null,
      searchTagsW: 0,
    })

    let currentInstance: ComponentInternalInstance | null

    let runResizeObserver = () => {
      data.myObserver = new ResizeObserver(entries => {
        // 注意，entres是个数组，数组项为每个需要监听的DOM节点
        entries.forEach(entry => {
          // console.log('大小位置 contentRect', entry.contentRect)
          // console.log('监听的DOM target', entry.target)
          if (entry.target.className.indexOf('toolbar-tags-wrap') !== -1) {
            data.searchTagsW = entry.contentRect.width
          } else if (entry.target.className.indexOf('table-toolbar') !== -1) {
            emit('tagBoxHeight', entry.contentRect.height)
          }
        })
      })
      if (currentInstance) {
        data.myObserver.observe(currentInstance.refs['search-tags'] as Element)
        data.myObserver.observe(currentInstance.refs['root'] as Element)
      }
    }

    let judgeSearchTagHide = (val: boolean) => {
      data.searchTagHide = val
    }
    let clearSearchTag = (val: string | Array<any>) => {
      // 关闭的搜素标签
      if (val === 'all') {
        emit('clearTags', props.tags)
      } else {
        emit('clearTags', [val])
      }
    }

    onMounted(() => {
      currentInstance = getCurrentInstance()
      runResizeObserver()
    })

    onBeforeUnmount(() => {
      data.myObserver && data.myObserver.disconnect()
    })

    return {
      data,
      judgeSearchTagHide,
      clearSearchTag,
    }
  },
})
</script>
