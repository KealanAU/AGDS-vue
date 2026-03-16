---
title: Password Input
description: A password field with a show/hide toggle checkbox. Wraps AgDSField for standard label, hint, and error message layout.
category: Forms
status: stable
---

## Usage

Provide a `label` and bind the value with `v-model`. A "Show password" checkbox appears below the field and toggles between `type="password"` and `type="text"`.

::doc-preview
<AgDSPasswordInput label="Password" required />
::

```vue
<script setup>
import { ref } from 'vue'
const password = ref('')
</script>

<template>
  <AgDSPasswordInput v-model="password" label="Password" required />
</template>
```

## Hint text

Use the `hint` prop to provide additional guidance beneath the label.

::doc-preview{label="With hint"}
<AgDSPasswordInput label="New password" hint="Must be at least 8 characters and include a number" required />
::

```vue
<template>
  <AgDSPasswordInput
    v-model="password"
    label="New password"
    hint="Must be at least 8 characters and include a number"
    required
  />
</template>
```

## Invalid state

Set `invalid` and `message` together to render the error treatment.

::doc-preview{label="Invalid"}
<AgDSPasswordInput label="Password" :invalid="true" message="Password must be at least 8 characters" required />
::

```vue
<template>
  <AgDSPasswordInput
    v-model="password"
    label="Password"
    :invalid="hasError"
    message="Password must be at least 8 characters"
    required
  />
</template>
```

## Disabled

::doc-preview{label="Disabled"}
<AgDSPasswordInput label="Password" disabled required />
::

```vue
<template>
  <AgDSPasswordInput v-model="password" label="Password" disabled required />
</template>
```

## Max width

Use `maxWidth` to constrain the field width.

::doc-preview{label="Max widths"}
<AgDSPasswordInput label="Medium (default)" max-width="md" required />
<AgDSPasswordInput label="Large" max-width="lg" required />
<AgDSPasswordInput label="Extra large" max-width="xl" required />
::

```vue
<template>
  <AgDSPasswordInput v-model="password" label="Password" max-width="lg" required />
</template>
```

## Block

Set `block` to stretch the input to the full width of its container.

::doc-preview{label="Block"}
<AgDSPasswordInput label="Password" block required />
::

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Visible label text |
| `modelValue` | `string` | `''` | Bound value — use with `v-model` |
| `id` | `string` | auto-generated | HTML `id` for the input |
| `hint` | `string` | — | Hint text shown beneath the label |
| `invalid` | `boolean` | `false` | Renders the invalid (error) visual treatment |
| `message` | `string` | — | Error message shown when `invalid` is `true` |
| `required` | `boolean` | `false` | Suppresses the "(optional)" label suffix |
| `hideOptionalLabel` | `boolean` | `false` | Always suppresses the "(optional)" label suffix |
| `disabled` | `boolean` | `false` | Disables the input and the show/hide checkbox |
| `block` | `boolean` | `false` | Stretches the input to fill its container |
| `maxWidth` | `'md' \| 'lg' \| 'xl'` | — | Constrains the input width |
| `name` | `string` | — | Native `name` attribute |
| `autoComplete` | `string` | — | Native `autocomplete` attribute (e.g. `'current-password'`) |
| `autoFocus` | `boolean` | `false` | Focuses the input on mount |
| `maxLength` | `number` | — | Maximum number of characters |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Emitted on every keystroke |
| `change` | `Event` | Native change event |
| `focus` | `FocusEvent` | Emitted when the input gains focus |
| `blur` | `FocusEvent` | Emitted when the input loses focus |

## Accessibility

- The input is associated with a visible `<label>` via `for`/`id` (WCAG 1.3.1)
- `invalid` sets `aria-invalid="true"` and links the error message via `aria-describedby` (WCAG 4.1.3)
- The "Show password" checkbox uses `aria-controls` pointing to the input `id` — screen readers announce the relationship
- When revealed, the input switches to `type="text"` so the value is read character by character instead of as dots
- Use `autoComplete="current-password"` or `autoComplete="new-password"` to assist password managers and autofill

## Changelog

### 0.1.0

- Initial release — `v-model`, `label`, `hint`, `invalid`, `message`, `required`, `disabled`, `block`, `maxWidth`, `maxLength`, `autoComplete`, show/hide toggle
