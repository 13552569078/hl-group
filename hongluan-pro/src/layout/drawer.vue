<template>
  <hl-dialog v-model="visible" width="400px" show-as="drawer" placement="right" @close="cancel">
    <template #header>
      <h4>自定义对话框title</h4>
    </template>
    <hl-form :width="['col-24', 'col-24']" :label-position="['left', 'middle']">
      <hl-form-item label="Boxed">
        <hl-checkbox-group v-model="boxed">
          <hl-checkbox label="boxed" name="type" />
        </hl-checkbox-group>
      </hl-form-item>
      <hl-form-item label="Aside">
        <hl-checkbox-group v-model="aside">
          <hl-checkbox label="fixed-aside" name="type" />
          <hl-checkbox label="collapse-aside" name="type" />
        </hl-checkbox-group>
      </hl-form-item>
      <hl-form-item label="Header">
        <hl-checkbox-group v-model="header">
          <hl-checkbox label="fixed-header" name="type" />
          <hl-checkbox label="full-header" name="type" />
        </hl-checkbox-group>
      </hl-form-item>
      <hl-form-item label="SubHeader">
        <hl-checkbox-group v-model="subHeader">
          <hl-checkbox label="fixed-sub-header" name="type" />
          <hl-checkbox label="full-sub-header" name="type" />
        </hl-checkbox-group>
      </hl-form-item>
      <hl-form-item label="Footer">
        <hl-checkbox-group v-model="footer">
          <hl-checkbox label="fixed-footer" name="type" />
          <hl-checkbox label="full-footer" name="type" />
        </hl-checkbox-group>
      </hl-form-item>
    </hl-form>

    <template #footer>
      <span class="dialog-footer">
        <hl-button class="m-l-sm" @click="cancel">取 消</hl-button>
        <hl-button type="primary" class="m-l-sm" @click="submit">确 定</hl-button>
      </span>
    </template>
  </hl-dialog>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'
export default defineComponent({
  name: 'LayoutDrawer',
  emits: ['cancel', 'submit'],
  setup(_, { emit }) {
    const visible = ref(true)
    const layoutConfig = reactive({
      boxed: [''],
      header: ['fixed-header'],
      aside: ['fixed-aside'],
      subHeader: ['fixed-sub-header'],
      footer: ['fixed-footer'],
    })

    const submit = () => {
      emit('submit', layoutConfig)
    }
    const cancel = () => {
      emit('cancel')
    }

    return {
      visible,
      ...toRefs(layoutConfig),
      submit,
      cancel,
    }
  },
})
</script>
