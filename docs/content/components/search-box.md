---
title: Search Box
description: A composable search form with a labelled text input and submit button. Designed for site-wide or section search bars embedded in headers and navigation areas.
category: Forms
status: stable
---

## Usage

Compose `AGDSSearchBox`, `AGDSSearchBoxInput`, and `AGDSSearchBoxButton` together. The form wraps its children in a flex row and carries `role="search"` so screen readers can navigate directly to the search landmark.

::doc-preview
:search-box-demo
::

```vue
<script setup>
import { ref } from 'vue'

const query = ref('')

function onSubmit(event) {
  event.preventDefault()
  router.push({ path: '/results', query: { q: query.value } })
}
</script>

<template>
  <AGDSSearchBox @submit="onSubmit">
    <AGDSSearchBoxInput v-model="query" />
    <AGDSSearchBoxButton label="Search" />
  </AGDSSearchBox>
</template>
```

## Visible label

By default the input label is visually hidden but announced by screen readers. Set `label-visible` to display it above the input — useful when the search box appears outside of a header context.

::doc-preview{label="Visible label"}
:search-box-demo{variant="label-visible"}
::

```vue
<template>
  <AGDSSearchBox>
    <AGDSSearchBoxInput v-model="query" label="Search the site" label-visible />
    <AGDSSearchBoxButton label="Search" />
  </AGDSSearchBox>
</template>
```

## Icon-only button

Set `icon-only` on `AGDSSearchBoxButton` to show only the search icon. The `label` prop still provides the accessible name via `aria-label`.

::doc-preview{label="Icon-only button"}
:search-box-demo{variant="icon-only"}
::

```vue
<template>
  <AGDSSearchBox>
    <AGDSSearchBoxInput v-model="query" />
    <AGDSSearchBoxButton label="Search" icon-only />
  </AGDSSearchBox>
</template>
```

## Clear button

A clear button appears automatically inside `AGDSSearchBoxInput` when the input has a value. It is a native `<button>` so keyboard users can Tab to it and activate it with `Space` or `Enter`.

::doc-preview{label="Clear button visible"}
:search-box-demo{variant="clear"}
::

```vue
<template>
  <AGDSSearchBox @submit.prevent="onSubmit">
    <AGDSSearchBoxInput v-model="query" />
    <AGDSSearchBoxButton label="Search" />
  </AGDSSearchBox>
</template>
```

## Custom aria-label

When multiple search forms exist on the page, use `aria-label` on `AGDSSearchBox` to distinguish the landmarks.

```vue
<template>
  <AGDSSearchBox aria-label="Search products">
    <AGDSSearchBoxInput v-model="query" label="Search products" />
    <AGDSSearchBoxButton label="Search" />
  </AGDSSearchBox>
</template>
```

---

## AGDSSearchBox props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `'Sitewide'` | Accessible label for the `role="search"` landmark |

## AGDSSearchBox events

| Event | Payload | Description |
|-------|---------|-------------|
| `submit` | `SubmitEvent` | Fired when the form is submitted |

## AGDSSearchBox slots

| Slot | Description |
|------|-------------|
| `default` | Accepts `AGDSSearchBoxInput` and `AGDSSearchBoxButton` |

---

## AGDSSearchBoxInput props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | — | Controlled value — use with `v-model` |
| `defaultValue` | `string` | — | Initial value for uncontrolled mode |
| `label` | `string` | `'Search'` | Label text for the input |
| `labelVisible` | `boolean` | `false` | When `true`, renders the label visibly above the input |
| `id` | `string` | auto-generated | HTML `id` for the input |
| `name` | `string` | — | Native `name` attribute |
| `placeholder` | `string` | — | Native `placeholder` attribute |

## AGDSSearchBoxInput events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Emitted on every keystroke and when the input is cleared |
| `focus` | `FocusEvent` | Emitted when the input gains focus |
| `blur` | `FocusEvent` | Emitted when the input loses focus |

---

## AGDSSearchBoxButton props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Visible button text and accessible name |
| `iconOnly` | `boolean` | `false` | Hides the visible text and shows only the search icon |

---

## Keyboard interaction

| Key | Behaviour |
|-----|-----------|
| `Tab` | Moves focus between the input, clear button (when visible), and submit button |
| `Enter` | Submits the form when focus is on the input or submit button |
| `Space` | Activates the clear button or submit button when focused |

## Accessibility

- `AGDSSearchBox` renders `<form role="search">` — a native search landmark navigable via screen reader shortcuts
- `aria-label` on the form distinguishes the region when multiple search forms exist on the page (WCAG 3.2.4)
- The input label is always present in the DOM (visible or `sr-only`) and associated via `for`/`id` (WCAG 1.3.1)
- `AGDSSearchBoxButton` always carries an `aria-label` matching the visible text, satisfying WCAG 2.5.3
- Search and close icon SVGs are `aria-hidden="true"` — decorative; the label carries the accessible name
- The clear button is a native `<button type="button">` — keyboard-focusable and activatable with `Space`/`Enter`
- The browser's native webkit search cancel button is suppressed to avoid a duplicate control

## Changelog

### 0.1.0

- Initial release — composable `SearchBox`, `SearchBoxInput`, `SearchBoxButton`; visible/sr-only label; clear button; icon-only button mode
