---
title: Radio
description: A styled radio input with support for v-model, validation, and grouping. Can be used standalone or inside AGDSRadioGroup.
category: Forms
status: stable
---

## Usage

Use `v-model` on the group and a matching `value` on each radio to control selection.

```vue
<script setup>
import { ref } from 'vue'
const plan = ref('standard')
</script>

<template>
  <AGDSRadioGroup legend="Select a plan" name="plan">
    <AGDSRadio v-model="plan" value="basic">Basic</AGDSRadio>
    <AGDSRadio v-model="plan" value="standard">Standard</AGDSRadio>
    <AGDSRadio v-model="plan" value="premium">Premium</AGDSRadio>
  </AGDSRadioGroup>
</template>
```

## Standalone

A single radio can be used without a group when only one option is needed.

::doc-preview{label="Standalone"}
<AGDSRadio :model-value="'yes'" value="yes">Yes, I agree</AGDSRadio>
::

```vue
<template>
  <AGDSRadio v-model="agreed" value="yes">Yes, I agree</AGDSRadio>
</template>
```

## Group

Wrap related radios in `AGDSRadioGroup` to provide a shared `<fieldset>` + `<legend>`. The `name`, `disabled`, `required`, and `invalid` props cascade to all child radios via context.

::doc-preview{label="Group"}
<AGDSRadioGroup legend="Preferred contact method" name="contact">
  <AGDSRadio :model-value="'email'" value="email">Email</AGDSRadio>
  <AGDSRadio :model-value="'phone'" value="phone">Phone</AGDSRadio>
  <AGDSRadio :model-value="'post'" value="post">Post</AGDSRadio>
</AGDSRadioGroup>
::

```vue
<template>
  <AGDSRadioGroup legend="Preferred contact method" name="contact">
    <AGDSRadio v-model="contact" value="email">Email</AGDSRadio>
    <AGDSRadio v-model="contact" value="phone">Phone</AGDSRadio>
    <AGDSRadio v-model="contact" value="post">Post</AGDSRadio>
  </AGDSRadioGroup>
</template>
```

## Hint text

Use the `hint` slot to provide guidance beneath the legend.

::doc-preview{label="With hint"}
<AGDSRadioGroup legend="Notification frequency" name="frequency">
  <template #hint>How often would you like to receive updates?</template>
  <AGDSRadio :model-value="'daily'" value="daily">Daily</AGDSRadio>
  <AGDSRadio :model-value="'weekly'" value="weekly">Weekly</AGDSRadio>
  <AGDSRadio :model-value="'never'" value="never">Never</AGDSRadio>
</AGDSRadioGroup>
::

```vue
<template>
  <AGDSRadioGroup legend="Notification frequency" name="frequency">
    <template #hint>How often would you like to receive updates?</template>
    <AGDSRadio v-model="frequency" value="daily">Daily</AGDSRadio>
    <AGDSRadio v-model="frequency" value="weekly">Weekly</AGDSRadio>
    <AGDSRadio v-model="frequency" value="never">Never</AGDSRadio>
  </AGDSRadioGroup>
</template>
```

## Invalid state

Set `invalid` and the `message` slot on the group to show the error treatment. Each radio gets `aria-invalid` and `aria-describedby` automatically.

::doc-preview{label="Invalid"}
<AGDSRadioGroup legend="Select an option" name="option" :invalid="true" message-id="option-error">
  <template #message><span id="option-error">Please select an option to continue.</span></template>
  <AGDSRadio :model-value="''" value="a">Option A</AGDSRadio>
  <AGDSRadio :model-value="''" value="b">Option B</AGDSRadio>
</AGDSRadioGroup>
::

```vue
<template>
  <AGDSRadioGroup
    legend="Select an option"
    name="option"
    :invalid="hasError"
    message-id="option-error"
  >
    <template #message>
      <span id="option-error">Please select an option to continue.</span>
    </template>
    <AGDSRadio v-model="selected" value="a">Option A</AGDSRadio>
    <AGDSRadio v-model="selected" value="b">Option B</AGDSRadio>
  </AGDSRadioGroup>
</template>
```

