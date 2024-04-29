<template>
  <div class="mask-top"></div>
  <div class="mask-left"></div>
  <div class="mask-right"></div>
  <div class="mask-bottom"></div>
  <div class="" style="z-index: 2000; position: relative; margin: 40px">
    <hl-row layout="flow" count="xxl:count-4 xl:count-3 count-2" gap="var(--lg)">
      <panel-sign-2 />
      <panel-collect6 />
      <panel-table2 />
      <panel-collect5 />
      <panel-collect4 />
      <panel-collapse />
      <panel-weathers />
      <panel-timeline />
      <panel-timeline-video />
      <panel-filter-tree />
      <panel-toggle />
      <panel-tarot />
      <panel-collect />
      <panel-collect2 />
      <panel-collect3 />
      <panel-table />
      <panel-flag />
      <panel-flag2 />
      <panel-flag3 />
      <panel-flag4 />
      <panel-label />
      <panel-sign />
      <panel-list />
      <panel-list2 />
      <panel-filter />
      <panel-video />
      <panel-overview />
      <panel-13 />
      <panel-14 />
    </hl-row>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
// import pageHeader from './layout/pageHeader.vue'
// import pageMenu from './layout/pageMenu.vue'
import panelToggle from './panel/panel-toggle.vue'
import panelTarot from './panel/panel-tarot.vue'
import panelTable from './panel/panel-table.vue'
import panelTable2 from './panel/panel-table2.vue'
import panelCollect from './panel/panel-collect.vue'
import panelFlag from './panel/panel-flag.vue'
import panelLabel from './panel/panel-label.vue'
import panelSign from './panel/panel-sign.vue'
import panelSign2 from './panel/panel-sign2.vue'
import panelList from './panel/panel-list.vue'
import panelList2 from './panel/panel-list2.vue'
import panelCollect2 from './panel/panel-collect2.vue'
import panelCollect3 from './panel/panel-collect3.vue'
import panelCollect4 from './panel/panel-collect4.vue'
import panelCollect5 from './panel/panel-collect5.vue'
import panelCollect6 from './panel/panel-collect6.vue'
import panelFlag2 from './panel/panel-flag2.vue'
import panelFlag3 from './panel/panel-flag3.vue'
import panelFlag4 from './panel/panel-flag4.vue'
import panelFilter from './panel/panel-filter.vue'
import panelVideo from './panel/panel-video.vue'
import panelFilterTree from './panel/panel-filter-tree.vue'
import panelOverview from './panel/panel-overview.vue'
import panelTimeline from './panel/panel-timeline.vue'
import panelTimelineVideo from './panel/panel-timeline-video.vue'
import panel13 from './panel/panel13.vue'
import panel14 from './panel/panel14.vue'
import panelWeathers from './panel/panel-weathers.vue'
import panelCollapse from './panel/panel-collapse.vue'
export default defineComponent({
  components: {
    // pageHeader,
    // pageMenu,
    panelToggle,
    panelTarot,
    panelTable,
    panelTable2,
    panelCollect,
    panelCollect2,
    panelCollect3,
    panelCollect4,
    panelCollect5,
    panelCollect6,
    panelFlag,
    panelFlag2,
    panelFlag3,
    panelFlag4,
    panelLabel,
    panelSign,
    panelSign2,
    panelList,
    panelList2,
    panelFilter,
    panelVideo,
    panelFilterTree,
    panelOverview,
    panelTimeline,
    panelTimelineVideo,
    panel13,
    panel14,
    panelWeathers,
    panelCollapse,
  },
  setup() {
    return {}
  },
})
</script>
