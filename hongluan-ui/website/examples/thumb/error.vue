<template>
  <hl-row>
    <hl-col span="md:col-12">
      <p>默认</p>
      <hl-thumb
        src="http://test.com/1.png"
        style="width: 100%; height:100px"
      />
    </hl-col>
    <hl-col span="md:col-12">
      <p>自定义</p>
      <hl-thumb src="http://test.com/1.png" style="width: 100%; height:100px">
        <template #error>
          <hl-icon><two-close /></hl-icon>
        </template>
      </hl-thumb>
    </hl-col>
  </hl-row>
</template>
<script lang="ts" setup>
import { TwoClose } from '@hongluan-ui/icons'

</script>
