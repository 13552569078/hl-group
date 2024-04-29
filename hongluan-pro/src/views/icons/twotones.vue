<template>
  <hl-panel
    class="card-panel"
    borderless
    body-padding="calc(var(--xxl) + var(--md))"
    body-class="p-y-md"
  >
    <template #header>
      <div class="panel-header-left">
        <hl-icon type="primary"><two-copy /></hl-icon>
      </div>
      <div class="panel-title"><h4>TwoTones 双色图标</h4></div>
      <div class="panel-header-right"></div>
    </template>
    <hl-row layout="grid" count="xl:count-6 lg:count-3 md:count-2" gap-x="var(--xxl)" gap-y="var(--xxs)">
      <hl-col v-for="item in icons" :key="item.name" span="col">
        <hl-group dir="vertical" align="items-middle" full class="p-xxl" gap="var(--md)">
          <hl-icon size="lg" type="primary">
            <component :is="'two' + item.name" />
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
      { name: 'Airplay' },
      { name: 'Alert' },
      { name: 'AlignCenter' },
      { name: 'AlignJustify' },
      { name: 'AlignLeft' },
      { name: 'AlignRight' },
      { name: 'Application' },
      { name: 'Archive' },
      { name: 'ArrowBottom' },
      { name: 'ArrowBottomLeft' },
      { name: 'ArrowBottomRight' },
      { name: 'ArrowLeft' },
      { name: 'ArrowRight' },
      { name: 'ArrowTop' },
      { name: 'ArrowTopLeft' },
      { name: 'ArrowTopRight' },
      { name: 'Bell' },
      { name: 'Bell2' },
      { name: 'BellOff' },
      { name: 'Bold' },
      { name: 'Book' },
      { name: 'BookOpen' },
      { name: 'Box' },
      { name: 'Briefcase' },
      { name: 'Calendar' },
      { name: 'Camera' },
      { name: 'CameraOff' },
      { name: 'ChartBar' },
      { name: 'ChartCurve' },
      { name: 'ChartDoughnut' },
      { name: 'ChartLine' },
      { name: 'ChartPie' },
      { name: 'ChartRadar' },
      { name: 'ChevronBottom' },
      { name: 'ChevronLeft' },
      { name: 'ChevronRight' },
      { name: 'ChevronsBottom' },
      { name: 'ChevronsLeft' },
      { name: 'ChevronsRight' },
      { name: 'ChevronsTop' },
      { name: 'ChevronTop' },
      { name: 'CircleBottom' },
      { name: 'CircleCheck' },
      { name: 'CircleDisabled' },
      { name: 'CircleError' },
      { name: 'CircleLeft' },
      { name: 'CircleMinus' },
      { name: 'CirclePlus' },
      { name: 'CircleRight' },
      { name: 'CircleTop' },
      { name: 'Clock' },
      { name: 'Close' },
      { name: 'Coffie' },
      { name: 'Computer' },
      { name: 'Copy' },
      { name: 'Database' },
      { name: 'Delete' },
      { name: 'Dot' },
      { name: 'Down' },
      { name: 'Download' },
      { name: 'Edit' },
      { name: 'Examine' },
      { name: 'File' },
      { name: 'FileDoc' },
      { name: 'FilePdf' },
      { name: 'FilePicture' },
      { name: 'FilePpt' },
      { name: 'FileVideo' },
      { name: 'FileXls' },
      { name: 'Filter' },
      { name: 'Filter2' },
      { name: 'Fire' },
      { name: 'Folder' },
      { name: 'FolderAdd' },
      { name: 'FolderIn' },
      { name: 'FolderRemove' },
      { name: 'Good' },
      { name: 'Heart' },
      { name: 'Hide' },
      { name: 'Home' },
      { name: 'Inbox' },
      { name: 'Info' },
      { name: 'Italic' },
      { name: 'Layer' },
      { name: 'Layout' },
      { name: 'Link' },
      { name: 'List' },
      { name: 'Lock' },
      { name: 'Mail' },
      { name: 'Maximize' },
      { name: 'Menu' },
      { name: 'Message' },
      { name: 'Minimize' },
      { name: 'Minus' },
      { name: 'More' },
      { name: 'Move' },
      { name: 'Navigation' },
      { name: 'News' },
      { name: 'Page' },
      { name: 'Phone' },
      { name: 'Phone2' },
      { name: 'Pic' },
      { name: 'PicAdd' },
      { name: 'Plus' },
      { name: 'Point' },
      { name: 'Power' },
      { name: 'Preview' },
      { name: 'Print' },
      { name: 'Question' },
      { name: 'Refresh' },
      { name: 'Repeat' },
      { name: 'Sad' },
      { name: 'Save' },
      { name: 'Search' },
      { name: 'Send' },
      { name: 'Server' },
      { name: 'Setting' },
      { name: 'Share' },
      { name: 'Shield' },
      { name: 'Show' },
      { name: 'ShowDisabled' },
      { name: 'SignIn' },
      { name: 'SignOut' },
      { name: 'Smile' },
      { name: 'Star' },
      { name: 'Start' },
      { name: 'Storage' },
      { name: 'Table' },
      { name: 'Tag' },
      { name: 'Talk' },
      { name: 'Top' },
      { name: 'Treemenu' },
      { name: 'TreemenuAdd' },
      { name: 'Underline' },
      { name: 'Undo' },
      { name: 'Ungood' },
      { name: 'Unlink' },
      { name: 'Unlock' },
      { name: 'Upload' },
      { name: 'User' },
      { name: 'UserAdd' },
      { name: 'UserGroup' },
      { name: 'Voice' },
      { name: 'Volume' },
      { name: 'Warning' },
      { name: 'World' },
      { name: 'Write' },
      { name: 'Write2' },
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
