<template>
  <component :is="CustomIcon" v-if="CustomIcon" />
  <svg
    v-else
    viewBox="0 0 16 16"
    version="1.1"
    class="icon-system"
    name="SystemCloseFill"
    xmlns="http://www.w3.org/2000/svg"
    style=" --stroke-width: 0; --fill-opacity: 1;"
  >
    <g stroke="none" stroke-width="1" fill="currentColor" fill-rule="evenodd">
      <path d="M8,0.3 C9.07634527,0.3 10.122884,0.52138058 11.0884567,0.944601091 C13.3823279,1.95002858 15.0616751,4.02281431 15.5522301,6.4918483 C15.6502384,6.98513873 15.7,7.48957544 15.7,8 C15.7,12.2525926 12.2525926,15.7 8,15.7 C3.74740743,15.7 0.3,12.2525926 0.3,8 C0.3,3.74740743 3.74740743,0.3 8,0.3 Z M11.0978621,4.74540133 C10.8042506,4.52754687 10.3875869,4.55175292 10.1213203,4.81801948 L10.1213203,4.81801948 L8,6.94 L5.87867966,4.81801948 C5.58578644,4.52512627 5.1109127,4.52512627 4.81801948,4.81801948 C4.52512627,5.1109127 4.52512627,5.58578644 4.81801948,5.87867966 L4.81801948,5.87867966 L6.94,8 L4.81801948,10.1213203 L4.74540133,10.2054388 C4.52754687,10.4990503 4.55175292,10.915714 4.81801948,11.1819805 L4.81801948,11.1819805 L4.90213792,11.2545987 C5.19574941,11.4724531 5.61241309,11.4482471 5.87867966,11.1819805 L5.87867966,11.1819805 L8,9.06 L10.1213203,11.1819805 C10.4142136,11.4748737 10.8890873,11.4748737 11.1819805,11.1819805 C11.4748737,10.8890873 11.4748737,10.4142136 11.1819805,10.1213203 L11.1819805,10.1213203 L9.06,8 L11.1819805,5.87867966 L11.2545987,5.79456122 C11.4724531,5.50094973 11.4482471,5.08428605 11.1819805,4.81801948 L11.1819805,4.81801948 Z" />
    </g>
  </svg>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useCustomIcon } from './use-custom'

export default defineComponent({
  name: 'SystemCloseFill',
  props: {
    gradient: {
      type: Boolean,
    },
    borderWidth: {
      type: [Number, String],
      default: '',
    },
    opacity: {
      type: [Number, String],
      default: '',
    },
    startColor: {
      type: String,
      default: '',
    },
  },
  setup() {
    const { CustomIcon } = useCustomIcon('SystemCloseFill')
    return {
      CustomIcon,
    }
  },
})
</script>
