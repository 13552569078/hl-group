import { mount, VueWrapper } from '@vue/test-utils'
import { nextTick } from 'vue'
import { afterEach, describe, expect, it, test, vi } from 'vitest'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import { HlFormItem } from '@hongluan-ui/components/form-item'
import Select from '../src/select.vue'
import Group from '../src/option-group.vue'
import Option from '../src/option.vue'
import { EVENT_CODE } from '@hongluan-ui/constants'

import type { ComponentPublicInstance } from 'vue'
import { usePopperContainerId } from '@hongluan-ui/hooks'

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

interface SelectProps {
  filterMethod?: any
  remoteMethod?: any
  multiple?: boolean
  clearable?: boolean
  filterable?: boolean
  allowCreate?: boolean
  remote?: boolean
  collapseTags?: boolean
  automaticDropdown?: boolean
  multipleLimit?: number
  popperClass?: string
  defaultFirstOption?: boolean
}
const { prefix } = usePrefix()

const _mount = (template: string, data: any = () => ({}), otherObj?: any) => mount({
  components: {
    'hl-select': Select,
    'hl-option': Option,
    'hl-group-option': Group,
    'hl-form-item': HlFormItem,
  },
  template,
  data,
  ...otherObj,
}, {
  attachTo: 'body',
})

function getOptions(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>(
    'body > div:last-child .select-dropdown-item',
  ))
}

const getSelectVm = (configs: any = {}, options?: any) => {
  ['multiple', 'clearable', 'defaultFirstOption', 'filterable', 'allowCreate', 'remote', 'collapseTags', 'automaticDropdown'].forEach(config => {
    configs[config] = configs[config] || false
  })
  configs.multipleLimit = configs.multipleLimit || 0
  if (!options) {
    options = [{
      value: '选项1',
      label: '黄金糕',
      disabled: false,
    }, {
      value: '选项2',
      label: '双皮奶',
      disabled: false,
    }, {
      value: '选项3',
      label: '蚵仔煎',
      disabled: false,
    }, {
      value: '选项4',
      label: '龙须面',
      disabled: false,
    }, {
      value: '选项5',
      label: '北京烤鸭',
      disabled: false,
    }]
  }

  return _mount(`
    <hl-select
      ref="select"
      v-model="value"
      :multiple="multiple"
      :multiple-limit="multipleLimit"
      :popper-class="popperClass"
      :clearable="clearable"
      :default-first-option="defaultFirstOption"
      :filterable="filterable"
      :collapse-tags="collapseTags"
      :allow-create="allowCreate"
      :filterMethod="filterMethod"
      :remote="remote"
      :loading="loading"
      :remoteMethod="remoteMethod"
      :automatic-dropdown="automaticDropdown">
      <hl-option
        v-for="item in options"
        :label="item.label"
        :key="item.value"
        :disabled="item.disabled"
        :value="item.value">
      </hl-option>
    </hl-select>
  `, () => ({
    options,
    multiple: configs.multiple,
    multipleLimit: configs.multipleLimit,
    clearable: configs.clearable,
    defaultFirstOption: configs.defaultFirstOption,
    filterable: configs.filterable,
    collapseTags: configs.collapseTags,
    allowCreate: configs.allowCreate,
    popperClass: configs.popperClass,
    automaticDropdown: configs.automaticDropdown,
    loading: false,
    filterMethod: configs.filterMethod,
    remote: configs.remote,
    remoteMethod: configs.remoteMethod,
    value: configs.multiple ? [] : '',
  }))
}

const getGroupSelectVm = (configs: any = {}, options?: any) => {
  ['multiple', 'clearable', 'filterable', 'allowCreate', 'remote', 'collapseTags', 'automaticDropdown'].forEach(config => {
    configs[config] = configs[config] || false
  })
  configs.multipleLimit = configs.multipleLimit || 0
  if (!options) {
    options = [{
      label: 'Australia',
      options: [{
        value: 'Sydney',
        label: 'Sydney',
      }, {
        value: 'Melbourne',
        label: 'Melbourne',
      }],
    }, {
      label: 'China',
      options: [{
        value: 'Shanghai',
        label: 'Shanghai',
      }, {
        value: 'Shenzhen',
        label: 'Shenzhen',
      }, {
        value: 'Guangzhou',
        label: 'Guangzhou',
      }, {
        value: 'Dalian',
        label: 'Dalian',
      }],
    }, {
      label: 'India',
      options: [{
        value: 'Mumbai',
        label: 'Mumbai',
      }, {
        value: 'Delhi',
        label: 'Delhi',
      }, {
        value: 'Bangalore',
        label: 'Bangalore',
      }],
    }, {
      label: 'Indonesia',
      options: [{
        value: 'Bandung',
        label: 'Bandung',
      }, {
        value: 'Jakarta',
        label: 'Jakarta',
      }],
    }]
  }

  return _mount(`
    <hl-select
      ref="select"
      v-model="value"
      :multiple="multiple"
      :multiple-limit="multipleLimit"
      :popper-class="popperClass"
      :clearable="clearable"
      :filterable="filterable"
      :collapse-tags="collapseTags"
      :allow-create="allowCreate"
      :filterMethod="filterMethod"
      :remote="remote"
      :loading="loading"
      :remoteMethod="remoteMethod"
      :automatic-dropdown="automaticDropdown">
      <hl-group-option
        v-for="group in options"
        :key="group.label"
        :disabled="group.disabled"
        :label="group.label">
        <hl-option
          v-for="item in group.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"/>
      </hl-group-option>
    </hl-select>
`, () => ({
    options,
    multiple: configs.multiple,
    multipleLimit: configs.multipleLimit,
    clearable: configs.clearable,
    filterable: configs.filterable,
    collapseTags: configs.collapseTags,
    allowCreate: configs.allowCreate,
    popperClass: configs.popperClass,
    automaticDropdown: configs.automaticDropdown,
    loading: false,
    filterMethod: configs.filterMethod,
    remote: configs.remote,
    remoteMethod: configs.remoteMethod,
    value: configs.multiple ? [] : '',
  }))
}

const getInnerInput = (wrapper: VueWrapper<ComponentPublicInstance>) => {
  return wrapper.find(`.${prefix}-input input.input-inner`).element as HTMLInputElement
}

