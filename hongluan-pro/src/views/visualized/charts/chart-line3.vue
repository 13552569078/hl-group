<template>
  <div ref="chartContainer" class="echart-container"></div>
</template>

<script lang="ts">
import { defineComponent, nextTick, watch } from 'vue'
import { useEChart } from 'hongluan-hooks'
import * as echarts from 'echarts'

export default defineComponent({
  name: 'LevelLineCharts',
  props: {
    lineColor: {
      type: String,
      default: 'rgba(106, 211, 214, 1)',
    },
  },
  setup(props) {
    const { chartContainer, setChartOption } = useEChart()

    const renderChart = () => {
      const option = {
        grid: {
          top: '10',
          left: '0',
          right: '0',
          bottom: '0',
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
          splitNumber: 12,
          nameGap: 40,
          axisLabel: {
            rotate: 0,
            interval: 0, // 类目间隔 设置为 1，表示(隔一个标签显示一个标签)
            fontSize: 12,
            color: '#6F8EA8',
            lineHeight: 24,
            margin: 5,
          },
          min: -2,
          axisTick: {
            show: false,
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(0,0,0,0)',
            },
          },
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        },
        yAxis: {
          splitLine: {
            show: false,
            lineStyle: {
              type: 'line',
              color: '#253346',
            },
          },
          axisLabel: {
            fontSize: '12',
            color: '#6F8EA8',
            lineHeight: 20,
          },
          type: 'value',
          nameTextStyle: {
            color: '#6F8EA8',
            align: 'left',
            padding: [0, 0, 0, -22],
          },
        },
        series: [
          {
            type: 'line',
            data: [30, 28, 8, 70, 56, 52, 78, 60, 89, 49, 40, 52],
            itemStyle: {
              color: props.lineColor,
            },
            symbolSize: 0,
            lineStyle: {
              width: 1,
            },
            markArea: {
              silent: true,
              data: [
                [
                  {
                    name: '低风险',
                    yAxis: 0,
                    itemStyle: {
                      color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
                        { offset: 0, color: 'rgba(37,129,255,0.20)' },
                        { offset: 1, color: 'rgba(37,129,255,0.04)' },
                      ]),
                    },
                    label: {
                      position: 'insideLeft',
                      color: 'rgba(0, 158, 247, 1)',
                    },
                  },
                  {
                    yAxis: 25,
                  },
                ],
                [
                  {
                    name: '一般风险',
                    yAxis: 25,
                    itemStyle: {
                      color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
                        { offset: 0, color: 'rgba(255,234,68,0.20)' },
                        { offset: 1, color: 'rgba(255,234,68,0.04)' },
                      ]),
                    },
                    label: {
                      position: 'insideLeft',
                      color: 'rgba(255, 234, 68, 1)',
                    },
                  },
                  {
                    yAxis: 50,
                  },
                ],
                [
                  {
                    name: '较大风险',
                    yAxis: 50,
                    itemStyle: {
                      color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
                        { offset: 0, color: 'rgba(253,137,47,0.20)' },
                        { offset: 1, color: 'rgba(253,137,47,0.04)' },
                      ]),
                    },
                    label: {
                      position: 'insideLeft',
                      color: 'rgba(253, 137, 47, 1)',
                    },
                  },
                  {
                    yAxis: 75,
                  },
                ],
                [
                  {
                    name: '重大风险',
                    yAxis: 75,
                    itemStyle: {
                      color: new echarts.graphic.LinearGradient(1, 0, 0, 1, [
                        { offset: 0, color: 'rgba(255,84,84,0.20)' },
                        { offset: 1, color: 'rgba(255,84,84,0.04)' },
                      ]),
                    },
                    label: {
                      position: 'insideLeft',
                      color: 'rgba(253, 97, 97, 1)',
                    },
                  },
                  {
                    yAxis: 100,
                  },
                ],
              ],
            },
          },
        ],
      }
      setChartOption(option)
    }

    watch(
      () => props.xData,
      () => {
        nextTick(() => {
          renderChart()
        })
      },
      {
        deep: true,
        immediate: true,
      },
    )

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
