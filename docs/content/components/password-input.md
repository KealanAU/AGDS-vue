---
title: Password Input
description: A password field with a show/hide toggle button. An eye icon button sits inside the input and toggles between obscured and visible text. Wraps AGDSField for standard label, hint, and error message layout.
category: Forms
status: stable
---

## Usage

Provide a `label` and bind the value with `v-model`. An eye icon button inside the field toggles between `type="password"` (obscured) and `type="text"` (visible). The button label changes from "Show password" to "Hide password" to communicate the current state to screen readers.

::doc-preview
:password-input-demo
::

```vue
<script setup>
import { ref } from 'vue'
const password = ref('')
</script>

<template>
  <AGDSPasswordInput v-model="password" label="Password" required />
</template>
```

## Hint text

Use the `hint` prop to provide additional guidance beneath the label.

::doc-preview{label="With hint"}
:password-input-demo{variant="with-hint"}
::

```vue
<template>
  <AGDSPasswordInput
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
:password-input-demo{variant="invalid"}
::

```vue
<template>
  <AGDSPasswordInput
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
:password-input-demo{variant="disabled"}
::

```vue
<template>
  <AGDSPasswordInput v-model="password" label="Password" disabled required />
</template>
```

## Max width

Use `maxWidth` to constrain the field width.

::doc-preview{label="Max widths"}
:password-input-demo{variant="max-widths"}
::

```vue
<template>
  <AGDSPasswordInput v-model="password" label="Password" max-width="lg" required />
</template>
```

## Block

Set `block` to stretch the input to the full width of its container.

::doc-preview{label="Block"}
:password-input-demo{variant="block"}
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
| `disabled` | `boolean` | `false` | Disables the input and the show/hide toggle button |
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
- The toggle button has `aria-controls` pointing to the input `id`, and `aria-pressed` reflecting the current visibility state — screen readers announce both the relationship and the pressed state
- The button `aria-label` switches between "Show password" and "Hide password" to communicate the action clearly
- The eye icon is `aria-hidden="true"` — the button's accessible name comes from `aria-label` alone
- When revealed, the input switches to `type="text"` so the value is read character by character instead of as dots
- Use `autoComplete="current-password"` or `autoComplete="new-password"` to assist password managers and autofill

## Changelog

### 0.2.0

- Replaced "Show password" checkbox with an icon button (eye/eye-off) inside the input field
- Toggle button uses `aria-pressed` and a dynamic `aria-label` ("Show password" / "Hide password")

### 0.1.0

- Initial release — `v-model`, `label`, `hint`, `invalid`, `message`, `required`, `disabled`, `block`, `maxWidth`, `maxLength`, `autoComplete`, show/hide toggle
