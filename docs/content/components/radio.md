---
title: Radio
description: A styled radio input with support for v-model, validation, and grouping. Can be used standalone or inside AgDSRadioGroup.
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
  <AgDSRadioGroup legend="Select a plan" name="plan">
    <AgDSRadio v-model="plan" value="basic">Basic</AgDSRadio>
    <AgDSRadio v-model="plan" value="standard">Standard</AgDSRadio>
    <AgDSRadio v-model="plan" value="premium">Premium</AgDSRadio>
  </AgDSRadioGroup>
</template>
```

## Standalone

A single radio can be used without a group when only one option is needed.

::doc-preview{label="Standalone"}
<AgDSRadio :model-value="'yes'" value="yes">Yes, I agree</AgDSRadio>
::

```vue
<template>
  <AgDSRadio v-model="agreed" value="yes">Yes, I agree</AgDSRadio>
</template>
```

## Group

Wrap related radios in `AgDSRadioGroup` to provide a shared `<fieldset>` + `<legend>`. The `name`, `disabled`, `required`, and `invalid` props cascade to all child radios via context.

::doc-preview{label="Group"}
<AgDSRadioGroup legend="Preferred contact method" name="contact">
  <AgDSRadio :model-value="'email'" value="email">Email</AgDSRadio>
  <AgDSRadio :model-value="'phone'" value="phone">Phone</AgDSRadio>
  <AgDSRadio :model-value="'post'" value="post">Post</AgDSRadio>
</AgDSRadioGroup>
::

```vue
<template>
  <AgDSRadioGroup legend="Preferred contact method" name="contact">
    <AgDSRadio v-model="contact" value="email">Email</AgDSRadio>
    <AgDSRadio v-model="contact" value="phone">Phone</AgDSRadio>
    <AgDSRadio v-model="contact" value="post">Post</AgDSRadio>
  </AgDSRadioGroup>
</template>
```

## Hint text

Use the `hint` slot to provide guidance beneath the legend.

::doc-preview{label="With hint"}
<AgDSRadioGroup legend="Notification frequency" name="frequency">
  <template #hint>How often would you like to receive updates?</template>
  <AgDSRadio :model-value="'daily'" value="daily">Daily</AgDSRadio>
  <AgDSRadio :model-value="'weekly'" value="weekly">Weekly</AgDSRadio>
  <AgDSRadio :model-value="'never'" value="never">Never</AgDSRadio>
</AgDSRadioGroup>
::

```vue
<template>
  <AgDSRadioGroup legend="Notification frequency" name="frequency">
    <template #hint>How often would you like to receive updates?</template>
    <AgDSRadio v-model="frequency" value="daily">Daily</AgDSRadio>
    <AgDSRadio v-model="frequency" value="weekly">Weekly</AgDSRadio>
    <AgDSRadio v-model="frequency" value="never">Never</AgDSRadio>
  </AgDSRadioGroup>
</template>
```

## Invalid state

Set `invalid` and the `message` slot on the group to show the error treatment. Each radio gets `aria-invalid` and `aria-describedby` automatically.

::doc-preview{label="Invalid"}
<AgDSRadioGroup legend="Select an option" name="option" :invalid="true" message-id="option-error">
  <template #message><span id="option-error">Please select an option to continue.</span></template>
  <AgDSRadio :model-value="''" value="a">Option A</AgDSRadio>
  <AgDSRadio :model-value="''" value="b">Option B</AgDSRadio>
</AgDSRadioGroup>
::

```vue
<template>
  <AgDSRadioGroup
    legend="Select an option"
    name="option"
    :invalid="hasError"
    message-id="option-error"
  >
    <template #message>
      <span id="option-error">Please select an option to continue.</span>
    </template>
    <AgDSRadio v-model="selected" value="a">Option A</AgDSRadio>
    <AgDSRadio v-model="selected" value="b">Option B</AgDSRadio>
  </AgDSRadioGroup>
</template>
```

## Disabled

Disable the entire group or individual radios.

::doc-preview{label="Disabled group"}
<AgDSRadioGroup legend="Status" name="status" disabled>
  <AgDSRadio :model-value="'active'" value="active">Active</AgDSRadio>
  <AgDSRadio :model-value="'active'" value="inactive">Inactive</AgDSRadio>
</AgDSRadioGroup>
::

## Size

::doc-preview{label="Sizes"}
<AgDSRadioGroup legend="Small" name="size-sm">
  <AgDSRadio size="sm" :model-value="'a'" value="a">Option A</AgDSRadio>
  <AgDSRadio size="sm" :model-value="'a'" value="b">Option B</AgDSRadio>
</AgDSRadioGroup>
<AgDSRadioGroup legend="Medium (default)" name="size-md">
  <AgDSRadio size="md" :model-value="'a'" value="a">Option A</AgDSRadio>
  <AgDSRadio size="md" :model-value="'a'" value="b">Option B</AgDSRadio>
</AgDSRadioGroup>
::

---

## Props — AgDSRadio

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

## Events — AgDSRadio

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string \| number \| boolean` | Emitted when this radio is selected |
| `change` | `Event` | Native change event |
| `focus` | `FocusEvent` | Emitted when the input gains focus |
| `blur` | `FocusEvent` | Emitted when the input loses focus |

---

## Props — AgDSRadioGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `legend` | `string` | — | Accessible label for the group — shown as the `<fieldset>` legend |
| `name` | `string` | — | Shared `name` attribute applied to every child radio |
| `disabled` | `boolean` | `false` | Disables all radios in the group |
| `invalid` | `boolean` | `false` | Marks all radios invalid and shows the `message` slot |
| `required` | `boolean` | `false` | Marks all radios as required; adds a `*` to the legend |
| `messageId` | `string` | — | `id` of the error message element — used for `aria-describedby` on each radio |

## Slots — AgDSRadioGroup

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
- `AgDSRadioGroup` uses `<fieldset>` + `<legend>` to group related controls (WCAG 1.3.1)
- `invalid` sets `aria-invalid="true"` on each radio; `messageId` links the error message via `aria-describedby` (WCAG 4.1.3)
- `required` adds `aria-required="true"` and the visual `*` indicator to the legend
- Focus ring appears on the visual indicator when the hidden input receives keyboard focus (WCAG 2.4.7)
- Arrow-key navigation between radios follows the native browser radio group behaviour

## Changelog

### 0.1.0

- Initial release — `AgDSRadio` (modelValue, value, disabled, invalid, required, size), `AgDSRadioGroup` (legend, name, disabled, invalid, required, messageId, hint/message/legend slots)
