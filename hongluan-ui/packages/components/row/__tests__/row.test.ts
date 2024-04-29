import { mount } from '@vue/test-utils'
import { describe, expect, test, it } from 'vitest'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import Row from '../src/row'

const { prefix } = usePrefix()

describe('Row', () => {
  const { prefix } = usePrefix()
  test('create', () => {
    const wrapper = mount(Row)
    expect(wrapper.classes()).toContain(`${prefix}-row`)
  })

  test('gutter', () => {
    const wrapper = mount(Row, {
      props: { gap: '20px', gapY: '20px' },
    })
    // const rowElm = wrapper.element as HTMLElement
    expect(wrapper.attributes('style')!.indexOf('--row-gap-y: 20') > -1).toBe(true)
    expect(wrapper.attributes('style')!.indexOf('--row-gap-x: 20') > -1).toBe(true)
    // expect(rowElm.style.marginLeft).toEqual('-10px')
    // expect(rowElm.style.marginRight).toEqual('-10px')
  })
  test('layout', async () => {
    const wrapper = mount(Row, {
      props: { layout: 'flex' },
    })
    expect(wrapper.classes()).toContain('flex')
  })
  test('count: number', async () => {
    const wrapper = mount(Row, {
      props: {
        count: 4,
        layout: 'flex',
      },
    })
    expect(wrapper.classes()).toContain('count-4')
  })
  test('count: string', async () => {
    const wrapper = mount(Row, {
      props: {
        count: 'count-lg-2 count-xl-3',
        layout: 'grid',
      },
    })
    expect(wrapper.classes()).toContain('count-lg-2')
    expect(wrapper.classes()).toContain('count-xl-3')
  })
  test('align', () => {
    const wrapper = mount(Row, {
      props: { align: 'between' },
    })
    expect(wrapper.classes()).toContain('between')
  })
  test('grid direction:vertical', () => {
    const wrapper = mount(Row, {
      props: { layout: 'grid' },
    })
    expect(wrapper.classes()).toContain('grid-direction-vertical')
  })
  test('grid direction:horizontal', () => {
    const wrapper = mount(Row, {
      props: {
        layout: 'grid',
        dir: 'horizontal',
      },
    })
    expect(wrapper.classes()).toContain('grid-direction-horizontal')
  })
})

