import { mount } from '@vue/test-utils'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import { describe, expect, it } from 'vitest'
import { nextTick, reactive } from 'vue'
import Carousel from '../src/carousel.vue'
import CarouselItem from '../src/carousel-item.vue'
import CarouselIndicator from '../src/carousel-indicator.vue'

const wait = (ms = 100) =>
  new Promise(resolve => setTimeout(resolve, ms))

const _mount = (template: string, data?: () => void, methods?: any) =>
  mount({
    components: {
      'hl-carousel': Carousel,
      'hl-carousel-item': CarouselItem,
      'hl-carousel-indicator': CarouselIndicator,
    },
    template,
    data,
    methods,
  })

describe('Carousel', () => {
  const { prefix } = usePrefix()
  const itemClazz = `.${prefix}-carousel-item`
  const customIndicatorClazz = `.${prefix}-carousel-indicator`
  it('create', () => {
    const wrapper = _mount(
      `
        <div>
          <hl-carousel ref="carousel">
            <hl-carousel-item v-for="item in 3" :key="item"></hl-carousel-item>
          </hl-carousel>
        </div>
      `,
    )

    expect(wrapper.vm.$refs.carousel.direction).toBe('horizontal')
    expect(wrapper.findAll(itemClazz).length).toEqual(3)
  })

  it('auto play', async() => {
    const wrapper = _mount(`
        <div>
          <hl-carousel :interval="50">
            <hl-carousel-item v-for="item in 3" :key="item"></hl-carousel-item>
          </hl-carousel>
        </div>
      `)

    await nextTick()
    await wait(10)
    const items = wrapper.vm.$el.querySelectorAll(itemClazz)
    expect(items[0].classList.contains('is-active')).toBeTruthy()
    await wait(60)
    await nextTick()
    expect(items[1].classList.contains('is-active')).toBeTruthy()
  })

  it('initial index', async () => {
    const wrapper = _mount(`
        <div>
          <hl-carousel :autoplay="false" :initial-index="1">
            <hl-carousel-item v-for="item in 3" :key="item"></hl-carousel-item>
          </hl-carousel>
        </div>
      `)

    await nextTick()
    await wait(10)

    expect(
      wrapper.vm.$el
        .querySelectorAll(itemClazz)[1]
        .classList.contains('is-active'),
    ).toBeTruthy()
  })

  it('reset timer', async () => {
    const wrapper = _mount(`
        <div>
          <hl-carousel :interval="500">
            <hl-carousel-item v-for="item in 3" :key="item"></hl-carousel-item>
          </hl-carousel>
        </div>
      `)
    await nextTick()
    const items = wrapper.vm.$el.querySelectorAll(itemClazz)
    await wrapper.trigger('mouseenter')
    await nextTick()
    expect(items[0].classList.contains('is-active')).toBeTruthy()
    await wrapper.trigger('mouseleave')
    await nextTick()
    await wait(700)
    expect(items[1].classList.contains('is-active')).toBeTruthy()
  })

  it('change', async () => {
    const wrapper = _mount(
      `
        <div>
          <hl-carousel :interval="50" @change="handleChange">
            <hl-carousel-item v-for="item in 3" :key="item"></hl-carousel-item>
          </hl-carousel>
        </div>
      `,
      () => {
        return {
          val: -1,
          oldVal: -1,
        }
      },
      {
        handleChange(val: any, oldVal: any) {
          this.val = val
          this.oldVal = oldVal
        },
      },
    )

    await nextTick()
    await wait(50)
    expect(wrapper.vm.val).toBe(1)
    expect(wrapper.vm.oldVal).toBe(0)
  })

  it('label', async () => {
    const wrapper = _mount(`
        <div>
          <hl-carousel>
            <hl-carousel-item v-for="item in 3" :key="item" :label="item"></hl-carousel-item>
          </hl-carousel>
        </div>
      `)
    await nextTick()
    expect(wrapper.find('.carousel-button span').text()).toBe('1')
  })

  describe('manual control', () => {
    it('hover', async () => {
      const wrapper = _mount(`
        <div>
          <hl-carousel :autoplay="false">
            <hl-carousel-item v-for="item in 3" :key="item"></hl-carousel-item>
          </hl-carousel>
        </div>
      `)

      await nextTick()
      await wait()
      await wrapper.findAll('.carousel-indicator')[1].trigger('mouseenter')
      await nextTick()
      await wait()
      expect(
        wrapper.vm.$el
          .querySelectorAll(itemClazz)[1]
          .classList.contains('is-active'),
      ).toBeTruthy()
    })
  })

  it('card', async () => {
    const wrapper = _mount(`
        <div>
          <hl-carousel :autoplay="false" type="card">
            <hl-carousel-item v-for="item in 7" :key="item"></hl-carousel-item>
          </hl-carousel>
        </div>
      `)
    await nextTick()
    await wait()
    const items = wrapper.vm.$el.querySelectorAll(itemClazz)
    expect(items[0].classList.contains('is-active')).toBeTruthy()
    expect(items[1].classList.contains('is-in-stage')).toBeTruthy()
    expect(items[6].classList.contains('is-in-stage')).toBeTruthy()
    await items[1].click()
    await wait()
    expect(items[1].classList.contains('is-active')).toBeTruthy()
    await wrapper.vm.$el.querySelector('.carousel-arrow.left').click()
    await wait()
    expect(items[0].classList.contains('is-active')).toBeTruthy()
    await items[6].click()
    await wait()
    expect(items[6].classList.contains('is-active')).toBeTruthy()
  })

  it('vertical direction', () => {
    const wrapper = _mount(`
        <div>
          <hl-carousel ref="carousel" :autoplay="false" direction="vertical" height="100px">
            <hl-carousel-item v-for="item in 3" :key="item"></hl-carousel-item>
          </hl-carousel>
        </div>
      `)
    const items = wrapper.vm.$el.querySelectorAll(itemClazz)

    expect(wrapper.vm.$refs.carousel.direction).toBe('vertical')
    expect(items[0].style.transform.includes('translateY')).toBeTruthy()
  })

  it('pause auto play on hover', async () => {
    const wrapper = _mount(`
        <div>
          <hl-carousel :interval="50" :pause-on-hover="false">
            <hl-carousel-item v-for="item in 3" :key="item"></hl-carousel-item>
          </hl-carousel>
        </div>
      `)

    await nextTick()
    await wrapper.find(`.${prefix}-carousel`).trigger('mouseenter')
    const items = wrapper.vm.$el.querySelectorAll(itemClazz)
    await nextTick()
    await wait(60)
    expect(items[1].classList.contains('is-active')).toBeTruthy()
  })

  it('custom indicator', async () => {
    const wrapper = _mount(`
        <div>
          <hl-carousel :interval="50" :pause-on-hover="false" indicator-type="custom">
            <hl-carousel-item v-for="item in 3" :key="item"></hl-carousel-item>
            <template v-slot:indicator>
              <hl-carousel-indicator v-for="(item, index) in 3" :key="item" :index="index">
                <p>{{ item }}</p>
              </hl-carousel-indicator>
            </template>
          </hl-carousel>
        </div>
      `)

    await nextTick()
    expect(wrapper.vm.$el.querySelectorAll(customIndicatorClazz).length).toEqual(3)
    await wrapper.findAll(customIndicatorClazz)[2].trigger('click')
    const items = wrapper.vm.$el.querySelectorAll(itemClazz)
    await nextTick()
    expect(items[2].classList.contains('is-active')).toBeTruthy()
  })

  it('multiple items', async () => {
    const wrapper = _mount(`
        <div>
          <hl-carousel height="150px" :autoplay="false" trigger="click" :items-number="4" :items-width="140">
            <hl-carousel-item v-for="item in 7" :key="item">
              <h4 class="small">{{ item }}</h4>
            </hl-carousel-item>
          </hl-carousel>
        </div>
      `)

    await nextTick()
    expect(wrapper.find('.carousel-container').attributes('style')).toContain('560px')
  })
  it('should guarantee order of indicators', async () => {
    const data = reactive([1, 2, 3, 4])
    const wrapper = _mount(`
      <div>
        <hl-carousel>
          <hl-carousel-item v-for="item in data" :key="item" :label="item">
            {{ item }}
          </hl-carousel-item>
        </hl-carousel>
      </div>
    `,
    () => {
      return {
        data,
      }
    })
    await nextTick()

    data.splice(1, 0, 5)
    await nextTick()
    const indicators = wrapper.findAll('.carousel-button')
    data.forEach((value, index) => {
      expect(indicators[index].element.textContent).toEqual(value.toString())
    })
  })

})
