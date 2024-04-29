<template>
  <fx-v-line-chart :grid="grid" :legend="legend" :series-data="seriesData" :chart-data="data" :tooltip="tooltip" :dataZoom="dataZoom" />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const legend = {
      top: '0%',
      right: '0%',
    }
    const grid = {
      top: '40',
      left: '0',
      right: '0',
      bottom: '0',
      containLabel: true,
    }

    const tooltip = {
      formatter: (params) => {
        if (params===null || params.length===0) return;
        let tip = "";
        tip += params[0].name + '<br/>'
        params.forEach((item, index)=> {
          tip += item.marker + item.seriesName + "：" + (item.value===undefined?'-':item.value) + '<br/>'

          // 进一步遍历other
          if(seriesData[index].other){
            data.forEach(dataItem => {
              if (dataItem.children&&params[0].name===dataItem.xValue) {
                dataItem.children[seriesData[index].key].forEach(otherItem => {
                  tip += "<div style='margin-left: 15px;'>"+ otherItem.label+ "：" + otherItem.value + '</div>'
                  console.log(otherItem.label+ "：" + otherItem.value + '<br/>');
                })
              }
            })
          }
        })
        return tip;
      }
    };

    const dataZoom = [
      {
        show: true,
        realtime: true,
        start: 30,
        end: 70,
        xAxisIndex: [0, 3]
      },
      {
        type: 'inside',
        realtime: true,
        start: 30,
        end: 70,
        xAxisIndex: [0, 3]
      }
    ];
    
    const seriesData = [
      {
        label: '重大风险',
        key: 'greatRisk',
        itemStyle: { color: '#FD6161' },
        areaStyleColor: ['rgba(255, 220, 2, 0.5)', 'rgba(255, 220, 2, 0)'],
      },
      {
        label: '较大风险',
        key: 'biggerRisk',
        itemStyle: {
          color: '#FB7E00',
        },
      },
      {
        label: '一般风险',
        key: 'normalRisk',
        itemStyle: {
          color: '#D6B800',
        },
      },
      {
        label: '低风险',
        key: 'lowRisk',
        itemStyle: {
          color: '#3E7DFF',
        },
      },
      {
        label: '其他风险',
        key: 'otherRisk',
        itemStyle: {
          color: '#3E7D00',
        },
        other: true
      },
    ]
    const data = [
      {
        xValue: '一月',
        greatRisk: 20,
        biggerRisk: 40,
        normalRisk: 30,
        lowRisk: 11,
        otherRisk: 50,
        children: {
          otherRisk: [
            {
              label: "其他一",
              value: 30
            },
            {
              label: "其他二",
              value: 20
            },
          ]
        }
      },
      {
        xValue: '二月',
        greatRisk: 30,
        biggerRisk: 60,
        normalRisk: 10,
        lowRisk: 31,
      },
      {
        xValue: '三月',
        greatRisk: 60,
        biggerRisk: 40,
        normalRisk: 80,
        lowRisk: 41,
      },
      {
        xValue: '四月',
        greatRisk: 90,
        biggerRisk: 40,
        normalRisk: 10,
        lowRisk: 11,
      },
      {
        xValue: '五月',
        greatRisk: 40,
        biggerRisk: 70,
        normalRisk: 40,
        lowRisk: 21,
      },
      {
        xValue: '六月',
        greatRisk: 90,
        biggerRisk: 120,
        normalRisk: 10,
        lowRisk: 31,
      },
      {
        xValue: '七月',
        greatRisk: 140,
        biggerRisk: 30,
        normalRisk: 40,
        lowRisk: 51,
      },
      {
        xValue: '八月',
        greatRisk: 110,
        biggerRisk: 130,
        normalRisk: 140,
        lowRisk: 31,
      },
      {
        xValue: '九月',
        greatRisk: 140,
        biggerRisk: 110,
        normalRisk: 50,
        lowRisk: 91,
      },
      {
        xValue: '十月',
        greatRisk: 120,
        biggerRisk: 30,
        normalRisk: 70,
        lowRisk: 31,
      },
      {
        xValue: '十一月',
        greatRisk: 20,
        biggerRisk: 40,
        normalRisk: 30,
        lowRisk: 51,
      },
      {
        xValue: '十二月',
        greatRisk: 120,
        biggerRisk: 110,
        normalRisk: 120,
        lowRisk: 21,
      },
    ]
    return {
      grid,
      legend,
      seriesData,
      data,
      tooltip,
      dataZoom
    }
  },
})
</script>