## Disabled

Disable the entire group or individual radios.

::doc-preview{label="Disabled group"}
<AGDSRadioGroup legend="Status" name="status" disabled>
  <AGDSRadio :model-value="'active'" value="active">Active</AGDSRadio>
  <AGDSRadio :model-value="'active'" value="inactive">Inactive</AGDSRadio>
</AGDSRadioGroup>
::

## Size

::doc-preview{label="Sizes"}
<AGDSRadioGroup legend="Small" name="size-sm">
  <AGDSRadio size="sm" :model-value="'a'" value="a">Option A</AGDSRadio>
  <AGDSRadio size="sm" :model-value="'a'" value="b">Option B</AGDSRadio>
</AGDSRadioGroup>
<AGDSRadioGroup legend="Medium (default)" name="size-md">
  <AGDSRadio size="md" :model-value="'a'" value="a">Option A</AGDSRadio>
  <AGDSRadio size="md" :model-value="'a'" value="b">Option B</AGDSRadio>
</AGDSRadioGroup>
::

---

## Props — AGDSRadio

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string \| number \| boolean` | — | Currently selected value — use with `v-model` |
| `value` | `string \| number \| boolean` | — | The value this radio represents |
| `id` | `string` | auto-generated | HTML `id` for the input |
| `name` | `string` | — | `name` attribute (inherited from group if not set) |
| `disabled` | `boolean` | `false` | Disables the input (inherited from group if not set) |
| `invalid` | `boolean` | `false` | Shows an error state (inherited from group if not set) |
| `required` | `boolean` | `false` | Marks the input as required (inherited from group if not set) |
| `size` | `'sm' \| 'md'` | `'md'` | Size of the control |

## Events — AGDSRadio

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string \| number \| boolean` | Emitted when this radio is selected |
| `change` | `Event` | Native change event |
| `focus` | `FocusEvent` | Emitted when the input gains focus |
| `blur` | `FocusEvent` | Emitted when the input loses focus |

---

## Props — AGDSRadioGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `legend` | `string` | — | Accessible label for the group — shown as the `<fieldset>` legend |
| `name` | `string` | — | Shared `name` attribute applied to every child radio |
| `disabled` | `boolean` | `false` | Disables all radios in the group |
| `invalid` | `boolean` | `false` | Marks all radios invalid and shows the `message` slot |
| `required` | `boolean` | `false` | Marks all radios as required; adds a `*` to the legend |
| `messageId` | `string` | — | `id` of the error message element — used for `aria-describedby` on each radio |

## Slots — AGDSRadioGroup

| Slot | Description |
|------|-------------|
| `legend` | Custom legend content (overrides the `legend` prop) |
| `hint` | Hint text displayed below the legend |
| `message` | Error message shown when `invalid` is `true` |
| `default` | The radio inputs |

## Keyboard interaction

| Key | Behaviour |
|-----|-----------|
| `Tab` | Moves focus into the radio group |
| `ArrowDown` / `ArrowRight` | Selects the next radio in the group |
| `ArrowUp` / `ArrowLeft` | Selects the previous radio in the group |

## Accessibility

- Uses native `<input type="radio">` — no custom ARIA roles needed
- `AGDSRadioGroup` uses `<fieldset>` + `<legend>` to group related controls (WCAG 1.3.1)
- `invalid` sets `aria-invalid="true"` on each radio; `messageId` links the error message via `aria-describedby` (WCAG 4.1.3)
- `required` adds `aria-required="true"` and the visual `*` indicator to the legend
- Focus ring appears on the visual indicator when the hidden input receives keyboard focus (WCAG 2.4.7)
- Arrow-key navigation between radios follows the native browser radio group behaviour

## Changelog

### 0.1.0

- Initial release — `AGDSRadio` (modelValue, value, disabled, invalid, required, size), `AGDSRadioGroup` (legend, name, disabled, invalid, required, messageId, hint/message/legend slots)
