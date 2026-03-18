---
title: Date Picker
description: A date input with an attached calendar popover for visual date selection. Supports single date and date range modes, min/max constraints, year range dropdowns, and configurable date formats.
category: Forms
status: stable
---

## Usage

Use `v-model` to bind the selected date. In single mode, the value is `Date | null`.

::doc-preview
<DatePickerDemo />
::

```vue
<script setup>
import { ref } from 'vue'
const date = ref(null)
</script>

<template>
  <AGDSDatePicker label="Date of birth" v-model="date" :required="true" />
</template>
```

## Date range

Set `range` to `true` to show two date inputs (start + end). The `v-model` value becomes `{ from: Date | null; to: Date | null }`.

::doc-preview{label="Date range"}
<DatePickerDemo variant="range" />
::

```vue
<script setup>
import { ref } from 'vue'
const range = ref({ from: null, to: null })
</script>

<template>
  <AGDSDatePicker
    range
    label="Employment period"
    from-label="Start date"
    to-label="End date"
    v-model="range"
  />
</template>
```

## Hint and validation

Use `hint` for guidance and `invalid`/`message` to show a validation error.

::doc-preview{label="With hint and error"}
<DatePickerDemo variant="hint-validation" />
::

```vue
<template>
  <AGDSDatePicker
    label="Application date"
    hint="Enter the date you submitted your application."
    :invalid="hasError"
    :message="errorMessage"
    v-model="date"
  />
</template>
```

## Min and max dates

Restrict selectable dates using `minDate` and `maxDate`. Dates outside this range are disabled in the calendar.

::doc-preview{label="Min and max"}
<DatePickerDemo variant="min-max" />
::

```vue
<script setup>
const minDate = new Date(2020, 0, 1)
const maxDate = new Date()
</script>

<template>
  <AGDSDatePicker
    label="Date issued"
    :min-date="minDate"
    :max-date="maxDate"
    v-model="date"
  />
</template>
```

## Year range dropdown

Provide `yearRange` to show a year dropdown in the calendar header, allowing users to jump between years quickly.

::doc-preview{label="Year range"}
<DatePickerDemo variant="year-range" />
::

```vue
<template>
  <AGDSDatePicker
    label="Date of birth"
    :year-range="{ from: 1920, to: 2006 }"
    v-model="date"
  />
</template>
```

## Date format

The default format is `dd/MM/yyyy`. Set `dateFormat` to `'MM/dd/yyyy'` for US-style dates.

```vue
<template>
  <AGDSDatePicker label="Date" date-format="MM/dd/yyyy" v-model="date" />
</template>
```

## Required and optional

```vue
<template>
  <!-- Required — no "(optional)" suffix -->
  <AGDSDatePicker label="Date of birth" required v-model="date" />

  <!-- Optional (default) — "(optional)" appended to label -->
  <AGDSDatePicker label="Preferred start date" v-model="date" />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `Date \| null \| { from: Date \| null; to: Date \| null }` | `null` | Selected date or date range |
| `range` | `boolean` | `false` | Enables date range mode |
| `label` | `string` | — | Field label (single) or fieldset legend (range) |
| `fromLabel` | `string` | `'Start date'` | Start-date input label (range mode only) |
| `toLabel` | `string` | `'End date'` | End-date input label (range mode only) |
| `id` | `string` | auto | HTML id for the primary input |
| `hint` | `string` | — | Hint text below the label |
| `message` | `string` | — | Validation message |
| `invalid` | `boolean` | `false` | Error state (single mode) |
| `fromInvalid` | `boolean` | `false` | Error state for the start-date input (range mode) |
| `toInvalid` | `boolean` | `false` | Error state for the end-date input (range mode) |
| `disabled` | `boolean` | `false` | Disables all inputs |
| `required` | `boolean` | `false` | Marks field as required |
| `hideOptionalLabel` | `boolean` | `false` | Suppress the "(optional)" suffix |
| `minDate` | `Date` | — | Earliest selectable date |
| `maxDate` | `Date` | — | Latest selectable date |
| `yearRange` | `{ from: number; to: number }` | — | Shows a year dropdown in the calendar header |
| `dateFormat` | `string` | `'dd/MM/yyyy'` | Format for text input and example label |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `Date \| null \| { from, to }` | Emitted on input blur or calendar selection |
| `focus` | `FocusEvent` | Emitted when an input is focused |
| `blur` | `FocusEvent` | Emitted when an input loses focus |

## Exposed

| Name | Type | Description |
|------|------|-------------|
| `focus` | `() => void` | Focus the primary input (or start-date input in range mode) |

## Accessibility

- The calendar trigger button has a descriptive `aria-label` e.g. "Choose date" or "Change date, Monday 25 March 2026"
- The calendar popover uses `role="dialog"` with `aria-label` and `aria-modal="true"`
- `Escape` closes the calendar and returns focus to the trigger button
- In range mode, the two inputs are wrapped in a `<fieldset>`/`<legend>` so screen readers understand they belong together
- Dates outside `minDate`/`maxDate` are rendered as `disabled` in the calendar

## Changelog

### 0.1.0

- Initial release — single mode, range mode, min/max, year range, configurable format
