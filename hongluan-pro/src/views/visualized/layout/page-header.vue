<template>
  <hl-group class="page-header p-md p-l-lg p-r-lg" full align="items-center">
    <hl-group class="header-left" gap="var(--md)">
      <hl-group gap="var(--xs)">
        <span>{{ dates }}</span>
        <span>{{ times }}</span>
      </hl-group>
      <hl-group gap="var(--sm)">
        <span>多云</span>
        <span>19℃/26℃</span>
        <span>西北风III级</span>
      </hl-group>
    </hl-group>
    <hl-group align="items-center" class="static">
      <h1>燃气安全与应急决策指挥驾驶舱</h1>
    </hl-group>
    <hl-group class="header-right" align="items-right" gap="var(--sm)">
      <hl-button equal round>
        <template #icon>
          <hl-icon>
            <fill-setting />
          </hl-icon>
        </template>
      </hl-button>

      <hl-button equal round @click="changeFullScreen">
        <template #icon>
          <hl-icon>
            <fill-maximize />
          </hl-icon>
        </template>
      </hl-button>

      <hl-button equal round>
        <template #icon>
          <hl-icon>
            <fill-bell />
          </hl-icon>
        </template>
      </hl-button>

      <hl-button equal round>
        <template #icon>
          <hl-icon>
            <fill-user />
          </hl-icon>
        </template>
      </hl-button>
    </hl-group>
  </hl-group>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { FillSetting, FillMaximize, FillBell, FillUser } from '@hongluan-ui/icons'

export default defineComponent({
  name: 'PageHeader',
  components: {
    FillSetting,
    FillMaximize,
    FillBell,
    FillUser,
  },
  inject: ['reload'],
  setup() {
    const dates = ref('')
    const day = ref('')
    const times = ref('00:00:00')
    let setTimes = 0

    const isMaxScreen = ref(true)
    const getDay = (num: number) => {
      const week = [
        '星期天',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
      ]
      return week[num]
    }
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
    const refreshTime = () => {
      const date = new Date()
      day.value = getDay(date.getDay())
      dates.value =
        date.getFullYear() +
        '年' +
        (date.getMonth() + 1) +
        '月' +
        date.getDate() +
        '日'
      setTimes = window.setInterval(() => {
        const curDate = new Date()
        let h: number | string = curDate.getHours()
        let m: number | string = curDate.getMinutes()
        let s: number | string = curDate.getSeconds()
        if (h >= 0 && h < 10) {
          h = '0' + h
        }
        if (m >= 0 && m < 10) {
          m = '0' + m
        }
        if (s >= 0 && s < 10) {
          s = '0' + s
        }
        times.value = h + ':' + m + ':' + s
      }, 1000)
    }
    onMounted(() => {
      refreshTime()
    })
    onBeforeUnmount(() => {
      if (setTimes) {
        window.clearInterval(Number(setTimes))
      }
    })

    return {
      changeFullScreen,
      isMaxScreen,
      dates,
      day,
      times,
    }
  },
  data() {
    return {
      topMenuShow: true,
    }
  },
})
</script>
