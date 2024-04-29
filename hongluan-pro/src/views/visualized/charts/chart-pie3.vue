<template>
  <div ref="chartContainer" class="echart-container"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useEChart } from 'hongluan-hooks'
import * as echarts from 'echarts'

export default defineComponent({
  props: {
    chartData: {
      type: Object,
      default: () => ({ value: 50, name: '较大风险' }),
    },
  },
  setup(props) {
    const { chartContainer, setChartOption } = useEChart()

    const renderChart = () => {
      const percentage = props.chartData.value / 100
      const dataArr = [
        props.chartData,
      ]
      const color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
        {
          offset: 0,
          color: '#6FF3FC', // 0% 处的颜色
        },
        {
          offset: 1,
          color: '#3E7DFF', // 100% 处的颜色
        },
      ])
      const colorSet = [
        [percentage, color],
      ]
      const rich = {
        white: {
          fontSize: 18,
          color: '#fff',
          fontWeight: '500',
          padding: [0, 0, 0, 0],
        },
        blue: {
          fontSize: 20,
          color: '#fff',
          fontWeight: '800',
          padding: [-80, 0, 0, 0], // 分数padding 控制位置
        },
        radius: {
          width: 350,
          height: 80,
          borderWidth: 1,
          borderColor: '#0092F2',
          fontSize: 50,
          color: '#fff',
          backgroundColor: '#1B215B',
          borderRadius: 20,
          textAlign: 'center',
        },
        size: {
          height: 400,
          padding: [0, 0, 0, 0],
        },
      }
      const option = {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}',
        },
        series: [
          {
            type: 'gauge',
            name: '外层圈',
            radius: '68%',
            startAngle: '225',
            endAngle: '-45',
            min: 0,
            max: 100,
            splitNumber: 4,
            // splitNumber: '100',
            pointer: {
              show: false,
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: 1,
              },
            ],
            title: {
              show: true,
              offsetCenter: [0, 30],
              color: '#71F8FC',
              fontSize: 12,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: [[1, '#00FFFF']],
                width: 1,
                opacity: 1,
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              length: -44,
              lineStyle: {
                color: '#051932',
                width: 0,
                type: 'solid',
              },
            },
            // 外圈刻度数字
            axisLabel: {
              show: true,
              color: '#71F8FC',
              formatter: (value: string) => value,
              fontSize: 10,
              padding: [0, 0, 0, 0],
            },
          },
          // 第二圈
          {
            type: 'gauge',
            radius: '63%',
            startAngle: '225',
            endAngle: '-45',
            pointer: {
              show: false,
            },
            detail: {
              formatter: (value: number) => {
                const num = Math.round(value)
                return `{blue|${num}}{white|}{size|}`
              },
              rich,
              offsetCenter: ['0%', '50%'],
            },
            data: dataArr,
            // 副标题
            title: {
              show: true,
              offsetCenter: [0, 14],
              color: '#84A4F6',
              fontSize: 12,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: colorSet,
                width: 11,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                opacity: 1,
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
              length: 25,
              lineStyle: {
                color: '#00377a',
                width: 1,
                type: 'solid',
              },
            },
            axisLabel: {
              show: false,
            },
          },
          {
            name: '灰色内圈', // 刻度背景
            type: 'gauge',
            z: 2,
            radius: '48%',
            startAngle: '225',
            endAngle: '-45',
            // center: ["50%", "75%"], // 整体的位置设置
            axisLine: {
              // 坐标轴线
              lineStyle: {
                // 属性lineStyle控制线条样式
                color: [[1, '#009EF7']],
                width: 1,
                opacity: 1, // 刻度背景宽度
              },
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            pointer: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            detail: {
              show: 0,
            },
          },
          {
            name: '刻度圈',
            type: 'gauge',
            radius: '68%',
            startAngle: 225, // 刻度起始
            endAngle: -45, // 刻度结束
            z: 4,
            axisTick: {
              show: false,
            },
            splitLine: {
              length: 3, // 刻度节点线长度
              lineStyle: {
                width: 1,
                color: '#009EF7',
              }, // 刻度节点线
            },
            axisLabel: {
              color: 'rgba(255,255,255,0)',
              fontSize: 40,
            }, // 刻度节点文字颜色
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                opacity: 0,
              },
            },
            detail: {
              show: false,
            },
            data: [
              {
                value: 0,
                name: '',
              },
            ],
          },
          {
            // 内圆
            type: 'pie',
            radius: '44%',
            center: ['50%', '50%'],
            z: 1,
            animation: false,
            itemStyle: {
              color: new echarts.graphic.RadialGradient(
                0.5,
                0.5,
                0.85,
                [
                  {
                    offset: 1,
                    color: 'rgba(0,166,255, 0.88)',
                  },
                  {
                    offset: 0.4,
                    color: 'rgba(0,166,255, 0)',
                  },
                  {
                    offset: 1,
                    color: 'rgba(0,166,255, 0.88)',
                  },
                ],
                false,
              ),
              label: {
                show: false,
              },
              labelLine: {
                show: false,
              },
            },
            label: {
              show: false,
            },
            emphasis: {
              scale: false,
            },
            tooltip: {
              show: false,
            },
            data: [100],
          },
        ],
      }

      setChartOption(option)
    }

    onMounted(() => {
      renderChart()
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
  width: 200px;
}
.fill-rect {
  display: flex;
  width: calc(var(--xxs) * 4);
  height: calc(var(--xxs) * 4);
}
</style>

