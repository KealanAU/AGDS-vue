---
title: Callout
description: A highlighted content region used to draw attention to important information. Supports neutral and info tones, three layout variants, and an optional title.
category: Content
status: stable
---

## Usage

Use the default slot for body content. A `title` can be added to provide a heading.

::doc-preview
:callout-demo
::

```vue
<template>
  <AGDSCallout title="Important notice">
    <p>Your application must be submitted before 5pm AEST on the closing date.</p>
  </AGDSCallout>
</template>
```

## Tone

Use the `tone` prop to change the visual meaning. `neutral` (default) is for general callouts; `info` is for informational messages and includes an info icon automatically.

::doc-preview{label="Tones"}
:callout-demo{variant="tones"}
::

```vue
<template>
  <AGDSCallout tone="neutral" title="Neutral">
    <p>This is a neutral callout.</p>
  </AGDSCallout>
  <AGDSCallout tone="info" title="Information">
    <p>This is an informational callout.</p>
  </AGDSCallout>
</template>
```

## Variant

Use the `variant` prop to change padding and layout. `compact` suits dense UIs; `regular` (default) is for standard page content; `feature` is for prominent promotional callouts.

::doc-preview{label="Variants"}
:callout-demo{variant="variants"}
::

```vue
<template>
  <AGDSCallout variant="compact" title="Compact">…</AGDSCallout>
  <AGDSCallout variant="regular" title="Regular">…</AGDSCallout>
  <AGDSCallout variant="feature" title="Feature">…</AGDSCallout>
</template>
```

## Icon slot

Replace the default info icon with a custom one using the `icon` slot.

```vue
<template>
  <AGDSCallout tone="info" title="Did you know?">
    <template #icon>
      <svg aria-hidden="true" …>…</svg>
    </template>
    <p>Custom icon callout content.</p>
  </AGDSCallout>
</template>
```

## bodyAlt background

Use `onBodyAlt` when the callout sits on an off-white (`bodyAlt`) background so the background colour remains distinct.

::doc-preview{label="On bodyAlt"}
:callout-demo{variant="on-body-alt"}
::

```vue
<template>
  <!-- Parent section has a bodyAlt (off-white) background -->
  <AGDSCallout on-body-alt title="Note">
    <p>This callout is on a bodyAlt surface.</p>
  </AGDSCallout>
</template>
```

## As a landmark

Render as `<aside>` with `aria-label` to create a complementary landmark region — useful when the callout contains information that is supplementary to the main content.

```vue
<template>
  <AGDSCallout as="aside" aria-label="Eligibility note" title="Check your eligibility">
    <p>You must be 18 or older to apply.</p>
  </AGDSCallout>
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
