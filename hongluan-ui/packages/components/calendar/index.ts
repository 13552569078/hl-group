import { withInstall } from '@hongluan-ui/utils'
import Calendar from './src/calendar.vue'

export const HlCalendar = withInstall(Calendar)
export default HlCalendar

export * from './src/calendar'
export type {
  CalendarDateTableInstance,
  DateTableInstance,
  CalendarInstance,
} from './src/instance'
