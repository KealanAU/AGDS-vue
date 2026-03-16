---
title: Form stack
description: A vertical flex container that applies a consistent gap between form controls. Use it to wrap a group of form fields.
category: Form
status: stable
---

## Usage

Wrap form controls in `AgDSFormStack` to apply a consistent vertical gap (`var(--agds-space-2)`) between each child.

::doc-preview
<AgDSFormStack>
  <input type="text" placeholder="First name" />
  <input type="text" placeholder="Last name" />
  <input type="email" placeholder="Email address" />
</AgDSFormStack>
::

```vue
<template>
  <AgDSFormStack>
    <AgDSTextInput label="First name" />
    <AgDSTextInput label="Last name" />
    <AgDSTextInput label="Email address" type="email" />
  </AgDSFormStack>
</template>
```

## Polymorphic element

Use the `as` prop to change the rendered HTML element. Render as a `<form>` when the stack is the form itself, or as a `<fieldset>` to group related controls.

```vue
<template>
  <AgDSFormStack as="form" @submit.prevent="handleSubmit">
    <AgDSTextInput label="Name" />
    <AgDSTextInput label="Email" type="email" />
    <AgDSButton type="submit">Submit</AgDSButton>
  </AgDSFormStack>
</template>
```

## Nesting

Nest `AgDSFormStack` components to create grouped sections within a larger form.

```vue
<template>
  <AgDSFormStack as="form" @submit.prevent="handleSubmit">
    <AgDSFormStack>
      <AgDSTextInput label="First name" />
      <AgDSTextInput label="Last name" />
    </AgDSFormStack>

    <AgDSFormStack>
      <AgDSTextInput label="Street address" />
      <AgDSTextInput label="City" />
    </AgDSFormStack>

    <AgDSButton type="submit">Submit</AgDSButton>
  </AgDSFormStack>
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
- `AgDSFormStack` applies no ARIA attributes itself — semantics are determined by the `as` element and the child controls
- The fixed gap ensures consistent vertical spacing which supports readability for users with low vision or cognitive disabilities

## Changelog

### 0.1.0

- Initial release — vertical flex column with `var(--agds-space-2)` gap; polymorphic `as` prop
