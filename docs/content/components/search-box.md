---
title: Search Box
description: A composable search form with a labelled text input and submit button. Designed for site-wide or section search bars embedded in headers and navigation areas.
category: Forms
status: stable
---

## Usage

Compose `AgDSSearchBox`, `AgDSSearchBoxInput`, and `AgDSSearchBoxButton` together. The form wraps its children in a flex row and carries `role="search"` so screen readers can navigate directly to the search landmark.

::doc-preview
<AgDSSearchBox>
  <AgDSSearchBoxInput />
  <AgDSSearchBoxButton label="Search" />
</AgDSSearchBox>
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
  <AgDSSearchBox @submit="onSubmit">
    <AgDSSearchBoxInput v-model="query" />
    <AgDSSearchBoxButton label="Search" />
  </AgDSSearchBox>
</template>
```

## Visible label

By default the input label is visually hidden but announced by screen readers. Set `label-visible` to display it above the input — useful when the search box appears outside of a header context.

::doc-preview{label="Visible label"}
<AgDSSearchBox>
  <AgDSSearchBoxInput label="Search the site" label-visible />
  <AgDSSearchBoxButton label="Search" />
</AgDSSearchBox>
::

```vue
<template>
  <AgDSSearchBox>
    <AgDSSearchBoxInput v-model="query" label="Search the site" label-visible />
    <AgDSSearchBoxButton label="Search" />
  </AgDSSearchBox>
</template>
```

## Icon-only button

Set `icon-only` on `AgDSSearchBoxButton` to show only the search icon. The `label` prop still provides the accessible name via `aria-label`.

::doc-preview{label="Icon-only button"}
<AgDSSearchBox>
  <AgDSSearchBoxInput />
  <AgDSSearchBoxButton label="Search" icon-only />
</AgDSSearchBox>
::

```vue
<template>
  <AgDSSearchBox>
    <AgDSSearchBoxInput v-model="query" />
    <AgDSSearchBoxButton label="Search" icon-only />
  </AgDSSearchBox>
</template>
```

## Clear button

A clear button appears automatically inside `AgDSSearchBoxInput` when the input has a value. It is a native `<button>` so keyboard users can Tab to it and activate it with `Space` or `Enter`.

::doc-preview{label="Clear button visible"}
<AgDSSearchBox>
  <AgDSSearchBoxInput :model-value="'climate change'" />
  <AgDSSearchBoxButton label="Search" />
</AgDSSearchBox>
::

```vue
<template>
  <AgDSSearchBox @submit.prevent="onSubmit">
    <AgDSSearchBoxInput v-model="query" />
    <AgDSSearchBoxButton label="Search" />
  </AgDSSearchBox>
</template>
```

## Custom aria-label

When multiple search forms exist on the page, use `aria-label` on `AgDSSearchBox` to distinguish the landmarks.

```vue
<template>
  <AgDSSearchBox aria-label="Search products">
    <AgDSSearchBoxInput v-model="query" label="Search products" />
    <AgDSSearchBoxButton label="Search" />
  </AgDSSearchBox>
</template>
```

---

## AgDSSearchBox props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaLabel` | `string` | `'Sitewide'` | Accessible label for the `role="search"` landmark |

## AgDSSearchBox events

| Event | Payload | Description |
|-------|---------|-------------|
| `submit` | `SubmitEvent` | Fired when the form is submitted |

## AgDSSearchBox slots

| Slot | Description |
|------|-------------|
| `default` | Accepts `AgDSSearchBoxInput` and `AgDSSearchBoxButton` |

---

## AgDSSearchBoxInput props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | — | Controlled value — use with `v-model` |
| `defaultValue` | `string` | — | Initial value for uncontrolled mode |
| `label` | `string` | `'Search'` | Label text for the input |
| `labelVisible` | `boolean` | `false` | When `true`, renders the label visibly above the input |
| `id` | `string` | auto-generated | HTML `id` for the input |
| `name` | `string` | — | Native `name` attribute |
| `placeholder` | `string` | — | Native `placeholder` attribute |

## AgDSSearchBoxInput events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Emitted on every keystroke and when the input is cleared |
| `focus` | `FocusEvent` | Emitted when the input gains focus |
| `blur` | `FocusEvent` | Emitted when the input loses focus |

---

## AgDSSearchBoxButton props

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

- `AgDSSearchBox` renders `<form role="search">` — a native search landmark navigable via screen reader shortcuts
- `aria-label` on the form distinguishes the region when multiple search forms exist on the page (WCAG 3.2.4)
- The input label is always present in the DOM (visible or `sr-only`) and associated via `for`/`id` (WCAG 1.3.1)
- `AgDSSearchBoxButton` always carries an `aria-label` matching the visible text, satisfying WCAG 2.5.3
- Search and close icon SVGs are `aria-hidden="true"` — decorative; the label carries the accessible name
- The clear button is a native `<button type="button">` — keyboard-focusable and activatable with `Space`/`Enter`
- The browser's native webkit search cancel button is suppressed to avoid a duplicate control

## Changelog

### 0.1.0

- Initial release — composable `SearchBox`, `SearchBoxInput`, `SearchBoxButton`; visible/sr-only label; clear button; icon-only button mode
