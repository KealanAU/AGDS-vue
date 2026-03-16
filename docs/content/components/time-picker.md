---
title: Time picker
description: A combobox-style dropdown for selecting a time from a generated list of options. Users can also type to filter. Backed by Reka UI's ComboboxRoot.
category: Forms
status: stable
---

## Usage

Bind `v-model` to receive the selected `{ label, value }` option, or `null` when nothing is selected.

::doc-preview
<AgDSTimePicker label="Appointment time" />
::

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { DefaultComboboxOption } from '@agds/vue'

const time = ref<DefaultComboboxOption | null>(null)
</script>

<template>
  <AgDSTimePicker
    v-model="time"
    label="Appointment time"
    required
  />
</template>
```

## Custom interval

Generate options at a different step (in minutes). The default is every 15 minutes.

```vue
<template>
  <!-- Options every 30 minutes -->
  <AgDSTimePicker
    v-model="time"
    label="Meeting time"
    :interval="30"
  />
</template>
```

## Bounded range

Use `min` and `max` to restrict the generated options to business hours.

```vue
<template>
  <AgDSTimePicker
    v-model="time"
    label="Office appointment"
    min="09:00"
    max="17:00"
    :interval="30"
  />
</template>
```

## 24-hour format

```vue
<template>
  <AgDSTimePicker
    v-model="time"
    label="Departure time"
    time-format="HH:mm"
  />
</template>
```

## With validation

```vue
<template>
  <AgDSTimePicker
    v-model="time"
    label="Start time"
    required
    :invalid="!!error"
    :message="error"
  />
</template>
```

## Loading state

Show a loading indicator while options are being fetched asynchronously.

```vue
<template>
  <AgDSTimePicker
    v-model="time"
    label="Available slots"
    :loading="isLoading"
  />
</template>
```

## How it works

`AgDSTimePicker` wraps Reka UI's `ComboboxRoot` inside an `AgDSField`. Options are generated at mount time from the `min`, `max`, and `interval` props. As the user types, options are filtered by matching the raw digit string, the `HH:mm` value, or the display label. Selecting an item sets the `v-model` to `{ label, value }` where `value` is the `HH:mm` string. The dropdown is teleported to `<body>` via `ComboboxPortal` to avoid overflow clipping.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Field label |
| `id` | `string` | auto | Unique id for the combobox input |
| `labelId` | `string` | — | Id placed on `<label>` for use with `aria-labelledby` |
| `hint` | `string` | — | Hint text below the label |
| `invalid` | `boolean` | `false` | Render the error state |
| `message` | `string` | — | Validation message (shown when `invalid`) |
| `required` | `boolean` | `false` | Marks the field as required |
| `hideOptionalLabel` | `boolean` | `false` | Suppress the "(optional)" label suffix |
| `secondaryLabel` | `string` | — | Text prepended to the secondary label |
| `placeholder` | `string` | — | Input placeholder text |
| `name` | `string` | — | HTML `name` for form serialisation |
| `disabled` | `boolean` | `false` | Disables the combobox |
| `block` | `boolean` | `false` | Stretch to full container width |
| `maxWidth` | `ComboboxMaxWidth` | — | Max-width of the control |
| `interval` | `number` | `15` | Minutes between each generated option (1–180) |
| `loading` | `boolean` | `false` | Show a loading state in the dropdown |
| `min` | `string` | `'00:00'` | Earliest option in `HH:mm` |
| `max` | `string` | `'24:00'` | Latest option in `HH:mm` (exclusive) |
| `timeFormat` | `TimeFormat` | `'h:mm aaa'` | Display format for each option label |
| `emptyResultsMessage` | `string` | `'No options found'` | Message when no options match the search |

### TimeFormat values

| Value | Example output |
|-------|---------------|
| `'h:mm aaa'` | `9:30 am` |
| `'h:mm aa'` | `9:30 AM` |
| `'HH:mm'` | `09:30` |
| `'hh:mm aaa'` | `09:30 am` |
| `'hh:mm aa'` | `09:30 AM` |

### DefaultComboboxOption shape

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | Display text shown in the dropdown |
| `value` | `string` | Time in `HH:mm` |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `focus` | `FocusEvent` | Emitted when the input receives focus |
| `blur` | `FocusEvent` | Emitted when the input loses focus |

## Methods

| Method | Description |
|--------|-------------|
| `focus()` | Programmatically focus the combobox input |

## Accessibility

- Renders a native `<input>` with `role="combobox"` and a connected `role="listbox"` — managed by Reka UI
- `aria-required`, `aria-invalid`, and `aria-describedby` are wired automatically via the `AgDSField` slot
- The dropdown is keyboard-navigable: Arrow keys move through options, Enter selects, Escape closes
- The trigger chevron is `aria-hidden="true"` — the input itself opens the dropdown on interaction
- Focus indicator meets WCAG 2.2 focus-appearance requirements

## Changelog

### 0.1.0

- Initial release — generated options, min/max range, interval control, five `timeFormat` options, loading state, type-to-filter
