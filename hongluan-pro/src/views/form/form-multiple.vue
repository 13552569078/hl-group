<template>
  <div>
    <hl-panel class="main-panel bg-light" body-padding="calc(var(--xxl) + var(--md));" body-class="p-t-lg">
      <template #header>
        <div class="panel-header-left">
          <hl-icon><two-server /></hl-icon>
        </div>
        <div class="panel-title"><h4>表单</h4></div>
        <hl-group gap="var(--sm)" class="panel-header-right">
          <hl-button type="link">
            <template #icon>
              <hl-icon>
                <two-plus />
              </hl-icon>
            </template>
            选择检查内容
          </hl-button>
          <hl-button type="link">
            <template #icon>
              <hl-icon>
                <two-table />
              </hl-icon>
            </template>
            使用模版
          </hl-button>
        </hl-group>
      </template>
      <hl-row gap="var(--xl)">
        <hl-col span="col">
          <hl-panel header-height="calc(var(--xxs) * 15)" body-padding="var(--xxl)">
            <template #header>
              <div class="panel-header-left">
                <hl-icon radius type="primary" effect="light"><two-book /></hl-icon>
              </div>
              <div class="panel-title"><h5>检查内容</h5></div>
              <div class="panel-header-right">
                <hl-button type="primary" equal no-fill>
                  <template #icon>
                    <hl-icon>
                      <two-delete />
                    </hl-icon>
                  </template>
                </hl-button>
              </div>
            </template>
            <hl-form ref="form" :model="formData" :width="['lg:col-4', 'lg:col-18']" :label-position="['items-left lg:items-right', 'items-top']" item-gap="var(--xxl)">
              <hl-form-item label="检查项目"> 胶状乳化生产线 - 乳化、冷却、敏化 </hl-form-item>
              <hl-form-item label="检查内容"> 乳化机轴承故障，主轴径向和轴向位移；水油相断流，乳化机内物料温升失控 </hl-form-item>
              <hl-form-item label="检查场所">
                <hl-input v-model="formData.a" placeholder="请输入" block />
              </hl-form-item>
              <hl-form-item label="隐患类别">
                <hl-radio-group v-model="formData.b" gap="var(--xs)" type="primary" size="md" wrap>
                  <hl-radio label="1">重大隐患</hl-radio>
                  <hl-radio label="2">一般隐患</hl-radio>
                  <hl-radio label="3">突出问题</hl-radio>
                  <hl-radio label="4">无隐患</hl-radio>
                </hl-radio-group>
              </hl-form-item>
              <hl-form-item label="隐患描述">
                <hl-input v-model="formData.c" native-type="textarea" :rows="3" block />
              </hl-form-item>
              <hl-form-item label="隐患图片">
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
              <hl-form-item label="整改类型">
                <hl-radio-group v-model="formData.d" gap="var(--md)" type="primary" size="md" wrap>
                  <hl-radio label="1">现场整改</hl-radio>
                  <hl-radio label="2">限期整改</hl-radio>
                </hl-radio-group>
              </hl-form-item>
              <hl-form-item label="整改期限">
                <hl-date-picker v-model="formData.e" type="date" placeholder="选择日期" class="w-full-xl" />
              </hl-form-item>
              <hl-form-item label="整改建议">
                <hl-input v-model="formData.f" native-type="textarea" placeholder="请输入" :rows="3" block />
              </hl-form-item>
            </hl-form>
          </hl-panel>
        </hl-col>
      </hl-row>
    </hl-panel>

    <hl-panel class="card-panel m-t-lg" body-padding="calc(var(--xxl) + var(--md));">
      <template #header>
        <div class="panel-header-left">
          <hl-icon><two-server /></hl-icon>
        </div>
        <div class="panel-title"><h4>表单</h4></div>
        <div class="panel-header-right"></div>
      </template>
      <hl-form ref="form" :model="formData" :label-position="['left', 'middle']" class="hl-row grid grid-direction-vertical xl:count-4 lg:count-3" style="--row-gap-y: var(--md); --row-gap-x: var(--lg)">
        <hl-form-item label="队伍名称" class="col">
          <hl-input v-model="formData.a" placeholder="请输入" block />
        </hl-form-item>
        <hl-form-item label="上级部门" class="col">
          <hl-select v-model="formData.b" placeholder="请选择" block>
            <hl-option label="海淀区" value="haidian" />
            <hl-option label="北京市" value="beijing" />
          </hl-select>
        </hl-form-item>
        <hl-form-item label="创建日期" class="col">
          <hl-date-picker v-model="formData.c" type="date" placeholder="选择日期" block />
        </hl-form-item>
        <hl-form-item label="通讯地址" class="col">
          <hl-input v-model="formData.d" placeholder="请输入" block />
        </hl-form-item>
        <hl-form-item label="主管单位" class="col lg:col-span-2">
          <hl-input v-model="formData.e" placeholder="请输入" block />
        </hl-form-item>
        <hl-form-item label="专业方向" class="col">
          <hl-input v-model="formData.f" placeholder="请输入" block />
        </hl-form-item>
        <hl-form-item label="经营范围" class="col lg:row-span-2">
          <hl-input v-model="formData.g" native-type="textarea" maxlength="100" show-word-limit input-style="height: calc(var(--xxs) * 31)" resize="none" block />
        </hl-form-item>
        <hl-form-item label="队长姓名" class="col">
          <hl-input v-model="formData.h" placeholder="请输入" block />
        </hl-form-item>
        <hl-form-item label="队伍等级" class="col">
          <hl-input v-model="formData.i" placeholder="请输入" block />
        </hl-form-item>
        <hl-form-item label="通用响应级别" class="col">
          <hl-input v-model="formData.j" placeholder="请输入" block />
        </hl-form-item>
      </hl-form>
    </hl-panel>
    <hl-panel class="card-panel m-t-lg" body-padding="calc(var(--xxl) + var(--md));">
      <template #header>
        <div class="panel-header-left">
          <hl-icon><two-news /></hl-icon>
        </div>
        <div class="panel-title"><h4>横排表单</h4></div>
        <div class="panel-header-right"></div>
      </template>
      <hl-form
        ref="form"
        :model="formData"
        :width="['6vw', 'col']"
        :label-position="['items-left', 'items-top']"
        class="hl-row grid grid-direction-vertical xl:count-3 lg:count-2"
        style="--row-gap-y: var(--xl); --row-gap-x: var(--xl)"
      >
        <hl-form-item label="队伍名称：">
          <hl-input v-model="formData.name" placeholder="请输入" block />
        </hl-form-item>
        <hl-form-item label="上级部门：">
          <hl-select v-model="formData.branch" placeholder="请选择" block>
            <hl-option label="海淀区" value="haidian" />
            <hl-option label="北京市" value="beijing" />
          </hl-select>
        </hl-form-item>
        <hl-form-item label="创建日期：">
          <hl-date-picker v-model="formData.createdAt" type="date" placeholder="选择日期" block />
        </hl-form-item>
        <hl-form-item label="通讯地址：">
          <hl-input v-model="formData.address" placeholder="请输入" block />
        </hl-form-item>
        <hl-form-item label="主管单位：">
          <hl-input v-model="formData.section" placeholder="请输入" block />
        </hl-form-item>
        <hl-form-item label="专业方向：">
          <hl-input v-model="formData.major" placeholder="请输入" block />
        </hl-form-item>
        <hl-form-item label="队长姓名：">
          <hl-input v-model="formData.leaderName" placeholder="请输入" block />
        </hl-form-item>
        <hl-form-item label="队伍等级：">
          <hl-input v-model="formData.teamLevel" placeholder="请输入" block />
        </hl-form-item>
        <hl-form-item label="响应级别：">
          <hl-input v-model="formData.responseLevel" placeholder="请输入" block />
        </hl-form-item>
      </hl-form>
    </hl-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  setup() {
    const formData = reactive({
      a: '',
      b: '',
      c: '',
      d: '',
      e: '',
      f: '',
    })

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
    const handleRemove = (file: any, fileList: any) => {
      console.log(file, fileList)
    }
    const handlePreview = (file: any) => {
      console.log(file)
    }
    const handleExceed = (files: string | any[], fileList: string | any[]) => {
      alert(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    }
    const beforeRemove = (file: { name: any; }) => {
      // alert(`确定移除 ${file.name}？`)
      return confirm(`确定移除 ${file.name} ？`)
    }

    return {
      formData,
      fileList,
      handleRemove,
      handlePreview,
      handleExceed,
      beforeRemove,
    }
  },
})
</script>

<style>
</style>
