<template show-source>
  <hv-panel title="折叠面板">
    <hl-collapse v-model="activeName" gap="var(--xxs)" accordion class="m-t-md" content-padding="0">
      <hl-collapse-item title="一致性 Consistency" name="1">
        <hl-simple-table :cols="cols" :data="tableData" :show-header="false" class="p-y-xs" border="borderless" padding="var(--md)" gap-y="0" hover auto-height>
          <template #unit="{ row }">
            {{ row.unit }} <span class="text-secondary font-sm m-l-xs">({{ row.level }})</span>
          </template>
          <template #tel="{ row }">
            <hl-icon size="xs" class="m-r-xxs">
              <fill-tel />
            </hl-icon>
            {{ row.tel }}
          </template>
          <template #status="{ row }">
            <hl-icon v-show="row.status == 0" size="xs" color="rgba(var(--rgb-warning), 0.6)">
              <fill-Check />
            </hl-icon>
            <hl-icon v-show="row.status == 1" size="xs" color="rgba(var(--rgb-danger), 0.6)">
              <fill-Clock />
            </hl-icon>
            <hl-icon v-show="row.status == 2" size="xs" color="rgba(var(--rgb-info), 0.6)">
              <fill-Pause />
            </hl-icon>
            <hl-spinner v-show="row.status == 3" size="xs" color="rgba(var(--rgb-success), 0.6)" />
          </template>
        </hl-simple-table>
      </hl-collapse-item>
      <hl-collapse-item title="反馈 Feedback" name="2">
        <div class="p-md">控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
      </hl-collapse-item>
      <hl-collapse-item title="效率 Efficiency" name="3">
        <div class="p-md">简化流程：设计简洁直观的操作流程；</div>
      </hl-collapse-item>
      <hl-collapse-item title="可控 Controllability" name="4">
        <div class="p-md">用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
      </hl-collapse-item>
    </hl-collapse>
  </hv-panel>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  components: {},
  setup() {
    const activeName = ref('1')

    const tableData = ref([
      {
        id: 1,
        status: 1,
        unit: '卫生局',
        name: '王强',
        level: '局长',
        tel: '13912345678',
      },
      {
        id: 2,
        status: 2,
        unit: '林业局',
        name: '刘建国',
        level: '副局长',
        tel: '13912345678',
      },
      {
        id: 3,
        status: 0,
        unit: '应急管理局',
        name: '李方四',
        level: '局长',
        tel: '13912345678',
      },
      {
        id: 4,
        status: 3,
        name: '刘适德',
        unit: '司法局',
        level: '科长',
        tel: '13912345678',
      },
    ])

    const cols = ref([
      { title: '姓名', prop: 'name' },
      { title: '单位', prop: 'unit', slotName: 'unit' },
      { title: '电话', prop: 'tel', slotName: 'tel' },
      { title: '状态', prop: 'status', slotName: 'status', align: 'right' },
    ])

    return {
      activeName,
      tableData,
      cols,
    }
  },
})
</script>
