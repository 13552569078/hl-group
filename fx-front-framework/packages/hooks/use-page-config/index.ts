import { ref, onMounted, onActivated, onBeforeMount, onDeactivated } from 'vue'

function useTele (autoDestroy?: boolean) {
  const showTeleport = ref(false)


  onMounted(() => {
    showTeleport.value = true
  })
  onActivated(() => {
    showTeleport.value = true
  })

  onBeforeMount(() => {
    if (autoDestroy) {
      showTeleport.value = false
    }
  })
  onDeactivated(() => {
    if (autoDestroy) {
      showTeleport.value = false
    }
  })

  return {
    showTeleport,
  }
}

export { useTele }
