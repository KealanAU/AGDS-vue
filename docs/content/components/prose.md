---
title: Prose
description: A typography wrapper that applies consistent AGDS styles to arbitrary HTML content — headings, paragraphs, lists, tables, code blocks, blockquotes, and more. Use when rendering unmanaged markup such as CMS content or Markdown output.
category: Layout
status: stable
---

## Usage

Wrap any raw HTML content in `AgDSProse` to apply the AGDS typography system automatically.

::doc-preview
<AgDSProse>
  <h2>Section heading</h2>
  <p>This paragraph is inside a prose container. Links, <strong>bold text</strong>, and <em>italics</em> are all styled automatically.</p>
  <ul>
    <li>Bullet one</li>
    <li>Bullet two</li>
  </ul>
</AgDSProse>
::

```vue
<template>
  <AgDSProse>
    <h2>Section heading</h2>
    <p>Paragraph text with <a href="#">a link</a> and <strong>bold</strong>.</p>
    <ul>
      <li>Item one</li>
      <li>Item two</li>
    </ul>
  </AgDSProse>
</template>
```

## Rendering CMS content

Pass raw HTML from a CMS or Markdown parser using Vue's `v-html` directive.

```vue
<template>
  <AgDSProse v-html="article.bodyHtml" />
</template>
```

## Changing the root element

Use the `as` prop to change the rendered container element. Useful when you need the prose container to be a `<article>` or `<section>` landmark.

```vue
<template>
  <AgDSProse as="article">
    <h1>Article title</h1>
    <p>Article body…</p>
  </AgDSProse>
</template>
```

## Opting out of prose styles

Add `agds-prose-unset` to any child container to prevent prose styles from applying to its subtree. Useful when embedding a managed component inside CMS content.

```vue
<template>
  <AgDSProse>
    <p>Normal prose paragraph.</p>
    <div class="agds-prose-unset">
      <!-- This subtree is not affected by prose typography rules -->
      <AgDSButton>Submit</AgDSButton>
    </div>
  </AgDSProse>
</template>
```

## Prose block spacing

Add `agds-prose-block` to a block element to restore the standard vertical spacing (`--agds-space-8`) without inheriting any other prose overrides.

## Styled elements

`AgDSProse` styles the following HTML elements when they have no class (i.e. are not already managed by another component):

- **Text**: `p`, `strong`, `em`, `small`, `s`, `del`, `ins`, `sub`, `sup`
- **Links**: `a` — action-primary colour with underline
- **Headings**: `h1`–`h6` with AGDS font scale and spacing
- **Lists**: `ul`, `ol`, `dl` with vertical rhythm
- **Tables**: with top margin spacing between consecutive tables
- **Code**: inline `code`, `kbd`, `samp` and block `pre > code`
- **Blockquotes**: left border + subtle background
- **Media**: `img` (max-width: 100%), `figure`, `figcaption`
- **Rules**: `hr` with top/bottom margin
- **Abbreviations**: `abbr[title]` with dotted underline and cursor: help

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `string` | `'div'` | HTML element rendered as the prose container |

## Slots

| Slot | Description |
|------|-------------|
| `default` | HTML content to style |

## Accessibility

- All links receive `:focus-visible` styling meeting WCAG 2.2 focus appearance
- `::selection` uses brand colours with sufficient contrast
- Print styles append `href` values after links and expand `abbr` titles

## Changelog

### 0.1.0

- Initial release — full typography system, `as` prop, `agds-prose-unset` escape hatch
