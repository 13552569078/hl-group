import { watch } from 'vue'
import { isNil } from 'lodash-unified'
import { useVModel } from '@vueuse/core'
import { debugWarn, throwError } from '@hongluan-ui/utils'
import { useDeprecated } from '@hongluan-ui/hooks'
import { genFileId } from './upload'

import type { ShallowRef } from 'vue'
import type {
  UploadContentProps,
  UploadContentInstance,
} from './upload-content'
import type {
  UploadRawFile,
  UploadFile,
  UploadProps,
  UploadStatus,
  UploadFiles,
} from './upload'

const SCOPE = 'Upload'

const revokeObjectURL = (file: UploadFile) => {
  if (file.url?.startsWith('blob:')) {
    URL.revokeObjectURL(file.url)
  }
}

export const useHandlers = (
  props: UploadProps,
  uploadRef: ShallowRef<UploadContentInstance | undefined>,
) => {
  const uploadFiles = useVModel(
    props as Omit<UploadProps, 'fileList'> & { fileList: UploadFiles; },
    'fileList',
    undefined,
    { passive: true },
  )

  const getFile = (rawFile: UploadRawFile) =>
    uploadFiles.value.find(file => file.uid === rawFile.uid)

  function abort(file: UploadFile) {
    uploadRef.value?.abort(file)
  }

  function clearFiles(
    /** @default ['ready', 'uploading', 'success', 'fail'] */
    states: UploadStatus[] = ['ready', 'uploading', 'success', 'fail'],
  ) {
    uploadFiles.value = uploadFiles.value.filter(
      row => !states.includes(row.status),
    )
  }

  const handleError: UploadContentProps['onError'] = (err, rawFile) => {
    const file = getFile(rawFile)
    if (!file) return

    console.error(err)

    file.status = 'fail'
    uploadFiles.value.splice(uploadFiles.value.indexOf(file), 1)
    props.onError(err, file, uploadFiles.value)
    props.onChange(file, uploadFiles.value)
  }

  const handleProgress: UploadContentProps['onProgress'] = (evt, rawFile) => {
    const file = getFile(rawFile)
    if (!file) return

    props.onProgress(evt, file, uploadFiles.value)
    file.status = 'uploading'
    file.percentage = Math.round(evt.percent)
  }

  const handleSuccess: UploadContentProps['onSuccess'] = (
    response,
    rawFile,
  ) => {
    const file = getFile(rawFile)
    if (!file) return

    file.status = 'success'
    file.response = response
    props.onSuccess(response, file, uploadFiles.value)
    props.onChange(file, uploadFiles.value)
  }

  const handleStart: UploadContentProps['onStart'] = file => {
    if (isNil(file.uid)) file.uid = genFileId()
    const uploadFile: UploadFile = {
      name: file.name,
      percentage: 0,
      status: 'ready',
      size: file.size,
      raw: file,
      uid: file.uid,
    }
    if (props.listType === 'card' || props.listType === 'picture') {
      try {
        uploadFile.url = URL.createObjectURL(file)
      } catch (err: unknown) {
        debugWarn(SCOPE, (err as Error).message)
        props.onError(err as Error, uploadFile, uploadFiles.value)
      }
    }
    uploadFiles.value = [...uploadFiles.value, uploadFile]
    props.onChange(uploadFile, uploadFiles.value)
  }

  const handleRemove: UploadContentProps['onRemove'] = async (
    file,
    rawFile, // TODO: deprecated in 2.0
  ): Promise<void> => {
    if (rawFile) {
      useDeprecated(
        {
          scope: SCOPE,
          from: 'handleRemove second argument',
          version: '2.0',
          replacement: 'first argument `file`',
          ref: 'https://element-plus.org/en-US/component/upload.html#methods',
        },
        true,
      )
    }

    const _file = rawFile || file
    const uploadFile = _file instanceof File ? getFile(_file) : _file
    if (!uploadFile) throwError(SCOPE, 'file to be removed not found')

    const doRemove = (file: UploadFile) => {
      abort(file)
      const fileList = uploadFiles.value
      fileList.splice(fileList.indexOf(file), 1)
      props.onRemove(file, fileList)
      revokeObjectURL(file)
    }

    if (props.beforeRemove) {
      const before = await props.beforeRemove(uploadFile, uploadFiles.value)
      if (before !== false) doRemove(uploadFile)
    } else {
      doRemove(uploadFile)
    }
  }

  function submit() {
    uploadFiles.value
      .filter(({ status }) => status === 'ready')
      .forEach(({ raw }) => raw && uploadRef.value?.upload(raw))
  }

  watch(
    () => props.listType,
    val => {
      if (val !== 'card' && val !== 'picture') {
        return
      }

      uploadFiles.value = uploadFiles.value.map(file => {
        const { raw, url } = file
        if (!url && raw) {
          try {
            file.url = URL.createObjectURL(raw)
          } catch (err: unknown) {
            props.onError(err as Error, file, uploadFiles.value)
          }
        }
        return file
      })
    },
  )

  watch(
    uploadFiles,
    files => {
      for (const file of files) {
        file.uid ||= genFileId()
        file.status ||= 'success'
      }
    },
    { immediate: true, deep: true },
  )

  return {
    /** @description two-way binding ref from props `fileList` */
    uploadFiles,
    abort,
    clearFiles,
    handleError,
    handleProgress,
    handleStart,
    handleSuccess,
    handleRemove,
    submit,
  }
}
