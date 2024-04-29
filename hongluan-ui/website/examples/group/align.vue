<template>
  <hl-row gap="var(--xl)">
    <hl-col span="col">
      <hl-group align="items-top" class="bg-stripes" style="height:100px; width: 100%">
        <hl-button type="primary" class="w-sm">items-top</hl-button>
      </hl-group>
    </hl-col>
    <hl-col span="col">
      <hl-group align="items-middle" class="bg-stripes" style="height:100px; width: 100%">
        <hl-button type="primary" class="w-sm">items-middle</hl-button>
      </hl-group>
    </hl-col>
    <hl-col span="col">
      <hl-group align="items-bottom" class="bg-stripes" style="height:100px; width: 100%">
        <hl-button type="primary" class="w-sm">items-bottom</hl-button>
      </hl-group>
    </hl-col>
  </hl-row>

  <hl-row gap="var(--xl)" class="m-t-xxl">
    <hl-col span="col">
      <hl-group align="items-left" class="bg-stripes" style="height:100px; width: 100%">
        <hl-button type="primary" class="w-sm">items-left</hl-button>
      </hl-group>
    </hl-col>
    <hl-col span="col">
      <hl-group align="items-center" class="bg-stripes" style="height:100px; width: 100%">
        <hl-button type="primary" class="w-sm">items-center</hl-button>
      </hl-group>
    </hl-col>
    <hl-col span="col">
      <hl-group align="items-right" class="bg-stripes" style="height:100px; width: 100%">
        <hl-button type="primary" class="w-sm">items-right</hl-button>
      </hl-group>
    </hl-col>
  </hl-row>

  <h4 class="m-t-xl m-b-xxl">使用案例：</h4>
  <hl-row class="m-t-xxl">
    <hl-col span="col">
      <hl-group align="items-middle" gap="var(--md)">
        <hl-button type="primary" equal round outline>
          <template #icon>
            <hl-icon><two-phone /></hl-icon>
          </template>
        </hl-button>
        <hl-thumb round type="primary" size="xxxl">
          <span>段</span>
        </hl-thumb>
        <hl-button type="primary" equal round outline>
          <template #icon>
            <hl-icon><two-mail /></hl-icon>
          </template>
        </hl-button>
      </hl-group>
    </hl-col>

    <hl-col span="col">
      <hl-group align="items-top" gap="var(--md)">
        <hl-icon type="info" size="xl" :border="1.2" class="no-shrink">
          <two-info />
        </hl-icon>
        <hl-group dir="vertical" gap="var(--xxs)">
          <h4>主动式CSS生成系统</h4>
          <div>
            主动式样式生成系统是通过config配置文件加样式生成函数mixin来编译的，我们可以完全自定义它所有的样式，并且不会产生冗余的代码。
          </div>
        </hl-group>
      </hl-group>
    </hl-col>
  </hl-row>
</template>
<script lang="ts" setup>
import { TwoPhone, TwoMail, TwoInfo } from '@hongluan-ui/icons'
</script>
