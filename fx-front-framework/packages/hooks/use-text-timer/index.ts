import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

function useTextTimer() {
  const dates = ref('')
  const day = ref('')
  const times = ref('00:00:00')
  const fullDatetime = computed(() => dates.value + ' ' + times.value + ' ' + day.value)
  let timerHandler = 0

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
    timerHandler = window.setInterval(() => {
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
    timerHandler && window.clearInterval(Number(timerHandler))
  })

  return {
    dates,
    times,
    day,
    fullDatetime,
  }
}

export { useTextTimer }
