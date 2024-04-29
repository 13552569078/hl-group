<template>
  <div ref="root" class="search-page-tag_wrap" :class="{ 'search-page-tag_wrap-hide': data.showHide }">
    <div
      v-for="item in tags"
      :key="item.key"
      :class="{
        'search-tag': true,
        'search-tag-all': showType === 'all'
      }"
    >
      <span>{{ item.label + '：' + item.valueName }}</span>
      <div class="white-line"></div>
      <hl-icon class="tag-close" @click="clear(item)">
        <SystemClose />
      </hl-icon>
    </div>
    <div
      v-if="tags.length"
      class="clear-all"
      :class="{ 'clear-all-bottom': showType === 'all' }"
      @click="clear('all')"
    >
      清空
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  watch,
  nextTick,
  onMounted,
  onBeforeUnmount,
  getCurrentInstance,
  ComponentInternalInstance,
  PropType,
} from 'vue'
import { HlIcon, SystemClose } from 'hongluan-ui'


import { TagItem } from './types'

export interface DataInterface {
  showHide: boolean
  timer: null | ReturnType<typeof setTimeout>
}

export default defineComponent({
  components: { HlIcon, SystemClose },
  props: {
    showType: {
      type: String, // 未设置默认值，为 undefined
      default: 'limit',
    },
    tags: {
      type: Array as PropType<TagItem[]>,
      default: () => [],
    },
    boxWidth: {
      type: Number,
      default: 0,
    },
  },
  emits: ['hideIt', 'clearEvent'],
  setup(props, { emit }) {
    const data: DataInterface = reactive({
      showHide: false,
      timer: null,
    })
    let currentInstance: ComponentInternalInstance | null

    watch(
      () => props.boxWidth,
      () => {
        if (data.timer) {
          clearTimeout(data.timer)
        }
        data.timer = setTimeout(() => {
          nextTick(() => {
            computedWidth()
            data.timer = null
          })
        }, 50)
      },
    )
    watch(
      () => props.tags,
      () => {
        nextTick(() => {
          computedWidth()
        })
      },
      { deep: true, immediate: true },
    )
    // 对比自己的宽度
    let computedWidth = () => {
      if (!currentInstance || !currentInstance.refs['root']) return
      let $el: any = currentInstance.refs['root']
      data.showHide = $el.parentNode.offsetWidth - $el.offsetWidth <= 48 && props.showType === 'limit'
      emit('hideIt', data.showHide)
    }
    let clear = (item: TagItem | string) => {
      emit('clearEvent', item)
    }

    onMounted(() => {
      currentInstance = getCurrentInstance()
    })
    onBeforeUnmount(() => {
      data.timer && clearTimeout(data.timer)
    })

    return {
      data,
      clear,
    }
  },
})
</script>
