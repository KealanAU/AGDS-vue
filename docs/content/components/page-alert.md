---
title: Page Alert
description: A full-width alert banner used to communicate important feedback at the page level. Supports info, success, warning, and error tones with an optional close button and programmatic focus.
category: Feedback
status: stable
---

## Usage

Provide a `tone` and an optional `title`. Use the default slot for body content.

::doc-preview
<PageAlertDemo />
::

```vue
<template>
  <AGDSPageAlert tone="info" title="Application received">
    <p>Your application has been submitted. We will be in touch within 5 business days.</p>
  </AGDSPageAlert>
</template>
```

## Tone

Use the `tone` prop to communicate the nature of the alert.

- `info` — neutral informational message
- `success` — confirms a completed action
- `warning` — draws attention to something that may require action
- `error` — reports a problem that must be resolved

::doc-preview{label="All tones"}
<PageAlertDemo variant="tones" />
::

```vue
<template>
  <AGDSPageAlert tone="info" title="Information" />
  <AGDSPageAlert tone="success" title="Success" />
  <AGDSPageAlert tone="warning" title="Warning" />
  <AGDSPageAlert tone="error" title="Error" />
</template>
```

## Dismissible

Pass an `onClose` handler to render a close button.

::doc-preview{label="Dismissible"}
<PageAlertDemo variant="dismissible" />
::

```vue
<script setup>
import { ref } from 'vue'
const show = ref(true)
</script>

<template>
  <AGDSPageAlert
    v-if="show"
    tone="info"
    title="Session expiring"
    :on-close="() => show = false"
  >
    <p>Your session will expire in 5 minutes.</p>
  </AGDSPageAlert>
</template>
```

## Programmatic focus

Use `focusOnMount` when the alert is injected into the page after a user action so screen readers announce it immediately.

```vue
<template>
  <AGDSPageAlert
    v-if="submitted"
    tone="success"
    title="Form submitted"
    focus-on-mount
  >
    <p>Your response has been recorded.</p>
  </AGDSPageAlert>
</template>
```

Use `focusOnUpdate` to re-focus (and re-announce) the alert whenever its content changes.

```vue
<template>
  <AGDSPageAlert
    tone="error"
    title="Validation failed"
    :focus-on-update="errors"
  >
    <ul>
      <li v-for="err in errors" :key="err">{{ err }}</li>
    </ul>
  </AGDSPageAlert>
</template>
```

## Rich title slot

Replace the default `<h2>` title with arbitrary content using the `#title` slot.

```vue
<template>
  <AGDSPageAlert tone="warning">
    <template #title>
      <h3>Important deadline</h3>
    </template>
    <p>Applications close on Friday.</p>
  </AGDSPageAlert>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tone` | `'info' \| 'success' \| 'warning' \| 'error'` | — | **Required.** Controls background, icon strip colour, and icon |
| `title` | `string` | — | Text title rendered as `<h2>`. Use `#title` slot for rich content |
| `id` | `string` | auto | `id` on the root element. Seeds derived child ids |
| `role` | `string` | `'region'` | ARIA role on the root element |
| `tabIndex` | `number` | auto | `tabindex` on root. Defaults to `-1` when focus props are set |
| `focusOnMount` | `boolean` | `false` | Focus the alert when it mounts |
| `focusOnUpdate` | `unknown[] \| string \| number` | — | Re-focus whenever this value changes |
| `onClose` | `() => void` | — | Renders a close button; called when pressed |

## Events

None — use `onClose` prop instead of an event for the close action.

## Slots

| Slot | Description |
|------|-------------|
| `default` | Body content below the title |
| `title` | Replaces the default `<h2>` title element |

## Exposed

| Name | Type | Description |
|------|------|-------------|
| `focus` | `() => void` | Programmatically focus the alert root |

## Accessibility

- The root element uses `role="region"` with `aria-labelledby` composing the tone label, title, and body ids — screen readers announce e.g. "Error. Save failed. Check the fields below."
- The tone icon strip is `aria-hidden="true"`; tone meaning is conveyed by a visually-hidden `<span>` included in `aria-labelledby` (WCAG 1.1.1)
- `focusOnMount` and `focusOnUpdate` use `:focus` (not `:focus-visible`) so sighted users always see where programmatic focus landed (WCAG 2.4.7)
- The close button has `aria-label="Close"` at all screen sizes (WCAG 4.1.2)

## Changelog

### 0.1.0

- Initial release — `info`/`success`/`warning`/`error` tones, `title`, `focusOnMount`, `focusOnUpdate`, `onClose`
