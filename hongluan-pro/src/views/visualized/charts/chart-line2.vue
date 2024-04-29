<template>
  <div ref="chartContainer" class="echart-container"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, watchEffect, ref } from 'vue'
import * as echarts from 'echarts'
import { useEChart } from 'hongluan-hooks'

type Item = {
  dateList: string[]
  numList1: number[]
  numList2: number[]
}

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<Item>,
      default: () => ({
        numList1: [30, 50, 40, 50, 40, 40, 35, 30],
        numList2: [40, 60, 50, 70, 60, 50, 45, 40],
        dateList: ['21.01', '21.02', '21.03', '21.04', '21.05', '21.06', '21.07', '21.08'],
      }),
      require: true,
    },
  },
  setup(props) {
    const { setChartOption, chartContainer } = useEChart()

    const option = ref({
      grid: {
        top: '10',
        left: '0%',
        right: '0%',
        bottom: '0%',
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          show: false,
          lineStyle: {
            color: 'rgba(255,255,255,0)',
            type: 'solid',
          },
        },
        extraCssText: 'border-radius: 0;',
      },
      xAxis: {
        axisLabel: {
          fontSize: 12,
          color: '#6F8EA8',
          lineHeight: 24,
          margin: 5,
        },
        axisTick: {
          alignWithLabel: true,
        },
        axisLine: {
          lineStyle: {
            color: '',
          },
        },
        type: 'category',
        boundaryGap: true,
      },
      yAxis: {
        splitLine: {
          lineStyle: {
            type: 'line',
            color: '#253346',
          },
        },
        axisLabel: {
          fontSize: 12,
          color: '#6F8EA8',
          lineHeight: 24,
        },
        type: 'value',
        splitNumber: 3,
        // name: '万m³',
        nameTextStyle: {
          color: '#6F8EA8',
          align: 'left',
          padding: [0, 0, 0, -22],
        },
      },
      series: [
        {
          name: '数据1',
          type: 'line',
          lineStyle: {
            width: 2,
            color: 'rgba(255, 220, 2, 1)',
          },
          showSymbol: !(props.data.numList1.length > 1),
          symbolSize: 4,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(255, 220, 2, 0.5)',
              },
              {
                offset: 1,
                color: 'rgba(255, 220, 2, 0)',
              },
            ]),
          },
          data: props.data.numList1,
        },

        {
          name: '数据2',
          type: 'line',
          lineStyle: {
            width: 2,
            color: 'rgba(106, 211, 214, 1)',
          },
          showSymbol: !(props.data.numList2.length > 1),
          symbolSize: 4,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(106, 211, 214, 0.5)',
              },
              {
                offset: 1,
                color: 'rgba(106, 211, 214, 0)',
              },
            ]),
          },
          data: props.data.numList2,
        },

        {
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(56,75,103,0.16)',
          },
          itemStyle: {
            color: 'rgba(180, 180, 180, 0)',
          },
          barMaxWidth: 24,
          name: '',
          data: Array(props.data.numList1.length).fill(0),
          selectedMode: false,
          type: 'bar',
          tooltip: {
            show: false,
          },
        },
      ],
    })
    watchEffect(() => {
      option.value.series[0].data = props.data.numList1
      option.value.xAxis.data = props.data.dateList
      setChartOption(option.value)
    })

    onMounted(() => {
      // setChartOption(option);
    })

    return {
      chartContainer,
    }
  },
})
</script>
<style lang="scss" scoped>
.echart-container {
  min-height: 200px;
}

</style>
