---
title: Toggle Button
description: A button that toggles between pressed and unpressed states, exposing aria-pressed. Supports flag and star icon variants, hidden labels, and all standard button sizes and variants.
category: Actions
status: stable
---

## Usage

Provide `label`, `pressed-label`, and bind the state with `v-model:pressed`.

::doc-preview
<AgDSToggleButton :pressed="false" label="Flag" pressed-label="Flagged" />
::

```vue
<script setup>
import { ref } from 'vue'
const flagged = ref(false)
</script>

<template>
  <AgDSToggleButton
    v-model:pressed="flagged"
    label="Flag"
    pressed-label="Flagged"
  />
</template>
```

## Pressed state

::doc-preview{label="Pressed"}
<AgDSToggleButton :pressed="true" label="Flag" pressed-label="Flagged" />
::

## Star icon

Use `icon-type="star"` to switch to a star icon pair.

::doc-preview{label="Star — unpressed and pressed"}
<AgDSToggleButton :pressed="false" label="Save" pressed-label="Saved" icon-type="star" />
<AgDSToggleButton :pressed="true" label="Save" pressed-label="Saved" icon-type="star" />
::

```vue
<template>
  <AgDSToggleButton
    v-model:pressed="saved"
    label="Save"
    pressed-label="Saved"
    icon-type="star"
  />
</template>
```

## Hidden label

Set `hidden-label` to show only the icon. The `label` and `pressed-label` are still announced by screen readers via `aria-label`.

::doc-preview{label="Icon only"}
<AgDSToggleButton :pressed="false" label="Flag" pressed-label="Flagged" hidden-label />
<AgDSToggleButton :pressed="true" label="Flag" pressed-label="Flagged" hidden-label />
<AgDSToggleButton :pressed="false" label="Save" pressed-label="Saved" icon-type="star" hidden-label />
<AgDSToggleButton :pressed="true" label="Save" pressed-label="Saved" icon-type="star" hidden-label />
::

```vue
<template>
  <AgDSToggleButton
    v-model:pressed="flagged"
    label="Flag"
    pressed-label="Flagged"
    hidden-label
  />
</template>
```

## Variant and size

Accepts the same `variant` and `size` props as `AgDSButton`. Defaults to `variant="text"`.

::doc-preview{label="Variants"}
<AgDSToggleButton :pressed="false" label="Flag" pressed-label="Flagged" variant="text" />
<AgDSToggleButton :pressed="false" label="Flag" pressed-label="Flagged" variant="tertiary" />
<AgDSToggleButton :pressed="false" label="Flag" pressed-label="Flagged" variant="secondary" />
::

```vue
<template>
  <AgDSToggleButton
    v-model:pressed="flagged"
    label="Flag"
    pressed-label="Flagged"
    variant="secondary"
    size="sm"
  />
</template>
```

## Disabled

::doc-preview{label="Disabled"}
<AgDSToggleButton :pressed="false" label="Flag" pressed-label="Flagged" disabled />
<AgDSToggleButton :pressed="true" label="Flag" pressed-label="Flagged" disabled />
::

```vue
<template>
  <AgDSToggleButton
    v-model:pressed="flagged"
    label="Flag"
    pressed-label="Flagged"
    disabled
  />
</template>
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `pressed` | `boolean` | — | **Required.** Current pressed state — use with `v-model:pressed` |
| `label` | `string` | — | **Required.** Label shown in the unpressed state |
| `pressedLabel` | `string` | — | **Required.** Label shown in the pressed state |
| `iconType` | `'flag' \| 'star'` | `'flag'` | Icon pair used for the unpressed and pressed states |
| `hiddenLabel` | `boolean` | `false` | Visually hides the label; still announced via `aria-label` |
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'text'` | `'text'` | Visual style — inherits from `AgDSButton` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size — inherits from `AgDSButton` |
| `disabled` | `boolean` | `false` | Disables the button |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:pressed` | `boolean` | Emitted when the button is clicked — use with `v-model:pressed` |

## Accessibility

- `aria-pressed` is set on the underlying `<button>` — screen readers announce the toggled state as "pressed" or "not pressed" (WCAG 4.1.2)
- When `hiddenLabel` is `true`, `aria-label` is set to `label` or `pressedLabel` depending on current state — the accessible name always reflects what the button will do next (WCAG 2.5.3)
- The icon is `aria-hidden="true"` — the visible or sr-only label carries the accessible name
- Built on `AgDSButton` — inherits all focus, keyboard, and disabled behaviour

## Changelog

### 0.1.0

- Initial release — `v-model:pressed`, `label`/`pressedLabel`, `iconType` (`flag`/`star`), `hiddenLabel`, `variant`, `size`, `disabled`