describe('Select', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  test('create', async () => {
    const wrapper = _mount(`<hl-select v-model="value"></hl-select>`, () => ({ value: '' }))
    expect(wrapper.find(`.${prefix}-input-select`).exists()).toBe(true)
    expect(getInnerInput(wrapper).placeholder).toBe('请选择')
    const select = wrapper.findComponent({ name: 'Select' })
    await select.trigger('mouseenter')
    wrapper.find(`.${prefix}-input-select`).trigger('click')
    expect((select.vm as any).visible).toBe(true)
  })

  test('options rendered correctly', () => {
    const wrapper = getSelectVm({ popperClass: 'custom-dropdown' })
    const options = document.querySelector('.custom-dropdown')?.querySelectorAll('.select-dropdown-item')
    const result = [].every.call(options, (option: HTMLElement, index) => {
      const text = option.querySelector('div')?.textContent
      const vm = wrapper.vm as any
      return text === vm.options[index].label
    })
    expect(result).toBe(true)
  })

  test('custom dropdown class', () => {
    const wrapper = getSelectVm({ popperClass: 'custom-dropdown' })
    const dropdown = wrapper.findComponent({ name: 'SelectDropdown' })
    expect(dropdown.classes()).toContain('custom-dropdown')
  })

  test('default value', async() => {
    const wrapper = _mount(`
      <hl-select v-model="value">
        <hl-option
          v-for="item in options"
          :label="item.label"
          :key="item.value"
          :value="item.value">
        </hl-option>
      </hl-select>
    `,
    () => ({
      options: [{
        value: '选项1',
        label: '黄金糕',
      }, {
        value: '选项2',
        label: '双皮奶',
      }],
      value: '选项2',
    }))
    await wrapper.vm.$nextTick()
    expect(getInnerInput(wrapper).value).toBe('双皮奶')
  })

  test('set default value to object', async () => {
    const wrapper = _mount(
      `
      <hl-select v-model="value">
        <hl-option
          v-for="item in options"
          :label="item.label"
          :key="item.value.value"
          :value="item.value">
        </hl-option>
      </hl-select>
    `,
      () => ({
        options: [
          {
            value: {
              value: '选项1',
            },
            label: '黄金糕',
          },
          {
            value: {
              value: '选项2',
            },
            label: '双皮奶',
          },
        ],
        value: {
          value: '选项2',
        },
      }),
    )
    await nextTick()

    expect(getInnerInput(wrapper).value).toBe('双皮奶')
  })

  test('custom label', async () => {
    const wrapper = _mount(
      `
      <hl-select v-model="value">
        <hl-option
          v-for="item in options"
          :label="item.name"
          :key="item.id"
          :value="item.id">
        </hl-option>
      </hl-select>
    `,
      () => ({
        options: [
          {
            id: 1,
            name: '黄金糕',
          },
          {
            id: 2,
            name: '双皮奶',
          },
        ],
        value: 2,
      }),
    )
    await nextTick()

    expect(getInnerInput(wrapper).value).toBe('双皮奶')
  })

  test('custom label with object', async () => {
    const wrapper = _mount(
      `
      <hl-select v-model="value" value-key="id">
        <hl-option
          v-for="item in options"
          :label="item.name"
          :key="item.id"
          :value="item">
        </hl-option>
      </hl-select>
    `,
      () => ({
        options: [
          {
            id: 1,
            name: '黄金糕',
          },
          {
            id: 2,
            name: '双皮奶',
          },
        ],
        value: {
          id: 2,
        },
      }),
    )
    await nextTick()

    expect(getInnerInput(wrapper).value).toBe('双皮奶')
  })

  test('sync set value and options', async () => {
    const wrapper = _mount(`
    <hl-select v-model="value">
      <hl-option
        v-for="item in options"
        :label="item.label"
        :key="item.value"
        :value="item.value">
      </hl-option>
    </hl-select>
  `,
    () => ({
      options: [{
        value: '选项1',
        label: '黄金糕',
      }, {
        value: '选项2',
        label: '双皮奶',
      }],
      value: '选项2',
    }))
    const vm = wrapper.vm as any
    vm.options = [{
      value: '选项1',
      label: '黄金糕',
    }]
    vm.value = '选项1'
    await wrapper.vm.$nextTick()
    expect(getInnerInput(wrapper).value).toBe('黄金糕')
  })

  test('single select', async () => {
    const wrapper = _mount(`
      <hl-select v-model="value" @change="handleChange">
        <hl-option
          v-for="item in options"
          :label="item.label"
          :key="item.value"
          :value="item.value">
          <p>{{item.label}} {{item.value}}</p>
        </hl-option>
      </hl-select>
    `,
    () => ({
      options: [{
        value: '选项1',
        label: '黄金糕',
      }, {
        value: '选项2',
        label: '双皮奶',
      }, {
        value: '选项3',
        label: '蚵仔煎',
      }, {
        value: '选项4',
        label: '龙须面',
      }, {
        value: '选项5',
        label: '北京烤鸭',
      }],
      value: '',
      count: 0,
    }),
    {
      methods: {
        handleChange() {
          this.count++
        },
      },
    })

    await wrapper.find(`.${prefix}-input-select`).trigger('click')
    const options = getOptions()
    const vm = wrapper.vm as any
    expect(vm.value).toBe('')
    expect(getInnerInput(wrapper).value).toBe('')
    options[2].click()
    await nextTick()
    expect(vm.value).toBe('选项3')
    expect(getInnerInput(wrapper).value).toBe('蚵仔煎')
    expect(vm.count).toBe(1)
    options[4].click()
    await nextTick()
    expect(vm.value).toBe('选项5')
    expect(getInnerInput(wrapper).value).toBe('北京烤鸭')
    expect(vm.count).toBe(2)
  })

  test('disabled option', async() => {
    const wrapper = getSelectVm()
    const vm = wrapper.vm as any
    wrapper.find(`.${prefix}-input-select`).trigger('click')
    vm.options[1].disabled = true
    await nextTick()
    const options = getOptions()
    expect(options[1].className).toContain('disabled')
    options[1].click()
    await nextTick()
    expect(vm.value).toBe('')
  })

  test('disabled select', () => {
    const wrapper = _mount(`<hl-select disabled v-model="value"><hl-option value="1" label="1"></hl-option></hl-select>`, () => ({ value: '' }))
    expect(wrapper.find(`.${prefix}-input`).classes()).toContain('is-disabled')
  })

  test('group disabled option', () => {
    const optionGroupData = [
      {
        label: 'Australia',
        disabled: true,
        options: [
          {
            value: 'Sydney',
            label: 'Sydney',
          },
          {
            value: 'Melbourne',
            label: 'Melbourne',
          },
        ],
      },
    ]
    const wrapper = getGroupSelectVm({}, optionGroupData)
    const options = wrapper.findAllComponents(Option)
    expect(options[0].classes('is-disabled')).toBeTruthy()
  })

  test('keyboard operations when option-group is disabled', async () => {
    const optionGroupData = [
      {
        label: 'Australia',
        disabled: true,
        options: [
          {
            value: 'Sydney',
            label: 'Sydney',
          },
          {
            value: 'Melbourne',
            label: 'Melbourne',
          },
        ],
      },
      {
        label: 'China',
        options: [
          {
            value: 'Shanghai',
            label: 'Shanghai',
          },
          {
            value: 'Shenzhen',
            label: 'Shenzhen',
          },
          {
            value: 'Guangzhou',
            label: 'Guangzhou',
          },
          {
            value: 'Dalian',
            label: 'Dalian',
          },
        ],
      },
    ]
    const wrapper = getGroupSelectVm({}, optionGroupData)
    const select = wrapper.findComponent({ name: 'Select' })
    const vm = select.vm as any
    let i = 8
    while (i--) {
      vm.navigateOptions('next')
    }
    vm.navigateOptions('prev')
    vm.navigateOptions('prev')
    vm.navigateOptions('prev')
    await vm.$nextTick()
    vm.selectOption()
    await vm.$nextTick()
    expect((wrapper.vm as any).value).toBe('Dalian')
  })

  test('visible event', async() => {
    const wrapper = _mount(`
    <hl-select v-model="value" @visible-change="handleVisibleChange">
      <hl-option
        v-for="item in options"
        :label="item.label"
        :key="item.value"
        :value="item.value">
      </hl-option>
    </hl-select>`,
    () => ({
      options: [],
      value: '',
      visible: '',
    }),
    {
      methods: {
        handleVisibleChange(val: boolean) {
          this.visible = val
        },
      },
    })
    const select = wrapper.findComponent({ name: 'Select' })
    const vm = wrapper.vm as any
    const selectVm = select.vm as any
    selectVm.visible = true
    await selectVm.$nextTick()
    expect(vm.visible).toBe(true)
  })

  test('keyboard operations', async() => {
    vi.useFakeTimers()
    const wrapper = getSelectVm()
    const select = wrapper.findComponent({ name: 'Select' })
    const vm = select.vm as any
    let i = 8
    while (i--) {
      vm.navigateOptions('next')
    }
    vm.navigateOptions('prev')
    vm.navigateOptions('prev')
    vm.navigateOptions('prev')
    await vm.$nextTick()
    expect(vm.hoverIndex).toBe(3)
    vm.selectOption()
    await vm.$nextTick()
    expect((wrapper.vm as any).value).toBe('选项4')
    vm.toggleMenu()

    vi.runAllTimers()
    await nextTick()
    vm.toggleMenu()
    await vm.$nextTick
    expect(vm.hoverIndex).toBe(3)
    vi.useRealTimers()
  })

  test('clearable', async () => {
    const wrapper = getSelectVm({ clearable: true })
    const select = wrapper.findComponent({ name: 'Select' })
    const vm = wrapper.vm as any
    const selectVm = select.vm as any
    vm.value = '选项1'
    await vm.$nextTick()
    selectVm.inputHovering = true
    await selectVm.$nextTick()
    const iconClear = wrapper.find('.select-close')
    expect(iconClear.exists()).toBe(true)
    await iconClear.trigger('click')
    expect(vm.value).toBe('')
  })

  test('check default first option', async () => {
    const wrapper = getSelectVm({
      filterable: true,
      defaultFirstOption: true,
    })
    const select = wrapper.findComponent({ name: 'Select' })
    const selectVm = select.vm as any
    const input = wrapper.find('input')
    input.element.focus()

    expect(selectVm.hoverIndex).toBe(0)
    selectVm.navigateOptions('next')
    expect(selectVm.hoverIndex).toBe(1)
  })

  test('check default first option when the very first option is disabled', async () => {
    const demoOptions = [{
      value: 'HTML',
      label: 'HTML',
      disabled: true,
    }, {
      value: 'CSS',
      label: 'CSS',
      disabled: false,
    }, {
      value: 'JavaScript',
      label: 'JavaScript',
      disabled: false,
    }]
    const wrapper = getSelectVm({
      filterable: true,
      defaultFirstOption: true,
    }, demoOptions)
    const select = wrapper.findComponent({ name: 'Select' })
    const selectVm = select.vm as any
    const input = wrapper.find('input')
    input.element.focus()

    expect(selectVm.hoverIndex).toBe(1) // index 0 was skipped
    selectVm.navigateOptions('next')
    expect(selectVm.hoverIndex).toBe(2)
    selectVm.navigateOptions('next')
    expect(selectVm.hoverIndex).toBe(1) // index 0 was skipped
  })

  test('allow create', async () => {
    const wrapper = getSelectVm({ filterable: true, allowCreate: true })
    const select = wrapper.findComponent({ name: 'Select' })
    const selectVm = select.vm as any
    const input = wrapper.find('input')
    input.element.focus()
    selectVm.selectedLabel = 'new'
    selectVm.debouncedOnInputChange()
    await nextTick()
    const options = [...getOptions()]
    const target = options.filter(option => option.textContent === 'new')
    target[0].click()
    expect((wrapper.vm as any).value).toBe('new')
  })

  test('allow create async option', async () => {
    const options = [
      {
        value: '选项1',
        label: '黄金糕',
      },
      {
        value: '选项2',
        label: '双皮奶',
      },
    ]
    const wrapper = _mount(
      `
      <hl-select
        v-model="value"
        filterable
        allowCreate
      >
        <hl-option
          v-for="item in options"
          :label="item.label"
          :key="item.value"
          :value="item.value">
        </hl-option>
      </hl-select>
    `,
      () => ({
        options: [],
        value: '选项2',
      }),
    )

    await nextTick()
    expect(getOptions()).toHaveLength(1)
    await wrapper.setData({
      options,
    })
    expect(getOptions()).toHaveLength(options.length)
  })

  test('multiple select', async () => {
    const wrapper = getSelectVm({ multiple: true })
    await wrapper.find(`.${prefix}-input-select`).trigger('click')
    const options = getOptions()
    const vm = wrapper.vm as any
    vm.value = ['选项1']
    vm.$nextTick()
    options[1].click()
    await nextTick()
    options[3].click()
    await nextTick()
    expect(vm.value.indexOf('选项2') > -1 && vm.value.indexOf('选项4') > -1).toBe(true)
    const tagCloseIcons = wrapper.findAll('.tag-close')
    await tagCloseIcons[0].trigger('click')
    expect(vm.value.indexOf('选项1')).toBe(-1)
  })

  // test('multiple select when content overflow', async () => {
  //   const wrapper = _mount(`
  //     <hl-select v-model="selectedList" multiple placeholder="请选择">
  //       <hl-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
  //       </hl-option>
  //     </hl-select>
  //   `,
  //   () => ({
  //     options: [{
  //       value: '选项1',
  //       label: '黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕',
  //     }, {
  //       value: '选项2',
  //       label: '双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶',
  //     }, {
  //       value: '选项3',
  //       label: '蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎',
  //     }, {
  //       value: '选项4',
  //       label: '龙须面',
  //     }, {
  //       value: '选项5',
  //       label: '北京烤鸭',
  //     }],
  //     selectedList: [],
  //   }))
  //   await wrapper.find(`.${prefix}-input-select`).trigger('click')
  //   const options = getOptions()
  //   const selectWrapper = wrapper.findComponent(Select)
  //   const inputWrapper = selectWrapper.findComponent({ ref: 'reference' })
  //   const inputDom = inputWrapper.element
  //   const inputRect = {
  //     height: 40,
  //     width: 221,
  //     x:44,
  //     y:8,
  //     top:8,
  //   }
  //   const mockInputWidth = vi.spyOn(inputDom, 'getBoundingClientRect').mockReturnValue(inputRect as DOMRect)
  //   selectWrapper.vm.handleResize()
  //   options[0].click()
  //   await nextTick()
  //   options[1].click()
  //   await nextTick()
  //   options[2].click()
  //   await nextTick()
  //   const tagWrappers = wrapper.findAll(`.${prefix}-tag span`)
  //   for(let i=0;i < tagWrappers.length;i++) {
  //     const tagWrapperDom = tagWrappers[i].element as HTMLElement
  //     expect(parseInt(tagWrapperDom.style.maxWidth) === inputRect.width - 75).toBe(true)
  //   }
  //   mockInputWidth.mockRestore()
  // })

  // test('multiple select with collapseTags when content overflow', async () => {
  //   const wrapper = _mount(`
  //     <hl-select v-model="selectedList" multiple collapseTags placeholder="请选择">
  //       <hl-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
  //       </hl-option>
  //     </hl-select>
  //   `,
  //   () => ({
  //     options: [{
  //       value: '选项1',
  //       label: '黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕',
  //     }, {
  //       value: '选项2',
  //       label: '双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶',
  //     }, {
  //       value: '选项3',
  //       label: '蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎蚵仔煎',
  //     }, {
  //       value: '选项4',
  //       label: '龙须面',
  //     }, {
  //       value: '选项5',
  //       label: '北京烤鸭',
  //     }],
  //     selectedList: [],
  //   }))
  //   await wrapper.find(`.${prefix}-input-select`).trigger('click')
  //   const options = getOptions()
  //   const selectWrapper = wrapper.findComponent(Select)
  //   const inputWrapper = selectWrapper.findComponent({ ref: 'reference' })
  //   const inputDom = inputWrapper.element
  //   const inputRect = {
  //     height: 40,
  //     width: 221,
  //     x:44,
  //     y:8,
  //     top:8,
  //   }
  //   const mockInputWidth = vi.spyOn(inputDom, 'getBoundingClientRect').mockReturnValue(inputRect as DOMRect)
  //   selectWrapper.vm.handleResize()
  //   options[0].click()
  //   await nextTick()
  //   options[1].click()
  //   await nextTick()
  //   options[2].click()
  //   await nextTick()
  //   const tagWrappers = wrapper.findAll(`.${prefix}-tag span`)
  //   const tagWrapperDom = tagWrappers[0].element as HTMLElement
  //   expect(parseInt(tagWrapperDom.style.maxWidth) === inputRect.width - 123).toBe(true)
  //   mockInputWidth.mockRestore()
  // })

  test('multiple remove-tag', async () => {
    const wrapper = _mount(`
      <hl-select v-model="value" multiple @remove-tag="handleRemoveTag">
        <hl-option
          v-for="item in options"
          :label="item.label"
          :key="item.value"
          :value="item.value">
          <p>{{item.label}} {{item.value}}</p>
        </hl-option>
      </hl-select>
    `,
    () => ({
      options: [{
        value: '选项1',
        label: '黄金糕',
      }, {
        value: '选项2',
        label: '双皮奶',
      }, {
        value: '选项3',
        label: '蚵仔煎',
      }, {
        value: '选项4',
        label: '龙须面',
      }, {
        value: '选项5',
        label: '北京烤鸭',
      }],
      value: ['选项1', '选项2'],
    }),
    {
      methods: {
        handleRemoveTag() {
          // pass
        },
      },
    })

    const vm = wrapper.vm as any
    await vm.$nextTick()
    expect(vm.value.length).toBe(2)
    const tagCloseIcons = wrapper.findAll('.tag-close')
    await tagCloseIcons[1].trigger('click')
    expect(vm.value.length).toBe(1)
    await tagCloseIcons[0].trigger('click')
    expect(vm.value.length).toBe(0)
  })

  test('multiple limit', async () => {
    const wrapper = getSelectVm({ multiple: true, multipleLimit: 1 })
    const vm = wrapper.vm as any
    await wrapper.find(`.${prefix}-input-select`).trigger('click')
    const options = getOptions()
    options[1].click()
    await nextTick()
    expect(vm.value.indexOf('选项2') > -1).toBe(true)
    options[3].click()
    await nextTick()
    expect(vm.value.indexOf('选项4')).toBe(-1)
  })

  test('event:focus & blur', async () => {
    const handleFocus = vi.fn()
    const handleBlur = vi.fn()
    const wrapper = _mount(`<hl-select
      @focus="handleFocus"
      @blur="handleBlur" />`, () => ({
      handleFocus,
      handleBlur,
    }))
    const select = wrapper.findComponent(({ name: 'Select' }))
    const input = select.find('input')

    expect(input.exists()).toBe(true)
    await input.trigger('focus')
    expect(handleFocus).toHaveBeenCalled()
    await input.trigger('blur')
    await nextTick()
    expect(handleBlur).toHaveBeenCalled()
  })

  test('event:focus & blur for multile & filterable select', async () => {
    const handleFocus = vi.fn()
    const handleBlur = vi.fn()
    const wrapper = _mount(`
    <hl-select
      @focus="handleFocus"
      @blur="handleBlur"
      multiple
      filterable
    />`, () => ({
      handleFocus,
      handleBlur,
    }))
    const select = wrapper.findComponent(({ name: 'Select' }))
    const input = select.find('input')

    expect(input.exists()).toBe(true)
    await input.trigger('focus')
    expect(handleFocus).toHaveBeenCalled()
    await input.trigger('blur')
    expect(handleBlur).toHaveBeenCalled()
  })

  test('should not open popper when automatic-dropdown not set', async () => {
    const wrapper = getSelectVm()
    const select = wrapper.findComponent({ name: 'Select' })
    await select.findComponent({ ref: 'reference' })
      .find('input')
      .element.focus()
    expect((select.vm as any).visible).toBe(false)
  })

  test('should open popper when automatic-dropdown is set', async () => {
    const wrapper = getSelectVm({ automaticDropdown: true })
    const select = wrapper.findComponent({ name: 'Select' })
    await select.findComponent({ ref: 'reference' }).find('input').trigger('focus')
    expect((select.vm as any).visible).toBe(true)
  })

  test('only emit change on user input', async () => {
    let callCount = 0
    const wrapper = _mount(`
    <hl-select v-model="value" @change="change" ref="select">
      <hl-option label="1" value="1" />
      <hl-option label="2" value="2" />
      <hl-option label="3" value="3" />
    </hl-select>`,
    () => ({
      value: '1',
      change: () => ++callCount,
    }))

    expect(callCount).toBe(0)
    await wrapper.find(`.${prefix}-input-select`).trigger('click')
    const options = getOptions()
    options[2].click()
    expect(callCount).toBe(1)
  })

  test('render slot `empty`', async () => {
    const wrapper = _mount(`
      <hl-select v-model="value">
        <template #empty>
          <div class="empty-slot">EmptySlot</div>
        </template>
      </hl-select>`,
    () => ({
      value: '1',
    }))
    await wrapper.find(`.${prefix}-input-select`).trigger('click')
    expect(document.querySelector('.empty-slot')?.textContent).toBe('EmptySlot')
  })

  test('should set placeholder to label of selected option when filterable is true and multiple is false', async() => {
    const wrapper = _mount(`
      <hl-select ref="select" v-model="value" filterable>
        <hl-option label="test" value="test" />
      </hl-select>`,
    () => ({ value: 'test' }))
    const vm = wrapper.vm as any
    await wrapper.trigger('mouseenter')
    await wrapper.find(`.${prefix}-input-select`).trigger('click')
    const selectVm = wrapper.findComponent({ name: 'Select' }).vm as any
    expect(selectVm.visible).toBe(true)
    expect(getInnerInput(wrapper).placeholder).toBe('test')
    expect(vm.value).toBe('test')
  })

  test('default value is null or undefined', async() => {
    const wrapper = _mount(`
    <hl-select v-model="value">
      <hl-option
        v-for="item in options"
        :label="item.label"
        :key="item.value"
        :value="item.value">
      </hl-option>
    </hl-select>`,
    () => ({
      options: [{
        value: '选项1',
        label: '黄金糕',
      }, {
        value: '选项2',
        label: '双皮奶',
      }],
      value: undefined,
    }))
    const vm = wrapper.vm as any
    vm.value = null
    await vm.$nextTick()
    expect(getInnerInput(wrapper).value).toBe('')
    vm.value = '选项1'
    await vm.$nextTick()
    expect(getInnerInput(wrapper).value).toBe('黄金糕')
  })

  test('emptyText error show', async () => {
    const wrapper = _mount(`
    <hl-select :model-value="value" filterable placeholder="Select">
      <hl-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </hl-option>
    </hl-select>`,
    () => ({
      options: [{
        value: 'Option1',
        label: 'Option1',
      }, {
        value: 'Option2',
        label: 'Option2',
      }, {
        value: 'Option3',
        label: 'Option3',
      }, {
        value: 'Option4',
        label: 'Option4',
      }, {
        value: 'Option5',
        label: 'Option5',
      }],
      value: 'test',
    }))
    const select = wrapper.findComponent({ name: 'Select' })
    await select.trigger('mouseenter')
    await select.trigger('click')
    await nextTick()
    expect((document.querySelector(`.${prefix}-select-popper`) as HTMLElement).style.display === 'none').toBeFalsy()
    expect(wrapper.findAll('.select-dropdown-empty').length).toBe(0)
  })

  test('multiple select with remote load', async () => {
    vi.useFakeTimers()
    const wrapper = mount({
      template: `
      <hl-select
        v-model="value"
        multiple
        filterable
        remote
        reserve-keyword
        placeholder="请输入关键词"
        :remote-method="remoteMethod"
        :loading="loading"
      >
        <hl-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item"
        />
      </hl-select>`,
      components: { HlSelect: Select, HlOption: Option },
      data() {
        return {
          options: [],
          value: [],
          list: [],
          loading: false,
          states: ['Alabama', 'Alaska', 'Arizona',
            'Arkansas', 'California', 'Colorado',
            'Connecticut', 'Delaware', 'Florida',
            'Georgia', 'Hawaii', 'Idaho', 'Illinois',
            'Indiana', 'Iowa', 'Kansas', 'Kentucky',
            'Louisiana', 'Maine', 'Maryland',
            'Massachusetts', 'Michigan', 'Minnesota',
            'Mississippi', 'Missouri', 'Montana',
            'Nebraska', 'Nevada', 'New Hampshire',
            'New Jersey', 'New Mexico', 'New York',
            'North Carolina', 'North Dakota', 'Ohio',
            'Oklahoma', 'Oregon', 'Pennsylvania',
            'Rhode Island', 'South Carolina',
            'South Dakota', 'Tennessee', 'Texas',
            'Utah', 'Vermont', 'Virginia',
            'Washington', 'West Virginia', 'Wisconsin',
            'Wyoming'],
        }
      },
      mounted() {
        this.list = this.states.map((item: any) => {
          return { value: `value:${item}`, label: `label:${item}` }
        })
      },
      methods: {
        remoteMethod(this: any, query: string) {
          if (query !== '') {
            this.loading = true
            setTimeout(() => {
              this.loading = false
              this.options = this.list.filter((item: { label: string; }) => {
                return item.label.toLowerCase()
                  .indexOf(query.toLowerCase()) > -1
              })
            }, 200)
          } else {
            this.options = []
          }
        },
      },
    })

    const select = wrapper.findComponent({ name: 'Select' }).vm as any
    select.debouncedQueryChange({
      target: {
        value: '',
      },
    })

    select.debouncedQueryChange({
      target: {
        value: 'a',
      },
    })
    vi.runAllTimers()
    await nextTick()
    let options = getOptions()
    options[0].click()
    await nextTick()
    select.debouncedQueryChange({
      target: {
        value: 'n',
      },
    })
    vi.runAllTimers()
    await nextTick()
    options = getOptions()
    options[5].click()
    await nextTick()
    expect(select.selected.length === 2).toBeTruthy()
    expect(select.selected[0].currentLabel !== '').toBeTruthy()
    expect(select.selected[1].currentLabel !== '').toBeTruthy()
    vi.useRealTimers()
  })

  test('disabled group', async () => {
    const wrapper = _mount(`
    <hl-select v-model="value">
      <hl-group-option
        v-for="group in options"
        :key="group.label"
        :label="group.label"
        :disabled="group.disabled">
        <hl-option
          v-for="item in group.options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </hl-option>
      </hl-group-option>
    </hl-select>`,
    () => ({
      options: [
        {
          label: 'Popular cities',
          options: [
            { value: 'Shanghai', label: 'Shanghai' },
            { value: 'Beijing', label: 'Beijing' },
          ],
        },
        {
          label: 'City name',
          options: [
            { value: 'Chengdu',label: 'Chengdu' },
            { value: 'Shenzhen', label: 'Shenzhen' },
            { value: 'Guangzhou',label: 'Guangzhou' },
            { value: 'Dalian',label: 'Dalian' },
          ],
        },
      ],
      value: '',
    }))

    const vm = wrapper.vm as any
    wrapper.find(`.${prefix}-input-select`).trigger('click')
    await nextTick()
    vm.options[1].disabled = true
    await nextTick()
    const options = getOptions()
    expect(options[0].className).not.toContain('disabled')
    expect(options[2].className).toContain('disabled')
    options[0].click()
    await nextTick()
    expect(vm.value).toBe('Shanghai')
    options[2].click()
    await nextTick()
    expect(vm.value).toBe('Shanghai')
  })

  test('tag of disabled option is not closable', async () => {
    const wrapper = _mount(`
    <hl-select v-model="vendors" multiple :collapse-tags="isCollapsed" :clearable="isClearable" placeholder="Select Business Unit">
      <hl-option
        v-for="(vendor, index) in options"
        :key="index"
        :value="index + 1"
        :label="vendor.name"
        :disabled="vendor.isDisabled"
      >
      </hl-option>
    </hl-select>`, () => ({
      vendors: [2, 3, 4],
      isCollapsed: false,
      isClearable: false,
      options: [
        { name: 'Test 1', isDisabled: false },
        { name: 'Test 2', isDisabled: true },
        { name: 'Test 3', isDisabled: false },
        { name: 'Test 4', isDisabled: true },
      ],
    }))
    const vm = wrapper.vm as any
    await vm.$nextTick()
    const selectVm = wrapper.findComponent({ name: 'Select' }).vm as any
    expect(wrapper.findAll(`.${prefix}-tag`).length).toBe(3)
    const tagCloseIcons = wrapper.findAll('.tag-close')
    expect(tagCloseIcons.length).toBe(3)
    await tagCloseIcons[0].trigger('click')
    expect(wrapper.findAll('.tag-close').length).toBe(2)
    expect(wrapper.findAll(`.${prefix}-tag`).length).toBe(2)

    //test if is clearable
    vm.isClearable = true
    vm.vendors = [2, 3, 4]
    await vm.$nextTick()
    selectVm.inputHovering = true
    await selectVm.$nextTick()
    const iconClear = wrapper.find('.select-close')
    expect(wrapper.findAll(`.${prefix}-tag`).length).toBe(3)
    await iconClear.trigger('click')
    expect(wrapper.findAll(`.${prefix}-tag`).length).toBe(2)

    // test for collapse select
    vm.vendors = [1, 2, 4]
    vm.isCollapsed = true
    vm.isClearable = false
    await vm.$nextTick()
    expect(wrapper.findAll(`.${prefix}-tag`).length).toBe(2)
    await wrapper.find('.tag-close').trigger('click')
    expect(wrapper.findAll(`.${prefix}-tag`).length).toBe(2)
    expect(wrapper.findAll('.tag-close').length).toBe(0)

    // test for collapse select if is clearable
    vm.vendors = [1, 2, 4]
    vm.isCollapsed = true
    vm.isClearable = true
    await vm.$nextTick()
    expect(wrapper.findAll('.tag-close').length).toBe(1)
    await wrapper.find('.tag-close').trigger('click')
    expect(wrapper.findAll(`.${prefix}-tag`).length).toBe(2)
    expect(wrapper.findAll('.tag-close').length).toBe(0)
  })

  test('tag type', async () => {
    const wrapper = _mount(
      `
      <hl-select v-model="value" multiple tag-type="success">
        <hl-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </hl-option>
      </hl-select>
    `,
      () => ({
        options: [
          {
            value: '选项1',
            label: '黄金糕',
          },
          {
            value: '选项2',
            label: '双皮奶',
          },
        ],
        value: [],
      }),
    )

    await wrapper.find(`.${prefix}-input-select`).trigger('click')
    const options = getOptions()
    options[1].click()
    await nextTick()
    expect(wrapper.find(`.${prefix}-tag`).classes()).toContain('success')
  })

  test('modelValue should be deep reactive in multiple mode', async () => {
    const wrapper = _mount(`
    <hl-select v-model="modelValue" multiple>
      <hl-option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :label="option.label"
      >
      </hl-option>
    </hl-select>`, () => ({
      modelValue: [1],
      options: [
        { label: 'Test 1', value: 1 },
        { label: 'Test 2', value: 2 },
        { label: 'Test 3', value: 3 },
        { label: 'Test 4', value: 4 },
      ],
    }))
    const vm = wrapper.vm as any
    await vm.$nextTick()
    expect(wrapper.findAll(`.${prefix}-tag`).length).toBe(1)

    vm.modelValue.splice(0, 1)

    await vm.$nextTick()
    expect(wrapper.findAll(`.${prefix}-tag`).length).toBe(0)
  })

  test('should reset placeholder after clear when both multiple and filterable are true', async () => {
    const placeholder = 'placeholder'
    const wrapper = _mount(`
    <hl-select v-model="modelValue" multiple filterable placeholder=${placeholder}>
      <hl-option label="1" value="1" />
    </hl-select>`, () => ({
      modelValue: ['1'],
    }))
    const vm = wrapper.vm as any
    await vm.$nextTick()

    expect(getInnerInput(wrapper).placeholder).toBe('')

    const tagCloseIcon = wrapper.find('.tag-close')
    await tagCloseIcon.trigger('click')
    expect(getInnerInput(wrapper).placeholder).toBe(placeholder)

    const selectInput = wrapper.find('.select-input')
    const selectInputEl = selectInput.element as HTMLInputElement
    selectInputEl.value = 'a'
    vi.useFakeTimers()
    selectInput.trigger('input')
    await nextTick()
    vi.runAllTimers()
    await nextTick()

    expect(getInnerInput(wrapper).placeholder).toBe('')

    // selectInput.trigger('keydown', {
    //   key: EVENT_CODE.backspace,
    // })
    // await nextTick()
    // expect(selectInputEl.placeholder).toBe(placeholder)
    vi.useRealTimers()
  })

  test('should close popper when click icon twice', async () => {
    const wrapper = getSelectVm({
      filterable: true,
      clearable: true,
    })
    const select = wrapper.findComponent({ name: 'Select' })
    await select.trigger('mouseenter')
    const suffixIcon = select.find('.input-affixe.suffix')
    await suffixIcon.trigger('click')
    expect((select.vm as any).visible).toBe(true)
    await suffixIcon.trigger('click')
    expect((select.vm as any).visible).toBe(false)
  })

  test('mouseenter click', async () => {
    const wrapper = getSelectVm({
      filterable: true,
      clearable: true,
    })
    const select = wrapper.findComponent({ name: 'Select' })

    await select.trigger('click')
    expect((select.vm as any).visible).toBe(false)

    await select.trigger('mouseenter')
    await select.trigger('click')
    expect((select.vm as any).visible).toBe(true)
  })

  describe('should show all options when open select dropdown', () => {
    async function testShowOptions({ filterable, multiple }: SelectProps = {}) {
      const wrapper = getSelectVm({ filterable, multiple })
      const options = wrapper.findAllComponents({ name: 'Option' })

      await wrapper.find(`.${prefix}-input-select`).trigger('click')
      expect(options.every(option => option.vm.visible)).toBe(true)

      await options[1].trigger('click')
      await wrapper.find(`.${prefix}-input-select`).trigger('click')
      expect(options.every(option => option.vm.visible)).toBe(true)
    }

    test('both filterable and multiple are false', async () => {
      await testShowOptions()
    })

    test('filterable is true and multiple is false', async () => {
      await testShowOptions({ filterable: true })
    })

    test('filterable is false and multiple is true', async () => {
      await testShowOptions({ multiple: true })
    })

    test('both filterable and multiple are true', async () => {
      await testShowOptions({ filterable: true, multiple: true })
    })

    test('filterable is true with grouping', async () => {
      const wrapper = getGroupSelectVm({ filterable: true })
      await wrapper.find(`.${prefix}-input-select`).trigger('click')
      const vm = wrapper.findComponent(Select).vm
      const event = { target: { value: 'sh' } }
      vm.debouncedQueryChange(event)
      await nextTick
      const groups = wrapper.findAllComponents(Group)
      expect(groups.filter(group => {
        const vm = group.vm as any
        return vm.visible
      }).length).toBe(1)
    })
  })

  describe('after search', () => {
    async function testAfterSearch({ multiple, filterMethod, remote, remoteMethod }: SelectProps) {
      const wrapper = getSelectVm({ filterable: true, multiple, filterMethod, remote, remoteMethod })
      const method = remote ? remoteMethod : filterMethod
      const firstInputLetter = 'a'
      const secondInputLetter = 'aa'

      await nextTick()
      await wrapper.trigger('mouseenter')

      const input = wrapper.find(multiple ? '.select-input' : `.${prefix}-input input`)
      const inputEl = input.element as HTMLInputElement
      await input.trigger('click')
      inputEl.value = firstInputLetter
      await input.trigger('input')
      expect(method).toBeCalled()
      expect(method.mock.calls[0][0]).toBe(firstInputLetter)

      inputEl.value = secondInputLetter
      await input.trigger('input')
      expect(method).toBeCalledTimes(2)
      expect(method.mock.calls[1][0]).toBe(secondInputLetter)
    }

    test('should call filter method', async () => {
      const filterMethod = vi.fn()
      await testAfterSearch({ filterMethod })
    })

    test('should call filter method in multiple mode', async () => {
      const filterMethod = vi.fn()
      await testAfterSearch({ multiple: true, filterMethod })
    })

    test('should call remote method', async () => {
      const remoteMethod = vi.fn()
      await testAfterSearch({ remote: true, remoteMethod })
    })

    test('should call remote method in multiple mode', async () => {
      const remoteMethod = vi.fn()
      await testAfterSearch({ multiple: true, remote: true, remoteMethod })
    })
  })

  describe('teleported API', () => {
    it('should mount on popper container', async () => {
      expect(document.body.innerHTML).toBe('')
      const wrapper = _mount(
        `
      <hl-select v-model="modelValue" multiple>
        <hl-option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :label="option.label"
        >
        </hl-option>
      </hl-select>`,
        () => ({
          modelValue: [1],
          options: [
            { label: 'Test 1', value: 1 },
            { label: 'Test 2', value: 2 },
            { label: 'Test 3', value: 3 },
            { label: 'Test 4', value: 4 },
          ],
        }),
      )

      await nextTick()
      const { selector } = usePopperContainerId()
      expect(document.body.querySelector(selector.value)?.innerHTML).not.toBe('')
    })

    it('should not mount on the popper container', async () => {
      expect(document.body.innerHTML).toBe('')
      const wrapper = _mount(
        `
      <hl-select v-model="modelValue" multiple :teleported="false">
        <hl-option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          :label="option.label"
        >
        </hl-option>
      </hl-select>`,
        () => ({
          modelValue: [1],
          options: [
            { label: 'Test 1', value: 1 },
            { label: 'Test 2', value: 2 },
            { label: 'Test 3', value: 3 },
            { label: 'Test 4', value: 4 },
          ],
        }),
      )

      await nextTick()
      const { selector } = usePopperContainerId()
      expect(document.body.querySelector(selector.value)?.innerHTML).toBe('')
    })
  })

  it('multiple select has an initial value', async () => {
    const options = [{ value: `value:Alaska`, label: `label:Alaska` }]
    const modelValue = [{ value: `value:Alaska`, label: `label:Alaska` }]
    const wrapper = _mount(
      `
    <hl-select v-model="modelValue"
      multiple
      value-key="value"
      filterable>
      <hl-option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :label="option.label"
      >
      </hl-option>
    </hl-select>`,
      () => ({
        modelValue,
        options,
      }),
    )
    const select = wrapper.findComponent({ name: 'Select' }).vm
    expect(select.selected[0].currentLabel).toBe(options[0].label)
  })

  test('should reset selectedLabel when toggle multiple', async () => {
    const wrapper = getSelectVm({ multiple: false })
    const select = wrapper.findComponent({ name: 'Select' })
    const vm = wrapper.vm as any
    const selectVm = select.vm as any
    vm.value = '选项1'
    await nextTick()
    expect(selectVm.selectedLabel).toBe('黄金糕')
    vm.multiple = true
    vm.value = []
    await nextTick()
    expect(selectVm.selectedLabel).toBe('')
  })

  describe('form item accessibility integration', () => {
    it('automatic id attachment', async () => {
      const wrapper = _mount(
        `<hl-form-item label="Foobar" data-test-ref="item">
          <hl-select v-model="modelValue">
            <hl-option label="1" value="1" />
          </hl-select>
        </hl-form-item>`,
        () => ({
          modelValue: 1,
        }),
      )

      await nextTick()
      const formItem = wrapper.find('[data-test-ref="item"]')
      const formItemLabel = formItem.find('.form-label > *')
      const innerInput = wrapper.find('.input-inner')
      expect(formItem.attributes().role).toBeFalsy()
      expect(formItemLabel.attributes().for).toBe(innerInput.attributes().id)
    })

    it('specified id attachment', async () => {
      const wrapper = _mount(
        `<hl-form-item label="Foobar" data-test-ref="item">
          <hl-select id="foobar" v-model="modelValue">
            <hl-option label="1" value="1" />
          </hl-select>
        </hl-form-item>`,
        () => ({
          modelValue: 1,
        }),
      )

      await nextTick()
      const formItem = wrapper.find('[data-test-ref="item"]')
      const formItemLabel = formItem.find('.form-label > *')
      const innerInput = wrapper.find('.input-inner')
      expect(formItem.attributes().role).toBeFalsy()
      expect(innerInput.attributes().id).toBe('foobar')
      expect(formItemLabel.attributes().for).toBe(innerInput.attributes().id)
    })

    it('form item role is group when multiple inputs', async () => {
      const wrapper = _mount(
        `<hl-form-item label="Foobar" data-test-ref="item">
          <hl-select v-model="modelValue">
            <hl-option label="1" value="1" />
          </hl-select>
          <hl-select v-model="modelValue">
            <hl-option label="1" value="1" />
          </hl-select>
        </hl-form-item>`,
        () => ({
          modelValue: 1,
        }),
      )

      await nextTick()
      const formItem = wrapper.find('[data-test-ref="item"]')
      expect(formItem.attributes().role).toBe('group')
    })
  })

  // fix: 8544
  it('When props are changed, label can be displayed correctly after selecting operation', async () => {
    const wrapper = getGroupSelectVm({}, [
      {
        label: 'group1',
        options: [
          { value: 0, label: 'x' },
          { value: 1, label: 'y' },
          { value: 2, label: 'z' },
        ],
      },
    ])
    await wrapper.find(`.${prefix}-input-select`).trigger('click')
    let options = getOptions()
    const vm = wrapper.vm as any
    expect(vm.value).toBe('')
    expect(getInnerInput(wrapper).value).toBe('')
    await nextTick()
    options[1].click()
    await nextTick()
    expect(vm.value).toBe(1)
    expect(getInnerInput(wrapper).value).toBe('y')
    wrapper.vm.options = [
      {
        label: 'group2',
        options: [
          { value: 0, label: 'x' },
          { value: 1, label: 'y' },
          { value: 2, label: 'z' },
        ],
      },
    ]

    await nextTick()
    options = getOptions()
    options[1].click()
    await nextTick()
    expect(vm.value).toBe(1)
    expect(getInnerInput(wrapper).value).toBe('y')
    options[2].click()
    await nextTick()
    expect(vm.value).toBe(2)
    expect(getInnerInput(wrapper).value).toBe('z')
  })

})
