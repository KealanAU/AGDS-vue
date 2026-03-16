---
title: Button
description: A button element that can trigger an action. Supports three variants, three sizes, and loading and disabled states.
category: Navigation
status: stable
---

## Usage

Use the default slot to set the label of the Button.

::doc-preview
<AgDSButton>Submit application</AgDSButton>
::

```vue
<template>
  <AgDSButton>Submit application</AgDSButton>
</template>
```

## Variant

Use the `variant` prop to change the visual style of the Button.

- `primary` — main action on the page
- `secondary` — supporting action with an outline
- `tertiary` — low-emphasis link-style action

::doc-preview{label="All variants"}
<AgDSButton variant="primary">Primary</AgDSButton>
<AgDSButton variant="secondary">Secondary</AgDSButton>
<AgDSButton variant="tertiary">Tertiary</AgDSButton>
::

```vue
<template>
  <AgDSButton variant="primary">Primary</AgDSButton>
  <AgDSButton variant="secondary">Secondary</AgDSButton>
  <AgDSButton variant="tertiary">Tertiary</AgDSButton>
</template>
```

## Size

Use the `size` prop to change the size of the Button. The default is `md`.

::doc-preview{label="All sizes"}
<AgDSButton size="sm">Small</AgDSButton>
<AgDSButton size="md">Medium</AgDSButton>
<AgDSButton size="lg">Large</AgDSButton>
::

```vue
<template>
  <AgDSButton size="sm">Small</AgDSButton>
  <AgDSButton size="md">Medium</AgDSButton>
  <AgDSButton size="lg">Large</AgDSButton>
</template>
```

## Disabled

Use the `disabled` prop to prevent interaction. The native `disabled` attribute is set, removing the button from the tab order. `aria-disabled="true"` is also set.

::doc-preview{label="Disabled"}
<AgDSButton disabled>Can't click me</AgDSButton>
<AgDSButton variant="secondary" disabled>Secondary</AgDSButton>
::

```vue
<template>
  <AgDSButton disabled>Can't click me</AgDSButton>
  <AgDSButton variant="secondary" disabled>Secondary</AgDSButton>
</template>
```

## Loading

Use the `loading` prop to show a spinner and disable the button while an async operation is pending. `aria-busy="true"` is set automatically.

::doc-preview{label="Loading"}
<AgDSButton loading>Submitting…</AgDSButton>
<AgDSButton variant="secondary" loading>Saving…</AgDSButton>
::

```vue
<script setup>
import { ref } from 'vue'

const loading = ref(false)

async function submit() {
  loading.value = true
  await doAsyncThing()
  loading.value = false
}
</script>

<template>
  <AgDSButton :loading="loading" @click="submit">
    Submit application
  </AgDSButton>
</template>
```

## Type

Use the `type` prop to control the native button type. Defaults to `button` to prevent accidental form submissions.

```vue
<template>
  <!-- Inside a <form> -->
  <AgDSButton type="submit">Submit</AgDSButton>
  <AgDSButton type="reset" variant="secondary">Reset</AgDSButton>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'tertiary'` | `'primary'` | Visual style of the button |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls height, padding, and font size |
| `disabled` | `boolean` | `false` | Disables the button. Sets `aria-disabled` and prevents clicks |
| `loading` | `boolean` | `false` | Shows a spinner and disables the button. Sets `aria-busy="true"` |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML type attribute on the `<button>` element |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Fired on click when not disabled or loading |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Button label — text or inline elements |

## Accessibility

This component uses a native `<button>` element with no Reka UI primitive (native buttons are already fully accessible).

- **Keyboard**: focusable and activatable with `Space` and `Enter` by default
- **`loading`**: sets `aria-busy="true"` and `disabled` — announced as busy to screen readers
- **`disabled`**: sets `aria-disabled="true"` and native `disabled`
- **Focus ring**: 3px solid `#9263de` via `:focus-visible` — meets WCAG 2.2 focus appearance
- **Spinner**: `aria-hidden="true"` so the animation is not announced

## Changelog

### 0.1.0

- Initial release — `primary`, `secondary`, `tertiary` variants, `sm`/`md`/`lg` sizes, `loading`, `disabled`, `type` props
