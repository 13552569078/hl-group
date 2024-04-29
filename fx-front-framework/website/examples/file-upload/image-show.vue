<template>
  <div style="display: block; width: 100%; height: 126px;">
    <fx-file-upload v-model:ids="ids" list-type="card" :get-file-list="getFileList" :disabled="true" />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const ids = ref('3D19F703997F43DA9E56C18D355423C1,B1A8EA428E714BB0A24B4C1423633E0C,EF2F47E96AB44F9A987E3B7E9CDE66D2')

    const getFileList = async ({ ids, setFileList }) => {
      // 接口调用示例
      // if (ids && ids.length > 0) {
      //   const result = await apiFileServiceObj.listFiles(ids.split(","));
      //   if (+result.code === 0) {
      //     const list = result.data.map(item => { item.name = item.originalName; return item; });
      //     setFileList(list);
      //   }
      // }
      setFileList([
        {
          dirUrl: '/xixian_static/images/FFF1DFE5D94E4969AE245226942942C7.jpg',
          id: '3D19F703997F43DA9E56C18D355423C1',
          originalName: '1 - 副本 - 副本.jpg',
          name: '1 - 副本 - 副本.jpg',
          pathUrl: 'http://swanfile.etcc.group',
          size: 38020,
          type: 'IMAGE',
          url: 'http://swanfile.etcc.group/xixian_static/images/FFF1DFE5D94E4969AE245226942942C7.jpg',
        },
        {
          dirUrl: '/xixian_static/images/201D015F6E0845BF93BDF6D70B54457F.jpg',
          id: 'B1A8EA428E714BB0A24B4C1423633E0C',
          originalName: '2 - 副本.jpg',
          name: '2 - 副本.jpg',
          pathUrl: 'http://swanfile.etcc.group',
          size: 13278,
          type: 'IMAGE',
          url: 'http://swanfile.etcc.group/xixian_static/images/201D015F6E0845BF93BDF6D70B54457F.jpg',
        },
        {
          dirUrl: '/xixian_static/images/EF2F47E96AB44F9A987E3B7E9CDE66D2.jpg',
          id: 'EF2F47E96AB44F9A987E3B7E9CDE66D2',
          originalName: '3.jpg',
          name: '3.jpg',
          pathUrl: 'http://swanfile.etcc.group',
          size: 25553,
          type: 'IMAGE',
          url: 'http://swanfile.etcc.group/xixian_static/images/EF2F47E96AB44F9A987E3B7E9CDE66D2.jpg',
        },
      ])
    }

    return {
      ids,
      getFileList,
    }
  },
})
</script>
