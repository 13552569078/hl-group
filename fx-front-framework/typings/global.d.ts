// GlobalComponents for Volar
declare module 'vue' {
  export interface GlobalComponents {
    FxPageTbale: typeof import('fx-front-framework')['FxPageTbale']
    FxFileUpload: typeof import('fx-front-framework')['FxFileUpload']
    FxPageDetail: typeof import('fx-front-framework')['FxPageDetail']
    FxPanelTableList: typeof import('fx-front-framework')['FxPanelTableList']
    FxVPanel: typeof import('fx-front-framework')['FxVPanel']
    FxVModal: typeof import('fx-front-framework')['FxVModal']
    FxVColumnChart: typeof import('fx-front-framework')['FxVColumnChart']
    FxVSpireColumnChart: typeof import('fx-front-framework')['FxVSpireColumnChart']
    FxVPieChart: typeof import('fx-front-framework')['FxVPieChart']
    FxVRosePieChart: typeof import('fx-front-framework')['FxVRosePieChart']
    FxVScrollingBarChart: typeof import('fx-front-framework')['FxVScrollingBarChart']
    FxVScrollingListChart: typeof import('fx-front-framework')['FxVScrollingListChart']
    FxVPyramidChart: typeof import('fx-front-framework')['FxVPyramidChart']
  }
}

export {}
