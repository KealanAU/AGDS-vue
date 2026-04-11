---
title: Grouped fields
description: A fieldset wrapper for two related form inputs that sit side-by-side on the same row. Provides a shared legend, hint, and error message, while managing aria-invalid and aria-describedby independently for each field via a scoped slot.
category: Forms
status: stable
---

Use `AGDSGroupedFields` when two related inputs belong together conceptually and should appear on the same row — for example a date range (From / To) or a price range (Min / Max). It wraps both in a `<fieldset>` so screen readers announce the group name before each control.

## Usage

Spread `field1Props` and `field2Props` from the scoped slot onto each input to wire up the correct accessibility attributes.

::doc-preview
:grouped-fields-demo
::

```vue
<script setup lang="ts">
import { ref } from 'vue'
const from = ref('')
const to = ref('')
</script>

<template>
  <AGDSGroupedFields legend="Date range">
    <template #default="{ field1Props, field2Props }">
      <AGDSTextInput v-bind="field1Props" v-model="from" label="From" />
      <AGDSTextInput v-bind="field2Props" v-model="to" label="To" />
    </template>
  </AGDSGroupedFields>
</template>
```

## With hint

Use `hint` to add supplementary text that applies to both fields.

::doc-preview{label="With hint"}
:grouped-fields-demo{variant="with-hint"}
::

```vue
<template>
  <AGDSGroupedFields
    legend="Date range"
    hint="Enter dates in DD/MM/YYYY format"
  >
    <template #default="{ field1Props, field2Props }">
      <AGDSTextInput v-bind="field1Props" v-model="from" label="From" />
      <AGDSTextInput v-bind="field2Props" v-model="to" label="To" />
    </template>
  </AGDSGroupedFields>
</template>
```

## Independent field errors

Each field's invalid state is controlled separately via `field1Invalid` and `field2Invalid`. The shared `message` is shown when either field is invalid, but `aria-invalid` and `aria-describedby` are set independently on each input so screen readers announce the correct field as erroneous.

::doc-preview{label="Field 1 invalid"}
:grouped-fields-demo{variant="field-1-invalid"}
::

```vue
<template>
  <AGDSGroupedFields
    legend="Date range"
    :field1-invalid="fromError"
    :field2-invalid="toError"
    message="Enter a valid date range"
  >
    <template #default="{ field1Props, field2Props }">
      <AGDSTextInput v-bind="field1Props" v-model="from" label="From" :invalid="fromError" />
      <AGDSTextInput v-bind="field2Props" v-model="to" label="To" :invalid="toError" />
    </template>
  </AGDSGroupedFields>
</template>
```

## Visually hidden legend

When the surrounding context makes the purpose of the group obvious, you can hide the legend from sighted users while keeping it available to screen readers.

::doc-preview{label="Hidden legend"}
:grouped-fields-demo{variant="hidden-legend"}
::

```vue
<template>
  <AGDSGroupedFields legend="Date range" :visually-hide-legend="true">
    <template #default="{ field1Props, field2Props }">
      <AGDSTextInput v-bind="field1Props" v-model="from" label="From" />
      <AGDSTextInput v-bind="field2Props" v-model="to" label="To" />
    </template>
  </AGDSGroupedFields>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `legend` | `string` | — | **Required.** Describes the purpose of the group |
| `field1Invalid` | `boolean` | `false` | Renders the invalid state for field 1 |
| `field2Invalid` | `boolean` | `false` | Renders the invalid state for field 2 |
| `hideOptionalLabel` | `boolean` | `false` | Suppresses the "(optional)" suffix on the legend |
| `hint` | `string` | — | Hint text shown below the legend; referenced by both fields via `aria-describedby` |
| `id` | `string` | auto | Base id used to derive internal hint and message element ids |
| `message` | `string` | — | Shown when either field is invalid; referenced in `aria-describedby` only for the invalid field(s) |
| `visuallyHideLegend` | `boolean` | `false` | Hides the legend visually while keeping it accessible to screen readers |

## Scoped slot

The default slot receives `field1Props` and `field2Props`. Spread them onto the corresponding input components.

| Prop | Type | Description |
|------|------|-------------|
| `field1Props` | `{ 'aria-invalid': boolean, 'aria-describedby': string \| undefined }` | Accessibility props for the first input |
| `field2Props` | `{ 'aria-invalid': boolean, 'aria-describedby': string \| undefined }` | Accessibility props for the second input |

## Accessibility

- Wraps controls in a `<fieldset>` with a `<legend>` so screen readers announce the group name before each control (WCAG 1.3.1)
- `aria-invalid` is set independently on each input — only the field(s) with an error are marked invalid
- `aria-describedby` on each field references the message id only when that field is invalid, and always references the hint id when a hint is present
- `visuallyHideLegend` uses the standard visually-hidden technique (not `display: none`) so the legend remains in the accessibility tree
- The fieldset itself is not set to `display: flex` — browser inconsistencies with flex on fieldset are avoided by using margins on child elements

## Changelog

### 0.1.0

- Initial release — scoped slot a11y props, independent per-field invalid state, shared hint/message, visually-hidden legend option
