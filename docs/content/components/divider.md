---
title: Divider
description: A horizontal rule that visually separates content. Supports an optional text label in the default slot, with left or centre alignment.
category: Content
status: stable
---

## Usage

A plain `AGDSDivider` renders a single `<hr>`. It is hidden from assistive technologies by default since dividers are decorative separators.

::doc-preview
<AGDSDivider />
::

```vue
<template>
  <AGDSDivider />
</template>
```

## With text

Provide content in the default slot to activate the "divider with text" layout — a three-column CSS grid with a line either side of the label.

::doc-preview{label="With text"}
<AGDSDivider><span>or</span></AGDSDivider>
::

```vue
<template>
  <AGDSDivider><span>or</span></AGDSDivider>
</template>
```

## Text alignment

Use the `textAlign` prop to pin the label to the left. The default is `center`.

::doc-preview{label="Left-aligned text"}
<AGDSDivider text-align="left"><span>Section A</span></AGDSDivider>
::

```vue
<template>
  <AGDSDivider text-align="left"><span>Section A</span></AGDSDivider>
</template>
```

## Visible to assistive technologies

Set `ariaHidden` to `false` when the divider marks a meaningful structural boundary — for example, a section separator inside a `<nav>` or `<form>`.

```vue
<template>
  <!-- Structural divider between two form sections -->
  <AGDSDivider :aria-hidden="false" />
</template>
```

## In a login form

A common pattern — use `AGDSDivider` with the "or" label between a primary action and an alternative sign-in method.

::doc-preview{label="Login form pattern"}
<div style="display:flex;flex-direction:column;gap:1rem;max-width:24rem">
  <AGDSButton>Sign in with myGov</AGDSButton>
  <AGDSDivider><span>or</span></AGDSDivider>
  <AGDSButton variant="secondary">Continue as guest</AGDSButton>
</div>
::

```vue
<template>
  <div class="login-stack">
    <AGDSButton>Sign in with myGov</AGDSButton>
    <AGDSDivider><span>or</span></AGDSDivider>
    <AGDSButton variant="secondary">Continue as guest</AGDSButton>
  </div>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `ariaHidden` | `boolean` | `true` | Hides the `<hr>` element(s) from assistive technologies. Set `false` when the divider has structural meaning |
| `textAlign` | `'left' \| 'center'` | `'center'` | Alignment of the label when slot content is provided |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Optional label. Providing content activates the three-column grid layout |

## Accessibility

- `ariaHidden` defaults to `true` — decorative separators should not be announced (WCAG 1.3.1)
- When text is present, the inner `<hr>` elements are always `aria-hidden="true"` regardless of the `ariaHidden` prop — they are purely visual line segments
- The text label is always rendered in the DOM and is NOT hidden from AT; the wrapper's `aria-hidden` controls whether the whole region is suppressed
- Text colour uses `--agds-color-text-muted` (WCAG 1.4.3 — muted text meets 5.9:1 contrast on white)

## Changelog

### 0.1.0

- Initial release — plain `<hr>` and "with text" grid layout; `ariaHidden`, `textAlign` props
