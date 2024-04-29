<template>
  <hl-group full="full-x" indent="var(--md)">
    <hl-icon type="primary" size="lg" :border="1.2" gradient transition>
      <two-camera-off />
    </hl-icon>
    <hl-icon type="danger" size="lg" :border="1.2" gradient transition>
      <two-layout />
    </hl-icon>
    <hl-icon type="warning" size="lg" :border="1.2" gradient transition>
      <two-user-group />
    </hl-icon>
    <hl-icon type="success" size="lg" :border="1.2" gradient transition>
      <two-server />
    </hl-icon>
    <hl-icon type="info" size="lg" :border="1.2" gradient transition>
      <two-news />
    </hl-icon>
    <hl-icon type="danger" size="lg" :border="1.2" gradient transition>
      <two-setting />
    </hl-icon>
    <hl-icon type="success" size="lg" :border="1.2" gradient transition>
      <two-pic />
    </hl-icon>
    <hl-icon size="lg" :border="1.2" start-color="#fff" color="#888" gradient transition>
      <two-talk />
    </hl-icon>
  </hl-group>
</template>
<script lang="ts" setup>
import { TwoCameraOff, TwoLayout, TwoUserGroup, TwoServer, TwoNews, TwoSetting, TwoPic, TwoTalk } from '@hongluan-ui/icons'
</script>
