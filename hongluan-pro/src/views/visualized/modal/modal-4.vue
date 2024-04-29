<template show-source>
  <hv-modal title="监测事件详情2" width="calc(var(--xxl) * 14)">
    <hl-group gap="var(--sm)" full="full-x" align="items-middle" class="bg-light m-t-lg p-x-md p-y-xs border">
      <hl-icon type="primary" class="static" gradient>
        <two-point />
      </hl-icon>
      <h4>欧风花街</h4>
    </hl-group>
    <hl-row layout="grid" class="m-t-lg" count="count-3" gap-x="var(--xxl)" gap-y="var(--lg)">
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">地理位置</span>
          <span class="font-bold group-item">人民南路33号（盐塘河公园南侧）</span>
        </hl-group>
      </hl-col>
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">派出所</span>
          <span class="font-bold group-item">科城派出所</span>
        </hl-group>
      </hl-col>
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">所在街道</span>
          <span class="font-bold group-item">某某街道</span>
        </hl-group>
      </hl-col>
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">负责人/电话</span>
          <span class="font-bold group-item">贾明字 / 13912345678</span>
        </hl-group>
      </hl-col>
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">联系人/电话</span>
          <span class="font-bold group-item">张浩 / 13987654321</span>
        </hl-group>
      </hl-col>
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">上级主管部门</span>
          <span class="font-bold group-item">盐南区社事局</span>
        </hl-group>
      </hl-col>
      <hl-col span="col">
        <hl-group dir="vertical" class="info-description auto-height">
          <span class="text-secondary group-item">片警 / 电话</span>
          <span class="font-bold group-item">张浩 / 13987654321</span>
        </hl-group>
      </hl-col>
    </hl-row>

    <hl-tabs v-model="activeName" type="line" nav-height="calc(var(--lg) * 2)" class="m-t-lg" @tab-click="handleClick">
      <hl-tab-pane label="预警事件" name="1">
        <hb-table-searchbar class="m-t-md" :selector="selector" :searcher="searcher" padding="0" gap="var(--md)" :fill="false" @change="searchChanged">
          <template #checkbox>
            <span class="m-r-md">自定义Slot：</span>
            <hl-checkbox v-model="checked1" :label="1" bold>备选项</hl-checkbox>
            <hl-checkbox v-model="checked1" :label="2" bold>备选项</hl-checkbox>
            <hl-checkbox v-model="checked1" :label="0">未加粗</hl-checkbox>
          </template>
        </hb-table-searchbar>
        <hl-simple-table :cols="cols" :data="tableData" size="auto-height" stripe="even" class="m-t-md">
          <template #tableIndex="{ row }">
            <span>{{ row.rowIndex + 1 }}</span>
          </template>
          <template #handle> 修改 </template>
        </hl-simple-table>
      </hl-tab-pane>
      <hl-tab-pane label="监测事件" name="2">选项卡2</hl-tab-pane>
      <hl-tab-pane label="监测设备" name="3">选项卡3</hl-tab-pane>
      <hl-tab-pane label="监测数据" name="4">选项卡4</hl-tab-pane>
    </hl-tabs>
  </hv-modal>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    const activeName = ref('1')

    const tableData = ref([
      {
        id: 1,
        name: '王二麻子',
        sex: '男',
        org: '中国系统',
        des: '来自中国南方的温暖城市！',
      },
      { id: 2, name: '李四', sex: '男', org: '中国系统', des: '来自中国' },
      {
        id: 3,
        name: '张三',
        sex: '男',
        org: '中国系统',
        des: '来自中国北方的寒冷的城市！',
      },
    ])
    const cols = ref([
      { title: '#', slotName: 'tableIndex' },
      { title: '用户名', prop: 'name' },
      { title: '性别', prop: 'sex' },
      { title: '单位', prop: 'org' },
      { title: '简介', prop: 'des' },
      { title: '操作', slotName: 'handle', align: 'center' },
    ])
    const originItems = [
      {
        placeholder: '事件类型',
        value: '',
        name: 'prop1',
        prop: {
          label: 'name',
          value: 'code',
        },
        options: [
          { name: '已驳回', code: '1' },
          { name: '已审定', code: '2' },
        ],
      },
      {
        placeholder: '预警等级',
        value: '',
        name: 'prop2',
        options: [
          { label: '已驳回', value: '1' },
          { label: '已审定', value: '2' },
        ],
      },
      {
        placeholder: '事件时间',
        value: '',
        name: 'prop3',
        options: [
          { label: '全部', value: '1' },
          { label: '今日', value: '2' },
          { label: '本周', value: '3' },
          { label: '本月', value: '4' },
        ],
      },
    ]
    const searcher = reactive({
      show: false,
      placeholder: '输入搜索条件',
    })
    const selector = reactive({
      colCount: 'md:count-3 sm:count-2',
      items: originItems,
    })
    const checked1 = ref(false)
    return {
      tableData,
      cols,
      activeName,
      searcher,
      selector,
      checked1,
    }
  },
})
</script>
