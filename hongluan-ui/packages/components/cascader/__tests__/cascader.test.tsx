import { nextTick, reactive, type VNode } from 'vue'
import { afterEach, describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { EVENT_CODE } from '@hongluan-ui/constants'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import triggerEvent from '@hongluan-ui/test-utils/trigger-event'
import Cascader from '../src/cascader.vue'
import HlForm from '@hongluan-ui/components/form'
import HlFormItem from '@hongluan-ui/components/form-item'
import { hasClass } from '@hongluan-ui/utils'

vi.mock('lodash-unified', async () => {
  return {
    ...((await vi.importActual('lodash-unified')) as Record<string, any>),
    debounce: vi.fn(fn => {
      fn.cancel = vi.fn()
      fn.flush = vi.fn()
      return fn
    }),
  }
})

const OPTIONS = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
      },
      {
        value: 'ningbo',
        label: 'Ningbo',
      },
    ],
  },
]

const AXIOM = 'Rem is the best girl'
const { prefix } = usePrefix()
const TRIGGER = `.${prefix}-selector`
const DROPDOWN = `.${prefix}-cascader-popper`
const NODE = '.cascader-node'
const ARROW = '.select-caret'
const CLEAR_BTN = '.select-close'
const TAG = `.${prefix}-tag`
const SUGGESTION_ITEM = '.cascader-suggestion-item'
const CHECK_ICON = '.system-icon.checked'
const SUGGESTION_PANEL = `.${prefix}-cascader-suggestion-panel`


const _mount: typeof mount = (options: any) => mount({
  components: {
    Cascader,
    HlForm,
    HlFormItem,
  },
  ...options,
}, {
  attachTo: 'body',
})

const _mountJSX = (render: () => VNode) =>
  mount(render, {
    attachTo: document.body,
  })

afterEach(() => {
  document.body.innerHTML = ''
})

