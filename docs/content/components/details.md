---
title: Details
description: A native disclosure widget that shows or hides supplementary content on demand. Uses the HTML details/summary elements for built-in keyboard and screen reader support.
category: Content
status: stable
---

## Usage

Set `label` to the visible trigger text. The default slot receives the hidden content.

::doc-preview
<DetailsDemo />
::

```vue
<template>
  <AGDSDetails label="What documents do I need?">
    <p>You will need to provide two forms of identification.</p>
  </AGDSDetails>
</template>
```

## Icon before

Use `iconBefore` to show an info icon before the label — useful when the context needs a visual cue that the section is informational.

::doc-preview{label="With icon"}
<DetailsDemo variant="icon-before" />
::

```vue
<template>
  <AGDSDetails label="Privacy information" icon-before>
    <p>We collect your personal information to process your application.</p>
  </AGDSDetails>
</template>
```

## bodyAlt background

Use `onBodyAlt` when the details component sits on an off-white (`bodyAlt`) surface so the content panel background remains visually distinct.

```vue
<template>
  <!-- Parent section has a bodyAlt background -->
  <AGDSDetails label="More information" on-body-alt>
    <p>Content rendered on a bodyAlt surface.</p>
  </AGDSDetails>
</template>
```

## Multiple disclosures

Use several `AGDSDetails` components independently. Unlike `AGDSAccordion`, each operates autonomously — opening one does not close another.

::doc-preview{label="Multiple"}
<DetailsDemo variant="multiple" />
::

```vue
<template>
  <AGDSDetails label="Eligibility criteria">…</AGDSDetails>
  <AGDSDetails label="How to apply">…</AGDSDetails>
  <AGDSDetails label="After you apply">…</AGDSDetails>
</template>
```

## When to use Details vs Accordion

| Use | Component |
|-----|-----------|
| A single or small group of independent disclosures | `AGDSDetails` |
| A structured list where single-open behaviour is desirable | `AGDSAccordion` |
| FAQ sections with many items | `AGDSAccordion` |
| Inline supplementary information (e.g. field help text) | `AGDSDetails` |

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Text shown in the summary trigger |
| `iconBefore` | `boolean` | `false` | Shows an info icon before the label |
| `onBodyAlt` | `boolean` | `false` | Set true when the component sits on a bodyAlt background |

## Slots

| Slot | Description |
|------|-------------|
| `default` | The hidden content revealed when the disclosure is open |

## Accessibility

Built on native `<details>` and `<summary>` HTML elements.

- **Keyboard**: `Enter` and `Space` toggle the disclosure — no JavaScript required; handled by the browser natively
- **Screen readers**: the browser exposes `aria-expanded` state on `<summary>` automatically; iOS VoiceOver receives `width: fit-content` on the summary element to correctly announce expanded state
- **Icon**: the info icon uses `role="img"` + `aria-label="Information."` on the wrapper `<span>`; the SVG has `aria-hidden="true"` to prevent double-announcement (WCAG 1.1.1)
- **Focus ring**: `:focus-visible` only, using `--agds-color-focus` tokens (WCAG 2.4.7)
- **Chevron**: `aria-hidden="true"` — purely decorative; rotates via CSS on `details[open]`
- **High Contrast Mode**: content panel receives a `forced-colors` outline to remain visible in Windows High Contrast mode

## Changelog

### 0.1.0

- Initial release — `label`, `iconBefore`, `onBodyAlt` props; native `<details>`/`<summary>` implementation
