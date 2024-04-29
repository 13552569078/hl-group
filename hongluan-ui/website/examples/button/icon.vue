<template>
  <hl-group gap="var(--sm)">
    <hl-button type="primary" icon-position="left">
      编辑内容
      <template #icon>
        <hl-icon>
          <!-- 关于文档内two前缀说明，请参考icon文档 -->
          <two-edit />
        </hl-icon>
      </template>
    </hl-button>
    <hl-button type="danger" icon-position="right">
      搜索
      <template #icon>
        <hl-icon>
          <two-search />
        </hl-icon>
      </template>
    </hl-button>
    <hl-button type="primary" equal>
      <template #icon>
        <hl-icon>
          <two-search />
        </hl-icon>
      </template>
    </hl-button>
    <hl-button type="primary" equal round no-fill>
      <template #icon>
        <hl-icon>
          <two-delete />
        </hl-icon>
      </template>
    </hl-button>
    <hl-button type="primary" icon-position="right" equal round effect="light">
      <hl-icon>
        <two-search />
      </hl-icon>
    </hl-button>
    <hl-button type="primary" icon-position="left">
      <template #icon>
        <hl-icon>
          <svg viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g stroke="none" stroke-width="1" fill="currentColor" fill-rule="evenodd">
              <path d="M3.81085186,7.8741634 C3.08368425,8.51551024 2.625,9.4541894 2.625,10.5 L2.625,13.475 C2.625,13.6606894 2.66115115,13.8379353 2.72679927,14.0000835 L0.525,14 C0.235050506,14 -2.25375274e-14,13.7649495 -2.25375274e-14,13.475 L-2.25375274e-14,10.5 C-2.25375274e-14,9.05025253 1.17525253,7.875 2.625,7.875 L3.81085186,7.8741634 Z M5.25,0 C5.51327888,0 5.76976817,0.0290696479 6.01643329,0.0841743439 C5.01529025,0.886619755 4.375,2.11853598 4.375,3.5 C4.375,4.88146402 5.01529025,6.11338024 6.01529372,6.91517165 C5.76976817,6.97093035 5.51327888,7 5.25,7 C3.31700338,7 1.75,5.43299662 1.75,3.5 C1.75,1.56700338 3.31700338,0 5.25,0 Z" opacity="0.319999993" />
              <path d="M11.375,7.875 C12.8247475,7.875 14,9.05025253 14,10.5 L14,13.475 C14,13.7649495 13.7649495,14 13.475,14 L4.025,14 C3.73505051,14 3.5,13.7649495 3.5,13.475 L3.5,10.5 C3.5,9.05025253 4.67525253,7.875 6.125,7.875 L11.375,7.875 Z M8.75,0 C10.6829966,0 12.25,1.56700338 12.25,3.5 C12.25,5.43299662 10.6829966,7 8.75,7 C6.81700338,7 5.25,5.43299662 5.25,3.5 C5.25,1.56700338 6.81700338,0 8.75,0 Z" />
            </g>
          </svg>
        </hl-icon>
      </template>
      自定义图标
    </hl-button>

    <hl-button type="danger" icon-position="right">
      <template #icon>
        <hl-icon>
          <svg t="1611553326339" viewBox="0 0 1024 1024" fill="currentColor" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M454.656 544.064c14.08 0 25.6 11.52 25.6 25.6v198.4a224 224 0 1 1-224-224h198.4z m-198.4-512A224 224 0 0 1 479.872 243.84l0.384 12.288v198.4a25.6 25.6 0 0 1-20.48 25.088l-5.12 0.512h-198.4a224 224 0 1 1 0-448z m512 0a224 224 0 0 1 0 448h-198.4a25.6 25.6 0 0 1-25.6-25.6v-198.4a224 224 0 0 1 224-224z" />
            <path d="M768.256 992.064a224 224 0 0 0 0-448h-198.4a25.6 25.6 0 0 0-25.6 25.6v198.4a224 224 0 0 0 224 224z" opacity=".32" />
          </svg>
        </hl-icon>
      </template>
      自定义图标
    </hl-button>
  </hl-group>
</template>
<script lang="ts" setup>
import { TwoEdit, TwoSearch, TwoDelete } from '@hongluan-ui/icons'
</script>
