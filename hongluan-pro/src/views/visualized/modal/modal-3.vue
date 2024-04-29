<template show-source>
  <hv-modal title="新增监测事件" width="calc(var(--xxl) * 14)">
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
      <hl-form-item label="发生时间" class="col">
        <hl-date-picker v-model="value1" type="date" placeholder="选择日期" block />
      </hl-form-item>
      <hl-form-item label="事件类型" class="col">
        <hl-select v-model="form.region" placeholder="请选择" block>
          <hl-option label="区域一" value="shanghai" />
          <hl-option label="区域二" value="beijing" />
        </hl-select>
      </hl-form-item>
      <hl-form-item label="事件来源" class="col">
        <hl-select v-model="form.region" placeholder="请选择" block>
          <hl-option label="区域一" value="shanghai" />
          <hl-option label="区域二" value="beijing" />
        </hl-select>
      </hl-form-item>
      <hl-form-item label="监测设备" class="col">
        <hl-select v-model="form.region" placeholder="请选择" block>
          <hl-option label="区域一" value="shanghai" />
          <hl-option label="区域二" value="beijing" />
        </hl-select>
      </hl-form-item>
      <hl-form-item label="事件描述" class="col col-span-2">
        <hl-input v-model="form.desc" native-type="textarea" rows="3" block />
      </hl-form-item>
      <hl-form-item label="上传照片" class="col col-span-2">
        <hl-upload action="http://10.32.66.28/up/" list-type="card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
          <hl-icon><two-upload /></hl-icon>
        </hl-upload>
        <hl-dialog v-model="dialogVisible" title="查看图片" width="600px">
          <hl-thumb :src="dialogImageUrl" class="full" />
        </hl-dialog>
      </hl-form-item>

      <hl-form-item label="上传视频" class="col col-span-2">
        <hl-upload
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
    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)

    const handleRemove = (file, fileList) => {
      console.log(file, fileList)
    }
    const handlePictureCardPreview = (file) => {
      dialogImageUrl.value = file.url
      dialogVisible.value = true
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
      dialogImageUrl,
      dialogVisible,
      handleRemove,
      handlePictureCardPreview,
    }
  },
})
</script>
