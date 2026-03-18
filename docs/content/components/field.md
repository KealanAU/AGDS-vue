---
title: Field
description: The composition primitive for building labelled form controls. Renders a label, optional hint, and error message, then exposes the correct accessibility attributes (id, aria-required, aria-invalid, aria-describedby) to the slotted input via a scoped slot.
category: Forms
status: stable
---

`AGDSField` is a low-level building block. In most cases you should reach for a higher-level component — `AGDSTextInput`, `AGDSSelect`, `AGDSTextarea`, `AGDSCheckbox`, etc. — which already use `AGDSField` internally.

Use `AGDSField` directly only when composing a **custom input control** that is not covered by an existing component.

## Usage

Use the scoped slot to receive the accessibility props and bind them directly to your input element. The field renders the label, hint, and error message; the slot renders the actual control.

::doc-preview
<AGDSField label="Email address" hint="We will only use this to contact you about your application.">
  <template #default="slotProps">
    <input type="email" v-bind="slotProps" style="display:block;box-sizing:border-box;appearance:none;font-size:var(--agds-font-size-md);color:var(--agds-color-text);background-color:var(--agds-color-bg);padding:var(--agds-space-1) var(--agds-space-2);border:3px solid var(--agds-color-border);border-radius:4px;max-width:30ch;" />
  </template>
</AGDSField>
::

```vue
<template>
  <AGDSField label="Email address" hint="We will only use this to contact you.">
    <template #default="slotProps">
      <!-- spread slotProps onto your custom input to wire up a11y -->
      <input type="email" v-bind="slotProps" class="my-custom-input" />
    </template>
  </AGDSField>
</template>
```

## Required field

Set `required` to mark the field as required and remove the "(optional)" suffix from the label.

::doc-preview{label="Required"}
<AGDSField label="Full name" required>
  <template #default="slotProps">
    <input type="text" v-bind="slotProps" style="display:block;box-sizing:border-box;appearance:none;font-size:var(--agds-font-size-md);color:var(--agds-color-text);background-color:var(--agds-color-bg);padding:var(--agds-space-1) var(--agds-space-2);border:3px solid var(--agds-color-border);border-radius:4px;max-width:30ch;" />
  </template>
</AGDSField>
::

```vue
<template>
  <AGDSField label="Full name" required>
    <template #default="slotProps">
      <input type="text" v-bind="slotProps" class="my-custom-input" />
    </template>
  </AGDSField>
</template>
```

## Validation error

Set `invalid` and `message` to show the error state. The field container gains a red left border, and the error message is linked via `aria-describedby` so screen readers announce it.

::doc-preview{label="Invalid"}
<AGDSField label="Date of birth" invalid message="Enter a valid date of birth">
  <template #default="slotProps">
    <input type="text" v-bind="slotProps" style="display:block;box-sizing:border-box;appearance:none;font-size:var(--agds-font-size-md);color:var(--agds-color-text);background-color:var(--agds-color-error-muted);padding:var(--agds-space-1) var(--agds-space-2);border:3px solid var(--agds-color-error);border-radius:4px;max-width:30ch;" />
  </template>
</AGDSField>
::

```vue
<template>
  <AGDSField label="Date of birth" :invalid="hasError" :message="errorMessage">
    <template #default="slotProps">
      <input
        type="text"
        v-bind="slotProps"
        class="my-custom-input"
        :class="{ 'my-custom-input--invalid': hasError }"
      />
    </template>
  </AGDSField>
</template>
```

## Max width

Use `maxWidth` to constrain the field to a character-appropriate width. This sets the max-width on the field container, not the input itself — your input should fill 100% of the container width.

::doc-preview{label="Max widths"}
<AGDSField label="Postcode" max-width="xs" hint="xs — 10ch">
  <template #default="slotProps">
    <input type="text" inputmode="numeric" v-bind="slotProps" style="display:block;box-sizing:border-box;appearance:none;width:100%;font-size:var(--agds-font-size-md);color:var(--agds-color-text);background-color:var(--agds-color-bg);padding:var(--agds-space-1) var(--agds-space-2);border:3px solid var(--agds-color-border);border-radius:4px;" />
  </template>
</AGDSField>
::

```vue
<template>
  <!-- xs=10ch, sm=20ch, md=30ch, lg=40ch, xl=60ch -->
  <AGDSField label="Postcode" max-width="xs">
    <template #default="slotProps">
      <input type="text" inputmode="numeric" v-bind="slotProps" class="my-custom-input" />
    </template>
  </AGDSField>
</template>
```

## Sub-components

The following sub-components are exported individually for advanced composition when you need more control over layout:

- `AGDSFieldLabel` — label with optional/required suffix and `for` linking
- `AGDSFieldHint` — muted hint text
- `AGDSFieldMessage` — error message with icon and `role="alert"`
- `AGDSFieldContainer` — wrapper div that adds the invalid red left-border treatment

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Visible label text |
| `id` | `string` | auto | HTML id for the input. Auto-generated if omitted |
| `labelId` | `string` | — | `id` on the `<label>` element (for use with `aria-labelledby`) |
| `hint` | `string` | — | Hint text shown below the label |
| `invalid` | `boolean` | `false` | Renders the error state |
| `message` | `string` | — | Error message shown when `invalid` is true |
| `required` | `boolean` | `false` | Marks the field as required; suppresses "(optional)" suffix |
| `hideOptionalLabel` | `boolean` | `false` | Always suppress the "(optional)" suffix |
| `secondaryLabel` | `string` | — | Text prepended to the secondary label (before "(optional)") |
| `maxWidth` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | — | Constrains the max-width of the field (10–60ch) |

## Scoped slot props

The default slot receives these props to spread onto your input:

| Prop | Type | Description |
|------|------|-------------|
| `id` | `string` | Links the input to its label |
| `aria-required` | `boolean` | Reflects the `required` prop |
| `aria-invalid` | `boolean` | Reflects the `invalid` prop |
| `aria-describedby` | `string \| undefined` | References hint and/or error message ids |

## Accessibility

- The label's `for` attribute and the input's `id` are always linked via the scoped slot
- `aria-describedby` is set only when hint or error message elements are present
- The error message element uses `role="alert"` so it is announced immediately when it appears
- The invalid container adds a left red border — a non-colour indicator of the error state (WCAG 1.4.1)

## Changelog

### 0.1.0

- Initial release — label, hint, message, required/invalid state, maxWidth, scoped slot a11y props
