<template>
  <div class="page-container page-guide">
    <el-row>
      <el-col :xs="24" :sm="5">
        <side-nav :data="navsData" :base="`/${ lang }/guide`" />
      </el-col>
      <el-col :xs="24" :sm="19">
        <router-view class="content" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import pageLang from '../i18n/page.json'
export default {
  data() {
    return {
      lang: this.$route.meta.lang,
    }
  },
  computed: {
    langConfig() {
      return pageLang.filter(config => config.lang === this.lang)[0].pages.guide
    },
    navsData() {
      return [
        {
          path: '/design',
          name: this.langConfig[1],
        },
        {
          path: '/nav',
          name: this.langConfig[2],
        },
      ]
    },
  },
}
</script>
<style lang="scss">
</style>
