---
title: A11y
description: Hides content visually while keeping it accessible to screen readers. Also exports AGDSExternalLinkCallout, a pre-built callout for external links.
category: Utility
status: stable
---

## Usage

Wrap any text in `AGDSVisuallyHidden` to remove it from the visible layout while keeping it announced by assistive technologies.

```vue
<template>
  <AGDSButton>
    <AGDSVisuallyHidden>Delete item:</AGDSVisuallyHidden>
    Project proposal.pdf
  </AGDSButton>
</template>
```

## Supplementing icon buttons

When an icon button has no visible label, use `AGDSVisuallyHidden` to provide a text alternative for screen readers.

::doc-preview{label="Icon button with hidden label"}
<AGDSButton>
  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16"><path d="M2 8h12M8 2v12" stroke="currentColor" stroke-width="2"/></svg>
  <AGDSVisuallyHidden>Add item</AGDSVisuallyHidden>
</AGDSButton>
::

```vue
<template>
  <AGDSButton>
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16">
      <path d="M2 8h12M8 2v12" stroke="currentColor" stroke-width="2" />
    </svg>
    <AGDSVisuallyHidden>Add item</AGDSVisuallyHidden>
  </AGDSButton>
</template>
```

## Adding context to ambiguous links

Use `AGDSVisuallyHidden` to add unique context to links that share the same visible label.

```vue
<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
      <a :href="item.href">
        View
        <AGDSVisuallyHidden>{{ item.name }}</AGDSVisuallyHidden>
      </a>
    </li>
  </ul>
</template>
```

## Polymorphic element

Use the `as` prop to render a block-level element when the visually hidden content must not be inside an inline context.

```vue
<template>
  <AGDSVisuallyHidden as="h2">
    Section: Contact details
  </AGDSVisuallyHidden>
</template>
```

## AGDSExternalLinkCallout

`AGDSExternalLinkCallout` is a zero-configuration component that renders the visually hidden text ", opens in a new tab". Attach it to any link that opens in a new tab so screen reader users are informed without cluttering the visible interface.

::doc-preview{label="External link callout"}
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Agriculture Design System
  <AGDSExternalLinkCallout />
</a>
::

```vue
<template>
  <a href="https://example.com" target="_blank" rel="noopener noreferrer">
    Agriculture Design System
    <AGDSExternalLinkCallout />
  </a>
</template>
```

## Props — AGDSVisuallyHidden

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `string` | `'span'` | HTML element to render. Use a block element (e.g. `'div'`) when the content must not be inline |

## Props — AGDSExternalLinkCallout

`AGDSExternalLinkCallout` accepts no props. It always renders ", opens in a new tab" via `AGDSVisuallyHidden`.

## Slots

| Slot | Description |
|------|-------------|
| `default` | The text or content to hide visually but expose to screen readers |

`AGDSExternalLinkCallout` has no slots.

## Accessibility

- Uses the standard visually-hidden CSS technique: `position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap` — content is in the accessibility tree but invisible on screen
- **Do not use** `AGDSVisuallyHidden` to hide content that is also meaningless to screen reader users — use `aria-hidden="true"` or `display: none` for that
- **Do not use** `AGDSVisuallyHidden` as a replacement for visible labels on interactive controls — visible labels help all users, including those with cognitive disabilities
- `AGDSExternalLinkCallout` satisfies WCAG 2.1 Success Criterion 3.2.4 (Consistent Identification) by providing a consistent, screen-reader-only announcement for all external links

## Changelog

### 0.1.0

- Initial release — `AGDSVisuallyHidden` with `as` prop; `AGDSExternalLinkCallout` with pre-built external link text
