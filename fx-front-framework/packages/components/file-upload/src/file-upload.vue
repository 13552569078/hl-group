<template>
  <div :class="`${PREFIX.toLowerCase()}-file-upload`">
    <hl-upload
      :class="listType==='text'?'custom-file-upload':''"
      :headers="{authorization: token}"
      :action="fileService"
      :list-type="listType"
      :accept="accept"
      :limit="limit"
      :file-list="fileList"
      :multiple="multiple"
      :disabled="disabled"
      :show-file-list="showFileList"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-exceed="handleExceed"
    >
      <!--图片上传-->
      <hl-icon v-if="listType==='card'"><two-upload /></hl-icon>
      <!--文件上传-->
      <hl-button v-if="listType==='text'&&!disabled" type="primary" icon-position="left">
        {{ textButton }}
        <template #icon>
          <hl-icon><two-upload /></hl-icon>
        </template>
      </hl-button>
    </hl-upload>
    <hl-dialog v-model="dialogVisible" title="查看图片" width="50%" :append-to-body="true">
      <hl-thumb :src="dialogImageUrl" class="full" />
    </hl-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType } from 'vue'
import { HlMessage } from 'hongluan-ui'
import { TwoUpload } from '@hongluan-ui/icons'
import { fileSizeLimit, FileList } from './types'
import { PREFIX } from '@fx-front-framework/utils'

export default defineComponent({
  name: 'FileUpload',
  components: { TwoUpload },
  props: {
    token: {
      type: String,
      default: '',
    },
    textButton: {
      type: String,
      default: '点击上传',
    },
    showFileList: {
      type: Boolean,
      default: true,
    },
    listType: {
      type: String,
      default: 'text',
    },
    accept: {
      type: String,
      default: '.*',
    },
    limit: {
      type: Number,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    // 文件上传后的列表id数组字符串
    ids: {
      type: String,
      default: '',
    },
    // 用于回显
    getFileList: {
      type: Function as PropType<(...args: any) => void>,
      default: () => ({}),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    // 文件上传路径,API地址
    fileService: {
      type: String,
      default: '',
    },
    // 文件大小
    fileSizeLimit: {
      type: Object,
      default: () => ({
        video: 100, // 视频100M
        image: 5, // 图片5M
      }),
    },
  },
  emits: ['handleSuccess', 'update:ids'],
  setup (props, { emit }) {
    const fileList = ref<FileList[]>([])

    // 初始化文件数据方法
    const initData = () => {
      if (props.ids) {
        props.getFileList({
          ids: props.ids,
          setFileList: setFileList,
        })
      }
    }
    onMounted(() => {
      initData()
    })

    const setFileList = (list: FileList[]) => {
      fileList.value = list
    }

    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)

    // 删除文件
    const handleRemove = (file: any, newFileList: any) => {
      fileList.value = newFileList
      emit('handleSuccess', fileList.value)
      emit('update:ids', fileList.value.map(item => { return item.id }).join(','))
    }

    // 文件预览
    const handlePictureCardPreview = (file: { url: string; }) => {
      // 判断图片还是文件
      const fileName = file.url.split('/')[file.url.split('/').length - 1]

      if (/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(fileName)) {
        dialogImageUrl.value = file.url
        dialogVisible.value = true
      } else {
        // 简单处理下载，浏览器不能在线预览则调用下载
        window.open(file.url)
      }
    }

    // 图片上传前的校验
    const handelBeforeUpload = (file: File) => {
      dialogImageUrl.value = ''
      const fileSizeLimit: fileSizeLimit = props.fileSizeLimit
      const type = file.type.split('/')[0]
      if (file.size > fileSizeLimit[type] * 1024 * 1024) {
        HlMessage.warning(
          type === 'video'
            ? `视频文件不能超过 ${fileSizeLimit[type]} MB`
            : `图片文件不能超过 ${fileSizeLimit[type]} MB`,
        )
        return false
      }
      return true
    }

    // 文件限制提示
    const handleExceed = (files: string | any[], newFileList: string | any[]) => {
      HlMessage.warning(
        `当前限制选择 ${props.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + newFileList.length} 个文件`,
      )
    }

    // 上传成功
    const handleSuccess = (res: any) => {
      if (+res.code === 0) {
        console.log(res.data)
        // 普通上传
        if (props.showFileList) {
          fileList.value.push({
            ...res.data,
            name: res.data.originalName,
          })
          emit('handleSuccess', fileList.value)
          emit('update:ids', fileList.value.map(item => { return item.id }).join(','))
        } else {
          // 导入上传
          emit('handleSuccess', res)
        }
      } else {
        emit('handleSuccess', res)
      }
    }
    return {
      dialogImageUrl,
      dialogVisible,
      handleRemove,
      handlePictureCardPreview,
      handelBeforeUpload,
      handleSuccess,
      handleExceed,
      fileList,
      setFileList,
      PREFIX,
    }
  },
})
</script>
