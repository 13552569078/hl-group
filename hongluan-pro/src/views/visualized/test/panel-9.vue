<template>
  <hv-panel title="研判操作">
    <hl-group full="full-x" dir="vertical" class="m-t-lg" gap="var(--sm)">
      <hl-group full="full-x">
        <span class="text-secondary w-sm static">事件真实性:</span>
        <hl-radio-group v-model="content.realTyle" gap="var(--md)" type="primary" size="md">
          <hl-radio label="1">真实</hl-radio>
          <hl-radio label="0">误报</hl-radio>
        </hl-radio-group>
      </hl-group>
      <hl-group full="full-x" align="items-middle items-left">
        <span class="text-secondary w-sm static">研判报警等级:</span>
        <hl-select v-model="content.distance" placeholder="研判报警等级">
          <hl-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </hl-select>
      </hl-group>
      <hl-group full="full-x">
        <span class="text-secondary w-sm static">原报警等级:</span>
        <hl-tag size="sm" class="static" :type="content.level">{{ getLevelName(content.level) }}</hl-tag>
      </hl-group>
      <hl-group full="full-x" align="items-middle">
        <span class="text-secondary w-sm static">研判报警类型:</span>
        <hl-select v-model="content.types" placeholder="研判报警类型">
          <hl-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </hl-select>
      </hl-group>
      <hl-group full="full-x">
        <span class="text-secondary w-sm static">原报警类型:</span>
        <span class="font-md font-bold">{{ content.oldTypes }}</span>
      </hl-group>
      <hl-group full="full-x">
        <span class="text-secondary w-sm static">描述:</span>
        <hl-input v-model="content.des" native-type="textarea" :rows="3" placeholder="请输入内容" block />
      </hl-group>
      <hl-group full="full-x">
        <span class="text-secondary w-sm static"></span>
        <hl-group align="items-left" gap="var(--md)">
          <hl-button type="primary">结束研判</hl-button>
          <hl-button>取消</hl-button>
        </hl-group>
      </hl-group>
    </hl-group>
  </hv-panel>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MonitorEventIndex',
  setup() {
    const content = ref({
      realTyle: '1',
      distance: '',
      level: 'level1',
      types: '',
      oldTypes: '打架斗殴',
      des: '',
    })
    const options = ref([
      {
        value: '选项1',
        label: '云服务器ECS',
      },
      {
        value: '选项2',
        label: '裸金属服务器BMS',
      },
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
      options,
      getLevelName,
    }
  },
})
</script>
<style lang="scss" scoped></style>
