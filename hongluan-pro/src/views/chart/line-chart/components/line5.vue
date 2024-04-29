<template>
  <div>
    <div ref="chartContainer" class="echart-container"></div>
    <div class="legend">
      <span class="mark">
        <span class="rect low"></span>
        <span class="text">过低</span>
      </span>
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
          formatter: (params: any) => `
          <div style="backgroundColor:#fff;borderRaduis:0">
            ${params[0].marker}
            <span>${params[0].axisValue} <span style="font-weight: bold; margin-left: 30px">${params[0].value}</span></span>
          </div>
          `,
        },
        visualMap: [{
          show: false,
          pieces: [{
            gt: 0,
            lte: 51,
            color: '#009EF7',
          }, {
            gt: 51,
            lte: 74,
            color: '#79D42B',
          }, {
            gt: 74,
            color: '#F1E723',
          }],
          seriesIndex: 0,
        }],
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
            color: '#009EF7',
          },
          symbolSize: 0,
          lineStyle: {
            width: 3,
          },
          data: [20, 30, 58, 36, 40, 50, 30, 90],
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
              yAxis: 51,
              lineStyle: {
                type: 'dashed',
                color: '#79D42B',
              },
              label: {
                color: '#79D42B',
              },
            }, {
              yAxis: 74,
              lineStyle: {
                type: 'dashed',
                color: '#F1E723',
              },
              label: {
                color: '#F1E723',
              },
            }],
          },
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
  .mark {
    margin-right: var(--lg);
    .rect {
      display: inline-block;
      width: var(--xs);
      height: var(--xs);
      margin-right: var(--xs);
      vertical-align: middle;
      border-radius: 25%;
      &.low {
        background-color: #009EF7;
      }
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

