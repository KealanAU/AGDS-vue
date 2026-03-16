---
title: Select
description: A native select element wired to AgDSField. Supports flat options, grouped options, and a placeholder. The chevron icon is consistent across browsers.
category: Forms
status: stable
---

## Usage

Provide a `label`, an `options` array, and bind the value with `v-model`.

::doc-preview
<AgDSSelect label="Country" :options="[{ label: 'Australia', value: 'au' }, { label: 'New Zealand', value: 'nz' }, { label: 'United Kingdom', value: 'uk' }]" placeholder="Select a country" required />
::

```vue
<script setup>
import { ref } from 'vue'

const country = ref('')

const countryOptions = [
  { label: 'Australia', value: 'au' },
  { label: 'New Zealand', value: 'nz' },
  { label: 'United Kingdom', value: 'uk' },
]
</script>

<template>
  <AgDSSelect
    v-model="country"
    label="Country"
    :options="countryOptions"
    placeholder="Select a country"
    required
  />
</template>
```

## Hint text

::doc-preview{label="With hint"}
<AgDSSelect label="State or territory" hint="Select the state where you currently reside" :options="[{ label: 'Australian Capital Territory', value: 'act' }, { label: 'New South Wales', value: 'nsw' }, { label: 'Victoria', value: 'vic' }]" placeholder="Select a state" required />
::

```vue
<template>
  <AgDSSelect
    v-model="state"
    label="State or territory"
    hint="Select the state where you currently reside"
    :options="stateOptions"
    placeholder="Select a state"
    required
  />
</template>
```

## Grouped options

Pass `OptionGroup` items (objects with a nested `options` array) to render `<optgroup>` elements. Flat and grouped items can be mixed freely.

::doc-preview{label="Grouped options"}
<AgDSSelect label="Produce" :options="[{ label: 'Fruit', options: [{ label: 'Apple', value: 'apple' }, { label: 'Banana', value: 'banana' }] }, { label: 'Vegetables', options: [{ label: 'Carrot', value: 'carrot' }, { label: 'Broccoli', value: 'broccoli' }] }]" placeholder="Select a item" required />
::

```vue
<template>
  <AgDSSelect
    v-model="produce"
    label="Produce"
    :options="[
      {
        label: 'Fruit',
        options: [
          { label: 'Apple', value: 'apple' },
          { label: 'Banana', value: 'banana' },
        ],
      },
      {
        label: 'Vegetables',
        options: [
          { label: 'Carrot', value: 'carrot' },
          { label: 'Broccoli', value: 'broccoli' },
        ],
      },
    ]"
    placeholder="Select an item"
    required
  />
</template>
```

## Invalid state

::doc-preview{label="Invalid"}
<AgDSSelect label="Country" :options="[{ label: 'Australia', value: 'au' }]" placeholder="Select a country" :invalid="true" message="Select a country to continue" required />
::

```vue
<template>
  <AgDSSelect
    v-model="country"
    label="Country"
    :options="countryOptions"
    placeholder="Select a country"
    :invalid="hasError"
    message="Select a country to continue"
    required
  />
</template>
```

## Disabled

::doc-preview{label="Disabled"}
<AgDSSelect label="Country" :options="[{ label: 'Australia', value: 'au' }]" model-value="au" disabled required />
::

```vue
<template>
  <AgDSSelect
    v-model="country"
    label="Country"
    :options="countryOptions"
    disabled
    required
  />
</template>
```

## Max width

Use `maxWidth` to constrain the field width. Defaults to `md`.

::doc-preview{label="Max widths"}
<AgDSSelect label="Small" max-width="sm" :options="[{ label: 'Option 1', value: '1' }]" required />
<AgDSSelect label="Medium (default)" max-width="md" :options="[{ label: 'Option 1', value: '1' }]" required />
<AgDSSelect label="Large" max-width="lg" :options="[{ label: 'Option 1', value: '1' }]" required />
<AgDSSelect label="Extra large" max-width="xl" :options="[{ label: 'Option 1', value: '1' }]" required />
::

```vue
<template>
  <AgDSSelect
    v-model="value"
    label="State"
    :options="stateOptions"
    max-width="sm"
    required
  />
</template>
```

## Block

Set `block` to stretch the select to the full width of its container.

::doc-preview{label="Block"}
<AgDSSelect label="Country" :options="[{ label: 'Australia', value: 'au' }, { label: 'New Zealand', value: 'nz' }]" block required />
::

```vue
<template>
  <AgDSSelect v-model="country" label="Country" :options="countryOptions" block required />
</template>
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Visible label text for the field |
| `options` | `Options` | — | **Required.** Array of `Option` or `OptionGroup` items |
| `modelValue` | `string \| number` | — | Bound value — use with `v-model` |
| `id` | `string` | auto-generated | HTML `id` for the select element |
| `placeholder` | `string` | — | Renders a disabled `<option value="">` at the top of the list |
| `hint` | `string` | — | Hint text shown beneath the label |
| `invalid` | `boolean` | `false` | Renders the invalid (error) visual treatment |
| `message` | `string` | — | Error message shown when `invalid` is `true` |
| `required` | `boolean` | `false` | Suppresses the "(optional)" label suffix |
| `hideOptionalLabel` | `boolean` | `false` | Always suppresses the "(optional)" label suffix |
| `disabled` | `boolean` | `false` | Disables the select |
| `block` | `boolean` | `false` | Stretches the select to fill its container |
| `maxWidth` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Constrains the select width. Ignored when `block` is `true` |
| `name` | `string` | — | Native `name` attribute |
| `autoComplete` | `string` | — | Maps to native `autocomplete` |
| `autoFocus` | `boolean` | `false` | Focuses the select on mount |

## Types

```ts
type Option = { label: string; value: string; disabled?: boolean }
type OptionGroup = { label: string; disabled?: boolean; options: Option[] }
type Options = (Option | OptionGroup)[]
```

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Emitted on selection change. Guarded when `disabled`. |
| `change` | `Event` | Native `change` event |
| `focus` | `FocusEvent` | Emitted when the select gains focus |
| `blur` | `FocusEvent` | Emitted when the select loses focus |

## Accessibility

- The select is associated with a visible `<label>` via `for`/`id` — satisfies WCAG 1.3.1 and 4.1.2
- `required` sets `aria-required="true"` on the native select
- `invalid` sets `aria-invalid="true"` and links the error message via `aria-describedby` — satisfies WCAG 4.1.3
- `appearance: none` removes the browser's native chevron; a custom SVG chevron is positioned absolutely so the indicator is consistent across browsers while remaining purely decorative (`aria-hidden="true"`)
- The chevron fades to 30% opacity when disabled — state is not conveyed by colour alone (WCAG 1.4.1)
- Focus ring uses `--agds-color-focus` and `--agds-color-focus-width` tokens, visible on `:focus-visible` (WCAG 2.4.7)

## Changelog

### 0.1.0

- Initial release — field wrapper with label, hint, and error; flat and grouped options; `placeholder`, `maxWidth`, `block`, `disabled`, `invalid` props; `v-model` support
