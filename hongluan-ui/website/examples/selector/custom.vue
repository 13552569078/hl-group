<template>
  <hl-row align="items-center" gap="var(--lg)">
    <hl-col span="md:col-12 lg:col-10">
      <p class="m-b-sm">自定义多选Icon</p>
      <hl-selector
        ref="selector3"
        clearable
        block
        multiple
        @remove-tag="removeIcon"
        @clear="clearIcons"
      >
        <hl-row
          ref="selector3Dom"
          layout="grid"
          gap="var(--md)"
          class="p-xl selector-content font-h2"
          count="count-8"
          @click="selectIcon"
        >
          <hl-col span="col" title="😀笑嘻嘻">
            <span>😀</span>
          </hl-col>
          <hl-col span="col" title="😁笑嘻嘻的脸，含笑的眼睛">
            <span>😁</span>
          </hl-col>
          <hl-col span="col" title="😂脸上带着喜悦的泪水">
            <span>😂</span>
          </hl-col>
          <hl-col span="col" title="😃开口笑脸">
            <span>😃</span>
          </hl-col>
          <hl-col span="col" title="😄开口笑脸和微笑的眼睛">
            <span>😄</span>
          </hl-col>
          <hl-col span="col" title="😅笑脸淌冷汗">
            <span>😅</span>
          </hl-col>
          <hl-col span="col" title="😆开口笑紧闭的眼睛">
            <span>😆</span>
          </hl-col>
          <hl-col span="col" title="😉眨眼表情">
            <span>😉</span>
          </hl-col>
          <hl-col span="col" title="😊面带微笑的眼睛">
            <span>😊</span>
          </hl-col>
          <hl-col span="col" title="😋品尝美味食物表情">
            <span>😋</span>
          </hl-col>
          <hl-col span="col" title="😎太阳镜笑脸">
            <span>😎</span>
          </hl-col>
          <hl-col span="col" title="😍面带心形眼睛">
            <span>😍</span>
          </hl-col>
          <hl-col span="col" title="😘飞吻表情">
            <span>😘</span>
          </hl-col>
          <hl-col span="col" title="😗亲吻表情">
            <span>😗</span>
          </hl-col>
          <hl-col span="col" title="😙含笑亲吻表情">
            <span>😙</span>
          </hl-col>
          <hl-col span="col" title="😚闭眼亲吻表情">
            <span>😚</span>
          </hl-col>
          <hl-col span="col" title="😇光环笑脸">
            <span>😇</span>
          </hl-col>
          <hl-col span="col" title="😐中性面">
            <span>😐</span>
          </hl-col>
          <hl-col span="col" title="😑面无表情">
            <span>😑</span>
          </hl-col>
          <hl-col span="col" title="😶没有嘴的脸">
            <span>😶</span>
          </hl-col>
          <hl-col span="col">
            <span>😏</span>
          </hl-col>
          <hl-col span="col">
            <span>😣</span>
          </hl-col>
          <hl-col span="col">
            <span>😥</span>
          </hl-col>
          <hl-col span="col">
            <span>😮</span>
          </hl-col>
          <hl-col span="col">
            <span>😯</span>
          </hl-col>
          <hl-col span="col" title="😪困">
            <span>😪</span>
          </hl-col>
          <hl-col span="col">
            <span>😫</span>
          </hl-col>
          <hl-col span="col">
            <span>😴</span>
          </hl-col>
          <hl-col span="col" title="😌安心">
            <span>😌</span>
          </hl-col>
          <hl-col span="col" title="😛吐舌头">
            <span>😛</span>
          </hl-col>
          <hl-col span="col">
            <span>😜</span>
          </hl-col>
          <hl-col span="col">
            <span>😝</span>
          </hl-col>
          <hl-col span="col">
            <span>😒</span>
          </hl-col>
          <hl-col span="col">
            <span>😓</span>
          </hl-col>
          <hl-col span="col">
            <span>😔</span>
          </hl-col>
          <hl-col span="col">
            <span>😕</span>
          </hl-col>
          <hl-col span="col" title="😲惊讶">
            <span>😲</span>
          </hl-col>
          <hl-col span="col" title="😷戴口罩">
            <span>😷</span>
          </hl-col>
          <hl-col span="col" title="😖被打败">
            <span>😖</span>
          </hl-col>
          <hl-col span="col">
            <span>😞</span>
          </hl-col>
          <hl-col span="col">
            <span>😟</span>
          </hl-col>
          <hl-col span="col" title="😤面带胜利">
            <span>😤</span>
          </hl-col>
          <hl-col span="col" title="😢哭泣的脸">
            <span>😢</span>
          </hl-col>
          <hl-col span="col" title="😭大声哭泣的脸">
            <span>😭</span>
          </hl-col>
          <hl-col span="col" title="😦张嘴哭">
            <span>😦</span>
          </hl-col>
          <hl-col span="col" title="😧痛苦">
            <span>😧</span>
          </hl-col>
          <hl-col span="col" title="😨恐惧">
            <span>😨</span>
          </hl-col>
          <hl-col span="col">
            <span>😬</span>
          </hl-col>
          <hl-col span="col" title="😰淌冷汗">
            <span>😰</span>
          </hl-col>
          <hl-col span="col" title="😱尖叫恐惧">
            <span>😱</span>
          </hl-col>
          <hl-col span="col" title="😳红扑扑的脸蛋">
            <span>😳</span>
          </hl-col>
          <hl-col span="col" title="😵晕">
            <span>😵</span>
          </hl-col>
          <hl-col span="col">
            <span>😡</span>
          </hl-col>
          <hl-col span="col">
            <span>😠</span>
          </hl-col>
          <hl-col span="col">
            <span>😈</span>
          </hl-col>
          <hl-col span="col">
            <span>👿</span>
          </hl-col>
          <hl-col span="col" title="👹日本食人魔">
            <span>👹</span>
          </hl-col>
          <hl-col span="col">
            <span>👺</span>
          </hl-col>
          <hl-col span="col">
            <span>💀</span>
          </hl-col>
          <hl-col span="col">
            <span>☠</span>
          </hl-col>
          <hl-col span="col">
            <span>👻</span>
          </hl-col>
          <hl-col span="col">
            <span>👽</span>
          </hl-col>
        </hl-row>
        <template #tag="{ tag }">
          <span style="width: 20px;display: inline-block;vertical-align: middle;" v-html="tag.text"></span>
        </template>
      </hl-selector>
    </hl-col>
    <hl-col span="md:col-12 lg:col-10">
      <p class="m-b-sm">自定义多选视频</p>
      <hl-selector
        ref="selector4"
        clearable
        block
        multiple
        class="video-tags"
        @remove-tag="removeVideo"
        @clear="clearVideos"
      >
        <div ref="selector4Dom" class="selector-content video-list clearfix" style="width:300px">
          <video
            v-for="url in videoUrls"
            :key="url"
            width="120"
            height="100"
            class="m-l-sm m-r-sm"
            :src="url"
            @click.stop="chooseVideo(url)"
          ></video>
        </div>
        <template #tag="{ tag }">
          <video
            width="100"
            height="100"
            style="object-fit:cover"
            :src="tag.text"
            controls="controls"
          ></video>
        </template>
      </hl-selector>
    </hl-col>
  </hl-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const icons = ref([])
const videos = ref([])
const videoUrls = ref([
  'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
  'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
  'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
  'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
  'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
  'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
  'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
])
const selector3 = ref(null)
const selector4 = ref(null)

const selectIcon = evt => {
  console.log(evt)
  if (evt.target.tagName.toUpperCase() === 'SPAN') {
    if (!icons.value.includes(evt.target.innerHTML)) {
      icons.value.push(evt.target.innerHTML)
    }
    selector3.value.setValue(icons.value)
  }
}
const chooseIcon = name => {
  if (!icons.value.includes(name)) {
    icons.value.push(name)
  }
  selector3.value.setValue(icons.value)
}
const clearIcons = () => {
  icons.value = []
}
const removeIcon = tag => {
  icons.value = icons.value.filter(i => i !== tag.text)
}
const chooseVideo = name => {
  if (!videos.value.includes(name)) {
    videos.value.push(name)
  }
  selector4.value.setValue(videos.value)
}
const clearVideos = () => {
  videos.value = []
}
const removeVideo = tag => {
  videos.value = videos.value.filter(i => i !== tag.text)
}

</script>
<style>
.video-tags .hl-tag{
  height: 100%;
}
</style>
