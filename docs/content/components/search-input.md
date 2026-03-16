---
title: Search Input
description: A labelled search field with a built-in search icon, inline clear button, and Escape-to-clear keyboard support. Designed for filter and search-as-you-type patterns within page content.
category: Forms
status: stable
---

## Usage

Provide a `label` and bind the value with `v-model`. The field renders with a search icon, standard label, hint, and error message layout.

::doc-preview
<AgDSSearchInput label="Search" required />
::

```vue
<script setup>
import { ref } from 'vue'

const query = ref('')
</script>

<template>
  <AgDSSearchInput v-model="query" label="Search" required />
</template>
```

## Hint text

Use the `hint` prop to provide additional guidance beneath the label.

::doc-preview{label="With hint"}
<AgDSSearchInput label="Search legislation" hint="Enter an act name, number, or keyword" required />
::

```vue
<template>
  <AgDSSearchInput
    v-model="query"
    label="Search legislation"
    hint="Enter an act name, number, or keyword"
    required
  />
</template>
```

## Invalid state

Set `invalid` and `message` together to render the error treatment. The message is linked via `aria-describedby`.

::doc-preview{label="Invalid"}
<AgDSSearchInput label="Search" :invalid="true" message="Enter a search term to continue" required />
::

```vue
<template>
  <AgDSSearchInput
    v-model="query"
    label="Search"
    :invalid="hasError"
    message="Enter a search term to continue"
    required
  />
</template>
```

## Disabled

::doc-preview{label="Disabled"}
<AgDSSearchInput label="Search" disabled required />
::

```vue
<template>
  <AgDSSearchInput v-model="query" label="Search" disabled required />
</template>
```

## Max width

Use `maxWidth` to constrain the field to a comfortable reading size. Defaults to `md`.

::doc-preview{label="Max widths"}
<AgDSSearchInput label="Medium (default)" max-width="md" required />
<AgDSSearchInput label="Large" max-width="lg" required />
<AgDSSearchInput label="Extra large" max-width="xl" required />
::

```vue
<template>
  <AgDSSearchInput v-model="query" label="Search" max-width="lg" required />
</template>
```

## Block

Set `block` to stretch the input to the full width of its container. Overrides `maxWidth`.

::doc-preview{label="Block"}
<AgDSSearchInput label="Search" block required />
::

```vue
<template>
  <AgDSSearchInput v-model="query" label="Search" block required />
</template>
```

## Clear button

A clear button appears automatically when the input has a value. Clicking it clears the field and emits both `update:modelValue` (with `''`) and `clear`, then returns focus to the input.

The clear button is a `<div role="button">` intentionally excluded from the Tab order — keyboard users clear via the `Escape` key, keeping the Tab sequence uncluttered.

::doc-preview{label="Clear button visible"}
<AgDSSearchInput label="Search" :model-value="'climate change'" required />
::

```vue
<script setup>
import { ref } from 'vue'

const query = ref('')

function onClear() {
  results.value = allResults
}
</script>

<template>
  <AgDSSearchInput
    v-model="query"
    label="Filter results"
    required
    @clear="onClear"
  />
</template>
```

## SearchBox vs SearchInput

| | `SearchInput` | `SearchBox` |
|---|---|---|
| Purpose | Filter / search-as-you-type within page content | Sitewide or section search bar in a header |
| Layout | `AgDSField` wrapper — label, hint, error message | Composable — `Input` + `Button` components |
| Submit | No submit button — reacts to input events | Paired with `AgDSSearchBoxButton` (`type="submit"`) |
| Clear | `Escape` key + non-Tab-focusable `div[role="button"]` | Tab-focusable `<button>` |
| Search landmark | Not required | Provided by `AgDSSearchBox` (`role="search"`) |

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Visible label text for the field |
| `modelValue` | `string` | `''` | Bound value — use with `v-model` |
| `id` | `string` | auto-generated | HTML `id` for the input |
| `hint` | `string` | — | Hint text shown beneath the label |
| `invalid` | `boolean` | `false` | Renders the invalid (error) visual treatment |
| `message` | `string` | — | Error message shown when `invalid` is `true` |
| `required` | `boolean` | `false` | Suppresses the "(optional)" label suffix |
| `hideOptionalLabel` | `boolean` | `false` | Always suppresses the "(optional)" label suffix |
| `disabled` | `boolean` | `false` | Disables the input |
| `block` | `boolean` | `false` | Stretches the input to fill its container |
| `maxWidth` | `'md' \| 'lg' \| 'xl'` | `'md'` | Constrains the input width. Ignored when `block` is `true` |
| `placeholder` | `string` | — | Native `placeholder` attribute |
| `name` | `string` | — | Native `name` attribute |
| `autoFocus` | `boolean` | `false` | Focuses the input on mount |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Emitted on every keystroke and when the field is cleared |
| `clear` | — | Emitted when the field is explicitly cleared via the clear button or `Escape` |
| `change` | `Event` | Native `change` event |
| `focus` | `FocusEvent` | Emitted when the input gains focus |
| `blur` | `FocusEvent` | Emitted when the input loses focus |

## Keyboard interaction

| Key | Behaviour |
|-----|-----------|
| `Escape` | Clears the input value and emits `clear` |
| `Tab` | Moves focus into and out of the input in natural document order |

## Accessibility

- The input is associated with a visible `<label>` via `for`/`id` — satisfies WCAG 1.3.1 and 4.1.2
- `invalid` sets `aria-invalid="true"` and links the error message via `aria-describedby` — satisfies WCAG 4.1.3
- The search icon is `aria-hidden="true"` — decorative; does not duplicate the label
- The clear button uses `role="button"` and `aria-label="Clear search"` — satisfies WCAG 4.1.2
- The clear button is excluded from Tab order; `Escape` is the keyboard-accessible clear mechanism, following the [ARIA SearchField pattern](https://react-spectrum.adobe.com/react-spectrum/SearchField.html)
- The browser's webkit search cancel button is suppressed to prevent a duplicate interactive element
- `disabled` uses `opacity: 0.5` — state is not conveyed by colour alone (WCAG 1.4.1)
- Focus ring uses `--agds-color-focus` and `--agds-color-focus-width` tokens, visible on `:focus-visible` (WCAG 2.4.7)

## Changelog

### 0.1.0

- Initial release — field wrapper with label, hint, and error; search icon; clear button; Escape-to-clear; `maxWidth`, `block`, `disabled`, `invalid` props
