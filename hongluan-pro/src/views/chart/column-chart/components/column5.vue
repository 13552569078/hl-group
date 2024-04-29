<template>
  <div ref="chartContainer" class="echart-container"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useEChart } from 'hongluan-hooks'

export default defineComponent({
  setup() {
    const { chartContainer, setChartOption } = useEChart()
    const category = ['清江浦区', '淮阴区', '淮安区', '洪泽区', '涟水县', '金湖县']

    const renderChart = () => {
      const option = {
        legend : {
          top : '0',
          right : '0',
          itemWidth : 10,
          itemHeight : 10,
          itemGap: 22,
          textStyle : {
            color: 'rgba(128, 128, 160, 0.65)',
            fontSize : 12,
          },
          data: ['已承诺', '未承诺'],
        },
        grid: [{
          show: false,
          left: '0%',
          top: '12%',
          bottom: '0%',
          width: '35%',
        }, {
          show: false,
          left: '52%',
          top: '12%',
          bottom: '0',
          width: '0',
        }, {
          show: false,
          right: '0%',
          top: '12%',
          bottom: '0%',
          width: '35%',
        }],
        xAxis: [{
          type: 'value',
          show: false,
          inverse: true,
        }, {
          gridIndex: 1,
          show: false,
        },
        {
          gridIndex: 2,
          show: false,
          type: 'value',
          inverse: false,
        }],
        yAxis: [{
          gridIndex: 0,
          show: false,
          inverse: true,
          data: category,
        },
        {
          gridIndex: 1,
          type: 'category',
          inverse: true,
          position: 'center',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            interval: 0,
            align: 'center',
            verticalAlign: 'middle',
            fontSize: 14,
            color: 'rgba(128, 128, 160, 0.65)',
          },
          data: category,
        },
        {
          gridIndex: 2,
          show: false,
          inverse: true,
          data: category,
        }],
        series: [
          {
            name: '已承诺',
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(128, 128, 160, 0.1)',
            },
            gridIndex: 0,
            xAxisIndex: 0,
            yAxisIndex: 0,
            data: [5, 10, 13, 12, 12, 8],
            barWidth: 16,
            itemStyle: {
              color: '#009EF7',
            },
            label: {
              show: true,
              position: 'insideLeft',
              color: '#ffffff',
              fontSize: 12,
            },
          },
          {
            name: '未承诺',
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(128, 128, 160, 0.1)',
            },
            gridIndex: 2,
            xAxisIndex: 2,
            yAxisIndex: 2,
            data: [3, 1, 5, 2, 10, 8],
            barWidth: 16,
            itemStyle: {
              color: '#D4E0EF',
            },
            label: {
              show: true,
              position: 'insideRight',
              color: '#3F4254',
              fontSize: 12,
            },
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
