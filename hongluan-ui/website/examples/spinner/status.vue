<template>
  <hl-row>
    <hl-col span="col" class="display-flex items-center">
      <hl-group dir="vertical" align="items-middle" gap="2vw">
        <h6>默认方式</h6>
        <hl-spinner :status="status" @click="handle('')" />
        <hl-group gap="4vw">
          <hl-group block merge indent>
            <hl-button :disabled="disabled" @click="handle('success')">成功</hl-button>
            <hl-button :disabled="disabled" @click="handle('error')">失败</hl-button>
            <hl-button :disabled="disabled" @click="handle('warning')">警告</hl-button>
            <hl-button :disabled="disabled" @click="handle('info')">信息</hl-button>
          </hl-group>
        </hl-group>
      </hl-group>
    </hl-col>

    <hl-col span="col" class="display-flex items-center">
      <hl-group dir="vertical" align="items-middle" gap="2vw">
        <h6>slot方式</h6>
        <hl-spinner :status="status1" @click="handle1('')">
          <template #error>提交错误</template>
          <template #success>
            <hl-icon>
              <two-heart />
            </hl-icon>
          </template>
          <template #warning>
            <hl-icon>
              <two-alert />
            </hl-icon>
          </template>
          <template #info>
            <hl-icon>
              <two-info />
            </hl-icon>
          </template>
        </hl-spinner>
        <hl-group gap="4vw">
          <hl-group block merge indent>
            <hl-button :disabled="disabled1" @click="handle1('success')">成功</hl-button>
            <hl-button :disabled="disabled1" @click="handle1('error')">失败</hl-button>
            <hl-button :disabled="disabled1" @click="handle1('warning')">警告</hl-button>
            <hl-button :disabled="disabled1" @click="handle1('info')">信息</hl-button>
          </hl-group>
        </hl-group>
      </hl-group>
    </hl-col>
  </hl-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { TwoHeart, TwoAlert, TwoInfo } from '@hongluan-ui/icons'

const disabled = ref(false)
const disabled1 = ref(false)
const status = ref('')
const status1 = ref('')

const handle = s => {
  status.value = s
  disabled.value = true
  setTimeout(() => {
    status.value = ''
    disabled.value = false
  }, 2000)
}
const handle1 = s =>{
  status1.value = s
  disabled1.value = true
  setTimeout(() => {
    status1.value = ''
    disabled1.value = false
  }, 2000)
}

</script>