describe('Cascader.vue', () => {
  test('toggle popper visible', async () => {
    const handleVisibleChange = vi.fn()
    const wrapper = _mount({
      template: `
        <cascader @visible-change="handleVisibleChange" />
      `,
      methods: {
        handleVisibleChange,
      },
    })
    const trigger = wrapper.find(TRIGGER)
    const dropdown = document.querySelector(DROPDOWN) as HTMLDivElement

    await trigger.trigger('click')
    expect(dropdown.style.display).not.toBe('none')
    expect(handleVisibleChange).toBeCalledWith(true)
    await trigger.trigger('click')
    expect(handleVisibleChange).toBeCalledWith(false)
    await trigger.trigger('click')
    document.body.click()
    expect(handleVisibleChange).toBeCalledWith(false)
  })

  test('expand and check', async () => {
    const handleChange = vi.fn()
    const handleExpandChange = vi.fn()
    const wrapper = _mount({
      template: `
        <cascader
          v-model="value"
          :options="options"
          @change="handleChange"
          @expand-change="handleExpandChange"
        />
      `,
      data () {
        return {
          value: [],
          options: OPTIONS,
        }
      },
      methods: {
        handleChange,
        handleExpandChange,
      },
    })
    const trigger = wrapper.find(TRIGGER)
    const dropdown = document.querySelector(DROPDOWN) as HTMLDivElement
    const vm = wrapper.vm as any

    await trigger.trigger('click')
    ;(dropdown.querySelector(NODE) as HTMLElement).click()
    await nextTick()
    expect(handleExpandChange).toBeCalledWith(['zhejiang'])
    ;(dropdown.querySelectorAll(NODE)[1] as HTMLElement).click()
    await nextTick()
    expect(handleChange).toBeCalledWith(['zhejiang', 'hangzhou'])
    expect(vm.value).toEqual(['zhejiang', 'hangzhou'])
    expect(wrapper.find('input').element.value).toBe('Zhejiang / Hangzhou')
  })

  test('with default value', async () => {
    const wrapper = mount(Cascader, {
      props: {
        options: OPTIONS,
        modelValue: ['zhejiang', 'hangzhou'],
      },
    })
    await nextTick()
    expect(wrapper.find('input').element.value).toBe('Zhejiang / Hangzhou')
    await wrapper.setProps({ modelValue: ['zhejiang', 'ningbo'] })
    expect(wrapper.find('input').element.value).toBe('Zhejiang / Ningbo')
  })

  test('options change', async () => {
    const wrapper = mount(Cascader, {
      props: {
        options: OPTIONS,
        modelValue: ['zhejiang', 'hangzhou'],
      },
    })
    await wrapper.setProps({ options: [] })
    expect(wrapper.find('input').element.value).toBe('')
  })

  test('disabled', async () => {
    const handleVisibleChange = vi.fn()
    const wrapper = _mount({
      template: `
        <cascader disabled @visible-change="handleVisibleChange" />
      `,
      methods: {
        handleVisibleChange,
      },
    })
    await wrapper.find(TRIGGER).trigger('click')
    expect(handleVisibleChange).not.toBeCalled()
    expect(wrapper.find('input[disabled]').exists()).toBe(true)
  })

  test('custom placeholder', async () => {
    const wrapper = mount(Cascader, {
      props: {
        placeholder: AXIOM,
      },
    })
    expect(wrapper.find('input').attributes().placeholder).toBe(AXIOM)
  })

  test('clearable', async () => {
    const wrapper = mount(Cascader, {
      props: {
        options: OPTIONS,
        clearable: true,
        modelValue: ['zhejiang', 'hangzhou'],
      },
    })
    const trigger = wrapper.find(TRIGGER)
    expect(wrapper.find(ARROW).exists()).toBe(true)
    await trigger.trigger('mouseenter')
    expect(wrapper.find(ARROW + '.visible').exists()).toBe(false)
    await wrapper.find(CLEAR_BTN).trigger('click')
    expect(wrapper.find('input').element.value).toBe('')
    expect((wrapper.vm as any).getCheckedNodes().length).toBe(0)
    await trigger.trigger('mouseleave')
    await trigger.trigger('mouseenter')
    await expect(wrapper.find(CLEAR_BTN + '.visible').exists()).toBe(false)
  })

  test('show last level label', async () => {
    const wrapper = mount(Cascader, {
      props: {
        options: OPTIONS,
        showAllLevels: false,
        modelValue: ['zhejiang', 'hangzhou'],
      },
    })
    await nextTick()
    expect(wrapper.find('input').element.value).toBe('Hangzhou')
  })

  test('multiple mode', async () => {
    const wrapper = _mount({
      template: `
        <cascader
          v-model="value"
          :options="options"
          :props="props"
        />
      `,
      data () {
        return {
          options: OPTIONS,
          props: { multiple: true },
          value: [['zhejiang', 'hangzhou'], ['zhejiang', 'ningbo']],
        }
      },
    })
    await nextTick()
    const tags = wrapper.findAll(TAG)
    const [firstTag, secondTag] = tags
    expect(tags.length).toBe(2)
    expect(firstTag.text()).toBe('Zhejiang / Hangzhou')
    expect(secondTag.text()).toBe('Zhejiang / Ningbo')
    await firstTag.find('.tag-close').trigger('click')
    expect(wrapper.findAll(TAG).length).toBe(1)
    expect(wrapper.vm.value).toEqual([['zhejiang', 'ningbo']])
  })

  test('collapse tags', async () => {
    const wrapper = mount(Cascader, {
      props: {
        options: OPTIONS,
        props: { multiple: true },
        collapseTags: true,
        modelValue: [['zhejiang', 'hangzhou'], ['zhejiang', 'ningbo']],
      },
    })
    await nextTick()
    const tags = wrapper.findAll(TAG).filter(item => {
      return !hasClass(item.element, 'in-tooltip')
    })
    expect(tags[0].text()).toBe('Zhejiang / Hangzhou')
    expect(tags.length).toBe(2)
  })

  test('tag type', async () => {
    const wrapper = mount(Cascader, {
      props: {
        options: OPTIONS,
        props: { multiple: true },
        tagType: 'success',
        modelValue: [['zhejiang', 'hangzhou']],
      },
    })
    await nextTick()
    expect(wrapper.find(`.${prefix}-tag`).classes()).toContain('success')
  })


  test('filterable', async () => {
    const wrapper = _mount({
      template: `
        <cascader
          v-model="value"
          :options="options"
          filterable
        />
      `,
      data () {
        return {
          options: OPTIONS,
          value: [],
        }
      },
    })

    const input = wrapper.find('input')
    // const dropdown = document.querySelector(DROPDOWN)
    input.element.value = 'Ni'
    await input.trigger('compositionstart')
    await input.trigger('input')
    input.element.value = 'Ha'
    await input.trigger('compositionupdate')
    await input.trigger('input')
    await input.trigger('compositionend')
    const suggestions = document.querySelectorAll(SUGGESTION_ITEM) as NodeListOf<HTMLElement>
    const hzSuggestion = suggestions[0]
    expect(suggestions.length).toBe(1)
    expect(hzSuggestion.textContent).toBe('Zhejiang / Hangzhou')
    hzSuggestion.click()
    await nextTick()
    expect(hzSuggestion.querySelector(CHECK_ICON)).toBeTruthy()
    expect(wrapper.vm.value).toEqual(['zhejiang', 'hangzhou'])
    hzSuggestion.click()
    await nextTick()
    expect(wrapper.vm.value).toEqual(['zhejiang', 'hangzhou'])
  })

  test('filterable in multiple mode', async () => {
    const wrapper = _mount({
      template: `
        <cascader
          v-model="value"
          ref="cascader"
          :options="options"
          :props="props"
          filterable
        />
      `,
      data () {
        return {
          options: OPTIONS,
          props: { multiple: true },
          value: [],
        }
      },
    })

    const target = wrapper.findComponent({ ref: 'cascader' }).vm as any
    target.hlSelector.setValue([])
    await nextTick()
    const input = wrapper.find('.input-inner')
    const dropdown = document.querySelector(DROPDOWN)
    ;(input.element as HTMLInputElement).value = 'Ha'
    await input.trigger('input')
    await nextTick()
    const hzSuggestion = dropdown?.querySelector(SUGGESTION_ITEM) as HTMLElement
    hzSuggestion.click()
    await nextTick()
    expect(wrapper.vm.value).toEqual([['zhejiang', 'hangzhou']])
    hzSuggestion.click()
    await nextTick()
    expect(wrapper.vm.value).toEqual([])
  })

  test('filter method', async () => {
    const filterMethod = vi.fn((node, keyword) => {
      const { text, value } = node
      return text.includes(keyword) || value.includes(keyword)
    })
    const wrapper = mount(Cascader, {
      props: {
        options: OPTIONS,
        filterable: true,
        filterMethod,
      },
    })

    const input = wrapper.find('input')
    const dropdown = document.querySelector(DROPDOWN)
    input.element.value = 'ha'
    await input.trigger('input')
    const hzSuggestion = dropdown?.querySelector(SUGGESTION_ITEM) as HTMLElement
    expect(filterMethod).toBeCalled()
    expect(hzSuggestion.textContent).toBe('Zhejiang / Hangzhou')
  })

  test('filterable keyboard selection', async () => {
    const wrapper = _mount({
      template: `
        <cascader
          v-model="value"
          :options="options"
          filterable
        />
      `,
      data() {
        return {
          options: OPTIONS,
          value: [],
        }
      },
    })

    const input = wrapper.find('input')
    const dropdown = document.querySelector(DROPDOWN)
    input.element.value = 'h'
    await input.trigger('input')
    const suggestionsPanel = document.querySelector(
      SUGGESTION_PANEL,
    ) as HTMLDivElement
    const suggestions = dropdown?.querySelectorAll(
      SUGGESTION_ITEM,
    ) as NodeListOf<HTMLElement>
    const hzSuggestion = suggestions[0]
    triggerEvent(suggestionsPanel, 'keydown', EVENT_CODE.down)
    expect(document.activeElement?.textContent).toBe('Zhejiang / Hangzhou')
    triggerEvent(hzSuggestion, 'keydown', EVENT_CODE.down)
    expect(document.activeElement?.textContent).toBe('Zhejiang / Ningbo')
    triggerEvent(hzSuggestion, 'keydown', EVENT_CODE.enter)
    await nextTick()
    expect(wrapper.vm.value).toEqual(['zhejiang', 'hangzhou'])
  })


  test('placeholder disappear when resetForm', async () => {
    const model = reactive({
      name: new Array<string>(),
    })

    const wrapper = _mountJSX(() => (
      <HlForm model={model}>
        <HlFormItem label="Activity name" prop="name">
          <Cascader
            v-model={model.name}
            options={OPTIONS}
            props={{ multiple: true }}
            filterable
            placeholder={AXIOM}
          />
        </HlFormItem>
      </HlForm>
    ))

    model.name = ['zhejiang', 'hangzhou']
    await nextTick()

    wrapper.findComponent(HlForm).vm.resetFields()
    await nextTick()
    expect(wrapper.find('input').element.placeholder).toBe(AXIOM)
  })

})
