import { getCurrentInstance, ref } from 'vue'

import type { Ref } from 'vue'
import type { Indexable } from '@hongluan-ui/utils'
import type { GetRowKey, TreeProps, LoadFunction } from './simple-table'

export type TableTreeNode = {
  isLoading: boolean
  lazy: boolean
  level: number
  expanded?: boolean
}

function useTree({ load, treeProps, getRowKey, defaultExpandAll, expandRowKeys }: {
  load: LoadFunction
  treeProps: TreeProps
  getRowKey: GetRowKey
  defaultExpandAll: Ref<boolean>
  expandRowKeys: Ref<string[]>
}) {

  const tableTreeMap = ref<Indexable<TableTreeNode>>({})

  const { emit } = getCurrentInstance()!
  const childrenKey = treeProps.children
  const hasChildrenKey = treeProps.hasChildren

  const hasChildren = (row: Record<string, any>) => {
    if (row[childrenKey] && Array.isArray(row[childrenKey]) && row[childrenKey].length) return true
    if (row[hasChildrenKey]) return true
  }

  const walkTreeNode = (data: unknown[], level = 0) => {
    data && data.forEach((row: any) => {
      const rowKey = getRowKey(row)
      const expanded = expandRowKeys.value.includes(rowKey) ? true : defaultExpandAll.value
      if (row[childrenKey] && Array.isArray(row[childrenKey])) {
        tableTreeMap.value[rowKey] = {
          lazy: false,
          isLoading: false,
          expanded,
          level,
        }
        walkTreeNode(row[childrenKey], level + 1)
      } else if (row[hasChildrenKey]) {
        tableTreeMap.value[rowKey] = {
          lazy: true,
          isLoading: false,
          expanded: false,
          level,
        }
        expanded && toggleExpandTree(row)
      }
    })
  }

  const loadChildren = (row: Record<string, any>, level: number, finish?: () => void) => {
    tableTreeMap.value[getRowKey(row)] = {
      lazy: false,
      isLoading: true,
      expanded: false,
      level: level,
    }
    if (load) {
      load(row, { level }, (children: unknown[]) => {
        row[childrenKey] = children
        tableTreeMap.value[getRowKey(row)].isLoading = false
        walkTreeNode(children, level + 1)
        finish && finish()
      })
    } else {
      row[childrenKey] = []
      tableTreeMap.value[getRowKey(row)].isLoading = false
      finish && finish()
    }
  }

  const toggleExpandTree = (row: Record<string, any>) => {
    return new Promise<void>(resolve => {
      if (tableTreeMap.value[getRowKey(row)].lazy) {
        loadChildren(row, tableTreeMap.value[getRowKey(row)].level, () => {
          tableTreeMap.value[getRowKey(row)].expanded = true
          resolve()
          emit('tree-expand', true, row)
        })
      } else {
        tableTreeMap.value[getRowKey(row)].expanded = !tableTreeMap.value[getRowKey(row)].expanded
        resolve()
        emit('tree-expand', tableTreeMap.value[getRowKey(row)].expanded, row)
      }
    })
  }

  return {
    walkTreeNode,
    hasChildren,
    loadChildren,
    tableTreeMap,
    toggleExpandTree,
  }
}

export { useTree }
