---
title: Card
description: A flexible surface component for grouping related content. Supports clickable cards with stretch links, optional shadows, bodyAlt backgrounds, and outside footers.
category: Content
status: stable
---

## Usage

`AgDSCard` is a composable system. Use `AgDSCardHeader` for the title area, `AgDSCardInner` for body content, and `AgDSCardFooter` for footer actions.

::doc-preview
<AgDSCard>
  <AgDSCardHeader title="Apply for a grant" subtitle="Closes 30 June 2026" />
  <AgDSCardInner>
    <p>Funding is available for eligible small businesses in regional areas.</p>
  </AgDSCardInner>
</AgDSCard>
::

```vue
<template>
  <AgDSCard>
    <AgDSCardHeader title="Apply for a grant" subtitle="Closes 30 June 2026" />
    <AgDSCardInner>
      <p>Funding is available for eligible small businesses in regional areas.</p>
    </AgDSCardInner>
  </AgDSCard>
</template>
```

## Clickable card

Add `clickable` and include an `AgDSCardLink` inside the header. The link's `::after` pseudo-element stretches to cover the entire card surface, making the whole card interactive while preserving correct semantics for screen readers.

::doc-preview{label="Clickable"}
<AgDSCard clickable>
  <AgDSCardHeader title="Regional business grants">
    <template #link>
      <AgDSCardLink href="#">Learn more</AgDSCardLink>
    </template>
  </AgDSCardHeader>
  <AgDSCardInner>
    <p>Up to $50,000 available for eligible businesses in qualifying regions.</p>
  </AgDSCardInner>
</AgDSCard>
::

```vue
<template>
  <AgDSCard clickable>
    <AgDSCardHeader title="Regional business grants">
      <template #link>
        <AgDSCardLink href="/grants/regional">Learn more</AgDSCardLink>
      </template>
    </AgDSCardHeader>
    <AgDSCardInner>
      <p>Up to $50,000 available for eligible businesses in qualifying regions.</p>
    </AgDSCardInner>
  </AgDSCard>
</template>
```

## Shadow

Use the `shadow` prop to add a drop shadow. `sm` is a subtle lift; `md` is more prominent.

```vue
<template>
  <AgDSCard shadow="sm">…</AgDSCard>
  <AgDSCard shadow="md">…</AgDSCard>
</template>
```

## bodyAlt background

Use `background="bodyAlt"` when the card sits on an off-white surface so its own background remains distinct.

```vue
<template>
  <AgDSCard background="bodyAlt">
    <AgDSCardHeader title="Information" />
    <AgDSCardInner><p>Card on a bodyAlt surface.</p></AgDSCardInner>
  </AgDSCard>
</template>
```

## Footer

Use `AgDSCardFooter` for actions or metadata below the body content.

::doc-preview{label="With footer"}
<AgDSCard>
  <AgDSCardHeader title="Environmental grants" />
  <AgDSCardInner>
    <p>Grants for sustainability projects in the ACT region.</p>
  </AgDSCardInner>
  <AgDSCardFooter>
    <AgDSButton size="sm">Apply now</AgDSButton>
  </AgDSCardFooter>
</AgDSCard>
::

```vue
<template>
  <AgDSCard>
    <AgDSCardHeader title="Environmental grants" />
    <AgDSCardInner>
      <p>Grants for sustainability projects in the ACT region.</p>
    </AgDSCardInner>
    <AgDSCardFooter>
      <AgDSButton size="sm">Apply now</AgDSButton>
    </AgDSCardFooter>
  </AgDSCard>
</template>
```

## Footer outside

Use `footerOutside` to render the footer below the card border — useful for metadata that should sit visually below the card.

```vue
<template>
  <AgDSCard footer-outside>
    <AgDSCardHeader title="Service update" />
    <AgDSCardInner><p>Scheduled maintenance on 15 March.</p></AgDSCardInner>
    <AgDSCardFooter>
      <span>Last updated: 1 March 2026</span>
    </AgDSCardFooter>
  </AgDSCard>
</template>
```

## Props — AgDSCard

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `string` | `'div'` | HTML element to render |
| `background` | `'body' \| 'bodyAlt'` | `'body'` | Surface background colour |
| `clickable` | `boolean` | `false` | Enables stretch-link clickable card behaviour |
| `shadow` | `'sm' \| 'md' \| false` | `false` | Drop shadow depth |
| `footerOutside` | `boolean` | `false` | Renders the footer slot below the card border |

## Props — AgDSCardHeader

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | **Required.** Card title |
| `subtitle` | `string` | — | Optional subtitle below the title |

## Props — AgDSCardLink

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | — | **Required.** Link destination |

## Slots — AgDSCard

| Slot | Description |
|------|-------------|
| `default` | Card content — compose with `AgDSCardHeader`, `AgDSCardInner`, `AgDSCardFooter` |

## Slots — AgDSCardHeader

| Slot | Description |
|------|-------------|
| `link` | Place an `AgDSCardLink` here to make the card clickable |

## Slots — AgDSCardFooter

| Slot | Description |
|------|-------------|
| `default` | Footer content — buttons, tags, metadata |

## Slots — AgDSCardInner

| Slot | Description |
|------|-------------|
| `default` | Main body content |

## Accessibility

- `clickable` cards use a single `<a>` element (via `AgDSCardLink`) with an `::after` stretch — only one interactive element exists in the DOM, which correctly satisfies WCAG 2.4.4 Link Purpose
- The card wrapper receives the focus ring when `clickable`, not the inner link — focus is always visible and meets WCAG 2.4.7
- `AgDSCardLink` has `inheritAttrs: false` so `aria-label` can be added to provide a more specific accessible name when multiple cards appear on the same page

## Changelog

### 0.1.0

- Initial release — `background`, `clickable`, `shadow`, `footerOutside`, composable header/inner/footer/link sub-components
