---
title: Checkbox
description: A styled checkbox input with support for v-model, indeterminate state, validation, and grouping. Can be used standalone or inside AGDSCheckboxGroup.
category: Forms
status: stable
---

## Usage

Use `v-model` to bind the checked state. The label text is passed via the default slot.

```vue
<script setup>
import { ref } from 'vue'
const agreed = ref(false)
</script>

<template>
  <AGDSCheckbox v-model="agreed">
    I agree to the terms and conditions
  </AGDSCheckbox>
</template>
```

## Disabled

```vue
<template>
  <AGDSCheckbox :model-value="true" disabled>
    Subscribed (cannot be changed)
  </AGDSCheckbox>
</template>
```

## Indeterminate

The `indeterminate` prop renders the "mixed" visual state — useful for a "select all" parent checkbox when only some children are checked.

```vue
<script setup>
import { ref, computed } from 'vue'

const items = ref([false, true, false])

const allChecked = computed(() => items.value.every(Boolean))
const someChecked = computed(() => items.value.some(Boolean))
const isIndeterminate = computed(() => someChecked.value && !allChecked.value)

function toggleAll() {
  const next = !allChecked.value
  items.value = items.value.map(() => next)
}
</script>

<template>
  <AGDSCheckbox
    :model-value="allChecked"
    :indeterminate="isIndeterminate"
    @update:model-value="toggleAll"
  >
    Select all
  </AGDSCheckbox>
</template>
```

## Size

```vue
<template>
  <AGDSCheckbox size="sm">Small checkbox</AGDSCheckbox>
  <AGDSCheckbox size="md">Medium checkbox (default)</AGDSCheckbox>
</template>
```

## Group

Use `AGDSCheckboxGroup` to wrap related checkboxes with a shared legend, hint, and error message. Props like `name`, `invalid`, `required`, and `disabled` cascade to all child checkboxes via context.

```vue
<script setup>
import { ref } from 'vue'

const selected = ref({
  finance: false,
  health: false,
  education: false,
})
</script>

<template>
  <AGDSCheckboxGroup legend="Select topics" name="topics">
    <AGDSCheckbox v-model="selected.finance" value="finance">Finance</AGDSCheckbox>
    <AGDSCheckbox v-model="selected.health" value="health">Health</AGDSCheckbox>
    <AGDSCheckbox v-model="selected.education" value="education">Education</AGDSCheckbox>
  </AGDSCheckboxGroup>
</template>
```

## Validation

Set `invalid` on the group to show an error state on all checkboxes and reveal the `message` slot.

```vue
<template>
  <AGDSCheckboxGroup
    legend="Select at least one topic"
    name="topics"
    :invalid="true"
    message-id="topics-error"
  >
    <template #message>
      <span id="topics-error">Please select at least one topic.</span>
    </template>
    <AGDSCheckbox>Finance</AGDSCheckbox>
    <AGDSCheckbox>Health</AGDSCheckbox>
  </AGDSCheckboxGroup>
</template>
```

## Props — AGDSCheckbox

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | Checked state — use with `v-model` |
| `id` | `string` | auto-generated | HTML `id` on the input; also used for the label `for` attribute |
| `name` | `string` | — | `name` attribute on the input (inherited from group if not set) |
| `value` | `string \| number \| boolean` | — | Value submitted with the form |
| `disabled` | `boolean` | `false` | Disables the input |
| `indeterminate` | `boolean` | `false` | Shows the mixed (−) visual state and sets `aria-checked="mixed"` |
| `invalid` | `boolean` | `false` | Shows an error state (inherited from group if not set) |
| `required` | `boolean` | `false` | Marks the input as required (inherited from group if not set) |
| `size` | `'sm' \| 'md'` | `'md'` | Size of the control |

## Events — AGDSCheckbox

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `boolean` | Emitted when the checked state changes |
| `change` | `Event` | Emitted on the native change event |
| `focus` | `FocusEvent` | Emitted when the input gains focus |
| `blur` | `FocusEvent` | Emitted when the input loses focus |

## Props — AGDSCheckboxGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `legend` | `string` | — | Accessible label for the group — shown as the `<fieldset>` legend |
| `name` | `string` | — | Shared `name` attribute applied to every child checkbox |
| `disabled` | `boolean` | `false` | Disables all checkboxes in the group |
| `invalid` | `boolean` | `false` | Marks all checkboxes invalid and shows the `message` slot |
| `required` | `boolean` | `false` | Marks all checkboxes as required |
| `messageId` | `string` | — | `id` of the error message element — passed as `aria-describedby` on each checkbox when invalid |

## Slots — AGDSCheckboxGroup

| Slot | Description |
|------|-------------|
| `legend` | Custom legend content (overrides the `legend` prop) |
| `hint` | Hint text displayed below the legend |
| `message` | Error message displayed when `invalid` is `true` |
| `default` | The checkbox inputs |

## Accessibility

- The hidden native `<input type="checkbox">` carries all semantics — no custom ARIA roles needed
- `indeterminate` sets `aria-checked="mixed"` as required by WCAG 4.1.2
- `invalid` sets `aria-invalid="true"` on the input
- `AGDSCheckboxGroup` uses `<fieldset>` + `<legend>` to group related controls (WCAG 1.3.1)
- When `invalid`, each checkbox's `aria-describedby` points to the `messageId` element so the error is announced in context
- Focus ring is shown on the visual indicator box when the hidden input receives keyboard focus

## Changelog

### 0.1.0

- Initial release — `AGDSCheckbox` (modelValue, disabled, indeterminate, invalid, required, size), `AGDSCheckboxGroup` (legend, name, disabled, invalid, required, messageId, hint/message slots)
