/**
 * 展平树形Array
 * @param {data} [Array] 源数据
 * @param {keys} [Array] 期望得到的key 如["label", "value"]
 * @param {level} [Number] 层级
  */

import { AnyFunction } from '@/types'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const flatten = (data: any[], keys: any[], level = 0, parentUrl = null, childrenKey = 'childResource') => data.reduce((arr: any, x: { [x: string]: any; [childrenKey]: any; }) => [
  ...arr,
  // eslint-disable-next-line
  keys.reduce((o: { [x: string]: any }, k: string | number) => (o[k] = x[k], o), { level, parentUrl }),
  ...flatten(x[childrenKey] || [], keys, level + 1, x.resourceUrl, childrenKey),
], [])

// 节流
export function throttle(fn: AnyFunction<any>, delay: number) {
  let prev = 0
  return (...args: any[]) => {
    const now = +new Date()
    if (now - prev > delay) {
      fn(...args)
      prev = now
    }
  }
}
// 排除某个字段的深拷贝 如排除某个循环引用的变量
export function deepClone(obj: any, excludeKey: string) {
  if (typeof obj !== 'object' || obj == null) {
    return obj
  }
  const result: any = obj instanceof Array ? [] : {}
  Object.keys(obj).forEach(key => {
    if (Object.prototype.hasOwnProperty.call(obj, key) && key !== excludeKey) {
      result[key] = deepClone(obj[key], excludeKey)
    }
  })
  return result
}

/**
 * 根据id去查找tree的某个节点
 * @param id [ Number,String ]
 * @param childrenKey String 子数组的关键字
 * */
export const getNodeById = (data: any[], id: number | string, childrenKey: string) => {
  for (let index = 0; index < data.length; index++) {
    const element = data[index]
    if (element.id === id) {
      return element
    }
    if (element[childrenKey] && element[childrenKey].length) {
      const value: any = getNodeById(element[childrenKey], id, childrenKey)
      if (value) return value
    }
  }
  return false
}

export const dateFormat = (fmt: any, date: any) => { // author: meizz
  const o: any = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  }
  // eslint-disable-next-line no-param-reassign
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  // eslint-disable-next-line no-restricted-syntax
  for (const k in o) {
    // eslint-disable-next-line no-param-reassign
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}

// 将url转为参数对象
export const parseParam = (url: string) => {
  const paramsStr = /.+\?(.+)$/.exec(url) // 将 ? 后面的字符串取出来
  if (!paramsStr) return {}
  const paramsArr = paramsStr[1].split('&') // 将字符串以 & 分割后存到数组中
  const paramsObj: any = {}
  // 将 params 存到对象中
  paramsArr.forEach(param => {
    if (/=/.test(param)) { // 处理有 value 的参数
      const key = param.split('=')[0]
      let val: any = param.split('=')[1]
      val = decodeURIComponent(val) // 解码

      if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值
        paramsObj[key] = [].concat(paramsObj[key], val)
      } else { // 如果对象没有这个 key，创建 key 并设置值
        paramsObj[key] = val
      }
    } else { // 处理没有 value 的参数
      paramsObj[param] = true
    }
  })

  return paramsObj
}
