<template>
  <hl-table :data="tableData" border show-summary style="width: 100%">
    <hl-table-column prop="id" label="ID" width="180" />
    <hl-table-column prop="name" label="姓名" />
    <hl-table-column prop="amount1" sortable label="数值 1" />
    <hl-table-column prop="amount2" sortable label="数值 2" />
    <hl-table-column prop="amount3" sortable label="数值 3" />
  </hl-table>
  <br>
  <hl-table
    :data="tableData"
    border
    height="200"
    :summary-method="getSummaries"
    show-summary
    style="width: 100%; margin-top: 20px"
  >
    <hl-table-column prop="id" label="ID" width="180" />
    <hl-table-column prop="name" label="姓名" />
    <hl-table-column prop="amount1" label="数值 1（元）" />
    <hl-table-column prop="amount2" label="数值 2（元）" />
    <hl-table-column prop="amount3" label="数值 3（元）" />
  </hl-table>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const tableData = ref([
      {
        id: '12987122',
        name: '王小虎',
        amount1: '234',
        amount2: '3.2',
        amount3: 10,
      },
      {
        id: '12987123',
        name: '王小虎',
        amount1: '165',
        amount2: '4.43',
        amount3: 12,
      },
      {
        id: '12987124',
        name: '王小虎',
        amount1: '324',
        amount2: '1.9',
        amount3: 9,
      },
      {
        id: '12987125',
        name: '王小虎',
        amount1: '621',
        amount2: '2.2',
        amount3: 17,
      },
      {
        id: '12987126',
        name: '王小虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15,
      },
    ])

    const getSummaries = param => {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        }
        const values = data.map(item => Number(item[column.property]))
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[index] += ' 元'
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
    }

    return {
      tableData,
      getSummaries,
    }
  },
})
</script>
