<template>
  <div ref="chartContainer" class="echart-container"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType } from 'vue'
import { useEChart } from 'hongluan-hooks'

export default defineComponent({
  props: {
    chartData: {
      type: Array as PropType<Array<{ label: string; value: number; color: string[]; }>>,
      default: () => [
        { label: '沣西新城', value: 20, color: ['rgba(83,78,225,1)', 'rgba(83,78,225,0)'] },
        { label: '沣东新城', value: 60, color: ['rgba(236,214,79,1)', 'rgba(236,214,79,0)'] },
        { label: '秦汉新城', value: 40, color: ['rgba(0,228,240,1)', 'rgba(0,228,240,0)'] },
        { label: '泾河新城', value: 90, color: ['rgba(68,209,109,1)', 'rgba(68,209,109,0)'] },
        { label: '泾河新城', value: 60, color: ['rgba(18,78,145,1)', 'rgba(18,78,145,0)'] },
      ],
    },
  },
  setup(props) {
    const { chartContainer, setChartOption } = useEChart()

    const renderChart = () => {
      const option = {
        grid: {
          left: '0',
          top: '10',
          right: '0',
          bottom: '30',
        },
        tooltip: {
          axisPointer: {
            type: 'none',
          },
          extraCssText: 'border-radius: 0;',
          formatter: (params: any) => {
            return params.componentType === 'series' ? `
              <div style="backgroundColor:#fff;borderRaduis:0">
                ${params.marker}
                <span>${params.data.name} <span style="font-weight: bold; margin-left: 30px">${params.data.value}</span></span>
              </div>
            ` : ''
          },
        },
        legend: {
          data: props.chartData.map(d => d.label),
          bottom: '-5',
          icon: 'rect',
          itemHeight: 12,
          itemWidth: 12,
          itemGap: 16,
          textStyle: {
            'color': '#6F8EA8',
          },
        },
        xAxis: {
          type: 'category',
          data: props.chartData.map(d => d.label),
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            'show': false,
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
        series: [
          ...new Array(props.chartData.length).fill(0).map((_, idx) => ({
            name: props.chartData[idx].label,
            data: new Array(props.chartData.length).fill(0),
            'stack': 'a',
            'type': 'bar',
          })),
          {
            type: 'pictorialBar',
            name: '',
            data: props.chartData.map(d => ({
              name: d.label,
              value: d.value,
              label: {
                show: true,
                position: 'top',
                fontSize: 14,
                fontWeight: 'bold',
                color: '#fff',
              },
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: d.color[0],
                  },
                  {
                    offset: 1,
                    color: d.color[1],
                  },
                  ],
                  global: false,
                },
              },
            })),
            stack: 'a',
            symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
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
}
</style>
