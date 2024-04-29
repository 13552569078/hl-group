import { mount } from '@vue/test-utils'
import { afterEach, describe, expect, test, vi } from 'vitest'
import TimeLine from '../src/timeline'
import TimeLineItem from '../src/timeline-item.vue'
import HlIcon from '@hongluan-ui/components/icon'
import { SystemClose } from '@hongluan-ui/components/system-icon'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import { defineComponent } from 'vue'

const Component = defineComponent({
  components: {
    'hl-timeline': TimeLine,
    'hl-timeline-item': TimeLineItem,
    HlIcon,
    SystemClose,
  },
  props: [],
  data() {
    return {
      activities: [{
        content: 'Step 1: xxxxxx',
        timestamp: '2018-04-11',
      }, {
        content: 'Step 2: xxxxxx',
        timestamp: '2018-04-13',
      }, {
        content: 'Step 3: xxxxxx',
        timestamp: '2018-04-15',
      }],
    }
  },
  template: `
    <hl-timeline>
      <hl-timeline-item
        v-for="(activity, index) in activities"
        :key="index"
        :timestamp="activity.timestamp">
        {{activity.content}}
      </hl-timeline-item>
    </hl-timeline>
  `,
})

describe('TimeLine.vue', () => {
  const { prefix } = usePrefix()
  test('create', () => {
    const wrapper = mount(Component)
    const vm = wrapper.vm

    const contentWrappers = wrapper.findAll('.item-title')
    contentWrappers.forEach((content, index) => {
      expect(content.text()).toEqual(vm.activities[index].content)
    })

    const timestampWrappers = wrapper.findAll('.item-time')
    timestampWrappers.forEach((timestamp, index) => {
      expect(timestamp.text()).toEqual(vm.activities[index].timestamp)
    })
  })

  test('hide-timestamp', () => {
    const wrapper = mount({
      ...Component,
      template: `
        <hl-timeline>
          <hl-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.timestamp"
            :hide-timestamp="activity.hideTimestamp">
            {{activity.content}}
          </hl-timeline-item>
        </hl-timeline>
      `,
      data() {
        return {
          activities: [{
            content: 'Step 1: xxxxxx',
            timestamp: '2018-04-11',
            hideTimestamp: true,
          }, {
            content: 'Step 2: xxxxxx',
            timestamp: '2018-04-13',
          }, {
            content: 'Step 3: xxxxxx',
            timestamp: '2018-04-15',
          }],
        }
      },
    })
    const timestampWrappers = wrapper.findAll('.item-time')
    expect(timestampWrappers.length).toEqual(2)
  })

  test('color', () => {
    const wrapper = mount({
      ...Component,
      template: `
        <hl-timeline>
          <hl-timeline-item
            timestamp="2018-04-11"
            color="#f00">
            Step 1: xxxxxx
          </hl-timeline-item>
        </hl-timeline>
      `,
    })
    const style = wrapper.find(`.${prefix}-timeline-item`).attributes('style')
    expect(style.indexOf('--timeline-icon-color: #f00') > -1).toBeTruthy()
  })

  test('type', () => {
    const wrapper = mount({
      ...Component,
      template: `
        <hl-timeline>
          <hl-timeline-item
            timestamp="2018-04-11"
            type="primary">
            Step 1: xxxxxx
          </hl-timeline-item>
        </hl-timeline>
      `,
    })
    expect(wrapper.find('.primary').exists()).toBe(true)
  })

  test('icon', () => {
    const wrapper = mount({
      ...Component,
      template: `
        <hl-timeline>
          <hl-timeline-item
            timestamp="2018-04-11"
            :icon="{name: 'Dot'}">
            Step 1: xxxxxx
            <template #icon>
              <hl-icon><system-close /></hl-icon>
            </template>
          </hl-timeline-item>
        </hl-timeline>
      `,
    })
    const nodeWrapper = wrapper.find('i')
    expect(nodeWrapper.find('svg').exists()).toBe(true)
  })

  test('dot', () => {
    const wrapper = mount({
      ...Component,
      template: `
        <hl-timeline>
          <hl-timeline-item
            timestamp="2018-04-11"
          >
            <template #dot>
              dot
            </template>
          </hl-timeline-item>
        </hl-timeline>
      `,
    })

    const dotWrapper = wrapper.find('.dot-wrap')
    expect(dotWrapper.text()).toEqual('dot')
    expect(wrapper.find('.icon-dot').exists()).toBe(false)
  })

  test('alternate & center', () => {
    const wrapper = mount({
      ...Component,
      template: `
        <hl-timeline alternate center>
          <hl-timeline-item
            timestamp="2018-04-11"
          >
          </hl-timeline-item>
        </hl-timeline>
      `,
    })

    expect(wrapper.classes('alternate')).toBe(true)
    expect(wrapper.classes('center')).toBe(true)
  })

  test('item dir', () => {
    const wrapper = mount({
      ...Component,
      template: `
        <hl-timeline>
          <hl-timeline-item
            timestamp="2018-04-11"
            dir="left"
          >
          </hl-timeline-item>
        </hl-timeline>
      `,
    })

    expect(wrapper.find('.left').exists()).toBe(true)
  })
})
