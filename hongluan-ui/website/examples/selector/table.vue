<template>
  <hl-row align="items-center">
    <hl-col span="md:col-12 lg:col-10">
      <p class="m-b-sm">下拉表格多选</p>
      <hl-selector
        ref="selectorTable"
        clearable
        block
        multiple
        @remove-tag="handleTableInput"
        @clear="handleTableInput('')"
      >
        <template #prefix>
          <hl-icon>
            <two-point />
          </hl-icon>
        </template>
        <hl-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
        >
          <hl-table-column type="selection" width="55" />
          <hl-table-column prop="name" label="姓名" width="120" />
          <hl-table-column prop="tel" label="电话" width="120" show-overflow-tooltip />
        </hl-table>
      </hl-selector>
    </hl-col>
    <hl-col span="md:col-12 lg:col-10" />
  </hl-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TwoPoint } from '@hongluan-ui/icons'

const tableData = ref([
  {
    name: '王小虎',
    tel: '16787812234',
  },
  {
    name: '王2虎',
    tel: '17787812234',
  },
  {
    name: '王3虎',
    tel: '18787812234',
  },
  {
    name: '王4虎',
    tel: '19787812234',
  },
  {
    name: '王5虎',
    tel: '10787812234',
  },
  {
    name: '王6虎',
    tel: '11787812234',
  },
  {
    name: '王7虎',
    tel: '12787812234',
  },
])
const multipleSelection = ref([])
const multipleTable = ref(null)
const selectorTable = ref(null)

const handleSelectionChange = val => {
  multipleSelection.value = val
  selectorTable.value.setValue(multipleSelection.value.map(s => s.name))
}
const handleTableInput = tag => {
  if (tag === '') {
    multipleTable.value.clearSelection()
  } else {
    multipleTable.value.toggleRowSelection(tableData.value.find(d => d.name === tag.text))
  }
}

</script>
