import { inject } from 'vue'
import { paginationKey } from '@hongluan-ui/tokens'

export const usePagination = () => inject(paginationKey, {})
