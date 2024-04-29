<template>
  <fx-page-detail :detail-opt="data">
    <!-- 设施名称 -->
    <template #facilityNameList="{ detail }">
      {{detail.facilityNameList&&detail.facilityNameList!=='-'&&detail.facilityNameList.length?detail.facilityNameList.join('；'):"--"}}
    </template>
    <!-- 监测设备 -->
    <template #equipNameList="{ detail }">
      {{detail.equipNameList&&detail.equipNameList!=='--'?detail.equipNameList.join('；'):''}}
    </template>
    <!-- altitudeDatumName 高程(高程基准)-->
    <template #altitudeDatumName="{ detail }">
      {{detail.altitude}}({{detail.altitudeDatumName}})
    </template>
     <template #default>
      此处可自定义信息此处可自定义信息此处可自定义信息此处可自定义信息此处可自定义信息此处可自定义信息此处可自定义信息此处可自定义信息此处可自定义信息此处可自定义信息
    </template>
  </fx-page-detail>
</template>
<script>
import { defineComponent, ref, markRaw } from 'vue'
import { TwoPage } from '@hongluan-ui/icons'

export default defineComponent({
  setup() {
    const data = ref({
      // icon: markRaw(TwoPage),
      cols: [
        {
          label: '监测点名称',
          key: 'unitName',
        },
        {
          label: '监测点编码',
          key: 'unitCode',
        },
        {
          label: '监测主体',
          key: 'regionName',
        },
        {
          label: '设施类型',
          key: 'facilityTypeName',
        },
        {
          label: '设施名称',
          slot: 'facilityNameList',
        },
        {
          label: '点位类型',
          key: 'unitTypeName',
        },
        {
          label: '位置',
          key: 'address',
        },
        {
          label: '监测设备',
          slot: 'equipNameList',
        },
        {
          label: '经度',
          key: 'longitude',
        },
        {
          label: '纬度',
          key: 'latitude',
        },
        {
          label: '高程(高程基准)',
          slot: 'altitudeDatumName',
        },
        {
          label: '启用时间',
          key: 'useStateTime',
        },
        {
          label: '最新更新时间',
          key: 'updatedAt',
        },
        {
          label: '描述',
          key: 'description',
        },
      ],
      imageOpt: {
        show: true,
        title: '相关附件1',
        list: ['https://www.jczhdev.etcc.group/minio/jczhdev/images/6F661A1B59E54694BF13A030928D0F55.jpg', 'https://www.jczhdev.etcc.group/minio/jczhdev/images/F53293A79C934C659B9469B0C84E735F.jpg'],
      },
      data: {
        "id":"1561646198942564353",
        "regionId":"1543780635568394242",
        "regionName":"海德公园",
        "unitName":"监测点测试",
        "unitCode":"1234567890",
        "address":"北京市西城区景山西街44南门景山公园万春亭",
        "longitude":"116.482457",
        "latitude":"39.943797",
        "useState":1,
        "useStateName":"启用中",
        "useStateTime":"2022-08-23 17:01:19",
        "description":"孙测试",
        "equipIdList":["1543782718967271426","1544964346334892033"],"equipNameList":["香苑西园东大门球机","设备名称1"],"unitType":"08","unitTypeName":"火车站或长途汽车站",
        "altitude":"100",
        "altitudeDatum":"ALTITUD_EDATUM_1985",
        "altitudeDatumName":"1985国家高程",
        "streetAreaCode":"320902050",
        "streetAreaCodeName":"伍佑街道",
        "facilityType":"SZSSLX_RQ","facilityTypeName":"","facilityIdList":["0"],"facilityNameList":[],"updatedAt":"2022-08-24 10:23:04"
        },
    })

    return {
      data,
    }
  },
})
</script>
