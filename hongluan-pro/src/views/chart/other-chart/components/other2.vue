<template>
  <div ref="chartContainer" class="echart-container"></div>
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { useEChart } from 'hongluan-hooks'

export default defineComponent({
  setup() {
    const { chartContainer, setChartOption } = useEChart()

    const renderChart = () => {
      const option = {
        grid: {
          top: 30,
          bottom: 20,
          right: 0,
        },
        tooltip: {
          show: true,
          trigger: 'axis',
        },
        legend: {
          show: true,
          right: 0,
          top: 0,
          itemHeight: 10,
          itemWidth: 10,
        },
        xAxis: {
          axisLabel: {
            fontFamily: 'PingFangSC-Regular',
            fontSize: 12,
            color: '#A1A5B7',
            lineHeight: 20,
            margin: 5,
          },
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: '#EFF2F5',
            },
          },
          type: 'category',
          data: ['2002', '2004', '2006', '2008', '2010', '2012', '2014', '2016'],
        },
        yAxis: {
          splitLine: {
            lineStyle: {
              type: 'dashed',
            },
          },
          axisLabel: {
            fontFamily: 'PingFangSC-Regular',
            fontSize: 12,
            color: '#A1A5B7',
            lineHeight: 20,
          },
          type: 'value',
        },
        series: [{
          name: '已承诺',
          itemStyle: {
            color: '#009EF7',
            borderRadius: [2, 2, 0, 0],
          },
          barWidth: 22,
          data: [20, 60, 40, 90, 60, 70, 80, 40],
          type: 'bar',
        },
        {
          name: '承诺率',
          itemStyle: {
            color: '#F1E723',
          },
          symbolSize: 'none',
          lineStyle: {
            width: 3,
          },
          data: [30, 30, 80, 36, 40, 50, 20, 80],
          type: 'line',
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

