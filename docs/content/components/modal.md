---
title: Modal
description: A dialog that opens over the page content and traps keyboard focus until dismissed. Supports a title, body content, and an optional action area.
category: Overlay
status: stable
---

## Usage

Control the modal with `v-model`. The `title` prop is required — it labels the dialog for screen readers.

```vue
<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
</script>

<template>
  <AgDSButton @click="isOpen = true">Open modal</AgDSButton>

  <AgDSModal v-model="isOpen" title="Confirm submission">
    <p>Are you sure you want to submit your application? You cannot edit it after submission.</p>
  </AgDSModal>
</template>
```

## With actions

Use the `actions` slot to add buttons to the bottom of the modal. Typically a primary action and a cancel button.

```vue
<script setup>
import { ref } from 'vue'
const isOpen = ref(false)

function submit() {
  // handle submission
  isOpen.value = false
}
</script>

<template>
  <AgDSButton @click="isOpen = true">Submit application</AgDSButton>

  <AgDSModal v-model="isOpen" title="Confirm submission">
    <p>Are you sure you want to submit your application?</p>

    <template #actions>
      <AgDSButton variant="primary" @click="submit">Submit</AgDSButton>
      <AgDSButton variant="secondary" @click="isOpen = false">Cancel</AgDSButton>
    </template>
  </AgDSModal>
</template>
```

## Closing the modal

The modal can be closed in three ways:

- The **Close button** in the top-right corner
- The **Escape key**
- Programmatically by setting `v-model` to `false`

All three emit `update:modelValue` with `false`.

## Scroll lock

When the modal opens, `document.body` scroll is locked (`overflow: hidden`). It is automatically restored when the modal closes.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | — | **Required.** Controls whether the modal is open. Use with `v-model`. |
| `title` | `string` | — | **Required.** The title displayed in the modal header. Also used as the accessible name for the dialog. |

## Slots

| Slot | Description |
|------|-------------|
| `default` | The main body content of the modal |
| `actions` | Action buttons shown at the bottom of the modal. Typically a `ButtonGroup` or pair of buttons |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `boolean` | Emitted when the modal opens or closes |

## Accessibility

Built on [Reka UI Dialog](https://reka-ui.com/docs/components/dialog).

- **Role**: `role="dialog"` set automatically by Reka UI
- **Labelling**: `aria-labelledby` links the dialog to the title element automatically
- **Focus**: on open, focus moves to the title (`h2`) so screen readers announce it immediately; on close, focus returns to the element that triggered the modal
- **Keyboard**: `Escape` closes the modal; `Tab`/`Shift+Tab` cycle through focusable elements inside
- **Focus trap**: keyboard focus is confined to the modal while it is open
- **Scroll lock**: `document.body` scroll is disabled while the modal is open
- **Screen reader isolation**: Reka UI hides all other page content from the accessibility tree while the modal is open

## Changelog

### 0.1.0

- Initial release — `v-model`, `title`, `default` slot, `actions` slot
