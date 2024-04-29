function required(msg = '此字段为必填字段', opts: Record<string, any> = {}) {
  return { required: true, message: msg, ...opts }
}

export { required }
