<template>
  <hl-row>
    <hl-col span="md:col-8" class="display-flex md:items-right">
      <hl-group dir="vertical" class="p-xxl" style="width: 20rem">
        <hl-group align="items-middle" gap="var(--xs)" class="m-y-xxl" @click="$router.go(-1)">
          <img src="../../assets/images/logo.svg" alt="hongluan.ui">
          <h4>HONGLUAN · PRO</h4>
        </hl-group>
        <hl-steps size="var(--xxl)" dir="vertical" :active="step" block class="static m-t-xxl">
          <hl-step title="活动按期开始" description="设置您的帐户详细信息" />
          <hl-step title="通过审核" description="设置您的帐户设置" />
          <hl-step title="完成" description="我们出发！" />
        </hl-steps>
      </hl-group>
    </hl-col>
    <hl-col span="md:col-16" style="background-color: #fff; min-height: 100vh">
      <step-1 v-if="step1Loaded" v-show="step1Show" @next="next" />
      <step-2 v-if="step2Loaded" v-show="step2Show" @next="next" @prev="prev" />
      <step-3 v-if="step3Loaded" v-show="step3Show" />
    </hl-col>
  </hl-row>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useLazyPane } from 'hongluan-hooks'
import Step1 from './sign-up-step/step1.vue'
import Step2 from './sign-up-step/step2.vue'
import Step3 from './sign-up-step/step3.vue'

export default defineComponent({
  components: {
    Step1,
    Step2,
    Step3,
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const step = ref(1)

    const refreshQuery = () => {
      router.push({ query: { step: step.value } })
    }

    const { loaded: step1Loaded, show: step1Show } = useLazyPane(step, 1, refreshQuery)
    const { loaded: step2Loaded, show: step2Show } = useLazyPane(step, 2, refreshQuery)
    const { loaded: step3Loaded, show: step3Show } = useLazyPane(step, 3, refreshQuery)

    const next = () => {
      step.value++
    }
    const prev = () => {
      step.value--
    }

    const setStep = () => {
      step.value = !isNaN(Number(route.query.step)) ? Number(route.query.step) : 1
    }

    watch(() => route.query, () => {
      setStep()
    }, {
      flush: 'post',
    })

    onMounted(() => {
      refreshQuery()
      setStep()
    })

    return {
      step,
      step1Loaded,
      step1Show,
      step2Loaded,
      step2Show,
      step3Loaded,
      step3Show,
      next,
      prev,
    }
  },
})
</script>
