<template>
  <div>
    <div ref="chartContainer" class="echart-container"></div>
    <div class="legend">
      <span class="mark">
        <span class="rect normal"></span>
        <span class="text">正常值</span>
      </span>
      <span class="mark">
        <span class="rect high"></span>
        <span class="text">警戒值</span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import * as echarts from 'echarts'
import { useEChart } from 'hongluan-hooks'

export default defineComponent({
  setup() {
    const { chartContainer, setChartOption } = useEChart()

    const renderChart = () => {
      const option = {
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
            type: 'none',
          },
          extraCssText: 'border-radius: 0;',
        },
        xAxis: {
          axisLabel: {
            fontSize: 12,
            color: 'rgba(128, 128, 160, 0.65)',
            lineHeight: 20,
            margin: 5,
          },
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(128, 128, 160, 0.15)',
            },
          },
          type: 'category',
          data: ['2002', '2004', '2006', '2008', '2010', '2012', '2014', '2016'],
        },
        yAxis: {
          splitNumber: 4,
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: 'rgba(128, 128, 160, 0.15)',
            },
          },
          axisLabel: {
            fontSize: 12,
            color: 'rgba(128, 128, 160, 0.65)',
            lineHeight: 20,
          },
          type: 'value',
        },
        series: [{
          itemStyle: {
            color: '#F1E723',
          },
          symbolSize: 0,
          lineStyle: {
            width: 3,
          },
          areaStyle: {
            origin: 'end',
            color: new echarts.graphic.LinearGradient(
              0, 1, 0, 0,
              [
                { offset: 0, color: 'rgba(241,231,35,0.30)' },
                { offset: (56 - 18) / 90, color: 'rgba(241,231,35,0.00)' },
              ],
            ),
          },
          data: [20, 30, 18, 36, 56, null, null, null],
          type: 'line',
          markLine: {
            silent: true,
            symbol:['none', 'none'],
            label: {
              show: true,
              distance: 9,
              position: 'start',
              fontSize: 12,
              lineHeight: 20,
            },
            data: [{
              yAxis: 56,
              lineStyle: {
                type: 'solid',
                color: '#84A4F6',
              },
              label: {
                color: '#84A4F6',
              },
            }],
          },
        }, {
          itemStyle: {
            color: '#79D42B',
          },
          symbolSize: 0,
          lineStyle: {
            width: 3,
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0, 0, 0, 1,
              [
                { offset: 0, color: 'rgba(121,212,43,0.30)' },
                // (max value - markline value) / max yaxis value
                { offset: (90 - 56) / 90, color: 'rgba(121,212,43,0.00)' },
              ],
            ),
          },
          data: [null, null, null, null, 56, 66, 90, 64],
          type: 'line',
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

.legend {
  position: absolute;
  top: calc(var(--panel-header-height) / 3);
  right: calc(var(--panel-padding) + 36px);
  text-align: right;
  color: var(--text-secondary);
  .mark {
    margin-right: var(--lg);
    .rect {
      display: inline-block;
      width: var(--xs);
      height: var(--xs);
      margin-right: var(--xs);
      vertical-align: middle;
      border-radius: 25%;
      &.normal {
        background-color: #79D42B;
      }
      &.high {
        background-color: #F1E723;
      }
    }
    .text {
      font-size: var(--font-sm);
      color: var(--text-secondary);
    }
  }
}
</style>
