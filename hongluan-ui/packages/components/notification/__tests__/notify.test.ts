import { nextTick, h } from 'vue'
import { afterEach, describe, expect, it, test, vi } from 'vitest'
import Notification, { closeAll } from '../src/notify'
import { rAF } from '@hongluan-ui/test-utils/tick'
import { usePrefix } from '@hongluan-ui/test-utils/utils'
import { HlNotification } from '..'
import type { NotificationHandle } from '../src/notification'

const { prefix } = usePrefix()
const selector = `.${prefix}-notification`

describe('Notification on command', () => {
  afterEach(() => {
    closeAll()
  })

  test('it should get component handle', async () => {
    const handle = Notification()
    await rAF()
    expect(document.querySelector(selector)).toBeDefined()

    handle.close()
    await rAF()
    await nextTick()
    expect(document.querySelector(selector)).toBeNull()
    expect(document.querySelector('[class^="container_notification"]')).toBeNull()
  })

  test('it should be able to render vnode', async () => {
    const testClassName = 'test-classname'
    const { close } = Notification({
      duration: 0,
      message: h('div', { class: testClassName }, 'test-content'),
    })

    await rAF()
    expect(document.querySelector(`.${testClassName}`)).toBeDefined()
    close()
  })


  test('it should be able to close notification by manually close', async () => {
    const { close } = Notification({
      duration: 0,
    })
    await rAF()

    const element = document.querySelector(selector)
    expect(element).toBeDefined()
    close()
    await rAF()
    await nextTick()

    expect(document.querySelector(selector)).toBeNull()
  })

  test('it should close all notifications', async () => {
    const notifications: NotificationHandle[] = []
    const onClose = vi.fn()
    for (let i = 0; i < 4; i++) {
      notifications.push(Notification({
        onClose,
        duration: 0,
      }))
    }
    // vi.runAllTicks()
    await rAF()

    expect(document.querySelectorAll(selector).length).toBe(4)
    closeAll()
    // vi.runAllTicks()
    await rAF()
    expect(onClose).toHaveBeenCalledTimes(notifications.length)
    expect(document.querySelectorAll(selector).length).toBe(0)
  })

  test('it should be able to render all types notification', () => {
    for (const type of ['success', 'warning', 'error', 'info'] as const) {
      Notification[type]()
      expect(document.querySelector(`.${prefix}-icon svg`)).toBeTruthy()
    }
  })

  test('it should appendTo specified HTMLElement', async () => {
    const htmlElement = document.createElement('div')
    const handle = Notification({
      appendTo: htmlElement,
    })
    await rAF()
    expect(htmlElement.querySelector(selector)).toBeDefined()

    handle.close()
    await rAF()
    await nextTick()
    expect(htmlElement.querySelector(selector)).toBeNull()
  })

  test('it should appendTo specified selector', async () => {
    const htmlElement = document.createElement('div')
    htmlElement.classList.add('notification-manager')
    document.body.appendChild(htmlElement)
    const handle = Notification({
      appendTo: '.notification-manager',
    })
    await rAF()
    expect(htmlElement.querySelector(selector)).toBeDefined()
    handle.close()
    await rAF()
    await nextTick()
    expect(htmlElement.querySelector(selector)).toBeNull()
  })
  describe('context inheritance', () => {
    it('should globally inherit context correctly', () => {
      expect(HlNotification._context).toBe(null)
      const testContext = {
        config: {
          globalProperties: {},
        },
        _context: {},
      }
      HlNotification.install?.(testContext as any)
      expect(HlNotification._context).not.toBe(null)
      expect(HlNotification._context).toBe(testContext._context)
      // clean up
      HlNotification._context = null
    })
  })

})
