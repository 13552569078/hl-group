<template>
  <div class="side-nav">
    <template v-if="isComponentPage">
      <hl-group
        class="nav-item m-t-sm"
        align="items-middle"
        gap="var(--xs)"
        block
        active-class="active"
      >
        <hl-icon size="xxs" fill class="text-link border border-dark bg-content box-shadow-sm radius-lg">
          <fill-box />
        </hl-icon>
        <router-link :to="{path: 'overview'}">组件总览</router-link>
      </hl-group>
    </template>
    <template v-for="(item, keyy) in data" :key="keyy">
      <hl-group
        v-if="!item.groups && item.path && item.hidden !== true"
        class="nav-item m-t-sm"
        align="items-middle"
        gap="var(--xs)"
        block
        active-class="active"
      >
        <hl-icon
          size="xxs"
          fill
          :class="`text-${item.color}`"
          class="border border-dark bg-content box-shadow-sm radius-lg"
        >
          <component :is="'fill' + item.icon" />
        </hl-icon>
        <a :href="'#' + base + item.path">{{ item.name }}</a>
      </hl-group>

      <template v-if="item.groups">
        <div
          v-for="(group, key) in item.groups"
          :key="key"
          :class="['nav-group', group.collapsed ? 'is-collapsed' : '']"
        >
          <div
            v-if="'collapsed' in group"
            class="group-title cursor-pointer"
            @click="group.collapsed = !group.collapsed"
          >
            {{ group.groupName }}
            <hl-icon>
              <two-chevron-right />
            </hl-icon>
          </div>
          <div v-else class="group-title" @click="expandMenu">{{ group.groupName }}</div>
          <ul>
            <li v-for="(navItem, keey) in group.list" v-show="!navItem.disabled" :key="keey">
              <router-link
                v-if="!navItem.hidden"
                active-class="active"
                :to="base + navItem.path"
                exact
                v-text="navItem.title"
              />
            </li>
          </ul>
        </div>
      </template>
    </template>
  </div>
</template>
<script>
import compoLang from '../i18n/component.json'

export default {
  props: {
    data: {
      type: Array,
      default: () => ([]),
    },
    base: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
    }
  },
  computed: {
    lang() {
      return this.$route.meta.lang
    },
    isComponentPage() {
      return this.$route.path.indexOf('/component') > -1
    },
    langConfig() {
      return compoLang.filter(config => config.lang === this.lang)[0]['nav']
    },
  },

}
</script>
