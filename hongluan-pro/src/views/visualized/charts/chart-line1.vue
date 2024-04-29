<template>
  <div ref="chartContainer" class="echart-container"></div>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, watchEffect, ref } from 'vue'
import * as echarts from 'echarts'
import { useEChart } from 'hongluan-hooks'

type Item = {
  dateList: string[]
  numList: number[]
}

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<Item>,
      default: () => ({
        numList: [13.43, 4.56, 56.44, 20.23, 35.23, 18, 70, 34.2],
        dateList: ['21.01', '21.02', '21.03', '21.04', '21.05', '21.06', '21.07', '21.08'],
      }),
      require: true,
    },
  },
  setup(props) {
    const { setChartOption, chartContainer } = useEChart()

    const option = ref({
      color: ['rgba(106, 211, 214, 1)'],
      grid: {
        top: '15%',
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
        formatter: (params: any) => `
          <div style="backgroundColor:#fff;borderRaduis:0">
            ${params[0].marker}
            <span>${params[0].axisValue} ${params[0].value}(万m³)</span>
          </div>
        `,
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
            color: '#253346',
          },
        },
        type: 'category',
        boundaryGap: true,
        data: props.data.dateList,
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
        splitNumber: 2,
        name: '万m³',
        nameTextStyle: {
          color: '#6F8EA8',
          align: 'left',
          padding: [0, 0, 0, -22],
        },
      },
      series: [
        {
          name: '供气量',
          type: 'line',
          lineStyle: {
            width: 2,
            color: 'rgba(106, 211, 214, 1)',
          },
          showSymbol: !(props.data.numList.length > 1),
          symbolSize: 4,
          areaStyle: {
            opacity: 0.8,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(106, 211, 214, 0.4)',
              },
              {
                offset: 1,
                color: 'rgba(106, 211, 214, 0.05)',
              },
            ]),
          },
          data: props.data.numList,
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
          data: Array(props.data.numList.length).fill(0),
          selectedMode: false,
          type: 'bar',
          tooltip: {
            show: false,
          },
        },
      ],
    })
    watchEffect(() => {
      option.value.series[0].data = props.data.numList
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

.legend {
  position: absolute;
  right: 0;
  top: 25px;
  z-index: 9;
  width: 180px;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: auto;
  // @extend .scroll-bar-blue;
  &-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    .icon {
      width: 8px;
      height: 8px;
      display: inline-block;
      margin-right: 8px;
    }
    p {
      font-size: 14px;
      height: 20px;
      line-height: 20px;
      color: #b5cee3;
      flex: 1;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: break-all;
      margin: 0;
    }
    .number {
      font-size: 16px;
      line-height: 16px;
      width: 60px;
      text-align: left;
    }
  }
}
</style>
