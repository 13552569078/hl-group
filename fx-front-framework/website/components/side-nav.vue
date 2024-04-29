<template>
  <ul
    class="side-nav"
  >
    <li
      v-for="(item, keyy) in data"
      :key="keyy"
      class="nav-item"
    >
      <a v-if="!item.path && !item.href" @click="expandMenu">{{ item.name }}</a>
      <a v-if="item.href" :href="item.href" target="_blank">{{ item.name }}</a>
      <router-link
        v-if="item.path"
        active-class="active"
        :to="base + item.path"
        exact
        v-text="item.title || item.name"
      />
      <ul v-if="item.children" class="pure-menu-list sub-nav">
        <li
          v-for="(navItem, key) in item.children"
          :key="key"
          class="nav-item"
        >
          <router-link
            v-if="!navItem.hidden"
            class=""
            active-class="active"
            :to="base + navItem.path"
            exact
            v-text="navItem.title || navItem.name"
          />
        </li>
      </ul>
      <template v-if="item.groups">
        <div
          v-for="(group, key) in item.groups"
          :key="key"
          class="nav-group"
        >
          <div class="nav-group-title" @click="expandMenu">{{ group.groupName }}</div>
          <ul class="pure-menu-list">
            <li
              v-for="(navItem, keey) in group.list"
              v-show="!navItem.disabled"
              :key="keey"
              class="nav-item"
            >
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
    </li>
  </ul>
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
    langConfig() {
      return compoLang.filter(config => config.lang === this.lang)[0]['nav']
    },
  },

}
</script>
