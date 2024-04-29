<template>
  <hl-group full="full-x" align="items-center" gap="var(--md)" class="h-full">
    <div ref="chartContainer" class="echart-container static" style="width: calc(var(--xxl) * 5)"></div>
    <hl-group v-if="showLabel" dir="vertical" align="items-center" gap="var(--md)" class="static p-r-md" style="width: 45%">
      <hl-group
        v-for="(item, index) in chartData"
        :key="index"
        gap="var(--sm)"
        align="items-middle items-between"
        class="cursor-pointer static"
        :style="`opacity:${item?.isHide ? 0.2 : 1}`"
        @click="hideSerie(item)"
      >
        <span class="fill-rect static" :style="`background-color:${item.color}`"></span>
        <span class="text-secondary font-md w-full">{{ item.name }}</span>
        <h3 class="font-lg font-din static">{{ item.value }}</h3>
      </hl-group>
    </hl-group>
  </hl-group>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from 'vue'
import { useEChart } from 'hongluan-hooks'
import * as echarts from 'echarts'

export default defineComponent({
  props: {
    chartData: {
      type: Array as PropType<Array<{ name: string; value: number; color: string }>>,
      default: () => [
        {
          name: '重大风险',
          value: 30,
          color: '#FD6161',
        },
        {
          name: '较大风险',
          value: 50,
          color: '#FB7E00',
        },
        {
          name: '一般风险',
          value: 80,
          color: '#D6B800',
        },
        {
          name: '低风险',
          value: 90,
          color: '#3E7DFF',
        },
      ],
    },
    radius: {
      type: Array as PropType<string[]>,
      default: () => ['20%', '70%'],
    },
    title: {
      type: String,
      default: '',
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
    widths: {
      type: Array as PropType<string[]>,
      default: () => ['20%', '40%'],
    },
  },
  setup(props) {
    const { chartContainer, setChartOption } = useEChart()

    const color1 = ref([] as string[])
    const color2 = ref([] as string[])

    // 颜色16进制换算rgba,添加透明度
    const hexToRgba = (hex: any, opacity: any) =>
      'rgba(' + parseInt('0x' + hex.slice(1, 3), 16) + ',' + parseInt('0x' + hex.slice(3, 5), 16) + ',' + parseInt('0x' + hex.slice(5, 7), 16) + ',' + opacity + ')'
    const setColor = () => {
      props.chartData.forEach((item) => {
        color1.value.push(item.color, 'transparent')
        color2.value.push(hexToRgba(item.color, 0.16), 'transparent')
      })
    }
    const setChartData = (data: ChartItem[]) => {
      const data1 = [] as ChartItem[]
      // 给每个数据后添加特定的透明的数据形成间隔
      data.forEach((item) => {
        if (item.value !== 0 && !item?.isHide) {
          data1.push(item, {
            name: '',
            value: 4,
            labelLine: {
              show: false,
              lineStyle: {
                color: 'transparent',
              },
            },
            itemStyle: {
              color: 'transparent',
            },
          })
        }
      })
      return data1
    }
    const renderChart = () => {
      setColor()
      const data1 = setChartData(props.chartData)
      // 每层圆环大小
      const radius2 = [Number(props.radius[1].split('%')[0]) - 10 + '%', Number(props.radius[1].split('%')[0]) + 4 + '%']
      const radius3 = [Number(props.radius[1].split('%')[0]) + 4 + '%', Number(props.radius[1].split('%')[0]) + 8 + '%']

      const option = {
        title: [
          {
            text: props.title,
            top: 'center',
            left: 'center',
            color: '#6F8EA8',
            fontSize: 14,
          },
        ],
        series: [
          // 最外层圆环
          {
            type: 'pie',
            radius: radius3,
            center: ['50%', '50%'],
            startAngle: 90,
            selectedMode: 'single',
            selectedOffset: 0,
            itemStyle: {
              color: (params: any) => color1.value[params.dataIndex],
            },
            label: {
              show: false,
            },
            data: data1,
            emphasis: {
              scale: true,
            },
          },
          {
            type: 'pie',
            radius: radius2,
            center: ['50%', '50%'],
            startAngle: 90,
            selectedMode: 'single',
            selectedOffset: 0,
            itemStyle: {
              color: (params: any) => color2.value[params.dataIndex],
            },
            label: {
              show: false,
            },
            emphasis: {
              scale: false,
            },
            data: data1,
          },
          {
            type: 'pie',
            radius: ['49%', '50%'],
            center: ['50%', '50%'],
            startAngle: 90,
            selectedMode: 'single',
            selectedOffset: 0,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(64,83,112,0.6)' },
                { offset: 0.5, color: 'rgba(0,0,0,0.00)' },
                { offset: 1, color: 'rgba(64,83,112,0.6)' },
              ]),
            },
            label: {
              show: false,
            },
            emphasis: {
              scale: false,
            },
            data: [100],
          },
          {
            type: 'pie',
            radius: '50%',
            center: ['50%', '50%'],
            startAngle: 90,
            selectedMode: 'single',
            selectedOffset: 0,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: 'rgba(64,83,112,0.23)' },
                { offset: 0.5, color: 'rgba(0,0,0,0)' },
                { offset: 1, color: 'rgba(64,83,112,0.23)' },
              ]),
            },
            label: {
              show: false,
            },
            emphasis: {
              scale: false,
            },
            data: [100],
          },
        ],
      }
      setChartOption(option)
    }
    const hideSerie = (item: ChartItem) => {
      item.isHide = !item?.isHide
      renderChart()
    }

    onMounted(() => {
      renderChart()
    })

    return {
      chartContainer,
      hideSerie,
    }
  },
})
interface ChartItem {
  name: string
  value: number
  isHide?: boolean
  labelLine?: {
    show: boolean
    lineStyle: {
      color: string
    }
  }
  itemStyle?: { color: string; }
}
</script>
<style lang="scss" scoped>
.echart-container {
}
.fill-rect {
  display: flex;
  width: calc(var(--sm));
  height: calc(var(--sm));
}
</style>
