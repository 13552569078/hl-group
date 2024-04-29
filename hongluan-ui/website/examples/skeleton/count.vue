<template>
  <hl-group dir="vertical" align="items-top" gap="var(--md)" style="width: 400px">
    <hl-button @click="setLoading">点击重新加载</hl-button>
    <hl-skeleton style="width: 400px" :loading="loading" animated :count="3">
      <template #template>
        <hl-skeleton-item variant="image" style="width: 400px; height: 267px" />
        <div style="padding: 14px">
          <hl-skeleton-item variant="h3" style="width: 50%" />
          <div
            style="
              display: flex;
              align-items: center;
              justify-items: space-between;
              margin-top: 16px;
              height: 16px;
            "
          >
            <hl-skeleton-item variant="text" style="margin-right: 16px" />
            <hl-skeleton-item variant="text" style="width: 30%" />
          </div>
        </div>
      </template>
      <template #default>
        <hl-panel v-for="item in lists" :key="item.name">
          <img :src="item.imgUrl" class="image multi-content w-full">
          <p class="time m-t-md">{{ item.name }}</p>
          <template #footer>
            <span class="time m-r-md">{{ currentDate }}</span>
            <hl-button type="primary">操作按钮</hl-button>
          </template>
        </hl-panel>
      </template>
    </hl-skeleton>
  </hl-group>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'


const loading = ref(true)
const currentDate = ref('2021-09-23')
const lists = ref([])

const setLoading = () => {
  loading.value = true
  setTimeout(() => (loading.value = false), 2000)
}

onMounted(() => {
  loading.value = false
  lists.value = [
    {
      imgUrl:
            'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
      name: 'Deer',
    },
    {
      imgUrl:
            'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
      name: 'Horse',
    },
    {
      imgUrl:
            'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
      name: 'Mountain Lion',
    },
  ]
})
</script>
