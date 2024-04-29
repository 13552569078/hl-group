<template>
  <hl-group gap="var(--sm)">
    <hl-group merge indent>
      <hl-button type="primary" icon-position="left">
        上一页
        <template #icon>
          <hl-icon>
            <two-chevron-left />
          </hl-icon>
        </template>
      </hl-button>
      <hl-button type="primary" icon-position="right">
        下一页
        <template #icon>
          <hl-icon>
            <two-chevron-right />
          </hl-icon>
        </template>
      </hl-button>
    </hl-group>
    <hl-group merge indent>
      <hl-button type="primary">
        <hl-icon>
          <two-edit />
        </hl-icon>
      </hl-button>
      <hl-button type="primary">
        <hl-icon>
          <two-share />
        </hl-icon>
      </hl-button>
      <hl-button type="primary">
        <hl-icon>
          <two-delete />
        </hl-icon>
      </hl-button>
    </hl-group>
    <hl-group merge indent>
      <hl-button type="primary" outline>上一页</hl-button>
      <hl-button type="primary" outline>下一页</hl-button>
    </hl-group>
  </hl-group>
</template>
<script lang="ts" setup>
import { TwoChevronLeft, TwoChevronRight, TwoEdit, TwoShare, TwoDelete } from '@hongluan-ui/icons'
</script>
