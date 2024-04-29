import { ref } from 'vue'

function useMaxScreen() {
  const isMaxScreen = ref(true)

  const changeFullScreen = () => {
    isMaxScreen.value = !isMaxScreen.value
    if (isMaxScreen.value) {
      const doc: any = document
      if (doc.exitFullscreen) {
        doc.exitFullscreen()
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen()
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen()
      }
    } else {
      const element: any = document.documentElement
      if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen()
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
      }
    }
  }

  return {
    isMaxScreen,
    changeFullScreen,
  }
}

export { useMaxScreen }
