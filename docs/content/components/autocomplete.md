---
title: Autocomplete
description: A combobox input that fetches matching options asynchronously as the user types. Supports keyboard navigation, loading states, and custom option rendering.
category: Forms
status: stable
---

## Usage

Provide a `label` and a `fetchOptions` function. The function receives the current query string and should return a promise resolving to an array of `{ label, value }` objects.

```vue
<script setup>
import { ref } from 'vue'

const selected = ref(null)

async function fetchOptions(query) {
  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
  return res.json() // [{ label: 'Australia', value: 'AU' }, …]
}
</script>

<template>
  <AGDSAutocomplete
    v-model="selected"
    label="Search countries"
    :fetch-options="fetchOptions"
  />
</template>
```

## Placeholder

```vue
<template>
  <AGDSAutocomplete
    v-model="selected"
    label="Search locations"
    placeholder="Start typing…"
    :fetch-options="fetchOptions"
  />
</template>
```

## Debounce

By default, `fetchOptions` is called 300 ms after the user stops typing. Adjust with `debounce`.

```vue
<template>
  <AGDSAutocomplete
    v-model="selected"
    label="Search"
    :debounce="500"
    :fetch-options="fetchOptions"
  />
</template>
```

## Custom empty message

Override the default "No results found" message shown when the fetch returns an empty array.

```vue
<template>
  <AGDSAutocomplete
    v-model="selected"
    label="Search services"
    empty-results-message="No services match your search."
    :fetch-options="fetchOptions"
  />
</template>
```

## Custom option rendering

Use the `option` slot to customise how each option is displayed in the dropdown.

```vue
<template>
  <AGDSAutocomplete
    v-model="selected"
    label="Search users"
    :fetch-options="fetchUsers"
  >
    <template #option="{ option }">
      <strong>{{ option.label }}</strong>
      <span style="color: grey; margin-left: 0.5rem;">{{ option.value }}</span>
    </template>
  </AGDSAutocomplete>
</template>
```

## Disabled

```vue
<template>
  <AGDSAutocomplete
    v-model="selected"
    label="Search"
    disabled
    :fetch-options="fetchOptions"
  />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `fetchOptions` | `(query: string) => Promise<Option[]>` | — | **Required.** Async function called on each keystroke |
| `label` | `string` | — | **Required.** Visible label text for the input |
| `modelValue` | `Option \| null` | — | Selected option — use with `v-model` |
| `id` | `string` | auto-generated | HTML `id` for the input |
| `placeholder` | `string` | — | Placeholder text |
| `disabled` | `boolean` | `false` | Disables the input |
| `loading` | `boolean` | `false` | External loading state — shows a spinner and `aria-busy` |
| `loadingLabel` | `string` | `'Loading'` | Screen reader announcement while loading |
| `emptyResultsMessage` | `string` | `'No results found'` | Message shown when fetch returns no results |
| `debounce` | `number` | `300` | Delay in ms before `fetchOptions` is called |

### Option shape

```ts
interface DefaultComboboxOption {
  label: string
  value: string | number
}
```

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `Option \| null` | Emitted when an option is selected or cleared |
| `focus` | `FocusEvent` | Emitted when the input gains focus |
| `blur` | `FocusEvent` | Emitted when the input loses focus |

## Slots

| Slot | Props | Description |
|------|-------|-------------|
| `label` | — | Custom label content (overrides the `label` prop text) |
| `option` | `{ option: Option }` | Custom rendering for each option in the dropdown list |

## Keyboard navigation

| Key | Behaviour |
|-----|-----------|
| `ArrowDown` | Open the list and move focus to the first option |
| `ArrowUp` | Move focus to the last option |
| `ArrowDown` / `ArrowUp` | Move through options |
| `Enter` | Select the focused option |
| `Escape` | Close the list without selecting |
| `Tab` | Close the list and move focus |

## Accessibility

- Uses the ARIA combobox pattern: `role="combobox"` on the input, `aria-expanded`, `aria-controls`, `aria-autocomplete="list"`
- `aria-activedescendant` tracks the focused option
- Loading state sets `aria-busy="true"` and injects text into an `aria-live="assertive"` region
- An `aria-live="polite"` region announces the result count when options load
- The input is associated with the visible `<label>` via `id`/`for`

## Changelog

### 0.1.0

- Initial release — async fetch, debounce, loading state, custom option slot, keyboard navigation
