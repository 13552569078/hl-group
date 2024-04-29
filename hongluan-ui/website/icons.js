import {
  SystemAdd,
  SystemRemove,
  SystemArrowDown,
  SystemArrowUp,
  SystemArrowLeft,
  SystemArrowRight,
  SystemDoubleArrowRight,
  SystemDoubleArrowLeft,
  SystemChecked,
  SystemIndeterminate,
  // SystemCloseFill,
  SystemClose,
  SystemMore,
  SystemFilter,
  SystemFile,
  SystemClock,
  SystemCalendar,
  SystemHidden,
  SystemShow,
  SystemMaximize,
  SystemMinimize,
  SystemRefresh,
  SystemSearch,
  SystemZoomIn,
  SystemZoomOut,
  SystemSuccess,
  SystemWarning,
  SystemInfo,
  SystemError,
  SystemCaret,
  SystemSelectArrow,
} from 'hongluan-ui'
import * as svgIcons from '@hongluan-ui/icons'

const SystemIcons = {
  SystemAdd,
  SystemRemove,
  SystemArrowDown,
  SystemArrowUp,
  SystemArrowLeft,
  SystemArrowRight,
  SystemDoubleArrowRight,
  SystemDoubleArrowLeft,
  SystemChecked,
  SystemIndeterminate,
  // SystemCloseFill,
  SystemClose,
  SystemMore,
  SystemFilter,
  SystemFile,
  SystemClock,
  SystemCalendar,
  SystemHidden,
  SystemShow,
  SystemMaximize,
  SystemMinimize,
  SystemRefresh,
  SystemSearch,
  SystemZoomIn,
  SystemZoomOut,
  SystemSuccess,
  SystemWarning,
  SystemInfo,
  SystemError,
  SystemCaret,
  SystemSelectArrow,
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
