---
title: Section Alert
description: A compact inline alert used within forms and page sections to communicate status. Supports 16 semantic tones drawn from the AGDS task-status vocabulary, with an optional close button and programmatic focus.
category: Feedback
status: stable
---

## Usage

Provide a `tone` and a required `title`. Optionally add body content via the default slot.

::doc-preview
<AgDSSectionAlert tone="errorHigh" title="Unable to save changes">
  <p>Check the highlighted fields and try again.</p>
</AgDSSectionAlert>
::

```vue
<template>
  <AgDSSectionAlert tone="errorHigh" title="Unable to save changes">
    <p>Check the highlighted fields and try again.</p>
  </AgDSSectionAlert>
</template>
```

## Tone

The `tone` prop drives the background, border colour, icon shape, and screen-reader announcement. Tones are grouped into three emphasis levels:

**High** — strong background, filled icon (use for blocking errors/successes that need immediate attention):
`errorHigh`, `successHigh`, `infoHigh`, `warningHigh`

**Medium** — muted background + enclosed border, outline icon (use for important but non-blocking feedback):
`errorMedium`, `successMedium`, `infoMedium`, `warningMedium`

**Low** — body background + enclosed border, outline icon (use for informational or status-only messages):
`errorLow`, `successLow`, `infoLow`, `warningLow`, `cannotStartLow`, `inProgressLow`, `notStartedLow`, `pausedLow`, `unknownLow`

::doc-preview{label="Selected tones"}
<AgDSSectionAlert tone="errorHigh" title="Error — High" />
<AgDSSectionAlert tone="successMedium" title="Success — Medium" />
<AgDSSectionAlert tone="infoLow" title="Info — Low" />
<AgDSSectionAlert tone="inProgressLow" title="In progress" />
::

```vue
<template>
  <AgDSSectionAlert tone="errorHigh" title="Error — High" />
  <AgDSSectionAlert tone="successMedium" title="Success — Medium" />
  <AgDSSectionAlert tone="infoLow" title="Info — Low" />
  <AgDSSectionAlert tone="inProgressLow" title="In progress" />
</template>
```

## Dismissible

Pass an `onClose` handler to render a close button.

::doc-preview{label="Dismissible"}
<AgDSSectionAlert tone="infoMedium" title="Your draft has been saved" :on-close="() => {}" />
::

```vue
<script setup>
import { ref } from 'vue'
const show = ref(true)
</script>

<template>
  <AgDSSectionAlert
    v-if="show"
    tone="infoMedium"
    title="Your draft has been saved"
    :on-close="() => show = false"
  />
</template>
```

## Programmatic focus

Use `focusOnMount` when the alert is injected after a user action so screen readers announce it immediately.

```vue
<template>
  <AgDSSectionAlert
    v-if="saved"
    tone="successHigh"
    title="Changes saved"
    focus-on-mount
  />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tone` | `SectionAlertTone` | — | **Required.** Controls background, border, icon, and screen-reader label |
| `title` | `string` | — | **Required.** Primary label for the alert |
| `id` | `string` | auto | `id` on the root element |
| `role` | `string` | `'region'` | ARIA role on the root element |
| `tabIndex` | `number` | auto | Defaults to `-1` when focus props are set |
| `focusOnMount` | `boolean` | `false` | Focus the alert when it mounts |
| `focusOnUpdate` | `unknown[] \| string \| number` | — | Re-focus whenever this value changes |
| `onClose` | `() => void` | — | Renders a close button; called when pressed |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Optional body content below the title |

## Exposed

| Name | Type | Description |
|------|------|-------------|
| `focus` | `() => void` | Programmatically focus the alert root |

## Accessibility

- `aria-labelledby` composes the tone icon label, title, and body — screen readers announce e.g. "Warning. Field is required."
- The icon SVG is `aria-hidden="true"`; tone meaning is carried by a visually-hidden `<span>` (WCAG 1.1.1)
- Close button has `aria-label="Close"` at all screen sizes (WCAG 4.1.2)
- Low/Medium tones add an enclosed border for contrast beyond colour alone (WCAG 1.4.1)

## Changelog

### 0.1.0

- Initial release — 16 tones, `title`, `focusOnMount`, `focusOnUpdate`, `onClose`
