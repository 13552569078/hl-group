<template>
  <div ref="chartContainer" class="echart-container"></div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  PropType,
  ref,
} from 'vue'
import { useEChart } from 'hongluan-hooks'

export default defineComponent({
  props: {
    chartData: {
      type: Array as PropType<{value: number; label: string;}[]>,
      default: () => [
        { label: '测试类型1', value: 40 },
        { label: '测试类型2', value: 10 },
        { label: '测试类型3', value: 50 },
        { label: '测试类型4', value: 60 },
        { label: '测试类型5', value: 30 },
      ],
    },
    // 圆环颜色
    color: {
      type: String,
      default: '#1D2B3E',
    },
    // click时圆环颜色
    activeColor: {
      type: String,
      default: 'rgba(113, 248, 252)',
    },
    // hover时圆环颜色
    hoverColor: {
      type: String,
      default: '#6A5ACD',
    },
  },
  setup(props) {
    const { chartContainer, setChartOption, addChartEvent, dispatchAction } = useEChart()

    const seriesItem = {
      value: '',
      name: '',
      label: {
        color: '#fff',
      },
      itemStyle: {},
      emphasis: {
        itemStyle: {},
      },
    }
    const seriesData = ref<any[]>([])

    const getSeriesData = () => {
      seriesData.value = props.chartData.map(item => ({
        ...seriesItem,
        value: item.value,
        name: item.label,
      }))
    }

    // 调整文字角度
    const angleText = (i: number, num: number) => {
      // 每个元素的角度
      const everyAngle = 360 / num
      // 文字现在所在的角度
      const currentAngle = i * everyAngle + everyAngle / 2

      if (currentAngle <= 90) {
        return -currentAngle
      } if (currentAngle <= 180 && currentAngle > 90) {
        return 180 - currentAngle
      } if (currentAngle < 270 && currentAngle > 180) {
        return 180 - currentAngle
      } if (currentAngle < 360 && currentAngle >= 270) {
        return 360 - currentAngle
      }
      return 0
    }
    // 有值的色图的正切处理
    const getColorData = () => {
      let data = []
      data = JSON.parse(JSON.stringify(seriesData.value))
      for (let i = 0; i < data.length; i++) {
        if (i === 0) {
          data[i].label.color = '#333'
          data[i].itemStyle.color = props.activeColor
          data[i].emphasis.itemStyle.color = props.activeColor
          data[i].label.rotate = angleText(i, data.length)
        } else {
          data[i].label.color = '#fff'
          data[i].itemStyle.color = props.color
          data[i].emphasis.itemStyle.color = props.hoverColor
          data[i].label.rotate = angleText(i, data.length)
        }
      }
      return data
    }
    // 最外层大圈的数据
    const getFirseCircleData = () => {
      let data = []
      data = JSON.parse(JSON.stringify(seriesData.value))
      for (let i = 0; i < data.length; i++) {
        data[i].value = 1
        data[i].label.rotate = angleText(i, data.length)
        if (i === 0) {
          data[i].label.color = props.activeColor
        }
      }
      return data
    }
    // 透明饼图（hover、click）时背景的数据
    const getBgCircleData = () => {
      const data2 = []
      for (let i = 0; i < seriesData.value.length; i++) {
        if (i === 0) {
          data2.push({
            value: 1,
            itemStyle: {
              color: 'rgba(25, 255, 224,0.05)',
            },
          })
        } else {
          data2.push({
            value: 1,
            itemStyle: {
              color: 'transparent',
            },
          })
        }
      }
      return data2
    }

    const renderChart = () => {
      const option = {
        grid: {
        },
        polar: {},
        angleAxis: {
          show: false,
          interval: 1,
          type: 'category',
          data: [],

        },
        // 中间画圈圈的坐标轴
        radiusAxis: {
          show: false,
        },
        series: [{
          type: 'pie',
          radius: ['80%', '85%'],
          itemStyle: {
            color: 'transparent',
          },
          labelLine: {
            show: false,
            length: 30,
            length2: 55,
          },
          label: {
            position: 'inside',
            align: 'left',
            fontSize: 11,
          },
          emphasis: {
            scale: false,
          },
          name: '',
          data: getFirseCircleData(),
        },
        {
          stack: 'a',
          type: 'pie',
          radius: ['70%', '30%'],
          roseType: 'area',
          zlevel: 10,
          itemStyle: {
            color: props.color,
          },
          emphasis: {
            scale: false,
            itemStyle: {
              color: props.hoverColor,
            },
          },
          labelLayout: {
            hideOverlap: false,
          },
          label: {
            align: 'left',
            show: true,
            fontSize: 10,
            color: '#fff',
            position: 'inside',
            fontWeight: 'bold',
            formatter: '{c}%',
          },
          animation: false,
          data: getColorData(),
        },
        {
          type: 'pie',
          zlevel: 99,
          radius: ['0%', '100%'],
          selectedOffset: 0,
          animation: false,
          label: {
            show: false,
          },
          emphasis: {
            scale: false,
          },
          data: getBgCircleData(),
        }],
      }
      setChartOption(option)
      // 监听点击事件 改变色值
      addChartEvent('click', (a: { dataIndex: string | number; }) => {
      // 最外层的字体颜色重置变色
        for (let da1 = 0; da1 < option.series[0].data.length; da1++) {
          option.series[0].data[da1].label.color = '#fff'
        }

        // 色圈的字体颜色和选中颜色重置
        for (let da2 = 0; da2 < option.series[1].data.length; da2++) {
          option.series[1].data[da2].itemStyle.color = props.color
          option.series[1].data[da2].label.color = '#fff'
          // hover颜色重置
          option.series[1].data[da2].emphasis.itemStyle.color = '#6A5ACD'
        }

        // 背景的透明饼图的重置
        for (let da3 = 0; da3 < option.series[2].data.length; da3++) {
          option.series[2].data[da3].itemStyle.color = 'transparent'
        }

        option.series[1].data[a.dataIndex].itemStyle.color = props.activeColor
        option.series[1].data[a.dataIndex].label.color = '#333'
        // hover 颜色改变
        option.series[1].data[a.dataIndex].emphasis.itemStyle.color = props.activeColor
        option.series[0].data[a.dataIndex].label.color = props.activeColor
        option.series[2].data[a.dataIndex].itemStyle.color = 'rgba(25, 255, 224, 0.1)'
        setChartOption(option)
      })

      addChartEvent('mouseover', (a: { dataIndex: number; }) => {
        dispatchAction({
          type: 'highlight',
          seriesIndex: 1,
          dataIndex: a.dataIndex,
        })
      })

      addChartEvent('mouseout', (a: { dataIndex: number; }) => {
        dispatchAction({
          type: 'downplay',
          seriesIndex: 1,
          dataIndex: a.dataIndex,
        })
      })
    }

    onMounted(() => {
      getSeriesData()
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
}
</style>
