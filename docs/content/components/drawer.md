---
title: Drawer
description: A slide-in panel that appears from the right edge of the viewport. Useful for supplementary content, settings, or secondary actions that don't warrant a full page.
category: Layout
status: stable
---

## Usage

Use `v-model` to control visibility. Provide a `title` — it is required for accessibility.

```vue
<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
</script>

<template>
  <button type="button" @click="isOpen = true">Open drawer</button>

  <AgDSDrawer v-model="isOpen" title="Filters">
    <p>Drawer body content goes here.</p>
  </AgDSDrawer>
</template>
```

## Actions slot

Use the `actions` slot to render a button group in a sticky footer at the bottom of the drawer.

```vue
<template>
  <AgDSDrawer v-model="isOpen" title="Edit profile">
    <p>Edit your profile details below.</p>

    <template #actions>
      <button type="button" @click="save">Save changes</button>
      <button type="button" @click="isOpen = false">Cancel</button>
    </template>
  </AgDSDrawer>
</template>
```

## Width

Use `width="lg"` for content that needs more horizontal space (`45rem` vs the default `32rem`).

```vue
<template>
  <AgDSDrawer v-model="isOpen" title="Document preview" width="lg">
    <p>Wide content here.</p>
  </AgDSDrawer>
</template>
```

## Muted overlay

Use `muted-overlay` to lighten the backdrop so that the main content underneath remains more visible — useful when the drawer is supplementary rather than blocking.

```vue
<template>
  <AgDSDrawer v-model="isOpen" title="Help" muted-overlay>
    <p>Contextual help content.</p>
  </AgDSDrawer>
</template>
```

## Custom focus on close

By default, focus returns to the element that was focused when the drawer opened. Use `element-to-focus-on-close` to override this when the trigger element is no longer in the DOM after the drawer closes.

```vue
<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
const fallbackEl = ref(null)
</script>

<template>
  <div ref="fallbackEl" tabindex="-1" />
  <AgDSDrawer
    v-model="isOpen"
    title="Settings"
    :element-to-focus-on-close="fallbackEl"
  >
    <p>Settings content.</p>
  </AgDSDrawer>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | — | **Required.** Controls whether the drawer is open. Use with `v-model` |
| `title` | `string` | — | **Required.** Title displayed in the drawer header; used as the accessible name |
| `width` | `'md' \| 'lg'` | `'md'` | Width of the panel — `md` = 32rem, `lg` = 45rem |
| `mutedOverlay` | `boolean` | `false` | Use a lighter backdrop so content underneath remains visible |
| `elementToFocusOnClose` | `HTMLElement \| null` | `null` | Element to focus when the drawer closes instead of the original trigger |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `boolean` | Emitted when the drawer should close (close button, overlay click, Escape key) |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Main body content — scrollable |
| `actions` | Optional footer — typically a button group for primary/secondary actions |

## Keyboard navigation

| Key | Behaviour |
|-----|-----------|
| `Escape` | Closes the drawer and returns focus to the trigger |
| `Tab` | Moves focus forward through interactive elements; wraps to the first when at the last |
| `Shift + Tab` | Moves focus backward; wraps to the last when at the first |

## Accessibility

- Rendered in a `<Teleport to="body">` so it sits above all other content in the stacking context
- The panel has `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` pointing to the `<h2>` title
- The title receives focus on open (`tabindex="-1"`) so screen readers announce the drawer's purpose immediately
- Focus is trapped inside the drawer while it is open; Tab/Shift+Tab cycle through all interactive elements in the panel
- On close, focus returns to the element that triggered the drawer (or `elementToFocusOnClose` if provided)
- Clicking the overlay or pressing Escape closes the drawer
- Body scroll is locked while the drawer is open; the lock is released on close
- Slide-in and overlay transitions respect `prefers-reduced-motion` — animation is effectively instant when the user has requested reduced motion

## Changelog

### 0.1.0

- Initial release — `v-model`, `title`, `width`, `mutedOverlay`, `elementToFocusOnClose`, `actions` slot
