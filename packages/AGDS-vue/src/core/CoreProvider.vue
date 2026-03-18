<script setup lang="ts">
import { provide, h, defineComponent } from 'vue'
import type { Component } from 'vue'
import { CORE_CONTEXT_KEY } from './coreContext'

export interface AGDSCoreProviderProps {
  /**
   * The global link component used wherever the library renders an anchor.
   * Defaults to a plain `<a>` element. Pass a router-aware wrapper
   * (e.g. Vue Router's `<RouterLink>`) to enable client-side navigation.
   */
  linkComponent?: Component
}

const props = defineProps<AGDSCoreProviderProps>()

/** Default link — a plain native anchor that passes all props through. */
const DefaultLink = defineComponent({
  name: 'AGDSDefaultLink',
  inheritAttrs: false,
  props: {
    href: { type: String, default: undefined },
  },
  setup(linkProps, { attrs, slots }) {
    return () =>
      h('a', { href: linkProps.href, ...attrs }, slots.default?.())
  },
})

provide(CORE_CONTEXT_KEY, {
  linkComponent: props.linkComponent ?? DefaultLink,
})
</script>

<template>
  <slot />
</template>
