import { h, ref, onUnmounted } from 'vue'
import { HlMessage } from 'hongluan-ui'
import { ModelessDialogManager } from 'hongluan-business-ui'

export interface PreviewItem {
  id: string
  name: string
  url: string
  sourceType: 1 | 2 // 1: img, 2: video,
}

function usePreviewer() {
  const modelessIds = ref<string[]>([])

  const showModelessDialogManager = (item: PreviewItem, initVideoWidth: string, limitNum?: number | null) => {
    ModelessDialogManager.show({
      id: item.id,
      title: item.name,
      useDock: false,
      snapshot: false,
      body: item.sourceType === 2
        ? h('video',
          {
            class: 'videoBox',
            src: `${item.url}`,
            autoPlay: true,
            controls: true,
            muted: true,
            style: {
              width: initVideoWidth,
            },
          },
        )
        : h('img',
          {
            class: 'videoBox',
            src: `${item.url}`,
            style: {
              width: initVideoWidth,
            },
          },
        ),
      resize: true,
      onResize: (dlg: HTMLDivElement) => {
        const videoNode = dlg.querySelector('.videoBox')
        videoNode?.setAttribute('style', 'width:100%')
      },
      onClose: () => {
        limitNum && modelessIds.value.splice(
          modelessIds.value.findIndex(el => el === item.id),
          1,
        )
      },
    })
  }
  const openPreviewer = (item: PreviewItem, limitNum?: number | null, initVideoWidth = '500px') => {
    if (limitNum) {
      if (!modelessIds.value.includes(`${item.id}`)) {
        if (modelessIds.value.length <= limitNum - 1) {
          modelessIds.value.push(`${item.id}`)
          showModelessDialogManager(item, initVideoWidth, limitNum)
        } else {
          HlMessage.warning({
            message: `最多打开${limitNum}路视频!`,
          })
        }
      } else {
        HlMessage.warning({
          message: '已打开!',
        })
      }
    } else {
      showModelessDialogManager(item, initVideoWidth, limitNum)
    }
  }

  onUnmounted(() => {
    modelessIds.value = []
    ModelessDialogManager.closeAll()
  })

  return {
    openPreviewer,
  }
}

export { usePreviewer }
