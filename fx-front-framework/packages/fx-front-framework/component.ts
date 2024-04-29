import { FxPageTable } from '@fx-front-framework/components/page-table'
import { FxPageTableV2 } from '@fx-front-framework/components/page-table-v2'
import { FxFileUpload } from '@fx-front-framework/components/file-upload'
import { FxPageDetail } from '@fx-front-framework/components/page-detail'
import { FxAnimPage } from '@fx-front-framework/components/anim-page'
import { FxActionButton } from '@fx-front-framework/components/action-button'

// 大屏组件
import { FxVPanel } from '@fx-front-framework/components/visualized/panel'
import { FxVModal } from '@fx-front-framework/components/visualized/modal'
import { FxVColumnChart } from '@fx-front-framework/components/visualized/charts/column-chart'
import { FxVSpireColumnChart } from '@fx-front-framework/components/visualized/charts/spire-column-chart'
import { FxVPieChart } from '@fx-front-framework/components/visualized/charts/pie-chart'
import { FxVRosePieChart } from '@fx-front-framework/components/visualized/charts/rose-pie-chart'
import { FxVScrollingBarChart } from '@fx-front-framework/components/visualized/charts/scrolling-bar-chart'
import { FxVScrollingListChart } from '@fx-front-framework/components/visualized/charts/scrolling-list-chart'
import { FxVPyramidChart } from '@fx-front-framework/components/visualized/charts/pyramid-chart'
import { FxVLineChart } from '@fx-front-framework/components/visualized/charts/line-chart'
import { FxVStackedBarChart } from '@fx-front-framework/components/visualized/charts/stacked-bar-chart'
import { FxVProportionPieChart } from '@fx-front-framework/components/visualized/charts/proportion-pie-chart'

import type { Plugin } from 'vue'

export default [
  FxPageTable,
  FxPageTableV2,
  FxFileUpload,
  FxPageDetail,
  FxAnimPage,
  FxActionButton,

  // 大屏组件
  FxVPanel,
  FxVModal,
  FxVColumnChart,
  FxVSpireColumnChart,
  FxVPieChart,
  FxVRosePieChart,
  FxVScrollingBarChart,
  FxVScrollingListChart,
  FxVPyramidChart,
  FxVLineChart,
  FxVStackedBarChart,
  FxVProportionPieChart,
] as Plugin[]

