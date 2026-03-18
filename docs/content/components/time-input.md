---
title: Time input
description: A free-text input for entering times. Accepts flexible formats (e.g. "930", "9:30pm", "21:30") and normalises the value to a consistent 24-hour HH:mm string on blur.
category: Forms
status: stable
---

## Usage

Bind `v-model` to receive a `TimeValue` object `{ value: string; formatted?: string }` where `value` is always in `HH:mm`.

::doc-preview
<AGDSTimeInput label="Appointment time" />
::

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { TimeValue } from '@agds/vue'

const time = ref<TimeValue>()
</script>

<template>
  <AGDSTimeInput
    v-model="time"
    label="Appointment time"
    required
  />
</template>
```

## With validation

Use `invalid` and `message` to surface errors.

```vue
<template>
  <AGDSTimeInput
    v-model="time"
    label="Start time"
    required
    :invalid="!!error"
    :message="error"
  />
</template>
```

## 24-hour format

Set `timeFormat` to `'HH:mm'` to display and hint in 24-hour format.

```vue
<template>
  <AGDSTimeInput
    v-model="time"
    label="Departure time"
    time-format="HH:mm"
  />
</template>
```

## Disabled

```vue
<template>
  <AGDSTimeInput
    v-model="time"
    label="Locked time"
    disabled
  />
</template>
```

## How it works

The component renders a plain `<input type="text">` wrapped in `AGDSField` for label, hint, and error message. On blur it parses the raw input (accepting bare digits like `"930"`, colon-separated `"9:30"`, and suffixed variants like `"9:30pm"` or `"2130"`) and normalises the result to `HH:mm`. The `v-model` value is always `{ value: 'HH:mm', formatted: '<display string>' }` or `undefined` if the input could not be parsed. A secondary label (e.g. `"(e.g. 9:30 pm)"`) is automatically generated from `timeFormat`.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Field label |
| `id` | `string` | auto | Unique id for the `<input>` |
| `hint` | `string` | — | Hint text shown below the label |
| `invalid` | `boolean` | `false` | Render the error state |
| `message` | `string` | — | Validation message (shown when `invalid`) |
| `required` | `boolean` | `false` | Marks the field as required |
| `hideOptionalLabel` | `boolean` | `false` | Suppress the "(optional)" label suffix |
| `block` | `boolean` | `false` | Stretch the input to full width |
| `maxWidth` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Constrains width (ignored when `block`) |
| `timeFormat` | `TimeFormat` | `'h:mm aaa'` | Display format for the rendered value and secondary label hint |
| `disabled` | `boolean` | `false` | Disables the input |
| `name` | `string` | — | HTML `name` for form serialisation |
| `placeholder` | `string` | — | Placeholder text |
| `modelValue` | `TimeValue` | — | Current value (`v-model`) |

### TimeFormat values

| Value | Example output |
|-------|---------------|
| `'h:mm aaa'` | `9:30 am` |
| `'h:mm aa'` | `9:30 AM` |
| `'HH:mm'` | `09:30` |
| `'hh:mm aaa'` | `09:30 am` |
| `'hh:mm aa'` | `09:30 AM` |

### TimeValue shape

| Field | Type | Description |
|-------|------|-------------|
| `value` | `string` | Time in `HH:mm` (always 24-hour) |
| `formatted` | `string` (optional) | Time in the current `timeFormat` |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `TimeValue \| undefined` | Emitted on blur after parsing |
| `change` | `TimeValue \| undefined` | Emitted alongside `update:modelValue` |
| `focus` | `FocusEvent` | Native focus event |
| `blur` | `FocusEvent` | Native blur event (after value update) |

## Methods

| Method | Description |
|--------|-------------|
| `focus()` | Programmatically focus the input |

## Accessibility

- Rendered as `<input type="text">` — screen readers announce it as a text field
- `aria-required`, `aria-invalid`, and `aria-describedby` are wired automatically via the `AGDSField` slot
- The secondary label (e.g. `"(e.g. 9:30 pm)"`) sets user expectation for the accepted format
- Focus indicator meets WCAG 2.2 focus-appearance requirements

## Changelog

### 0.1.0

- Initial release — flexible parsing, five `timeFormat` options, `v-model` with `TimeValue`
