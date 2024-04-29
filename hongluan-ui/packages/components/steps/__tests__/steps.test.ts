import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, expect, test } from 'vitest'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import Steps from '../src/steps.vue'
import Step from '../src/item.vue'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemClose } from '@hongluan-ui/components/system-icon'

const _mount = (template: string) => mount({
  components: {
    'hl-steps': Steps,
    'hl-step': Step,
    HlIcon,
    SystemClose,
  },
  template,
}, {
  attachTo: document.body,
  global: {
    provide: {
      HlSteps: {},
    },
  },
})

describe('Steps.vue', () => {
  const { prefix } = usePrefix()
  test('render', () => {
    const wrapper = _mount(`
      <hl-steps>
        <hl-step />
        <hl-step />
        <hl-step />
      </hl-steps>
    `)
    expect(wrapper.findAll(`.${prefix}-step`).length).toBe(3)
    expect(wrapper.classes()).toContain('horizontal')
    expect(wrapper.find(`.${prefix}-step`).classes()).toContain('is-horizontal')
  })

  // test('space', () => {
  //   const wrapper = _mount(`
  //     <hl-steps :space="100">
  //       <hl-step />
  //     </hl-steps>
  //   `)
  //   expect(wrapper.find('.hl-step').attributes('style')).toMatch('flex-basis: 100px;')
  // })

  test('alignCenter', () => {
    const wrapper = _mount(`
      <hl-steps center>
        <hl-step />
      </hl-steps>
    `)
    expect(wrapper.find(`.${prefix}-step`).classes()).toContain('is-center')
  })

  test('direction', () => {
    const wrapper = _mount(`
      <hl-steps dir="vertical">
        <hl-step />
      </hl-steps>
    `)
    expect(wrapper.classes()).toContain('vertical')
    expect(wrapper.find(`.${prefix}-step`).classes()).toContain('is-vertical')
  })

  // test('simple', () => {
  //   const wrapper = _mount(`
  //     <hl-steps simple direction="vertical" :space="100" alignCenter>
  //       <hl-step />
  //     </hl-steps>
  //   `)
  //   expect(wrapper.classes()).toContain('hl-steps--simple')
  //   expect(wrapper.find('is-center').exists()).toBe(false)
  //   expect(wrapper.find('is-vertical').exists()).toBe(false)
  // })

  test('active', async () => {
    const wrapper = _mount(`
      <hl-steps :active="0">
        <hl-step />
        <hl-step />
        <hl-step />
      </hl-steps>
    `)
    await nextTick()
    expect(wrapper.findAll(`.${prefix}-step`)[0].classes()).toContain('is-process')
    expect(wrapper.findAll(`.${prefix}-step`)[1].classes()).toContain('is-wait')
    expect(wrapper.findAll(`.${prefix}-step`)[2].classes()).toContain('is-wait')
    await wrapper.setProps({ active: 1 })
    expect(wrapper.findAll(`.${prefix}-step`)[0].classes()).toContain('is-finish')
    expect(wrapper.findAll(`.${prefix}-step`)[1].classes()).toContain('is-process')
    expect(wrapper.findAll(`.${prefix}-step`)[2].classes()).toContain('is-wait')
    await wrapper.setProps({ active: 2 })
    expect(wrapper.findAll(`.${prefix}-step`)[0].classes()).toContain('is-finish')
    expect(wrapper.findAll(`.${prefix}-step`)[1].classes()).toContain('is-finish')
    expect(wrapper.findAll(`.${prefix}-step`)[2].classes()).toContain('is-process')
    await wrapper.setProps({ active: 3 })
    expect(wrapper.findAll(`.${prefix}-step`)[2].classes()).toContain('is-finish')
  })

  test('process-status', async () => {
    const wrapper = _mount(`
      <hl-steps :active="2" process-status="success">
        <hl-step />
        <hl-step />
        <hl-step />
      </hl-steps>
    `)
    await nextTick()
    expect(wrapper.findAll(`.${prefix}-step`)[2].classes()).toContain('is-success')
    await wrapper.setProps({ processStatus: 'error' })
    expect(wrapper.findAll(`.${prefix}-step`)[2].classes()).toContain('is-error')
  })

  test('finish-status', async () => {
    const wrapper = _mount(`
      <hl-steps :active="2" finish-status="error">
        <hl-step />
        <hl-step />
        <hl-step />
      </hl-steps>
    `)
    await nextTick()
    expect(wrapper.findAll(`.${prefix}-step`)[0].classes()).toContain('is-error')
    await wrapper.setProps({ finishStatus: 'success' })
    expect(wrapper.findAll(`.${prefix}-step`)[0].classes()).toContain('is-success')
  })

  test('step attribute', () => {
    const wrapper = _mount(`
      <hl-steps :active="0">
        <hl-step title="title" description="description" status="wait" >
          <template #icon>
            <hl-icon><system-close /></hl-icon>
          </template>
        </hl-step>
      </hl-steps>
    `)

    expect(wrapper.find(`.${prefix}-step`).classes()).toContain('is-wait')
    expect(wrapper.find('svg').exists()).toBe(true)
    expect(wrapper.find('.step-title').text()).toBe('title')
    expect(wrapper.find('.step-description').text()).toBe('description')
  })

  test('step slot', () => {
    const wrapper = _mount(`
      <hl-steps :active="0">
        <hl-step>
          <template #title>A</template>
          <template #description>B</template>
        </hl-step>
      </hl-steps>
    `)
    expect(wrapper.find('.step-title').text()).toBe('A')
    expect(wrapper.find('.step-description').text()).toBe('B')
  })
})
