---
title: List
description: Semantic ordered and unordered list components with consistent spacing and support for nested lists.
category: Typography
status: stable
---

## Unordered list

Use `AgDSUnorderedList` with `AgDSListItem` to render a bulleted list.

::doc-preview
<AgDSUnorderedList>
  <AgDSListItem>Australian citizen or permanent resident</AgDSListItem>
  <AgDSListItem>Aged 18 or over</AgDSListItem>
  <AgDSListItem>Not currently receiving another benefit</AgDSListItem>
</AgDSUnorderedList>
::

```vue
<template>
  <AgDSUnorderedList>
    <AgDSListItem>Australian citizen or permanent resident</AgDSListItem>
    <AgDSListItem>Aged 18 or over</AgDSListItem>
    <AgDSListItem>Not currently receiving another benefit</AgDSListItem>
  </AgDSUnorderedList>
</template>
```

## Ordered list

Use `AgDSOrderedList` for step-by-step or ranked content.

::doc-preview
<AgDSOrderedList>
  <AgDSListItem>Create a myGov account</AgDSListItem>
  <AgDSListItem>Verify your identity online</AgDSListItem>
  <AgDSListItem>Link your government services</AgDSListItem>
</AgDSOrderedList>
::

```vue
<template>
  <AgDSOrderedList>
    <AgDSListItem>Create a myGov account</AgDSListItem>
    <AgDSListItem>Verify your identity online</AgDSListItem>
    <AgDSListItem>Link your government services</AgDSListItem>
  </AgDSOrderedList>
</template>
```

## Nested lists

Lists can be nested inside `AgDSListItem`. Nesting depth is tracked automatically via `provide`/`inject` and additional top margin is applied from the second level down.

::doc-preview{label="Nested"}
<AgDSUnorderedList>
  <AgDSListItem>
    Required documents
    <AgDSUnorderedList>
      <AgDSListItem>Passport or birth certificate</AgDSListItem>
      <AgDSListItem>Proof of address</AgDSListItem>
    </AgDSUnorderedList>
  </AgDSListItem>
  <AgDSListItem>Application form</AgDSListItem>
</AgDSUnorderedList>
::

```vue
<template>
  <AgDSUnorderedList>
    <AgDSListItem>
      Required documents
      <AgDSUnorderedList>
        <AgDSListItem>Passport or birth certificate</AgDSListItem>
        <AgDSListItem>Proof of address</AgDSListItem>
      </AgDSUnorderedList>
    </AgDSListItem>
    <AgDSListItem>Application form</AgDSListItem>
  </AgDSUnorderedList>
</template>
```

## Props

`AgDSUnorderedList`, `AgDSOrderedList`, and `AgDSListItem` have no props. All content is passed via the default slot.

## Slots

| Slot | Description |
|------|-------------|
| `default` | List items (`AgDSListItem`) or nested lists |

## Accessibility

- Renders native `<ul>`, `<ol>`, and `<li>` elements — full screen reader support out of the box
- List markers are preserved (`list-style: unset` on items)

## Changelog

### 0.1.0

- Initial release — `AgDSUnorderedList`, `AgDSOrderedList`, `AgDSListItem`; automatic nested spacing
