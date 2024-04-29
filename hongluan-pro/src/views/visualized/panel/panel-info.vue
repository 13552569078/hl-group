<template>
  <hl-group full="full-x" dir="vertical" class="m-t-lg" gap="var(--sm)">
    <hl-group v-for="item in types.details" :key="item.key">
      <span class="text-secondary static m-r-xs">{{ item.label }}:</span>
      <hl-tag v-if="item.key === 'warningLevel'" size="sm" outline :type="item.val">{{ getLevelName(item.val) }}</hl-tag>
      <hl-thumb v-else-if="item.key === 'video'" style="width: 200px; height: 140px" src="https://i0.hippopx.com/photos/264/421/89/child-children-girl-happy-thumb.jpg" fit="cover" />
      <hl-group v-else-if="item.key === 'photo'" gap="var(--md)" wrap>
        <hl-thumb v-for="it in picData" :key="it" style="width: calc(var(--xxl) * 2); height: calc(var(--xxl) * 2)" :src="it.thumb" fit="cover" :preview-src-list="srcList" />
      </hl-group>
      <span v-else class="font-md font-bold">{{ item.val }}</span>
    </hl-group>
  </hl-group>
</template>
<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  name: 'MonitorEventIndex',
  setup() {
    const types = reactive({
      details: [
        { label: '事件标题', key: '1', val: '欧风花街打架斗殴' },
        { label: '预警等级', key: 'warningLevel', val: 'level1' },
        { label: '预警主体', key: '3', val: '欧风花街' },
        { label: '事件地点', key: '4', val: '欧风花街广场' },
        { label: '预警类型', key: '5', val: '城市安全-重点区域-打架斗殴' },
        { label: '预警时间', key: '6', val: '2021-06-21  14:23:51' },
        { label: '事件描述', key: '7', val: '欧风花街广场下午发生打架斗殴事件，3人参与，1人受伤' },
        { label: '现场照片', key: 'photo', val: '' },
        { label: '现场视频', key: 'video', val: '' },
      ],
    })
    const picData = ref([
      {
        title: '',
        thumb: 'https://i0.hippopx.com/photos/298/434/513/beach-dawn-dusk-ocean-thumb.jpg',
      },
      {
        title: '',
        thumb: 'https://i0.hippopx.com/photos/738/1016/11/children-fishing-the-activity-asia-thumb.jpg',
      },
      {
        title: '',
        thumb: 'https://i0.hippopx.com/photos/264/421/89/child-children-girl-happy-thumb.jpg',
      },
      {
        title: '',
        thumb: 'https://i0.hippopx.com/photos/199/210/349/man-board-drawing-muscles-thumb.jpg',
      },
    ])
    const srcList = computed(() => picData.value.map(item => item.thumb))

    const getLevelName = (key: string) => {
      const obj = {
        level1: '一级',
        level2: '二级',
        level3: '三级',
        level4: '四级',
      }
      return obj[key as 'level1' | 'level2' | 'level3' | 'level4']
    }

    return {
      types,
      picData,
      srcList,

      getLevelName,
    }
  },
})
</script>
<style lang="scss" scoped></style>
