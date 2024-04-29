<template show-source>
  <hl-group full="full-x" dir="vertical" class="m-t-lg" gap="var(--sm)">
    <hl-group v-for="(item, index) in content" :key="item.key" class="bg-light p-md hover:bg-hover cursor-pointer transition" full="full-x" dir="vertical" gap="var(--xxs)">
      <hl-group align="items-middle" full="full-x">
        <span class="font-lg font-bold ellipsis">{{ `${index + 1} . ${item.label}` }}</span>
        <hl-group gap="var(--xxs)" class="static">
          <hl-tag size="sm" class="static">{{ item.tag }}</hl-tag>
          <hl-tag size="sm" class="static" outline :type="item.level">{{ getLevelName(item.level) }}</hl-tag>
        </hl-group>
      </hl-group>

      <hl-group dir="vertical" class="m-t-xs">
        <hl-group
          v-for="(it, ind) in [
            { key: 'time', val: '时间' },
            { key: 'address', val: '地点' },
            { key: 'company', val: '处置单位' },
          ]"
          :key="ind + 'ind'"
          full="full-x"
          gap="var(--sm)"
        >
          <span class="text-secondary static">{{ it.val }}:</span>
          <span class="text-secondary">{{ item[it.key] }}</span>
        </hl-group>
      </hl-group>
    </hl-group>
  </hl-group>
  <hl-pagination class="m-t-lg" align="items-right" layout="prev, pager, next" :total="50" />
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MonitorEventIndex',
  setup() {
    const content = ref([
      {
        key: '1',
        label: '欧风花街重点人员打架斗殴',
        tag: '打架斗殴',
        level: 'level1',
        time: '2021-06-21 21:33',
        address: '欧风花街广场',
        company: '欧风花街欧',
      },
      { key: '2', label: '欧风花街重点人员打架斗殴', tag: '打架斗殴', level: 'level2', time: '2021-06-21 21:33', address: '欧风花街广场', company: '欧风花街' },
      { key: '3', label: '欧风花街重点人员打架斗殴', tag: '打架斗殴', level: 'level3', time: '2021-06-21 21:33', address: '欧风花街广场', company: '欧风花街' },
      { key: '4', label: '欧风花街重点人员打架斗殴', tag: '打架斗殴', level: 'level4', time: '2021-06-21 21:33', address: '欧风花街广场', company: '欧风花街' },
    ])
    const getLevelName = (key: string) => {
      const obj = {
        level1: 'I级',
        level2: 'II级',
        level3: 'III级',
        level4: 'IV级',
      }
      return obj[key as 'level1' | 'level2' | 'level3' | 'level4']
    }

    return {
      content,
      getLevelName,
    }
  },
})
</script>
<style lang="scss" scoped></style>
