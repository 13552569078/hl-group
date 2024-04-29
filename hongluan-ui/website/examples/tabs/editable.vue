<template>
  <hl-tabs v-model="state.editableTabsValue" editable @edit="handleTabsEdit">
    <hl-tab-pane
      v-for="item in state.editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
      {{ item.content }}
    </hl-tab-pane>
  </hl-tabs>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const state = reactive({
  editableTabsValue: '2',
  editableTabs: [
    {
      title: 'Tab 1',
      name: '1',
      content: 'Tab 1 content',
    },
    {
      title: 'Tab 2',
      name: '2',
      content: 'Tab 2 content',
    },
  ],
  tabIndex: 2,
})
const handleTabsEdit = (targetName, action) => {
  if (action === 'add') {
    let newTabName = ++state.tabIndex + ''
    state.editableTabs.push({
      title: 'New Tab',
      name: newTabName,
      content: 'New Tab content',
    })
    state.editableTabsValue = newTabName
  }
  if (action === 'remove') {
    let tabs = state.editableTabs
    let activeName = state.editableTabsValue
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          let nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.name
          }
        }
      })
    }

    state.editableTabsValue = activeName
    state.editableTabs = tabs.filter(tab => tab.name !== targetName)
  }
}

</script>
