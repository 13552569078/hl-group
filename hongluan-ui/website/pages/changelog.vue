<template>
  <div class="doc-main-content">
    <div class="doc-content">
      <change-log-cn ref="changeLog" />
    </div>
  </div>
</template>
<script>
import ChangeLogCn from '../../CHANGELOG.zh-CN.md'
import pageLang from '../i18n/page.json'
export default {
  components: {
    ChangeLogCn,
  },
  data() {
    return {
      lang: this.$route.meta.lang,
    }
  },
  computed: {
    langConfig() {
      return pageLang.filter(config => config.lang === this.lang)[0].pages
        .changelog
    },
  },
}
</script>
<style lang="scss">
</style>
