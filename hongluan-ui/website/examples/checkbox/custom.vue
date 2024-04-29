<template>
  <hl-row gap="var(--md)">
    <hl-col span="col" class="text-center">
      <p class="m-b-md">使用group组件实现自定义样式</p>
      <hl-group style="height: 48px" gap="var(--md)">
        <hl-checkbox v-model="checkboxGroup1" label="Edge" custom>
          <hl-thumb src="https://cdn.jsdelivr.net/npm/@browser-logos/edge/edge_128x128.png" />
        </hl-checkbox>
        <hl-checkbox v-model="checkboxGroup1" label="Firefox" custom>
          <hl-thumb src="https://cdn.jsdelivr.net/npm/@browser-logos/firefox/firefox_128x128.png" />
        </hl-checkbox>
        <hl-checkbox v-model="checkboxGroup1" label="Chrome" custom>
          <hl-thumb src="https://cdn.jsdelivr.net/npm/@browser-logos/chrome/chrome_128x128.png" />
        </hl-checkbox>
        <hl-checkbox v-model="checkboxGroup1" label="Safari" custom>
          <hl-thumb src="https://cdn.jsdelivr.net/npm/@browser-logos/safari/safari_128x128.png" />
        </hl-checkbox>
      </hl-group>
      <p class="bg-primary-light-5 text-primary p-sm m-t-md">{{ checkboxGroup1 }}</p>
    </hl-col>
    <hl-col span="col" class="text-center">
      <p class="m-b-md">使用checkbox-group组件自定义样式</p>
      <hl-checkbox-group v-model="checkboxGroup2" custom type="primary" gap="6px">
        <hl-checkbox label="选项一">
          <div class="p-sm border radius-lg checked:bg-primary-light-5 checked:border-primary checked:text-primary">选项一</div>
        </hl-checkbox>
        <hl-checkbox label="选项二">
          <div class="p-sm border radius-lg checked:bg-primary-light-5 checked:border-primary checked:text-primary">选项二</div>
        </hl-checkbox>
      </hl-checkbox-group>
      <p class="bg-primary-light-5 text-primary p-sm m-t-md">{{ checkboxGroup2 }}</p>
    </hl-col>

    <hl-col span="col" class="text-center">
      <p class="m-b-md">使用button组件来定义样式</p>
      <hl-checkbox-group v-model="checkboxGroup2" style="height: 48px" custom type="primary" gap="6px">
        <hl-checkbox v-for="city in cities" :key="city" :label="city">
          <hl-button>{{ city }}</hl-button>
        </hl-checkbox>
      </hl-checkbox-group>
      <p class="bg-primary-light-5 text-primary p-sm m-t-md">{{ checkboxGroup2 }}</p>
    </hl-col>
  </hl-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const cityOptions = ['选项一', '选项二']

const checkboxGroup1 = ref(['Safari'])
const checkboxGroup2 = ref(['选项一'])
const cities = ref(cityOptions)

</script>
