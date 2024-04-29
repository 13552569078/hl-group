<template>
  <hl-row gap="var(--lg)">
    <hl-col span="col">
      <hl-alert type="primary" effect="light" class="p-lg" dashed :closable="false">
        <hl-group align="items-middle" gap="var(--md)">
          <hl-icon type="info" size="xl" :border="1.2" class="no-shrink">
            <fill-data-cloud />
          </hl-icon>
          <div
            class="text-regular"
          >
            主动式样式生成系统是通过config配置文件加样式生成函数mixin来编译的，我们可以完全自定义它所有的样式，并且不会产生冗余的代码。
          </div>
        </hl-group>
      </hl-alert>
    </hl-col>
  </hl-row>
</template>
<script lang="ts" setup>
import { FillDataCloud } from '@hongluan-ui/icons'
</script>

