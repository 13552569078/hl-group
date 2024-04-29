import { isNullable } from './utils'
import type { CallbackFn } from './types'

function isInt(msg = '此字段需要填写整数', opts: Record<string, any> = {}) {
  return {
    validator: (_: any, value: string, callback: CallbackFn) => {
      value = value?.trim()
      if (value && !Number.isInteger(+value)) callback(Error(msg))
      else callback()
    },
    message: msg,
    ...opts,
  }
}

function intRange(
  min: number | null | undefined | { val: number; open: boolean; },
  max: number | null | undefined | { val: number; open: boolean; },
  msg = `
此字段需要填写
${
  !isNullable(min) && !isNullable(max) ?
    '范围在' +
    ((min as any)?.val ?? min) + (typeof min === 'object' && !min?.open ? '（含）' : '') + '~' +
    ((max as any)?.val ?? max) + (typeof max === 'number' || !max?.open ? '（含）' : '') :
    (isNullable(min) && isNullable(max) ?
      '' :
      (isNullable(min) ?
        '小于' + (typeof max === 'number' || max?.open ? '' : '等于') + ((max as any)?.val ?? max) :
        '大于' + (typeof min === 'number' || min?.open ? '' : '等于') + ((min as any)?.val ?? min))
    )
}整数`,
  opts: Record<string, any> = {},
) {
  return {
    validator: (_: any, value: string, callback: CallbackFn) => {
      value = value?.trim()
      if (value) {
        const valueInt = +value
        if (!Number.isInteger(valueInt)) callback(Error(msg))
        else {
          if (!isNullable(min)) {
            if (typeof min === 'number') valueInt <= min && callback(Error(msg))
            else (min?.open ? valueInt <= min.val : valueInt < min!.val) && callback(Error(msg))
          }
          if (!isNullable(max)) {
            if (typeof max === 'number') valueInt > max && callback(Error(msg))
            else (max?.open ? valueInt >= max.val : valueInt > max!.val) && callback(Error(msg))
          }
        }
      }
      else callback()
    },
    message: msg,
    ...opts,
  }
}

const Int = {
  isInt,
  intRange,
}

export {
  Int,
  isInt,
  intRange,
}
