<template>
  <hl-table :data="tableData" style="width: 100%">
    <hl-table-column type="expand">
      <template #default="props">
        <hl-form label-position="left" inline label-suffix="：" item-gap="var(--md)" class="demo-table-expand">
          <hl-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </hl-form-item>
          <hl-form-item label="所属店铺">
            <span>{{ props.row.shop }}</span>
          </hl-form-item>
          <hl-form-item label="商品 ID">
            <span>{{ props.row.id }}</span>
          </hl-form-item>
          <hl-form-item label="店铺 ID">
            <span>{{ props.row.shopId }}</span>
          </hl-form-item>
          <hl-form-item label="商品分类">
            <span>{{ props.row.category }}</span>
          </hl-form-item>
          <hl-form-item label="店铺地址">
            <span>{{ props.row.address }}</span>
          </hl-form-item>
          <hl-form-item label="商品描述">
            <span>{{ props.row.desc }}</span>
          </hl-form-item>
        </hl-form>
      </template>
    </hl-table-column>
    <hl-table-column label="商品 ID" prop="id" />
    <hl-table-column label="商品名称" prop="name" />
    <hl-table-column label="描述" prop="desc" />
  </hl-table>
</template>

<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    const tableData = ref([
      {
        id: '12987122',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333',
      },
      {
        id: '12987123',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333',
      },
      {
        id: '12987125',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333',
      },
      {
        id: '12987126',
        name: '好滋好味鸡蛋仔',
        category: '江浙小吃、小吃零食',
        desc: '荷兰优质淡奶，奶香浓而不腻',
        address: '上海市普陀区真北路',
        shop: '王小虎夫妻店',
        shopId: '10333',
      },
    ])

    return {
      tableData,
    }
  },
})
</script>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .hl-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
