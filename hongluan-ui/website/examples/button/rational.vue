<template>
  <hl-row>
    <hl-col span="col-24">
      <hl-button type="primary" icon-position="left" class="m-r-md" style="width:200px">
        Icon Left
        <template #icon>
          <hl-icon>
            <two-arrow-left />
          </hl-icon>
        </template>
      </hl-button>
      <hl-button type="primary" icon-position="right" class="m-r-md" style="width:200px">
        Icon Right
        <template #icon>
          <hl-icon>
            <two-arrow-right />
          </hl-icon>
        </template>
      </hl-button>
    </hl-col>
    <hl-col span="col-24" class="m-t-md">
      <hl-button type="primary" icon-position="left" class="m-r-md" style="width:200px" rational>
        Icon Left
        <template #icon>
          <hl-icon>
            <two-arrow-left />
          </hl-icon>
        </template>
      </hl-button>
      <hl-button type="primary" icon-position="right" class="m-r-md" style="width:200px" rational>
        Icon Right
        <template #icon>
          <hl-icon>
            <two-arrow-right />
          </hl-icon>
        </template>
      </hl-button>
    </hl-col>
  </hl-row>
</template>
<script lang="ts" setup>
import { TwoArrowRight, TwoArrowLeft } from '@hongluan-ui/icons'
</script>
