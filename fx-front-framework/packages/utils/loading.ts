import { HlLoading, LoadingOptions, LoadingInstance, HlMessage } from 'hongluan-ui'

let loading: LoadingInstance
let needLoadingRequestCount = 0

function startLoading (args: LoadingOptions | undefined) {
  loading = HlLoading.service({ lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.05)',
    ...args })
}

function tryCloseLoading () {
  loading.close()
}

function preventShakeHandle (fn: { (): void; (): void; }, wait: number) {
  let timer: NodeJS.Timeout
  let startTime = 0

  return function run () {
    const nowTime = new Date().getTime()
    if (nowTime - startTime < wait) {
      // 触发时间
      clearTimeout(timer)
      startTime = nowTime
      timer = setTimeout(() => {
        fn()
      }, wait)
    } else {
      startTime = nowTime
      timer = setTimeout(() => {
        fn()
      }, wait)
    }
  }
}

const Loading = {
  showFullScreenLoading (args = {}) {
    if (needLoadingRequestCount === 0) {
      startLoading(args)
    }
    needLoadingRequestCount++
  },
  tryHideFullScreenLoading () {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
      preventShakeHandle(tryCloseLoading, 300)()
    }
  },
  showMessageTip(code: number, txt: string) {
    switch (code) {
      case 1:
        // 成功
        HlMessage({
          showClose: true,
          message: `${txt}`,
          type: 'success',
        })
        break
      case 2:
        // 轻微级别
        HlMessage({
          showClose: true,
          message: `${txt}`,
          type: 'warning',
        })
        break
      case 3:
        // 一般级别
        HlMessage({
          showClose: true,
          message: `${txt}`,
          type: 'info',
        })
        break
      case 4:
      case 5:
        // 严重
        HlMessage({
          showClose: true,
          message: `${txt}`,
          type: 'error',
        })
        break
      default:
        console.error('code error!')
        break
    }
  },
}

export { Loading }
