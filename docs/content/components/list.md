---
title: List
description: Semantic ordered and unordered list components with consistent spacing and support for nested lists.
category: Typography
status: stable
---

## Unordered list

Use `AGDSUnorderedList` with `AGDSListItem` to render a bulleted list.

::doc-preview
:list-demo
::

```vue
<template>
  <AGDSUnorderedList>
    <AGDSListItem>Australian citizen or permanent resident</AGDSListItem>
    <AGDSListItem>Aged 18 or over</AGDSListItem>
    <AGDSListItem>Not currently receiving another benefit</AGDSListItem>
  </AGDSUnorderedList>
</template>
```

## Ordered list

Use `AGDSOrderedList` for step-by-step or ranked content.

::doc-preview{label="Ordered"}
:list-demo{variant="ordered"}
::

```vue
<template>
  <AGDSOrderedList>
    <AGDSListItem>Create a myGov account</AGDSListItem>
    <AGDSListItem>Verify your identity online</AGDSListItem>
    <AGDSListItem>Link your government services</AGDSListItem>
  </AGDSOrderedList>
</template>
```

## Nested lists

Lists can be nested inside `AGDSListItem`. Nesting depth is tracked automatically via `provide`/`inject` and additional top margin is applied from the second level down.

::doc-preview{label="Nested"}
:list-demo{variant="nested"}
::

```vue
<template>
  <AGDSUnorderedList>
    <AGDSListItem>
      Required documents
      <AGDSUnorderedList>
        <AGDSListItem>Passport or birth certificate</AGDSListItem>
        <AGDSListItem>Proof of address</AGDSListItem>
      </AGDSUnorderedList>
    </AGDSListItem>
    <AGDSListItem>Application form</AGDSListItem>
  </AGDSUnorderedList>
</template>
```

## Props

`AGDSUnorderedList`, `AGDSOrderedList`, and `AGDSListItem` have no props. All content is passed via the default slot.

## Slots

| Slot | Description |
|------|-------------|
| `default` | List items (`AGDSListItem`) or nested lists |

## Accessibility

- Renders native `<ul>`, `<ol>`, and `<li>` elements — full screen reader support out of the box
- List markers are preserved (`list-style: unset` on items)

## Changelog

### 0.1.0

- Initial release — `AGDSUnorderedList`, `AGDSOrderedList`, `AGDSListItem`; automatic nested spacing
