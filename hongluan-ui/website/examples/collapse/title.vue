<template>
  <hl-collapse accordion arrow-left>
    <hl-collapse-item>
      <template #title>
        <hl-group align="items-middle" gap="var(--md)" full>
          <hl-icon type="primary">
            <two-setting />
          </hl-icon>
          <div>一致性 Consistency</div>
        </hl-group>
      </template>
      <p>
        与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
        在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
      </p>
    </hl-collapse-item>
    <hl-collapse-item title="可控 Controllability">
      <hl-collapse accordion arrow-left>
    <hl-collapse-item>
      <template #title>
        <hl-group align="items-middle" gap="var(--md)" full>
          <hl-icon type="primary">
            <two-setting />
          </hl-icon>
          <div>一致性 Consistency</div>
        </hl-group>
      </template>
      <p>
        与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
        在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
      </p>
    </hl-collapse-item>
    <hl-collapse-item title="可控 Controllability">
      <p>
        用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
        结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
      </p>
    </hl-collapse-item>
  </hl-collapse>
    </hl-collapse-item>
  </hl-collapse>
</template>
<script lang="ts" setup>
import { TwoSetting } from '@hongluan-ui/icons'
</script>
