---
title: Textarea
description: A multi-line text field wired to AGDSField. Shares the same field pattern as TextInput but renders a resizable textarea element.
category: Forms
status: stable
---

## Usage

Provide a `label` and bind the value with `v-model`.

::doc-preview
<AGDSTextarea label="Biography" required />
::

```vue
<script setup>
import { ref } from 'vue'

const bio = ref('')
</script>

<template>
  <AGDSTextarea v-model="bio" label="Biography" required />
</template>
```

## Hint text

Use the `hint` prop to provide additional guidance beneath the label.

::doc-preview{label="With hint"}
<AGDSTextarea label="Biography" hint="Max 500 characters" required />
::

```vue
<template>
  <AGDSTextarea
    v-model="bio"
    label="Biography"
    hint="Max 500 characters"
    required
  />
</template>
```

## Optional label

When `required` is `false` (the default), `"(optional)"` is appended to the label.

::doc-preview{label="Optional field"}
<AGDSTextarea label="Additional comments" />
::

```vue
<template>
  <AGDSTextarea v-model="comments" label="Additional comments" />
</template>
```

## Invalid state

Set `invalid` and `message` together to render the error treatment. The message is linked via `aria-describedby`.

::doc-preview{label="Invalid"}
<AGDSTextarea label="Notes" :invalid="true" message="Notes cannot be empty" required />
::

```vue
<template>
  <AGDSTextarea
    v-model="notes"
    label="Notes"
    :invalid="hasError"
    message="Notes cannot be empty"
    required
  />
</template>
```

## Disabled

::doc-preview{label="Disabled"}
<AGDSTextarea label="Biography" model-value="Some existing content" disabled required />
::

```vue
<template>
  <AGDSTextarea v-model="bio" label="Biography" disabled required />
</template>
```

## Rows

Use the `rows` prop to control the visible height. The textarea has a minimum height of `6rem` in CSS regardless of `rows`.

::doc-preview{label="Custom rows"}
<AGDSTextarea label="Description" :rows="8" required />
::

```vue
<template>
  <AGDSTextarea v-model="description" label="Description" :rows="8" required />
</template>
```

## Max width

Use `maxWidth` to constrain the field width. Accepts `md`, `lg`, or `xl` (narrower sizes are excluded as they are too narrow for comfortable multi-line text).

::doc-preview{label="Max widths"}
<AGDSTextarea label="Medium (default)" max-width="md" required />
<AGDSTextarea label="Large" max-width="lg" required />
<AGDSTextarea label="Extra large" max-width="xl" required />
::

```vue
<template>
  <AGDSTextarea v-model="value" label="Description" max-width="lg" required />
</template>
```

## Block

Set `block` to stretch the textarea to the full width of its container. Overrides `maxWidth`.

::doc-preview{label="Block"}
<AGDSTextarea label="Notes" block required />
::

```vue
<template>
  <AGDSTextarea v-model="notes" label="Notes" block required />
</template>
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Visible label text for the field |
| `modelValue` | `string` | `''` | Bound value — use with `v-model` |
| `id` | `string` | auto-generated | HTML `id` for the textarea |
| `rows` | `number` | — | Maps to the native `rows` attribute. A minimum height of `6rem` is applied in CSS. |
| `hint` | `string` | — | Hint text shown beneath the label |
| `invalid` | `boolean` | `false` | Renders the invalid (error) visual treatment |
| `message` | `string` | — | Error message shown when `invalid` is `true` |
| `required` | `boolean` | `false` | Suppresses the "(optional)" label suffix |
| `hideOptionalLabel` | `boolean` | `false` | Always suppresses the "(optional)" label suffix |
| `disabled` | `boolean` | `false` | Disables the textarea |
| `block` | `boolean` | `false` | Stretches the textarea to fill its container |
| `maxWidth` | `'md' \| 'lg' \| 'xl'` | `'md'` | Constrains the textarea width. Ignored when `block` is `true` |
| `placeholder` | `string` | — | Native `placeholder` attribute |
| `name` | `string` | — | Native `name` attribute |
| `autoFocus` | `boolean` | `false` | Focuses the textarea on mount |
| `inputMode` | `InputMode` | — | Virtual keyboard hint |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Emitted on every keystroke |
| `change` | `Event` | Native `change` event (fires on commit/blur) |
| `focus` | `FocusEvent` | Emitted when the textarea gains focus |
| `blur` | `FocusEvent` | Emitted when the textarea loses focus |

## Accessibility

- The textarea is associated with a visible `<label>` via `for`/`id` — satisfies WCAG 1.3.1 and 4.1.2
- `required` sets `aria-required="true"` on the native textarea
- `invalid` sets `aria-invalid="true"` and links the error message via `aria-describedby` — satisfies WCAG 4.1.3
- `disabled` uses `opacity: 0.5` and `cursor: not-allowed` — state is not conveyed by colour alone (WCAG 1.4.1)
- `resize: vertical` by default; `resize: none` when disabled to prevent interaction
- Focus ring uses `--agds-color-focus` and `--agds-color-focus-width` tokens, visible on `:focus-visible` (WCAG 2.4.7)
- `defineExpose({ focus })` is provided for programmatic focus management

## Changelog

### 0.1.0

- Initial release — field wrapper with label, hint, and error; `rows`, `maxWidth`, `block`, `disabled`, `invalid` props; `v-model` support
