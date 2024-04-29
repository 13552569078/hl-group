import InfiniteScroll from './src/index'
import type { SFCWithInstall } from '@hongluan-ui/utils'

const _InfiniteScroll = InfiniteScroll as SFCWithInstall<typeof InfiniteScroll>

_InfiniteScroll.install = app => {
  app.directive('InfiniteScroll', _InfiniteScroll)
}

export default _InfiniteScroll
export const HlInfiniteScroll = _InfiniteScroll
