---
title: Switch
description: A toggle control for binary on/off settings. Renders as a styled checkbox with role="switch" semantics, a sliding thumb, and v-model support.
category: Forms
status: stable
---

## Usage

Use `v-model` to bind the on/off state. Pass the visible label via the default slot.

::doc-preview
<AgDSSwitch>Enable notifications</AgDSSwitch>
::

```vue
<script setup>
import { ref } from 'vue'
const enabled = ref(false)
</script>

<template>
  <AgDSSwitch v-model="enabled">Enable notifications</AgDSSwitch>
</template>
```

## Checked state

::doc-preview{label="Checked"}
<AgDSSwitch :model-value="true">Dark mode</AgDSSwitch>
::

## Disabled

::doc-preview{label="Disabled states"}
<AgDSSwitch disabled>Disabled off</AgDSSwitch>
<AgDSSwitch :model-value="true" disabled>Disabled on</AgDSSwitch>
::

```vue
<template>
  <AgDSSwitch v-model="enabled" disabled>Feature flag</AgDSSwitch>
</template>
```

## Invalid

Use `invalid` to indicate a validation error — for example, when a required setting has not been acknowledged.

::doc-preview{label="Invalid"}
<AgDSSwitch :invalid="true">I accept the terms and conditions</AgDSSwitch>
::

```vue
<template>
  <AgDSSwitch v-model="accepted" :invalid="!accepted">
    I accept the terms and conditions
  </AgDSSwitch>
</template>
```

## Size

::doc-preview{label="Sizes"}
<AgDSSwitch size="sm">Small</AgDSSwitch>
<AgDSSwitch size="md">Medium (default)</AgDSSwitch>
::

```vue
<template>
  <AgDSSwitch v-model="enabled" size="sm">Compact setting</AgDSSwitch>
</template>
```

## Without a label

When the context makes the purpose clear, the label slot can be omitted. Always ensure an accessible name is still present via `aria-label` on the component or an associated label elsewhere.

```vue
<template>
  <AgDSSwitch v-model="enabled" aria-label="Enable dark mode" />
</template>
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | Checked (on) state — use with `v-model` |
| `id` | `string` | auto-generated | HTML `id` for the input |
| `name` | `string` | — | Native `name` attribute |
| `disabled` | `boolean` | `false` | Disables the input |
| `invalid` | `boolean` | `false` | Marks the input as invalid |
| `required` | `boolean` | `false` | Marks the input as required |
| `size` | `'sm' \| 'md'` | `'md'` | Size of the control |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `boolean` | Emitted when the switch is toggled |
| `change` | `Event` | Native change event |
| `focus` | `FocusEvent` | Emitted when the input gains focus |
| `blur` | `FocusEvent` | Emitted when the input loses focus |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Visible label text rendered beside the track |

## Keyboard interaction

| Key | Behaviour |
|-----|-----------|
| `Tab` | Moves focus to the switch |
| `Space` | Toggles the switch on or off |

## Accessibility

- Renders a native `<input type="checkbox" role="switch">` — the `role="switch"` attribute overrides the default "checkbox" semantics with "switch" (on/off) semantics (WCAG 4.1.2)
- `aria-checked` is implied by the native `:checked` state — no manual attribute needed
- The visual track and thumb are `aria-hidden="true"` — the hidden input carries all semantics
- Focus ring appears on the visual track when the hidden input receives keyboard focus, using `--agds-color-focus` tokens (WCAG 2.4.7)
- `disabled` renders `opacity: 0.5` on the track — state is not conveyed by colour alone (WCAG 1.4.1)
- `invalid` changes the track border to `--agds-color-error` — always pair with a visible error message nearby
- Windows High Contrast mode is supported via `forced-colors` media query

## Changelog

### 0.1.0

- Initial release — `v-model`, `disabled`, `invalid`, `required`, `size` (`sm`/`md`), `name`, `id` props; default label slot
