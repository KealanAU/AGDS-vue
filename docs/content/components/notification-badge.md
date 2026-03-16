---
title: Notification badge
description: A small pill that displays a numeric count, typically placed alongside a nav item or icon button to indicate unread notifications or pending actions.
category: Layout
status: stable
---

## Usage

Provide a `value` and a `tone`. The badge renders the number inside a coloured pill.

```vue
<template>
  <AgDSNotificationBadge :value="4" tone="action" />
</template>
```

## Tone variants

- `action` — brand colour, for primary notifications (e.g. unread messages)
- `neutral` — muted colour, for secondary counts (e.g. total items)

```vue
<template>
  <AgDSNotificationBadge :value="12" tone="action" />
  <AgDSNotificationBadge :value="99" tone="neutral" />
</template>
```

## Max value

Use `max` to cap the displayed number. When `value` exceeds `max`, the badge shows `"{max}+"` instead.

```vue
<template>
  <!-- Shows "99+" when value is 150 -->
  <AgDSNotificationBadge :value="150" :max="99" tone="action" />
</template>
```

## With a nav item

Typically placed inline alongside a label inside a nav button or link.

```vue
<template>
  <button type="button" style="display: inline-flex; align-items: center; gap: 0.5rem;">
    Messages
    <AgDSNotificationBadge :value="3" tone="action" aria-label="3 unread messages" />
  </button>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | **Required.** The count to display |
| `tone` | `'action' \| 'neutral'` | — | **Required.** Colour variant |
| `max` | `number` | — | When `value` exceeds `max`, displays `"{max}+"` |

## Accessibility

- The badge renders as a `<span>` containing the count text — the number itself is the accessible name
- When the count is decorative (e.g. the surrounding label already conveys the total), pass `aria-hidden="true"` via attribute passthrough
- When the badge is the primary indication of a count, give it a descriptive `aria-label` (e.g. `"3 unread messages"`) so screen readers announce the full context
- Count is never conveyed by colour alone — the number is always visible (WCAG 1.3.3)
- Both tone variants meet 4.5:1 contrast: neutral `#6e6e6e` on white → 5.9:1 ✓, action `#00698f` on white → 4.6:1 ✓

## Changelog

### 0.1.0

- Initial release — `value`, `tone`, `max`
