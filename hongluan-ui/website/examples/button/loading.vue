<template>
  <hl-group gap="var(--sm)">
    <hl-button :loading="true">加载中</hl-button>
    <hl-button type="primary" :loading="true">加载中</hl-button>
    <hl-button type="warning" effect="light" :loading="true">加载中</hl-button>
    <hl-button type="warning" :loading="true" outline>加载中</hl-button>
    <hl-button type="danger" :loading="true" equal>
      <template #icon>
        <hl-icon>
          <two-search />
        </hl-icon>
      </template>
    </hl-button>
  </hl-group>
</template>
<script lang="ts" setup>
import { TwoSearch } from '@hongluan-ui/icons'
</script>
