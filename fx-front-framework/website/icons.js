import {
  SystemAdd,
  SystemArrowDown,
  SystemArrowUp,
  SystemArrowLeft,
  SystemArrowRight,
  SystemChecked,
  // SystemCloseFill,
  SystemClose,
  SystemClock,
  SystemCalendar,
  SystemDoubleArrowRight,
  SystemDoubleArrowLeft,
  SystemFilter,
  SystemFile,
  SystemHidden,
  SystemLoading,
  SystemInfo,
  SystemMaximize,
  SystemMinimize,
  SystemMore,
  SystemRefresh,
  SystemRemove,
  SystemSearch,
  SystemShow,
  SystemSuccess,
  SystemWarning,
  SystemZoomIn,
  SystemZoomOut,
  SystemError,
} from 'hongluan-ui'
import * as svgIcons from '@hongluan-ui/icons'

const SystemIcons = {
  SystemAdd,
  SystemArrowDown,
  SystemArrowUp,
  SystemArrowLeft,
  SystemArrowRight,
  SystemChecked,
  // SystemCloseFill,
  SystemClose,
  SystemClock,
  SystemCalendar,
  SystemDoubleArrowRight,
  SystemDoubleArrowLeft,
  SystemFilter,
  SystemFile,
  SystemHidden,
  SystemLoading,
  SystemInfo,
  SystemMaximize,
  SystemMinimize,
  SystemMore,
  SystemRefresh,
  SystemRemove,
  SystemSearch,
  SystemShow,
  SystemSuccess,
  SystemWarning,
  SystemZoomIn,
  SystemZoomOut,
  SystemError,
}


function initIcons(app) {
  const svgKeys = Object.keys(svgIcons)
  let twoIconNames = svgKeys.filter(n => n.startsWith('Two')),
    fillIconNames = svgKeys.filter(n => n.startsWith('Fill')),
    fileIconNames = svgKeys.filter(n => n.startsWith('File')),
    systemIconNames = []
  svgKeys.forEach(key => {
    app.component(key, svgIcons[key])
  })
  Object.keys(SystemIcons).forEach(key => {
    systemIconNames.push(key)
    app.component(key, SystemIcons[key])
  })
  app.config.globalProperties.$twoIconNames = twoIconNames
  app.config.globalProperties.$fillIconNames = fillIconNames
  app.config.globalProperties.$fileIconNames = fileIconNames
  app.config.globalProperties.$systemIconNames = systemIconNames
}

export { initIcons }
