---
title: Core
description: The root theming component. Injects design token CSS custom properties, applies a CSS reset, and provides a global link component to all descendants.
category: Foundations
status: stable
---

## Usage

Wrap your application in `AgDSCore` once, at the root level. It injects all design token CSS variables and, optionally, a CSS reset.

```vue
<template>
  <AgDSCore>
    <App />
  </AgDSCore>
</template>
```

## Custom theme

Pass a partial `Theme` object to override specific token values. Only the keys you supply are changed — the rest of the gold theme is preserved.

```vue
<script setup lang="ts">
import type { Theme } from '@agds-vue/core'

const myTheme: Partial<Theme> = {
  foreground: {
    text: '#1a1a1a',
    action: '#005ea2',
  },
}
</script>

<template>
  <AgDSCore :theme="myTheme">
    <App />
  </AgDSCore>
</template>
```

## Custom link component

By default the library renders plain `<a>` anchors. Pass your router's link component to have all internal links use it automatically.

```vue
<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <AgDSCore :link-component="RouterLink">
    <App />
  </AgDSCore>
</template>
```

## Opting out of the CSS reset

Set `applyReset` to `false` if your application already manages `html` and `body` styles.

```vue
<template>
  <AgDSCore :apply-reset="false">
    <App />
  </AgDSCore>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `applyReset` | `boolean` | `true` | Applies a CSS reset to `html` and `body` |
| `theme` | `Partial<Theme>` | — | Overrides specific gold theme token values |
| `linkComponent` | `Component` | `<a>` | Global link component used for all anchors rendered by the library |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Application content |

## Notes

- `AgDSCore` injects a `<style>` tag into `<head>` on mount and removes it on unmount
- Print theme overrides are automatically applied via `@media print`
- For SSR, use `AgDSCoreProvider` directly to control how styles are injected

## Changelog

### 0.1.0

- Initial release — injects gold theme tokens, CSS reset, and link component context
