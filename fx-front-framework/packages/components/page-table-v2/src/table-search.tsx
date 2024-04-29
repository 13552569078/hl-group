import {
  defineComponent,
  reactive,
  nextTick,
  getCurrentInstance,
  onMounted,
  onBeforeUnmount,
  onBeforeMount,
  computed,
} from 'vue'
import { HlForm, HlButton, HlGroup, HlSelect, HlOption } from 'hongluan-ui'
import { TagItem } from './types'

export interface DataInterface {
  myObserver: null | ResizeObserver
  simpleOptions: Array<any>
  btnOpen: number
  searchForm: object
  searchType: number
  simpleOptionVal: string
  componentOptions: Array<any>
}

export default defineComponent({
  name: 'TableSearch',
  components: { HlForm, HlButton, HlGroup, HlSelect, HlOption },
  props: {
    searchSlots: {
      type: Function,
      default: null,
    },
    hideHeaderLine: {
      type: Boolean,
      default: false,
    },
    // 是否显示搜索
    showSearchBar: {
      type: Boolean,
      default: true,
    },
    showAdvSearch: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['search', 'changeHeight'],
  setup(props, ctx) {
    const { slots, emit } = ctx

    const data: DataInterface = reactive({
      myObserver: null,
      simpleOptions: [],
      btnOpen: 0, // 0 不显示  1 底部  2 右侧
      searchForm: {},
      searchType: 1, // 1 简单搜索  2 高级搜索
      simpleOptionVal: '',
      componentOptions: [],
    })

    const searchEnabled = computed(() => {
      const val = data.searchForm[data.simpleOptionVal]
      return Array.isArray(val) ? val.length : (val || val === 0)
    })

    let currentInstance: any
    onBeforeMount(() => {
      init()
    })
    onMounted(() => {
      currentInstance = getCurrentInstance()
      runResizeObserver()
    })

    onBeforeUnmount(() => {
      data.myObserver && data.myObserver.disconnect()
    })

    const runResizeObserver = () => {
      data.myObserver = new ResizeObserver(entries => {
        // 注意，entres是个数组，数组项为每个需要监听的DOM节点
        entries.forEach(entry => {
          // console.log('大小位置 contentRect', entry.contentRect)
          // console.log('监听的DOM target', entry.target)
          if (entry.target.className.indexOf('list-page_header') !== -1) {
            // 执行内容区的高度变动
            setListContentHeight(entry.contentRect.height)
          }
        })
      })
      if (currentInstance) {
        data.myObserver.observe(currentInstance.refs['root'] as Element)
      }
    }

    const setListContentHeight = (val: number) => {
      emit('changeHeight', val)
    }

    const resetSearch = () => {
      Object.keys(data.searchForm).forEach(k => {
        data.searchForm[k] = Array.isArray(data.searchForm[k]) ? [] : ''
      })
      if (data.simpleOptions[0]) {
        data.simpleOptionVal = data.simpleOptionVal || data.simpleOptions[0].value
      }
    }
    const runSearch = () => {
      const arr: Array<TagItem> = []
      Object.keys(data.searchForm).forEach(k => {
        let getIt = false
        if (data.searchType === 1) {
          if (data.simpleOptionVal !== k) {
            data.searchForm[k] = ''
          } else if (data.searchForm[k] !== '') {
            getIt = true
          }
        } else {
          if (data.searchForm[k] !== '') {
            // 有值
            getIt = true
          }
        }

        if (getIt) {
          arr.push({
            key: k,
            valueName: '',
            value: data.searchForm[k],
            label: getSearchLabel(k),
          })
        }
      })
      emit('search', arr, data.searchType)

      if (arr.length) {
        resetSearch()
      }
    }

    const getSearchLabel = (key: string) => {
      let str = ''
      data.simpleOptions.forEach(item => {
        if (item.value === key) {
          str = item.label
        }
      })
      return str
    }

    const setSearchType = () => {
      data.searchType = data.searchType === 1 ? 2 : 1
      resetSearch()

      data.btnOpen = 0
      nextTick(() => {
        setBtnsPosition()
      })
    }

    const setBtnsPosition = () => {
      if (!currentInstance) return

      if ((currentInstance.refs['root'] as HTMLElement).offsetWidth - currentInstance.refs['form-box'].$el.offsetWidth > 400) {
        data.btnOpen = 2
      } else {
        data.btnOpen = 1
      }
    }

    const simpleOptionChange = (val: string) => {
      Object.keys(data.searchForm).forEach(k => {
        if (k !== val) {
          data.searchForm[k] = ''
        }
      })
    }

    const init = () => {
      data.simpleOptions.length = 0
      if (slots.default instanceof Function) {
        // 直接作用域插槽传递
        data.componentOptions = (slots.default(data.searchForm)?.[0]?.children || []) as any[]
      } else if (props.searchSlots instanceof Function) {
        // 通过 props 传递
        data.componentOptions = props.searchSlots(data.searchForm)
      } else {
        return
      }

      data.componentOptions.forEach(item => {
        if (item.props) {
          const i = {
            value: item.props.prop,
            label: item.props.label,
          }
          data.simpleOptions.push(i)
        }
      })
      if (data.simpleOptions[0] && !data.simpleOptionVal) {
        data.simpleOptionVal = data.simpleOptions[0].value
      }
    }

    const simpleOptionRender = () => {
      return (
        <hl-select
          v-model={data.simpleOptionVal}
          style="width: 168px; margin-right: 8px;"
          onChange={simpleOptionChange}
          placeholder="请选择"
        >
          {data.simpleOptions.map(i => {
            return <hl-option key={i.value} label={i.label} value={i.value}></hl-option>
          })}
        </hl-select>
      )
    }

    const allItemsRender = i => {
      return <div class="search-form-field">{i}</div>
    }

    const simpleItemRender = i => {
      if (i.children.default) {
        return (
          <div v-show={i.props.prop === data.simpleOptionVal} class="search-form-field-1">
            {i.children.default()[0]}
          </div>
        )
      } else {
        return ''
      }
    }

    return () => {
      return (
        <div class={{ 'list-page_header': true, 'no-search-bar': !props.showSearchBar, 'border-top border-primary': !props.hideHeaderLine && props.showSearchBar }} ref="root">
          <div class="search-form-wrap" v-show={props.showSearchBar}>
            <hl-form class="search-form-box" ref="form-box">
              <hl-group>
                {data.searchType === 1 ? simpleOptionRender() : ''}
                <span v-show={data.searchType === 1}>
                  {data.componentOptions.map(i => {
                    return simpleItemRender(i)
                  })}
                </span>
                <div v-show={data.searchType === 2}>
                  {data.componentOptions.map(i => {
                    return allItemsRender(i)
                  })}
                </div>
              </hl-group>
              <div
                v-show={data.searchType === 1}
                class={{
                  'search-btns-box': true,
                }}
              >
                <hl-button type="main" onClick={runSearch} disabled={!searchEnabled.value}>
                查询
                </hl-button>
                <span class="search-type" onClick={setSearchType} v-show={props.showAdvSearch}>
                高级搜索
                </span>
              </div>
            </hl-form>
            <div
              v-show={data.searchType === 2}
              class={{
                'search-btns-box-1': data.btnOpen === 1,
                'search-btns-box-2': data.btnOpen === 2,
              }}
            >
              <hl-button class="reset-btn ordinary" onClick={resetSearch}>
              重置
              </hl-button>
              <hl-button type="main" onClick={runSearch}>
              查询
              </hl-button>
              <span class="search-type" onClick={setSearchType}>
              简易搜索
              </span>
            </div>
          </div>
        </div>
      )
    }
  },
})

