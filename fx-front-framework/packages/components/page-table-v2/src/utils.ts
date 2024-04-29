import type { SelectorItem, SelectorItemOption } from 'hongluan-business-ui'
import type { TagItem } from './types'

export interface DisplayItem {
  display: string
  value: unknown
  name: string
  type: string
}

const Utils = {
  getKey(item: SelectorItem, opt: SelectorItemOption) {
    return item.prop ? opt[item.prop.value] : opt.value
  },
  getLabel(item: SelectorItem, opt: SelectorItemOption) {
    return item.prop ? opt[item.prop.label] : opt.label
  },
  getSelectedOptionLabels(item: SelectorItem) {
    const result = [] as unknown[]
    (item.value as Array<unknown>).forEach(v => {
      result.push(this.getSelectedOptionLabel(item, v))
    })
    return result
  },
  getSelectedOptionLabel(item: SelectorItem, val: unknown) {
    const valOpt = item.options.find(opt => this.getKey(item, opt) === val)
    return valOpt ? this.getLabel(item, valOpt) : ''
  },
  getSelectedOptionsLabel(item: SelectorItem, vals: unknown[]) {
    return vals.map(val => this.getSelectedOptionLabel(item, val))
  },
  getDisplayStr(display: unknown, separator = '-') {
    let val = ''
    if (typeof display === 'string') {
      val = display
    } else if (Array.isArray(display)) {
      val = display.join(separator)
    } else {
      val = JSON.stringify(display)
    }
    return val
  },
  getSearchTags(searchArr: TagItem[], searchItems: SelectorItem[]) {
    const result = [] as TagItem[]
    searchArr
      .filter(i => Array.isArray(i.value) ? i.value.length : (i.value || i.value === 0))
      .forEach(item => {
        const searchItem = searchItems.find(si => si.name === item.key)
        if (/range|dates/.test(searchItem.type) || searchItem['is-range']) {
          result.push({
            ...item,
            valueName: typeof searchItem.display === 'function' ? searchItem.display.call(null, item) : this.getDisplayStr(item.value),
            type: searchItem.type,
          })
        } else if (searchItem.type === 'select') {
          let valueName: string
          if (Array.isArray(item.value)) {
            valueName = this.getDisplayStr(this.getSelectedOptionsLabel(searchItem, item.value), '，')
          } else {
            valueName = this.getSelectedOptionLabel(searchItem, item.value) as string
          }
          result.push({
            ...item,
            valueName,
            type: searchItem.type,
          })
        } else {
          result.push({
            ...item,
            valueName: typeof searchItem.display === 'function' ? searchItem.display.call(null, item) : this.getDisplayStr(item.value),
            type: searchItem.type,
          })
        }
      })
    return result
  },
  getSearchParams(searchArr: TagItem[]) {
    const mapParams: Record<string, unknown> = {}
    const originalParams: Record<string, unknown> = {}
    searchArr
      .filter(item => (Array.isArray(item.value) ? item.value.length : (item.value || item.value === 0)))
      .forEach(item => {
        if (/range|dates/.test(item.type) || item['is-range']) {
          mapParams[item.key + 'Start'] = item.value[0]
          mapParams[item.key + 'End'] = item.value[1]
        } else {
          mapParams[item.key] = item.value
        }
        originalParams[item.key] = item.value
      })

    return { mapParams, originalParams }
  },

}

export { Utils }
