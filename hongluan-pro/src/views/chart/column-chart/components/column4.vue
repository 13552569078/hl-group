<template>
  <div ref="chartContainer" class="echart-container"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useEChart } from 'hongluan-hooks'

export default defineComponent({
  setup() {
    const { chartContainer, setChartOption, getChartRect } = useEChart()

    const renderChart = () => {
      const option = {
        grid: {
          top: 10,
          bottom: '0',
          left: 0,
          right: 0,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
          },
          extraCssText: 'border-radius: 0;',
          formatter: (params: any) => `
          <div style="backgroundColor:#fff;borderRaduis:0">
            ${params[0].marker}
            <span>${params[0].axisValue} <span style="font-weight: bold; margin-left: 30px">${params[0].value}</span></span>
          </div>
          `,
        },
        xAxis: {
          show: false,
          type: 'value',
        },
        yAxis: {
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            fontSize: 12,
            color: 'rgba(128, 128, 160, 0.65)',
            align: 'left',
            verticalAlign: 'top',
            lineHeight: -36,
          },
          offset: -7,
          type: 'category',
          data: ['其他企业', '合资公司企业', '股份制企业', '个体工商户', '私营企业'],
        },
        series: [{
          itemStyle: {
            color: '#009EF7',
          },
          barWidth: 14,
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(128, 128, 160, 0.1)',
          },
          label: {
            show: true,
            offset: [0, -12],
            position: [getChartRect().width, '-100%'],
            fontSize: '0.8em',
            color: 'rgba(128, 128, 160, 0.75)',
            lineHeight: 30,
            align: 'right',
          },
          data: [87, 69, 50, 34, 26],
          type: 'bar',
        }],
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
