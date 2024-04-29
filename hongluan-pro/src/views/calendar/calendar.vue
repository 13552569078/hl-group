<template>
  <hl-panel>
    <full-calendar :options="calendarOptions" />
  </hl-panel>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'
import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'


export default defineComponent({
  components: {
    FullCalendar,
  },
  setup() {
    const calendarOptions = ref({
      plugins: [ dayGridPlugin, interactionPlugin ],
      initialView: 'dayGridMonth',
      dateClick: handleDateClick,
      events: [
        { title: 'event 1', date: '2021-09-24' },
        { title: 'event 2', date: '2021-09-25' },
      ],
    })

    function handleDateClick(arg: any) {
      console.log('click calendar', arg)
    }

    return {
      calendarOptions,
    }
  },
})
</script>
<style>
</style>
