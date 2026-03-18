---
title: Combobox
description: A searchable dropdown for selecting from a static list of options. Available in single-selection and multi-selection variants. Built on Reka UI for accessible keyboard navigation and ARIA semantics.
category: Forms
status: stable
---

## Single selection

`AGDSCombobox` lets the user type to filter options and select one. The model value is the full option object (`{ label, value }`) or `null`.

::doc-preview
<AGDSCombobox
  label="Country"
  :options="[{ label: 'Australia', value: 'au' }, { label: 'New Zealand', value: 'nz' }, { label: 'United Kingdom', value: 'uk' }, { label: 'United States', value: 'us' }]"
  placeholder="Select a country"
  :required="true"
/>
::

```vue
<script setup lang="ts">
import { ref } from 'vue'

const country = ref(null)
const countryOptions = [
  { label: 'Australia', value: 'au' },
  { label: 'New Zealand', value: 'nz' },
  { label: 'United Kingdom', value: 'uk' },
]
</script>

<template>
  <AGDSCombobox
    v-model="country"
    label="Country"
    :options="countryOptions"
    placeholder="Select a country"
    :required="true"
  />
</template>
```

## Multi-selection

`AGDSComboboxMulti` lets the user select multiple options. Selected items appear as removable tag chips inside the control. The model value is an array of option objects.

::doc-preview
<AGDSComboboxMulti
  label="Interests"
  :options="[{ label: 'Agriculture', value: 'ag' }, { label: 'Education', value: 'ed' }, { label: 'Health', value: 'health' }, { label: 'Transport', value: 'transport' }, { label: 'Environment', value: 'env' }]"
  placeholder="Search interests…"
  hint="Select all that apply"
/>
::

```vue
<script setup lang="ts">
import { ref } from 'vue'

const selected = ref([])
const options = [
  { label: 'Agriculture', value: 'ag' },
  { label: 'Education', value: 'ed' },
  { label: 'Health', value: 'health' },
]
</script>

<template>
  <AGDSComboboxMulti
    v-model="selected"
    label="Interests"
    :options="options"
    placeholder="Search interests…"
    hint="Select all that apply"
  />
</template>
```

## Clearable

Add `clearable` to show a × button when a selection exists, allowing the user to reset the field.

```vue
<template>
  <AGDSCombobox
    v-model="state"
    label="State"
    :options="stateOptions"
    :clearable="true"
    :required="true"
  />
</template>
```

## Validation

Set `invalid` and `message` to show the error state. Both variants wire into `AGDSField` for consistent error display.

::doc-preview{label="Invalid"}
<AGDSCombobox
  label="State"
  :options="[{ label: 'NSW', value: 'nsw' }, { label: 'VIC', value: 'vic' }]"
  :invalid="true"
  message="Select a state to continue"
  :required="true"
/>
::

```vue
<template>
  <AGDSCombobox
    v-model="state"
    label="State"
    :options="stateOptions"
    :invalid="hasError"
    message="Select a state to continue"
    :required="true"
  />
</template>
```

## Custom option rendering

Use the `#item` slot to render rich option content (e.g. a subtitle or badge beneath the label).

```vue
<template>
  <AGDSCombobox v-model="user" label="Assign to" :options="users">
    <template #item="{ option }">
      <span>{{ option.label }}</span>
      <span class="subtitle">{{ option.jobTitle }}</span>
    </template>
  </AGDSCombobox>
</template>
```

## Props — AGDSCombobox

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Visible label text |
| `options` | `Option[]` | — | **Required.** Array of `{ label, value }` objects |
| `modelValue` / `v-model` | `Option \| null` | `null` | The selected option object |
| `id` | `string` | auto | Base id for the input |
| `labelId` | `string` | — | Id on the `<label>` for use with `aria-labelledby` |
| `placeholder` | `string` | — | Input placeholder text |
| `name` | `string` | — | Form serialisation name |
| `disabled` | `boolean` | `false` | Disables the field |
| `block` | `boolean` | `false` | Stretches to fill its container |
| `maxWidth` | `'md' \| 'lg' \| 'xl'` | — | Constrains field width |
| `clearable` | `boolean` | `false` | Shows a × button when a selection exists |
| `required` | `boolean` | `false` | Marks the field as required |
| `invalid` | `boolean` | `false` | Renders the error state |
| `hint` | `string` | — | Hint text below the label |
| `message` | `string` | — | Error message shown when `invalid` is true |
| `hideOptionalLabel` | `boolean` | `false` | Suppresses the "(optional)" suffix |
| `secondaryLabel` | `string` | — | Text prepended to the secondary label |
| `emptyResultsMessage` | `string` | `'No options found'` | Shown when no options match |

## Props — AGDSComboboxMulti

Identical to `AGDSCombobox` except:

| Difference | Value |
|---|---|
| `modelValue` / `v-model` | `Option[]` — array of selected option objects |
| `block` default | `true` — full-width by default |
| No `clearable` prop | Individual tags have their own × buttons |

## Emits

Both components emit:

| Event | Payload |
|-------|---------|
| `focus` | `FocusEvent` |
| `blur` | `FocusEvent` |

## Slots

| Slot | Scope | Component | Description |
|------|-------|-----------|-------------|
| `item` | `{ option }` | Both | Override default option rendering |

## Accessibility

- Built on Reka UI `ComboboxRoot` — keyboard navigation (arrow keys, Enter, Escape) and ARIA combobox/listbox roles are handled automatically
- Filtering runs client-side on both `label` and `value` fields; Reka UI's built-in filter is bypassed (`ignoreFilter: true`)
- The dropdown is teleported to `<body>` via `ComboboxPortal` to escape any `overflow: hidden` containers
- `AGDSComboboxMulti` maintains an `aria-live="polite"` region that announces add and remove events to screen readers (WCAG 4.1.3)
- `defineExpose({ focus })` is provided for programmatic focus management

## Changelog

### 0.1.0

- Initial release — single and multi-selection static comboboxes built on Reka UI
