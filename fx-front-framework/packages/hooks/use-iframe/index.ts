import { ref, onMounted } from 'vue'

function useIframe() {
  const isIframe = ref(false)

  onMounted(() => {
    isIframe.value = window.parent !== window
  })

  return {
    isIframe,
  }
}

export { useIframe }
