<template>
  <hl-row layout="flow" count="xxl:count-3 lg:count-2" gap="var(--lg)">
    <hl-col span="col">
      <hl-panel class="main-panel" borderless padding="var(--xl)" footer-padding="0" header-class="p-y-lg" footer-class="items-left" style="--panel-header-height: auto">
        <template #header>
          <hb-data-collect gap="var(--sm)" full="full-x" padding="0">
            <hl-thumb size="lg" class="static" radius fit="cover" src="https://randomuser.me/api/portraits/women/17.jpg" />
            <hl-group dir="vertical" full="full-x">
              <h5 class="title">格蕾丝·格林</h5>
              <span class="sub-title font-md font-bold">PHP、SQLite、Artisan CLI</span>
            </hl-group>
          </hb-data-collect>
          <div class="panel-header-right">
            <hl-button equal no-fill>
              <hl-icon><two-upload /></hl-icon>
            </hl-button>
            <hl-button equal no-fill>
              <hl-icon><two-maximize /></hl-icon>
            </hl-button>
          </div>
        </template>

        <hl-group dir="vertical">
          <hl-thumb full class="m-b-md" radius fit="cover" src="https://assets-global.website-files.com/5bfd6f4468ee7943c2d331dd/5f86e31759dadc8ffa85ca8d_small%20(1).jpg" />
          <p style="line-height: 2">
            习近平指出，设立可持续发展大数据国际研究中心是我在第75届联合国大会上宣布的支持落实联合国2030年可持续发展议程的重要举措。2030年议程为各国发展和国际发展合作提出了明确目标。当前，世界正遭受新冠肺炎疫情巨大冲击，科技创新和大数据应用将有利于推动国际社会克服困难、在全球范围内落实2030年议程。
          </p>
        </hl-group>

        <hl-group gap="var(--md)" class="m-t-lg">
          <hl-button effect="light" icon-position="left">
            12
            <template #icon>
              <hl-icon><fill-message /></hl-icon>
            </template>
          </hl-button>

          <hl-button type="danger" effect="light" icon-position="left">
            150
            <template #icon>
              <hl-icon><fill-heart /></hl-icon>
            </template>
          </hl-button>
        </hl-group>
      </hl-panel>
    </hl-col>
    <hl-col span="col">
      <hl-panel class="main-panel" borderless padding="var(--xl)" header-class="p-y-lg" style="--panel-header-height: auto">
        <template #header>
          <hb-data-collect gap="var(--sm)" full="full-x" padding="0">
            <hl-thumb size="lg" type="primary" class="static" round fit="cover"><span>GL</span></hl-thumb>
            <hl-group dir="vertical" full="full-x">
              <h5 class="title">Grace·green</h5>
              <span class="sub-title font-md font-bold">PHP、SQLite、Artisan CLI</span>
            </hl-group>
          </hb-data-collect>
          <div class="panel-header-right">
            <hl-button equal no-fill>
              <hl-icon><two-more /></hl-icon>
            </hl-button>
          </div>
        </template>

        <hl-group dir="vertical">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
            galley of type and scrambled. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when
            an unknown printer took a galley of type and scrambled.
          </p>
        </hl-group>

        <hl-group gap="var(--md)" class="m-t-lg">
          <hl-button effect="light" icon-position="left">
            12
            <template #icon>
              <hl-icon><fill-message /></hl-icon>
            </template>
          </hl-button>
          <hl-button type="danger" effect="light" icon-position="left">
            150
            <template #icon>
              <hl-icon><fill-heart /></hl-icon>
            </template>
          </hl-button>
        </hl-group>
      </hl-panel>
    </hl-col>
    <hl-col span="col">
      <hl-panel class="main-panel" borderless padding="var(--xl)" header-class="p-y-lg" style="--panel-header-height: auto">
        <template #header>
          <hl-group dir="vertical" full="full-x" gap="var(--xs)">
            <h3 class="title">习近平向可持续发展大数据国际论坛致贺信</h3>
            <hl-group>
              <span class="text-light font-sm">2021-09-06 11:25:26　</span>
              <span class="text-light font-sm font-bold">来源: 新华网</span>
            </hl-group>
          </hl-group>
        </template>
        <div style="line-height: 2">
          <p>新华社北京9月6日电9月6日，国家主席习近平向可持续发展大数据国际研究中心成立大会暨2021年可持续发展大数据国际论坛致贺信。</p>
          <p>
            习近平指出，设立可持续发展大数据国际研究中心是我在第75届联合国大会上宣布的支持落实联合国2030年可持续发展议程的重要举措。2030年议程为各国发展和国际发展合作提出了明确目标。当前，世界正遭受新冠肺炎疫情巨大冲击，科技创新和大数据应用将有利于推动国际社会克服困难、在全球范围内落实2030年议程。
          </p>
        </div>
      </hl-panel>
    </hl-col>
    <hl-col span="col">
      <hl-panel class="main-panel" borderless padding="var(--xl)" footer-padding="0" header-class="p-t-lg p-b-lg" footer-class="item-left" style="--panel-header-height: auto">
        <template #header>
          <hb-data-collect gap="var(--sm)" full="full-x" padding="0">
            <hl-thumb size="lg" class="static" radius fit="cover" src="https://randomuser.me/api/portraits/women/40.jpg" />
            <hl-group dir="vertical" full="full-x">
              <h5 class="title">格蕾丝·格林</h5>
              <span class="sub-title font-md font-bold">PHP、SQLite、Artisan CLI</span>
            </hl-group>
          </hb-data-collect>
          <div class="panel-header-right">
            <hl-button equal no-fill>
              <hl-icon><two-upload /></hl-icon>
            </hl-button>
            <hl-button equal no-fill>
              <hl-icon><two-maximize /></hl-icon>
            </hl-button>
          </div>
        </template>

        <hl-group dir="vertical">
          <hl-thumb full class="static m-b-md" radius fit="cover" src="https://assets-global.website-files.com/5bfd6f4468ee7943c2d331dd/60f9b4bc42c4f1f7369232e2_package-mockup-preview-1.jpg" />
          <p style="line-height: 2">
            习近平指出，设立可持续发展大数据国际研究中心是我在第75届联合国大会上宣布的支持落实联合国2030年可持续发展议程的重要举措。2030年议程为各国发展和国际发展合作提出了明确目标。
          </p>
        </hl-group>
        <hl-group block gap="var(--sm)" class="m-t-lg">
          <hl-button effect="light" icon-position="left">
            12
            <template #icon>
              <hl-icon><fill-message /></hl-icon>
            </template>
          </hl-button>

          <hl-button type="danger" effect="light" icon-position="left">
            150
            <template #icon>
              <hl-icon><fill-heart /></hl-icon>
            </template>
          </hl-button>
        </hl-group>

        <hl-group class="m-t-lg" style="padding-left: calc(var(--lg))" full="full-x" gap="var(--md)">
          <hl-thumb size="md" class="static" radius fit="cover" src="https://randomuser.me/api/portraits/women/44.jpg" />
          <hl-group dir="vertical">
            <hl-group full="full-x" align="items-between">
              <hl-group align="items-middle" gap="var(--md)">
                <span class="font-bold">Leah Chatman</span>
                <span class="font-sm text-light">8分钟前</span>
              </hl-group>
              <span class="static text-secondary">回复</span>
            </hl-group>
            <div class="font-sm">Lorem Ipsum is simply dummy text of the printing.</div>
          </hl-group>
        </hl-group>
        <hl-group class="m-t-lg" style="padding-left: calc(var(--lg))" full="full-x" gap="var(--md)">
          <hl-thumb size="md" class="static" radius fit="cover" src="https://uifaces.co/our-content/donated/1H_7AxP0.jpg" />
          <hl-group dir="vertical">
            <hl-group full="full-x" align="items-between">
              <hl-group align="items-middle" gap="var(--md)">
                <h6 class="font-bold">Phoenix Baker</h6>
                <span class="font-sm text-light">20分钟前</span>
              </hl-group>
              <span class="static text-secondary">回复</span>
            </hl-group>
            <div class="font-sm">Long before you sit dow to put digital pen to paper you need</div>
          </hl-group>
        </hl-group>

        <hl-group class="m-t-lg border-top p-t-lg" full="full-x">
          <hl-input v-model="input" placeholder="请输入内容" class="border-none">
            <template #suffix>
              <hl-icon><two-send /></hl-icon>
            </template>
          </hl-input>
        </hl-group>
      </hl-panel>
    </hl-col>
  </hl-row>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const input = ref('')
    return {
      input,
    }
  },
})
</script>
