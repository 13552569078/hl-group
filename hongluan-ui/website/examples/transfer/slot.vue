<template>
  <hl-row>
    <p>使用 render-content 自定义数据项</p>
    <hl-col span="md:col-24">
      <hl-transfer
        v-model="leftValue"
        block
        filterable
        :left-default-checked="[2, 3]"
        :right-default-checked="[1]"
        :render-content="renderFunc"
        :titles="['Source', 'Target']"
        :button-texts="['到左边', '到右边']"
        :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}'
        }"
        :data="data"
        @change="handleChange"
      >
        <template #left-footer>
          <hl-button>操作</hl-button>
        </template>
        <template #right-footer>
          <hl-button>操作</hl-button>
        </template>
      </hl-transfer>
    </hl-col>
    <p class="m-t-lg">使用 scoped-slot 自定义数据项</p>
    <hl-col span="md:col-24">
      <hl-transfer
        ref="transferRef"
        v-model="rightValue"
        block
        filterable
        :left-default-checked="[2, 3]"
        :right-default-checked="[1]"
        :titles="['Source', 'Target']"
        :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}'
        }"
        :data="data"
        @change="handleChange"
      >
        <template #default="{option}">
          <hl-thumb round type="primary" size="xs">
            <span>姓名</span>
          </hl-thumb>
          <span>{{ option.key }} - {{ option.label }}</span>
        </template>
        <template #left-footer>
          <hl-group full align="items-left">
            <hl-button equal no-fill @click="addToRight">
              <template #icon>
                <hl-icon>
                  <two-folder-in />
                </hl-icon>
              </template>
            </hl-button>
          </hl-group>
        </template>
        <template #right-footer>
          <hl-button type="danger" equal no-fill @click="addToLeft">
            <template #icon>
              <hl-icon>
                <two-delete />
              </hl-icon>
            </template>
          </hl-button>
        </template>
        <template #buttons>
          <div style="display: none"></div>
        </template>
      </hl-transfer>
    </hl-col>
  </hl-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { TwoFolderIn, TwoDelete } from '@hongluan-ui/icons'


const generateData = () => {
  const data = []
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `备选项 ${i}`,
      disabled: i % 4 === 0,
    })
  }
  return data
}
const data = ref(generateData())
const leftValue = ref([1])
const rightValue = ref([1])
const transferRef = ref(null)

const renderFunc = (h, option) => {
  return h('span', null, option.key, ' - ', option.label)
}
const addToRight = () => {
  transferRef.value.addToRight()
}
const addToLeft = () => {
  transferRef.value.addToLeft()
}
const handleChange = (value, direction, movedKeys) => {
  console.log(value, direction, movedKeys)
}


</script>

