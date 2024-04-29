<template>
  <hl-group full="full-x" align="items-middle" gap="var(--md)" class="h-full">
    <div ref="chartContainer" class="echart-container static" style="width: calc(var(--xxl) * 5)"></div>
    <hl-group v-if="showLabel" dir="vertical" align="items-left" gap="var(--xs)" class="static" style="width: 42%">
      <hl-group
        v-for="(item, index) in chartData"
        :key="index"
        gap="var(--sm)"
        align="items-middle items-between"
        class="cursor-pointer static"
        :style="`opacity:${item?.isHide ? 0.2 : 1}`"
        @click="hideSerie(item)"
      >
        <span class="fill-rect static" :style="`background-color:${item.color}`"></span>
        <span class="text-secondary font-md w-full">{{ item.name }}</span>
        <h3 class="font-lg font-din static">{{ item.value }}</h3>
      </hl-group>
    </hl-group>
  </hl-group>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType } from 'vue'
import { useEChart } from 'hongluan-hooks'

export default defineComponent({
  props: {
    chartData: {
      type: Array as PropType<ChartItem[]>,
      default: () => [
        {
          name: '消防站',
          value: 50,
          color: '#71F8FC',
        },
        {
          name: '消防水源',
          value: 60,
          color: '#FD6161',
        },
        {
          name: '医院',
          value: 80,
          color: '#DCF4FF',
        },
        {
          name: '卫生机构',
          value: 90,
          color: '#FFDC02',
        },
        {
          name: '避难场所',
          value: 70,
          color: '#FAAA02',
        },
      ],
    },
    title: {
      type: String,
      default: '',
    },
    showLabel: {
      type: Boolean,
      default: true,
    },
    widths: {
      type: Array as PropType<string[]>,
      default: () => ['60%', '40%'],
    },
  },
  setup(props) {
    const { chartContainer, setChartOption } = useEChart()

    const renderChart = () => {
      const option = {
        title: [
          {
            text: props.title,
            top: 'center',
            left: 'center',
            color: '#6F8EA8',
            fontSize: 14,
          },
        ],
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '90%'],
            center: ['50%', '50%'],
            roseType: 'radius',
            minShowLabelAngle: 60,
            left: '0',
            itemStyle: {
              color: (params: any) => props.chartData[params.dataIndex].color,
            },
            label: {
              show: false,
            },
            labelLine: {
              length: 1,
              length2: 20,
              smooth: true,
            },
            data: props.chartData.filter((d) => !d?.isHide),
          },
        ],
      }
      setChartOption(option)
    }

    const hideSerie = (item: ChartItem) => {
      item.isHide = !item?.isHide
      renderChart()
    }

    onMounted(() => {
      renderChart()
    })

    return {
      chartContainer,
      hideSerie,
    }
  },
})
interface ChartItem {
  name: string
  value: number
  isHide?: boolean
  color: string
}
</script>

<style lang="scss" scoped>
.echart-container {
  min-height: 200px;
}
.fill-rect {
  display: flex;
  width: calc(var(--sm));
  height: calc(var(--sm));
}
</style>
