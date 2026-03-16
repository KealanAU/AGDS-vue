---
title: Text Input
description: A single-line text field wired to AgDSField. Supports all common HTML input types, v-model binding, hint text, validation messages, and width constraints.
category: Forms
status: stable
---

## Usage

Provide a `label` and bind the value with `v-model`.

::doc-preview
<AgDSTextInput label="Full name" required />
::

```vue
<script setup>
import { ref } from 'vue'

const name = ref('')
</script>

<template>
  <AgDSTextInput v-model="name" label="Full name" required />
</template>
```

## Hint text

Use the `hint` prop to provide additional guidance beneath the label.

::doc-preview{label="With hint"}
<AgDSTextInput label="Email address" type="email" hint="We'll only use this to send your confirmation" required />
::

```vue
<template>
  <AgDSTextInput
    v-model="email"
    label="Email address"
    type="email"
    hint="We'll only use this to send your confirmation"
    required
  />
</template>
```

## Optional label

When `required` is `false` (the default), `"(optional)"` is appended to the label. Suppress it with `hideOptionalLabel`.

::doc-preview{label="Optional field"}
<AgDSTextInput label="Middle name" />
::

```vue
<template>
  <AgDSTextInput v-model="middle" label="Middle name" />
</template>
```

## Invalid state

Set `invalid` and `message` together to render the error treatment. The message is linked via `aria-describedby`.

::doc-preview{label="Invalid"}
<AgDSTextInput label="Email address" type="email" :invalid="true" message="Enter a valid email address" required />
::

```vue
<template>
  <AgDSTextInput
    v-model="email"
    label="Email address"
    type="email"
    :invalid="hasError"
    message="Enter a valid email address"
    required
  />
</template>
```

## Disabled

::doc-preview{label="Disabled"}
<AgDSTextInput label="Full name" model-value="Jane Smith" disabled required />
::

```vue
<template>
  <AgDSTextInput v-model="name" label="Full name" disabled required />
</template>
```

## Max width

Use `maxWidth` to constrain the field to a comfortable reading size. Defaults to `md`.

::doc-preview{label="Max widths"}
<AgDSTextInput label="Extra small" max-width="xs" required />
<AgDSTextInput label="Small" max-width="sm" required />
<AgDSTextInput label="Medium (default)" max-width="md" required />
<AgDSTextInput label="Large" max-width="lg" required />
<AgDSTextInput label="Extra large" max-width="xl" required />
::

```vue
<template>
  <AgDSTextInput v-model="value" label="Phone number" max-width="sm" required />
</template>
```

## Block

Set `block` to stretch the input to the full width of its container. Overrides `maxWidth`.

::doc-preview{label="Block"}
<AgDSTextInput label="Full name" block required />
::

```vue
<template>
  <AgDSTextInput v-model="name" label="Full name" block required />
</template>
```

## Input types

Pass any valid `<input>` type via the `type` prop.

::doc-preview{label="Input types"}
<AgDSTextInput label="Email" type="email" required />
<AgDSTextInput label="Phone number" type="tel" required />
<AgDSTextInput label="Website" type="url" required />
<AgDSTextInput label="Age" type="number" required />
::

```vue
<template>
  <AgDSTextInput v-model="email" label="Email" type="email" required />
  <AgDSTextInput v-model="phone" label="Phone number" type="tel" required />
</template>
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Visible label text for the field |
| `modelValue` | `string` | `''` | Bound value — use with `v-model` |
| `id` | `string` | auto-generated | HTML `id` for the input |
| `type` | `string` | `'text'` | Any valid `<input>` type: `'email'`, `'tel'`, `'url'`, `'number'`, `'password'`, etc. |
| `hint` | `string` | — | Hint text shown beneath the label |
| `invalid` | `boolean` | `false` | Renders the invalid (error) visual treatment |
| `message` | `string` | — | Error message shown when `invalid` is `true` |
| `required` | `boolean` | `false` | Suppresses the "(optional)" label suffix |
| `hideOptionalLabel` | `boolean` | `false` | Always suppresses the "(optional)" label suffix |
| `disabled` | `boolean` | `false` | Disables the input |
| `block` | `boolean` | `false` | Stretches the input to fill its container |
| `maxWidth` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Constrains the input width. Ignored when `block` is `true` |
| `placeholder` | `string` | — | Native `placeholder` attribute |
| `name` | `string` | — | Native `name` attribute |
| `autoComplete` | `string` | — | Maps to native `autocomplete` |
| `autoFocus` | `boolean` | `false` | Focuses the input on mount |
| `inputMode` | `InputMode` | — | Virtual keyboard hint (`'numeric'`, `'email'`, `'tel'`, etc.) |
| `maxLength` | `number` | — | Native `maxlength` attribute |
| `pattern` | `string` | — | Native `pattern` attribute |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Emitted on every keystroke |
| `change` | `Event` | Native `change` event (fires on commit/blur) |
| `focus` | `FocusEvent` | Emitted when the input gains focus |
| `blur` | `FocusEvent` | Emitted when the input loses focus |

## Accessibility

- The input is associated with a visible `<label>` via `for`/`id` — satisfies WCAG 1.3.1 and 4.1.2
- `required` sets `aria-required="true"` on the native input
- `invalid` sets `aria-invalid="true"` and links the error message via `aria-describedby` — satisfies WCAG 4.1.3
- `disabled` uses `opacity: 0.5` — state is not conveyed by colour alone (WCAG 1.4.1)
- Focus ring uses `--agds-color-focus` and `--agds-color-focus-width` tokens, visible on `:focus-visible` (WCAG 2.4.7)
- `defineExpose({ focus })` is provided for programmatic focus management

## Changelog

### 0.1.0

- Initial release — field wrapper with label, hint, and error; `type`, `maxWidth`, `block`, `disabled`, `invalid` props; `v-model` support
