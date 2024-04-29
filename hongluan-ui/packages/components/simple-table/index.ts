import { withInstall } from '@hongluan-ui/utils'
import SimpleTable from './src/simple-table.vue'
import SortableIcon from './src/sortable.vue'
import FilterIcon from './src/filter.vue'

export const HlSimpleTable = withInstall(SimpleTable, { SortableIcon, FilterIcon })
export default HlSimpleTable


export * from './src/simple-table'
