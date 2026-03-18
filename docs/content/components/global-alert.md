---
title: Global alert
description: A full-width banner displayed at the top of the page to communicate site-wide information or warnings. Supports 'info' and 'warning' tones and an optional dismiss button.
category: Layout
status: stable
---

## Usage

Place `AGDSGlobalAlert` above your main layout content. Provide a message in the default slot.

```vue
<template>
  <AGDSGlobalAlert>
    This site will be unavailable on Saturday 15 March from 6 am to 8 am AEST for scheduled maintenance.
  </AGDSGlobalAlert>
</template>
```

## Tones

Use the `tone` prop to control the colour scheme and icon. The default tone is `'warning'`.

```vue
<template>
  <AGDSGlobalAlert tone="info">
    A new version of this service is available.
    <a href="/updates">See what's new</a>.
  </AGDSGlobalAlert>
</template>
```

| Tone | Background | Icon |
|------|-----------|------|
| `'warning'` (default) | `--agds-color-warning-muted` | Triangle with exclamation |
| `'info'` | `--agds-color-info-muted` | Circle with i |

## Title

Add a `title` prop to render a bold heading above the body content.

```vue
<template>
  <AGDSGlobalAlert title="Scheduled maintenance" tone="warning">
    This site will be unavailable on Saturday 15 March from 6 am to 8 am AEST.
  </AGDSGlobalAlert>
</template>
```

## Dismissible

Provide an `on-close` handler to render a Close button. When clicked, call your own state logic to remove the alert.

```vue
<script setup lang="ts">
import { ref } from 'vue'
const visible = ref(true)
</script>

<template>
  <AGDSGlobalAlert
    v-if="visible"
    title="Cookie notice"
    tone="info"
    :on-close="() => (visible = false)"
  >
    We use cookies to improve your experience.
  </AGDSGlobalAlert>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tone` | `'info' \| 'warning'` | `'warning'` | Controls background colour and icon |
| `title` | `string` | — | Optional bold heading rendered above the body |
| `onClose` | `() => void` | — | When provided, renders a Close button and calls this function when clicked |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Alert body content. Can include inline links and rich text |

## Accessibility

- The root element is a `<section>` landmark. Its accessible name comes from the `title` prop when provided, otherwise from the tone (`'Information'` or `'Warning'`). This ensures screen readers announce the alert's purpose when navigating by landmark
- The icon strip is `aria-hidden="true"` — the section label conveys the tone semantically (WCAG 1.3.3)
- The Close button has `aria-label="Close"` (WCAG 4.1.2)
- On small screens the Close button is absolutely positioned and the body is given right padding to prevent content overlap; on desktop it is in the normal flow

## Changelog

### 0.1.0

- Initial release — `tone`, `title`, `onClose`; dismissible close button with responsive positioning
