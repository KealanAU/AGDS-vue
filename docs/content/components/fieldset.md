---
title: Fieldset
description: A semantic fieldset wrapper that groups related form controls under a shared legend and optional hint. Manages accessible id generation and aria-describedby automatically.
category: Forms
status: stable
---

## Usage

Provide a `legend` to describe the group of controls. All child controls are slotted inside the content area.

::doc-preview
<AgDSFieldset legend="Delivery address">
  <AgDSTextInput label="Street address" />
  <AgDSTextInput label="City" />
  <AgDSSelect label="State" :options="[{ label: 'NSW', value: 'nsw' }, { label: 'VIC', value: 'vic' }, { label: 'QLD', value: 'qld' }]" />
</AgDSFieldset>
::

```vue
<template>
  <AgDSFieldset legend="Delivery address">
    <AgDSTextInput label="Street address" />
    <AgDSTextInput label="City" />
    <AgDSSelect label="State" :options="stateOptions" />
  </AgDSFieldset>
</template>
```

## With hint

Use `hint` to add supplementary text below the legend. The hint id is wired into `aria-describedby` on the `<fieldset>` automatically.

::doc-preview{label="With hint"}
<AgDSFieldset legend="Contact details" hint="We will use these details to send your confirmation.">
  <AgDSTextInput label="Email address" type="email" />
  <AgDSTextInput label="Phone number" type="tel" />
</AgDSFieldset>
::

```vue
<template>
  <AgDSFieldset
    legend="Contact details"
    hint="We will use these details to send your confirmation."
  >
    <AgDSTextInput label="Email address" type="email" />
    <AgDSTextInput label="Phone number" type="tel" />
  </AgDSFieldset>
</template>
```

## Custom id

Pass `id` to control the fieldset's id. The hint id is always derived from the auto-generated instance uid, not from the `id` prop, so `aria-describedby` stays stable.

```vue
<template>
  <AgDSFieldset id="address-section" legend="Postal address">
    <AgDSTextInput label="Street" />
    <AgDSTextInput label="Suburb" />
  </AgDSFieldset>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `legend` | `string` | — | **Required.** Describes the purpose of the group of fields |
| `hint` | `string` | — | Hint text shown below the legend; its id is added to `aria-describedby` on the fieldset |
| `id` | `string` | auto | Explicit id for the `<fieldset>` element. Auto-generated if omitted |

## Slots

| Slot | Description |
|------|-------------|
| `default` | The form controls that belong to this group |

## Accessibility

- Renders a native `<fieldset>` with a `<legend>` — the correct semantic pattern for groups of related controls (WCAG 1.3.1)
- `aria-describedby` is set on the fieldset only when a `hint` is provided
- The `<fieldset>` is **not** set to `display: flex` — setting flex on a fieldset causes inconsistent behaviour across browsers, so child spacing uses margins instead
- Group related checkboxes or radio buttons inside a fieldset so assistive technologies announce the group name before each option

## Changelog

### 0.1.0

- Initial release — legend, hint with aria-describedby, auto-generated ids, no flex on fieldset
