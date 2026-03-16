---
title: Callout
description: A highlighted content region used to draw attention to important information. Supports neutral and info tones, three layout variants, and an optional title.
category: Content
status: stable
---

## Usage

Use the default slot for body content. A `title` can be added to provide a heading.

::doc-preview
<AgDSCallout title="Important notice">
  <p>Your application must be submitted before 5pm AEST on the closing date.</p>
</AgDSCallout>
::

```vue
<template>
  <AgDSCallout title="Important notice">
    <p>Your application must be submitted before 5pm AEST on the closing date.</p>
  </AgDSCallout>
</template>
```

## Tone

Use the `tone` prop to change the visual meaning. `neutral` (default) is for general callouts; `info` is for informational messages and includes an info icon automatically.

::doc-preview{label="Tones"}
<AgDSCallout tone="neutral" title="Neutral">
  <p>This is a neutral callout for general supplementary information.</p>
</AgDSCallout>
<AgDSCallout tone="info" title="Information">
  <p>This is an informational callout. An info icon is shown automatically.</p>
</AgDSCallout>
::

```vue
<template>
  <AgDSCallout tone="neutral" title="Neutral">
    <p>This is a neutral callout.</p>
  </AgDSCallout>
  <AgDSCallout tone="info" title="Information">
    <p>This is an informational callout.</p>
  </AgDSCallout>
</template>
```

## Variant

Use the `variant` prop to change padding and layout. `compact` suits dense UIs; `regular` (default) is for standard page content; `feature` is for prominent promotional callouts.

::doc-preview{label="Variants"}
<AgDSCallout variant="compact" title="Compact">
  <p>Compact variant for inline or dense contexts.</p>
</AgDSCallout>
<AgDSCallout variant="regular" title="Regular">
  <p>Regular variant — the standard choice for page content.</p>
</AgDSCallout>
<AgDSCallout variant="feature" title="Feature">
  <p>Feature variant for high-visibility callouts.</p>
</AgDSCallout>
::

```vue
<template>
  <AgDSCallout variant="compact" title="Compact">…</AgDSCallout>
  <AgDSCallout variant="regular" title="Regular">…</AgDSCallout>
  <AgDSCallout variant="feature" title="Feature">…</AgDSCallout>
</template>
```

## Icon slot

Replace the default info icon with a custom one using the `icon` slot.

```vue
<template>
  <AgDSCallout tone="info" title="Did you know?">
    <template #icon>
      <svg aria-hidden="true" …>…</svg>
    </template>
    <p>Custom icon callout content.</p>
  </AgDSCallout>
</template>
```

## bodyAlt background

Use `onBodyAlt` when the callout sits on an off-white (`bodyAlt`) background so the background colour remains distinct.

```vue
<template>
  <!-- Parent section has a bodyAlt (off-white) background -->
  <AgDSCallout on-body-alt title="Note">
    <p>This callout is on a bodyAlt surface.</p>
  </AgDSCallout>
</template>
```

## As a landmark

Render as `<aside>` with `aria-label` to create a complementary landmark region — useful when the callout contains information that is supplementary to the main content.

```vue
<template>
  <AgDSCallout as="aside" aria-label="Eligibility note" title="Check your eligibility">
    <p>You must be 18 or older to apply.</p>
  </AgDSCallout>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `as` | `string` | `'div'` | HTML element to render. Use `'aside'` to create a complementary landmark |
| `title` | `string` | — | Optional bold title above the body content |
| `tone` | `'neutral' \| 'info'` | `'neutral'` | Controls background and border colour |
| `variant` | `'compact' \| 'regular' \| 'feature'` | `'regular'` | Controls padding, gap, and layout direction |
| `onBodyAlt` | `boolean` | `false` | Set true when the callout sits on a bodyAlt background |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Body content |
| `icon` | Replace the default info icon (tone=info only) |

## Accessibility

- `tone="info"` renders a default info icon with `role="img"` and `aria-label="Information"` — satisfies WCAG 1.1.1
- The SVG inside the icon wrapper has `aria-hidden="true"` to avoid double-announcement
- Render as `aside` with `aria-label` when the callout functions as a complementary landmark

## Changelog

### 0.1.0

- Initial release — `neutral`/`info` tones, `compact`/`regular`/`feature` variants, `title`, `onBodyAlt`, `as`, `icon` slot
