<template>
  <hl-panel class="card-panel" borderless body-padding="calc(var(--xxl) + var(--md))" body-class="p-y-md">
    <template #header>
      <div class="panel-header-left">
        <hl-icon type="primary"><two-copy /></hl-icon>
      </div>
      <div class="panel-title"><h4>Fill 图标</h4></div>
      <div class="panel-header-right"></div>
    </template>
    <hl-row layout="grid" count="xl:count-6 lg:count-3 md:count-2" gap-x="var(--xxl)" gap-y="var(--xxs)">
      <hl-col v-for="item in icons" :key="item.name" span="col">
        <hl-group dir="vertical" align="items-middle" full class="p-xxl" gap="var(--md)">
          <hl-icon size="lg" type="primary">
            <component :is="'fill' + item.name" />
          </hl-icon>
          <span class="content">{{ item.name }}</span>
        </hl-group>
      </hl-col>
    </hl-row>
  </hl-panel>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const icons = ref([
      { name: 'Academic' },
      { name: 'Airplay' },
      { name: 'Alert' },
      { name: 'Application' },
      { name: 'Archive' },
      { name: 'AssemblyArea' },
      { name: 'Bell' },
      { name: 'Bell2' },
      { name: 'BellOff' },
      { name: 'Book' },
      { name: 'Book2' },
      { name: 'BookOpen' },
      { name: 'Box' },
      { name: 'Briefcase' },
      { name: 'Calendar' },
      { name: 'Camera' },
      { name: 'CameraOff' },
      { name: 'Card' },
      { name: 'ChartBar' },
      { name: 'ChartDoughnut' },
      { name: 'ChartPie' },
      { name: 'ChartRadar' },
      { name: 'Check' },
      { name: 'CircleBottom' },
      { name: 'CircleLeft' },
      { name: 'CircleRight' },
      { name: 'CircleTop' },
      { name: 'Clock' },
      { name: 'Coffie' },
      { name: 'CommiToSafety' },
      { name: 'Computer' },
      { name: 'Conceal' },
      { name: 'Copy' },
      { name: 'Database' },
      { name: 'DataCloud' },
      { name: 'Delete' },
      { name: 'Disabled' },
      { name: 'Dot' },
      { name: 'Download' },
      { name: 'Drag' },
      { name: 'Edit' },
      { name: 'Error' },
      { name: 'Examine' },
      { name: 'Exit' },
      { name: 'File' },
      { name: 'Filter' },
      { name: 'Fire' },
      { name: 'Firm' },
      { name: 'Firm2' },
      { name: 'Folder' },
      { name: 'FolderAdd' },
      { name: 'FolderIn' },
      { name: 'FolderRemove' },
      { name: 'Footprint' },
      { name: 'Friday' },
      { name: 'Government' },
      { name: 'Hazard' },
      { name: 'Head' },
      { name: 'Heart' },
      { name: 'Highly' },
      { name: 'Home' },
      { name: 'Hot' },
      { name: 'Inbox' },
      { name: 'index.ts' },
      { name: 'Info' },
      { name: 'Layer' },
      { name: 'Layout' },
      { name: 'Link' },
      { name: 'Lock' },
      { name: 'Mail' },
      { name: 'Mainframe' },
      { name: 'Map' },
      { name: 'Maximize' },
      { name: 'Message' },
      { name: 'Mine' },
      { name: 'Minimize' },
      { name: 'Minus' },
      { name: 'Monitor' },
      { name: 'More' },
      { name: 'More2' },
      { name: 'Navigation' },
      { name: 'News' },
      { name: 'Notice' },
      { name: 'OffLine' },
      { name: 'OffTime' },
      { name: 'Open' },
      { name: 'OverDue' },
      { name: 'Page' },
      { name: 'Pause' },
      { name: 'Phone' },
      { name: 'PhoneBook' },
      { name: 'PhoneBook2' },
      { name: 'Picture' },
      { name: 'Pie' },
      { name: 'Play' },
      { name: 'Plus' },
      { name: 'Power' },
      { name: 'Preview' },
      { name: 'Print' },
      { name: 'Qq' },
      { name: 'Question' },
      { name: 'Refresh' },
      { name: 'Repeat' },
      { name: 'Report' },
      { name: 'Repository' },
      { name: 'RescueTeam' },
      { name: 'Sad' },
      { name: 'Save' },
      { name: 'Search' },
      { name: 'Security' },
      { name: 'Send' },
      { name: 'Server' },
      { name: 'Service' },
      { name: 'Set' },
      { name: 'Setting' },
      { name: 'Share' },
      { name: 'Shield' },
      { name: 'Signin' },
      { name: 'Signout' },
      { name: 'Sina' },
      { name: 'Smile' },
      { name: 'Star' },
      { name: 'Start' },
      { name: 'Tag' },
      { name: 'Talk' },
      { name: 'Task' },
      { name: 'Tel' },
      { name: 'Toggle' },
      { name: 'Treemenu' },
      { name: 'TreemenuAdd' },
      { name: 'Unlink' },
      { name: 'Unlock' },
      { name: 'Upload' },
      { name: 'User' },
      { name: 'UserAdd' },
      { name: 'UserGroup' },
      { name: 'Voice' },
      { name: 'Warning' },
      { name: 'Wechat' },
      { name: 'Wifi' },
      { name: 'World' },
      { name: 'Write' },
      { name: 'ZoomIn' },
      { name: 'ZoomOut' },
    ])

    return {
      icons,
    }
  },
})
</script>

<style>
</style>
