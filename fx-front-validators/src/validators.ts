/**
 * 表单校验处理类
 */

/** input过滤特殊符号 */
const validForbid = function validForbid (value: string) {
  return value.replace(
    /[`~!@#$%^&*+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*={}|《》？：“”【】、；‘’，。、]/g, '',
  )
}

const longitudeValidator = (_: any, value: string, callback: (err?: Error) => void) => {
  if (!value) {
    callback(new Error('请填写经度'))
    return
  }
  if (Number.isNaN(+value)) {
    callback(new Error('经度格式错误'))
  } else {
    const num = +value
    if (num <= -180 || num >= 180) {
      callback(new Error('经度数值在(-180,180)之间'))
    } else {
      callback()
    }
  }
}

const latitudeValidator = (_: any, value: string, callback: (err?: Error) => void) => {
  if (!value) {
    callback(new Error('请填写纬度'))
    return
  }
  if (Number.isNaN(+value)) {
    callback(new Error('纬度格式错误'))
  } else {
    const num = +value
    if (num <= -90 || num >= 90) {
      callback(new Error('纬度数值在(-90,90)之间'))
    } else {
      callback()
    }
  }
}

const longitudeOtherValidator = (_: any, value: { degree: string; minute: string; second: string; }, callback: (err?: Error) => void) => {
  if (!value.degree || !value.minute || !value.second) {
    callback(new Error('请填写经度'))
    return
  }
  if (Number.isNaN(+value.degree) || Number.isNaN(+value.minute) || Number.isNaN(+value.second)) {
    callback(new Error('经度格式错误'))
  } else {
    const degree = +value.degree
    const minute = +value.minute
    const second = +value.second
    if (degree <= -180 || degree >= 180) {
      callback(new Error('度数值在(-180,180)之间'))
    } else if (minute <= -60 || minute >= 60) {
      callback(new Error('分数值在(-60,60)之间'))
    } else if (second <= -60 || second >= 60) {
      callback(new Error('秒数值在(-60,60)之间'))
    } else {
      callback()
    }
  }
}

const latitudeOtherValidator = (_: any, value: { degree: string; minute: string; second: string; }, callback: (err?: Error) => void) => {
  if (!value.degree || !value.minute || !value.second) {
    callback(new Error('请填写纬度'))
    return
  }
  if (Number.isNaN(+value.degree) || Number.isNaN(+value.minute) || Number.isNaN(+value.second)) {
    callback(new Error('纬度格式错误'))
  } else {
    const degree = +value.degree
    const minute = +value.minute
    const second = +value.second
    if (degree <= -180 || degree >= 180) {
      callback(new Error('度数值在(-90,90)之间'))
    } else if (minute <= -60 || minute >= 60) {
      callback(new Error('分数值在(-60,60)之间'))
    } else if (second <= -60 || second >= 60) {
      callback(new Error('秒数值在(-60,60)之间'))
    } else {
      callback()
    }
  }
}

const intValidator = (rule: any, value: string, callback: (err?: Error) => void) => {
  value = String(value)
  if (value) {
    if (Number.isNaN(+value) || value.indexOf('.') !== -1 || +value <= 0) {
      callback(new Error(rule.message))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

const floatValidator = (rule: any, value: string, callback: (err?: Error) => void) => {
  value = String(value)
  if (value) {
    const nums = value.split('.')
    if (Number.isNaN(+value) || (nums[1] && nums[1].length > rule.decimalLen) || +value <= 0) {
      callback(new Error(rule.message))
    } else {
      callback()
    }
  } else {
    callback()
  }
}

const Validators = {
  validForbid,
  longitudeValidator,
  latitudeValidator,
  longitudeOtherValidator,
  latitudeOtherValidator,
  intValidator,
  floatValidator,
}

export { Validators }
