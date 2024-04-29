import type { Directive, DirectiveBinding } from 'vue'

let showSourceMakrLisener: () => void, hideSourceMakrLisener: () => void

const SourceDisplayer: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const params = binding.value.params,
      isParent = params.indexOf('target:parent') > -1,
      targetEl = isParent ? el.parentElement : el

    if (!targetEl?.querySelector('.source-mark.' + binding.value.id)) {
      const div = document.createElement('div')
      div.className = `source-mark ${params ?? ''} ${binding.value.id}`
      div.innerHTML = '查看源码'
      div.onclick = () => {
        const html = window.decodeURIComponent(window.atob(binding.value.source))
        localStorage.setItem('$source-code', html as string)

        const href = document.location.href.substring(0, document.location.href.lastIndexOf('#')) + '#/source-editor'
        window.open(href, '_blank')
      }
      targetEl?.appendChild(div)

      showSourceMakrLisener = () => {
        const rect = targetEl?.getBoundingClientRect()
        div.style.top = `${rect!.top}px`
        div.style.left = `${rect!.right - 60}px`
        div.style.display = 'block'
      }
      hideSourceMakrLisener = () => {
        div.style.display = 'none'
      }

      targetEl?.addEventListener('mouseenter', showSourceMakrLisener)
      targetEl?.addEventListener('mouseleave', hideSourceMakrLisener)
    }
  },
  beforeUnmount(el: HTMLElement, binding: DirectiveBinding) {
    const params = binding.value.params,
      isParent = params.indexOf('target:parent') > -1,
      targetEl = isParent ? el.parentElement : el

    showSourceMakrLisener && targetEl?.removeEventListener('mouseenter', showSourceMakrLisener)
    hideSourceMakrLisener && targetEl?.removeEventListener('mouseenter', hideSourceMakrLisener)

    if (isParent) {
      targetEl?.removeChild(targetEl?.querySelector('.source-mark') as Node)
    }
  },
}

export { SourceDisplayer }
