import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'NodeContent',
  render () {
    const { node, panel } = this.$parent as any
    const { data, label } = node
    const { renderLabelFn } = panel
    return h(
      'span',
      { class: 'cascader-item-label' },
      renderLabelFn ? renderLabelFn({ node, data }) : label,
    )
  },
})
