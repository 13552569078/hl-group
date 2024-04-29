import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'

export default defineConfig({
  plugins: [Vue(), DefineOptions()],
  optimizeDeps: {
    disabled: true,
  },
  test: {
    clearMocks: true,
    environment: 'jsdom',
    transformMode: {
      web: [/\.[jt]sx$/],
    },
  },
})
