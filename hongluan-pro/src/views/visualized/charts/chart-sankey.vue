<template>
  <div ref="chartContainer" class="echart-container"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useEChart } from 'hongluan-hooks'
import * as echarts from 'echarts'
import { Indexable } from '@/types'


export default defineComponent({
  setup() {
    const { chartContainer, setChartOption } = useEChart()

    const renderChart = () => {
      const population = [
        { source: '原煤', target: '农林牧渔业', value: 712359.3 },
        { source: '原煤', target: '建筑业', value: 12500.2 },
        { source: '原煤', target: '工业合计', value: 50241.4 },

        { source: '煤制品', target: '农林牧渔业', value: 618180.6 },
        { source: '煤制品', target: '建筑业', value: 436696.23 },
        { source: '煤制品', target: '工业合计', value: 213535 },

        { source: '焦炉煤气', target: '农林牧渔业', value: 145857 },
        { source: '焦炉煤气', target: '建筑业', value: 413287.5 },
        { source: '焦炉煤气', target: '住宅用地', value: 73910.8 },

        { source: '原油', target: '农林牧渔业', value: 134172 },
        { source: '原油', target: '建筑业', value: 294527 },
        { source: '原油', target: '住宅用地', value: 6851 },
        { source: '原油', target: '工业合计', value: 121422 },

        { source: '汽油', target: '农林牧渔业', value: 33732.97 },
        { source: '汽油', target: '建筑业', value: 65556.41 },
        { source: '汽油', target: '住宅用地', value: 295348.5 },
        { source: '汽油', target: '商业用地', value: 7391.31 },

        { source: '液化实燃油', target: '农林牧渔业', value: 146022.81 },
        { source: '液化实燃油', target: '住宅用地', value: 146422.47 },
        { source: '液化实燃油', target: '商业用地', value: 49587.21 },
      ]

      const city: Indexable<string> = {
        '原煤': '#e9bae8',
        '煤制品': '#3dc5e7',
        '焦炉煤气': '#e88886',
        '原油': '#feda66',
        '汽油': '#c92123',
        '液化实燃油': '#8bc77b',

        '农林牧渔业': '#fb7f10',
        '建筑业': '#e492d0',
        '住宅用地': '#2aa12d',
        '商业用地': '#fb7f10',
        '工业合计': '#98c0fd',
      }
      const citylist = []
      //遍历city
      for (var key in city) {
        citylist.push(
          { name: key, itemStyle: { color: city[key] } }, //构造节点对象，包括name和itemStyle
        )
      }
      const data = []
      for (var i = 0; i < population.length; i++) {
        var color = new echarts.graphic.LinearGradient(0, 0, 1, 0, [
          {
            offset: 0,
            color: city[population[i].source], //获取起始节点的颜色属性
          },
          {
            offset: 1,
            color: city[population[i].target], //获取结尾节点的颜色属性
          },
        ])
        data.push({
          source: population[i].source,
          target: population[i].target,
          value: population[i].value,
          lineStyle: {
          //添加样式配置
            color: color,
          },
        })
      }
      const option = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
        },
        series: [
          {
            type: 'sankey',
            data: citylist,
            links: data,
            emphasis: { focus: 'adjacency' },
            itemStyle: {
              borderWidth:0,
              borderColor: '#fff',
              opacity: 1,
            },
            lineStyle: {
              color: 'source',
              curveness: 0.5,
            },
            levels: [{
              depth: 0,
              label: {
                color: '#fff',
                textBorderWidth: 0,
                textBorderColor: '#fff',
              },
            },
            {
              depth: 1,
              label: {
                color: '#fff',
                textBorderWidth: 0,
                textBorderColor: '#fff',
              },
            }],
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
