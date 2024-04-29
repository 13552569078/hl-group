<template>
  <div ref="chartContainer" class="echart-container"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useEChart } from 'hongluan-hooks'

export default defineComponent({
  setup() {
    const { chartContainer, setChartOption } = useEChart()
    const richColor = ['#009EF7', '#F1E723', '#79D42B']

    const renderChart = () => {
      const option = {
        title: {
          text: '承诺情况',
          top: 'center',
          left: 'center',
          textStyle: {
            color: 'rgba(128, 128, 160, 0.9)',
            fontSize: 16,
            fontWeight: '500'
          },
        },
        legend: {
          show: false,
        },
        series: [ {
          name: '案例4',
          type: 'pie',
          radius: ['60%', '90%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          z: 2,
          label: {
            show: true,
            formatter: (params => {
              return params.dataIndex === 0 ?'{c0|}{a|' + params.name + '}'+'\n{b|'+params.value + '}': params.dataIndex === 1 ?'{c1|}{a|' + params.name + '}'+'\n{b|'+params.value + '}' : '{c2|}{a|' + params.name + '}'+'\n{b|'+params.value + '}'
            }),
            rich: {
              a: {
                padding: [10, 0, 10, 6],
                fontSize: 14,
                color: 'rgba(128, 128, 160, 0.65)',
              },
              b: {
                fontSize: 16,
                color: 'rgba(128, 128, 160, 0.65)',
                fontWeight: '500',
              },
              c0: {
                width: 8,
                height: 8,
                borderRadius: 8,
                backgroundColor: richColor[0],
              },
              c1: {
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: richColor[1],
              },
              c2: {
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: richColor[2],
              },
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 300, name: '未承诺', itemStyle: { color: richColor[0] } },
            { value: 100, name: '已承诺', itemStyle: { color: richColor[1] } },
            { value: 100, name: '逾期承诺', itemStyle: { color: richColor[2] } },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.1)',
            },
          },
        },
        {
          name: '案例4',
          type: 'pie',
          radius: ['50%', '90%'],
          center: ['50%', '50%'],
          avoidLabelOverlap: false,
          z: 1,
          label: {
            show: false,
          },
          data: [
            { value: 300, name: 'a', itemStyle: { color: '#b1e1fd ' } },
            { value: 100, name: 'b', itemStyle: { color: '#fbf8bd' } },
            { value: 100, name: 'c', itemStyle: { color: '#d6f2be' } },
          ],
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
