import { withInstall } from '@hongluan-ui/utils'
import Carousel from './src/carousel.vue'

export const HlCarousel = withInstall(Carousel)
export default HlCarousel

export * from './src/carousel'
export * from './src/carousel-item'
export * from './src/carousel-indicator'

export type { CarouselInstance } from './src/instance'
