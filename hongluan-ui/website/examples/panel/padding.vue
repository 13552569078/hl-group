<template>
  <hl-group gap="var(--md)">
    <hl-select v-model="padding" clearable placeholder="padding">
      <template v-for="item in options">
        <hl-option v-if="item.divider" :key="item.value" divider />
        <hl-option v-else :key="item.value" :label="item.label" :value="item.value" />
      </template>
    </hl-select>

    <hl-select v-model="bodyPadding" clearable placeholder="body-padding">
      <template v-for="item in options">
        <hl-option v-if="item.divider" :key="item.value" divider />
        <hl-option v-else :key="item.value" :label="item.label" :value="item.value" />
      </template>
    </hl-select>
  </hl-group>

  <hl-row class="m-t-md" gap="var(--xl)">
    <hl-col span="col">
      <hl-panel :padding="padding" :body-padding="bodyPadding">
        <template #header>
          <div class="panel-title">标题</div>
          <div class="panel-header-right">
            <hl-button equal no-fill>
              <hl-icon>
                <two-upload />
              </hl-icon>
            </hl-button>
            <hl-button equal no-fill>
              <hl-icon>
                <two-maximize />
              </hl-icon>
            </hl-button>
          </div>
        </template>
        <div>这是一段body信息</div>
        <template #footer>
          <hl-button class="m-r-md" @click="dialogVisible = false">取 消</hl-button>
          <hl-button type="primary" @click="dialogVisible = false">确 定</hl-button>
        </template>
      </hl-panel>
    </hl-col>

    <hl-col span="col">
      <hl-panel :padding="padding" :body-padding="bodyPadding" borderless>
        <template #header>
          <div class="panel-title">标题</div>
          <div class="panel-header-right">
            <hl-button equal no-fill>
              <hl-icon>
                <two-upload />
              </hl-icon>
            </hl-button>
            <hl-button equal no-fill>
              <hl-icon>
                <two-maximize />
              </hl-icon>
            </hl-button>
          </div>
        </template>
        <div>这是一段body信息</div>
        <template #footer>
          <hl-button class="m-r-md" @click="dialogVisible = false">取 消</hl-button>
          <hl-button type="primary" @click="dialogVisible = false">确 定</hl-button>
        </template>
      </hl-panel>
    </hl-col>
  </hl-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { TwoUpload, TwoMaximize } from '@hongluan-ui/icons'

const options = ref([
  {
    value: '0',
    label: 'none',
  },
  {
    divider: true,
  },
  {
    value: 'var(--sm)',
    label: 'var(--sm)',
  },
  {
    value: 'var(--md)',
    label: 'var(--md)',
  },
  {
    value: 'var(--lg)',
    label: 'var(--lg)',
  },
  {
    value: 'var(--xl)',
    label: 'var(--xl)',
  },
  {
    value: 'var(--xxl)',
    label: 'var(--xxl)',
  },
])
const padding = ref('')
const bodyPadding = ref('')

</script>
