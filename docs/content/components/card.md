---
title: Card
description: A flexible surface component for grouping related content. Supports clickable cards with stretch links, optional shadows, bodyAlt backgrounds, and outside footers.
category: Content
status: stable
---

## Usage

`AGDSCard` is a composable system. Use `AGDSCardHeader` for the title area, `AGDSCardInner` for body content, and `AGDSCardFooter` for footer actions.

::doc-preview
<CardDemo />
::

```vue
<template>
  <AGDSCard>
    <AGDSCardHeader title="Apply for a grant" subtitle="Closes 30 June 2026" />
    <AGDSCardInner>
      <p>Funding is available for eligible small businesses in regional areas.</p>
    </AGDSCardInner>
  </AGDSCard>
</template>
```

## Clickable card

Add `clickable` and include an `AGDSCardLink` inside the header. The link's `::after` pseudo-element stretches to cover the entire card surface, making the whole card interactive while preserving correct semantics for screen readers.

::doc-preview{label="Clickable"}
<CardDemo variant="clickable" />
::

```vue
<template>
  <AGDSCard clickable>
    <AGDSCardHeader title="Regional business grants">
      <template #link>
        <AGDSCardLink href="/grants/regional">Learn more</AGDSCardLink>
      </template>
    </AGDSCardHeader>
    <AGDSCardInner>
      <p>Up to $50,000 available for eligible businesses in qualifying regions.</p>
    </AGDSCardInner>
  </AGDSCard>
</template>
```

## Shadow

Use the `shadow` prop to add a drop shadow. `sm` is a subtle lift; `md` is more prominent.

```vue
<template>
  <AGDSCard shadow="sm">…</AGDSCard>
  <AGDSCard shadow="md">…</AGDSCard>
</template>
```

## bodyAlt background

Use `background="bodyAlt"` when the card sits on an off-white surface so its own background remains distinct.

```vue
<template>
  <AGDSCard background="bodyAlt">
    <AGDSCardHeader title="Information" />
    <AGDSCardInner><p>Card on a bodyAlt surface.</p></AGDSCardInner>
  </AGDSCard>
</template>
```

## Footer

Use `AGDSCardFooter` for actions or metadata below the body content.

::doc-preview{label="With footer"}
<CardDemo variant="footer" />
::

```vue
<template>
  <AGDSCard>
    <AGDSCardHeader title="Environmental grants" />
    <AGDSCardInner>
      <p>Grants for sustainability projects in the ACT region.</p>
    </AGDSCardInner>
    <template #footer>
      <AGDSCardFooter>
        <AGDSButton size="sm">Apply now</AGDSButton>
      </AGDSCardFooter>
    </template>
  </AGDSCard>
</template>
```

## Footer outside

Use `footerOutside` to render the footer below the card border — useful for metadata that should sit visually below the card.

```vue
<template>
  <AGDSCard footer-outside>
    <AGDSCardHeader title="Service update" />
    <AGDSCardInner><p>Scheduled maintenance on 15 March.</p></AGDSCardInner>
    <template #footer>
      <AGDSCardFooter>
        <span>Last updated: 1 March 2026</span>
      </AGDSCardFooter>
    </template>
  </AGDSCard>
</template>
```

## Props — AGDSCard

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `string` | `'div'` | HTML element to render |
| `background` | `'body' \| 'bodyAlt'` | `'body'` | Surface background colour |
| `clickable` | `boolean` | `false` | Enables stretch-link clickable card behaviour |
| `shadow` | `'sm' \| 'md' \| false` | `false` | Drop shadow depth |
| `footerOutside` | `boolean` | `false` | Renders the footer slot below the card border |

## Props — AGDSCardHeader

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | **Required.** Card title |
| `subtitle` | `string` | — | Optional subtitle below the title |

## Props — AGDSCardLink

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | — | **Required.** Link destination |

## Slots — AGDSCard

| Slot | Description |
|------|-------------|
| `default` | Card content — compose with `AGDSCardHeader`, `AGDSCardInner`, `AGDSCardFooter` |

## Slots — AGDSCardHeader

| Slot | Description |
|------|-------------|
| `link` | Place an `AGDSCardLink` here to make the card clickable |

## Slots — AGDSCardFooter

| Slot | Description |
|------|-------------|
| `default` | Footer content — buttons, tags, metadata |

## Slots — AGDSCardInner

| Slot | Description |
|------|-------------|
| `default` | Main body content |

## Accessibility

- `clickable` cards use a single `<a>` element (via `AGDSCardLink`) with an `::after` stretch — only one interactive element exists in the DOM, which correctly satisfies WCAG 2.4.4 Link Purpose
- The card wrapper receives the focus ring when `clickable`, not the inner link — focus is always visible and meets WCAG 2.4.7
- `AGDSCardLink` has `inheritAttrs: false` so `aria-label` can be added to provide a more specific accessible name when multiple cards appear on the same page

## Changelog

### 0.1.0

- Initial release — `background`, `clickable`, `shadow`, `footerOutside`, composable header/inner/footer/link sub-components
