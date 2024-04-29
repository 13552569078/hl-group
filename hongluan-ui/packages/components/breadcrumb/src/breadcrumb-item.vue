<script lang="ts">
import { defineComponent, inject, ref, h, onMounted, getCurrentInstance, renderSlot } from 'vue'
import { useNamespace } from '@hongluan-ui/hooks'
import { BreadcrumbKey } from '@hongluan-ui/tokens'
import { breadcrumbItemProps } from './breadcrumb-item'

import type { IBreadcrumbProps } from './breadcrumb'
import type { Router } from 'vue-router'

export default defineComponent({
  name: 'BreadcrumbItem',
  props: breadcrumbItemProps,
  setup(props) {
    const { namespace } = useNamespace('breadcrumb-item')
    const link = ref<HTMLSpanElement>()
    const instance = getCurrentInstance()
    const router = instance.appContext.config.globalProperties.$router as Router

    onMounted(() => {
      link.value.setAttribute('role', 'link')
      link.value.addEventListener('click', () => {
        if (!props.to || !router) return
        props.replace ? router.replace(props.to) : router.push(props.to)
      })
    })

    return {
      namespace,
      link,
    }
  },
  render() {
    const {
      $slots,
      namespace,
      to,
    } = this

    const parent = inject<IBreadcrumbProps>(BreadcrumbKey)
    const separator = parent?.separator

    return h('span', {
      class: [namespace],
    }, [
      parent?.slots?.icon || $slots.icon ?
        h('span', {
          class: 'breadcrumb-separator',
        }, [
          ($slots.icon ? renderSlot($slots, 'icon', {}) : renderSlot(parent?.slots, 'icon', {})),
        ]) :
        h('span' ,
          {
            class: 'breadcrumb-separator',
            role: 'presentation',
            innerHTML: separator,
          },
          [],
        ),
      h('span',
        {
          ref: 'link',
          class: ['breadcrumb-inner', to ? 'is-link' : ''],
          role: 'link',
        },
        [renderSlot($slots, 'default', {})],
      ),
    ])
  },
})
</script>
