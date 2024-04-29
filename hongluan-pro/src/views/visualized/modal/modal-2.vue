<template show-source>
  <hv-modal title="补全监测事件" width="calc(var(--xxl) * 14)">
    <hl-form
      :model="form"
      :width="['w-xs', 'col']"
      :label-position="['left', 'top']"
      class="hl-row grid grid-direction-vertical count-2 m-t-xxl"
      style="--row-gap-y: var(--lg); --row-gap-x: var(--md)"
    >
      <hl-form-item label="事件标题" class="col col-span-2">
        <hl-input v-model="form.name" placeholder="请输入" block />
      </hl-form-item>
      <hl-form-item label="发生地点" class="col col-span-2">
        <hl-group merge indent full>
          <hl-input v-model="form.name" placeholder="请输入" />
          <hl-button class="static" equal>
            <template #icon>
              <hl-icon><two-Point /></hl-icon>
            </template>
          </hl-button>
        </hl-group>
      </hl-form-item>
      <hl-form-item label="发生时间" class="col"> 2021-07-18 13:34:56 </hl-form-item>
      <hl-form-item label="事件类型" class="col"> 重点区域-打架斗殴 </hl-form-item>
      <hl-form-item label="事件来源" class="col">
        <hl-select v-model="form.region" placeholder="请选择活动区域">
          <hl-option label="区域一" value="shanghai" />
          <hl-option label="区域二" value="beijing" />
        </hl-select>
      </hl-form-item>
      <hl-form-item label="监测设备" class="col"> C099831D394 </hl-form-item>
      <hl-form-item label="事件描述" class="col col-span-2">
        <hl-input v-model="form.desc" native-type="textarea" rows="3" block />
      </hl-form-item>
      <hl-form-item label="现场图集" class="col col-span-2">
        <hl-group gap="var(--md)" wrap>
          <hl-thumb
            v-for="item in picData"
            :key="item"
            style="width: 100px; height: 100px"
            :src="item.thumb"
            fit="cover"
            :preview-src-list="srcList"
          />
        </hl-group>
      </hl-form-item>

      <hl-form-item label="上传文件" class="col col-span-2">
        <hl-upload
          style="max-width: calc(var(--xxl) * 10)"
          action="http://10.32.66.28/up/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="5"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <hl-button type="primary" icon-position="left">
            点击上传
            <template #icon>
              <hl-icon><two-upload /></hl-icon>
            </template>
          </hl-button>
          <template #tip>
            <div class="text-danger m-t-sm">只能上传 jpg/png 文件，且不超过 500kb</div>
          </template>
        </hl-upload>
      </hl-form-item>

      <hl-form-item label=" " class="col col-span-2">
        <hl-button type="primary" class="m-r-md" @click="onSubmit">保存</hl-button>
        <hl-button>取消</hl-button>
      </hl-form-item>
    </hl-form>
  </hv-modal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  components: {},
  setup() {
    const picData = ref([
      {
        title: '',
        thumb: 'https://i0.hippopx.com/photos/298/434/513/beach-dawn-dusk-ocean-thumb.jpg',
      },
      {
        title: '',
        thumb:
          'https://i0.hippopx.com/photos/738/1016/11/children-fishing-the-activity-asia-thumb.jpg',
      },
      {
        title: '',
        thumb: 'https://i0.hippopx.com/photos/264/421/89/child-children-girl-happy-thumb.jpg',
      },
      {
        title: '',
        thumb: 'https://i0.hippopx.com/photos/199/210/349/man-board-drawing-muscles-thumb.jpg',
      },
    ])
    const srcList = ref([
      'https://i0.hippopx.com/photos/298/434/513/beach-dawn-dusk-ocean-thumb.jpg',
      'https://i0.hippopx.com/photos/738/1016/11/children-fishing-the-activity-asia-thumb.jpg',
      'https://i0.hippopx.com/photos/264/421/89/child-children-girl-happy-thumb.jpg',
      'https://i0.hippopx.com/photos/199/210/349/man-board-drawing-muscles-thumb.jpg',
    ])

    const fileList = ref([
      {
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      },
      {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      },
    ])
    const handleRemove = (file, fileList) => {
      console.log(file, fileList)
    }
    const handlePreview = (file) => {
      console.log(file)
    }
    const handleExceed = (files, fileList) => {
      alert(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`,
      )
    }
    const beforeRemove = (file) => {
      // alert(`确定移除 ${file.name}？`)
      return confirm(`确定移除 ${file.name}？`)
    }

    const form = reactive({
      name: '',
      region: 'shanghai',
      date1: '',
      type: [],
      resource: '1',
      desc: '',
    })
    return {
      form,
      picData,
      srcList,
      fileList,
      handleRemove,
      handlePreview,
      handleExceed,
      beforeRemove,
    }
  },
})
</script>
