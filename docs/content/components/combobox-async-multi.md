---
title: Combobox async multi
description: A multi-selection combobox that loads options asynchronously as the user types. Selected items appear as removable tag chips. Supports keyboard navigation, loading states, and custom option rendering.
category: Forms
status: stable
---

## Usage

Provide a `label` and a `fetchOptions` function. The function receives the current query string and should return a promise resolving to an array of `{ label, value }` objects. Use `v-model` to bind to an array of selected options.

::doc-preview
<ComboboxAsyncMultiDemo />
::

```vue
<script setup>
import { ref } from 'vue'

const selected = ref([])

async function fetchServices(query) {
  const res = await fetch(`/api/services?q=${encodeURIComponent(query)}`)
  return res.json() // [{ label: 'Medicare', value: 'medicare' }, …]
}
</script>

<template>
  <AGDSComboboxAsyncMulti
    v-model="selected"
    label="Services"
    :fetch-options="fetchServices"
    placeholder="Search services…"
  />
</template>
```

## Validation

Set `invalid` and `message` to show the error state. The example below triggers validation on submit.

::doc-preview{label="Validation"}
<ComboboxAsyncMultiDemo variant="validation" />
::

```vue
<template>
  <AGDSComboboxAsyncMulti
    v-model="selected"
    label="Services"
    :fetch-options="fetchServices"
    :required="true"
    :invalid="selected.length === 0 && submitted"
    message="Select at least one service"
    hint="You can select multiple services"
  />
</template>
```

## Disabled

::doc-preview{label="Disabled"}
<ComboboxAsyncMultiDemo variant="disabled" />
::

```vue
<template>
  <AGDSComboboxAsyncMulti
    v-model="selected"
    label="Services"
    disabled
    :fetch-options="fetchServices"
  />
</template>
```

## Debounce

By default, `fetchOptions` is called 300 ms after the user stops typing. Adjust with `debounce`.

```vue
<template>
  <AGDSComboboxAsyncMulti
    v-model="selected"
    label="Search"
    :debounce="500"
    :fetch-options="fetchOptions"
  />
</template>
```

## Custom option rendering

Use the `option` slot to customise how each option is displayed in the dropdown.

```vue
<template>
  <AGDSComboboxAsyncMulti
    v-model="selected"
    label="Team members"
    :fetch-options="fetchUsers"
  >
    <template #option="{ option }">
      <strong>{{ option.label }}</strong>
      <span style="color: grey; margin-left: 0.5rem;">{{ option.jobTitle }}</span>
    </template>
  </AGDSComboboxAsyncMulti>
</template>
```

## Custom empty message

```vue
<template>
  <AGDSComboboxAsyncMulti
    v-model="selected"
    label="Services"
    empty-results-message="No services match your search."
    :fetch-options="fetchOptions"
  />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fetchOptions` | `(query: string) => Promise<Option[]>` | — | **Required.** Async function called on each debounced keystroke |
| `label` | `string` | — | **Required.** Visible label text |
| `modelValue` | `Option[]` | `[]` | Selected options — use with `v-model` |
| `id` | `string` | auto-generated | HTML `id` for the input |
| `labelId` | `string` | — | `id` placed on the `<label>` element, for use with `aria-labelledby` |
| `hint` | `string` | — | Hint text shown below the label |
| `invalid` | `boolean` | `false` | Renders the error state |
| `message` | `string` | — | Validation message — only shown when `invalid` is `true` |
| `required` | `boolean` | `false` | If `false`, "(optional)" is appended to the label |
| `hideOptionalLabel` | `boolean` | `false` | Suppresses "(optional)" even when `required` is `false` |
| `secondaryLabel` | `string` | — | Text prepended to the secondary label |
| `placeholder` | `string` | — | Input placeholder — shown only when no items are selected |
| `name` | `string` | — | Name attribute for form serialisation |
| `disabled` | `boolean` | `false` | Disables the field |
| `loading` | `boolean` | `false` | External loading state — shows a spinner and `aria-busy` |
| `loadingLabel` | `string` | `'Loading'` | Screen reader announcement while loading |
| `emptyResultsMessage` | `string` | `'No results found'` | Message shown when fetch returns no results |
| `debounce` | `number` | `300` | Delay in ms before `fetchOptions` is called |
| `block` | `boolean` | `true` | Stretches to fill the container (default true for multi fields) |
| `maxWidth` | `'md' \| 'lg' \| 'xl'` | — | Constrains field width. Ignored when `block` is `true` |

### Option shape

```ts
interface DefaultComboboxOption {
  label: string
  value: string
}
```

The generic `Option` type can extend `DefaultComboboxOption` with additional fields, which are accessible in the `option` slot.

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `Option[]` | Emitted when an option is added or removed |
| `focus` | `FocusEvent` | Emitted when the input gains focus |
| `blur` | `FocusEvent` | Emitted when the input loses focus |

## Slots

| Slot | Props | Description |
|------|-------|-------------|
| `option` | `{ option: Option }` | Custom rendering for each option row in the dropdown |

## Keyboard navigation

| Key | Behaviour |
|-----|-----------|
| `ArrowDown` | Open the list / move to the next option |
| `ArrowUp` | Move to the previous option (wraps to last) |
| `Enter` | Add the focused option to the selection |
| `Escape` | Close the list without selecting |
| `Backspace` | Remove the last selected tag when the input is empty |
| `Tab` | Close the list and move focus |

## Accessibility

- Uses the ARIA combobox pattern: `role="combobox"` on the input, `aria-expanded`, `aria-controls`, `aria-autocomplete="list"`
- `aria-activedescendant` tracks the focused option during keyboard navigation
- `aria-multiselectable="true"` on the listbox signals multiple selection to assistive technologies
- Loading state sets `aria-busy="true"` on the input
- An `aria-live="polite"` region announces result counts when options load (e.g. "3 results available")
- A second `aria-live="polite"` region announces selection changes (e.g. "Australia has been added.", "Austria has been removed.", "All items have been removed.") — WCAG 4.1.3
- Each tag's remove button has an `aria-label` of "Remove {label}" so screen reader users know what they are removing
- Already-selected items are excluded from the dropdown results to prevent duplicate selection
- The field is wrapped in `AGDSField`, wiring label, hint, error message, and `aria-describedby` automatically

## Changelog

### 0.1.0

- Initial release — async fetch, debounce, multi-select tags, loading state, keyboard navigation, WCAG 4.1.3 live announcements
