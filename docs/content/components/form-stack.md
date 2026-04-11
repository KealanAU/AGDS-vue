---
title: Form stack
description: A vertical flex container that applies a consistent gap between form controls. Use it to wrap a group of form fields.
category: Form
status: stable
---

## Usage

Wrap form controls in `AGDSFormStack` to apply a consistent vertical gap (`var(--agds-space-2)`) between each child.

::doc-preview
:form-stack-demo
::

```vue
<template>
  <AGDSFormStack>
    <AGDSTextInput label="First name" />
    <AGDSTextInput label="Last name" />
    <AGDSTextInput label="Email address" type="email" />
  </AGDSFormStack>
</template>
```

## Polymorphic element

Use the `as` prop to change the rendered HTML element. Render as a `<form>` when the stack is the form itself, or as a `<fieldset>` to group related controls.

```vue
<template>
  <AGDSFormStack as="form" @submit.prevent="handleSubmit">
    <AGDSTextInput label="Name" />
    <AGDSTextInput label="Email" type="email" />
    <AGDSButton type="submit">Submit</AGDSButton>
  </AGDSFormStack>
</template>
```

## Nesting

Nest `AGDSFormStack` components to create grouped sections within a larger form.

```vue
<template>
  <AGDSFormStack as="form" @submit.prevent="handleSubmit">
    <AGDSFormStack>
      <AGDSTextInput label="First name" />
      <AGDSTextInput label="Last name" />
    </AGDSFormStack>

    <AGDSFormStack>
      <AGDSTextInput label="Street address" />
      <AGDSTextInput label="City" />
    </AGDSFormStack>

    <AGDSButton type="submit">Submit</AGDSButton>
  </AGDSFormStack>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `string \| Component` | `'div'` | HTML element or Vue component to render as |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Form controls to stack vertically |

## Accessibility

- When using `as="fieldset"`, include a `<legend>` as the first child to give the group an accessible name
- `AGDSFormStack` applies no ARIA attributes itself — semantics are determined by the `as` element and the child controls
- The fixed gap ensures consistent vertical spacing which supports readability for users with low vision or cognitive disabilities

## Changelog

### 0.1.0

- Initial release — vertical flex column with `var(--agds-space-2)` gap; polymorphic `as` prop
