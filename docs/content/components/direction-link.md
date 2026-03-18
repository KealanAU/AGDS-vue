---
title: Direction Link
description: A link or button that displays an arrow indicating direction. Use it to signal navigation or progression — e.g. "Back", "Next", "Up to section".
category: Navigation
status: stable
---

## Usage

Use `AGDSDirectionLink` when the destination is a URL. Use `AGDSDirectionButton` when the action is triggered by JavaScript (e.g. moving through a multi-step form).

::doc-preview
<AGDSDirectionLink href="#" direction="right">Next step</AGDSDirectionLink>
::

```vue
<template>
  <AGDSDirectionLink href="/next" direction="right">Next step</AGDSDirectionLink>
</template>
```

## Direction

Use the `direction` prop to control which arrow is shown and where it appears.

- `left` — arrow before the label (back navigation)
- `right` — arrow after the label (forward navigation)
- `up` — arrow after the label (scroll up / parent section)
- `down` — arrow after the label (expand / scroll down)

::doc-preview{label="All directions"}
<AGDSDirectionLink href="#" direction="left">Back</AGDSDirectionLink>
<AGDSDirectionLink href="#" direction="right">Forward</AGDSDirectionLink>
<AGDSDirectionLink href="#" direction="up">Top of page</AGDSDirectionLink>
<AGDSDirectionLink href="#" direction="down">See more</AGDSDirectionLink>
::

```vue
<template>
  <AGDSDirectionLink href="#" direction="left">Back</AGDSDirectionLink>
  <AGDSDirectionLink href="#" direction="right">Forward</AGDSDirectionLink>
  <AGDSDirectionLink href="#" direction="up">Top of page</AGDSDirectionLink>
  <AGDSDirectionLink href="#" direction="down">See more</AGDSDirectionLink>
</template>
```

## External links

Set `external` to open the link in a new tab. Screen reader users hear ", opens in a new tab" appended automatically.

::doc-preview{label="External link"}
<AGDSDirectionLink href="https://www.australia.gov.au" direction="right" external>australia.gov.au</AGDSDirectionLink>
::

```vue
<template>
  <AGDSDirectionLink href="https://www.australia.gov.au" direction="right" external>
    australia.gov.au
  </AGDSDirectionLink>
</template>
```

## Button variant

Use `AGDSDirectionButton` when there is no URL destination. It supports `disabled` and `loading` states.

::doc-preview{label="Button variant"}
<AGDSDirectionButton direction="right">Next step</AGDSDirectionButton>
<AGDSDirectionButton direction="left">Previous</AGDSDirectionButton>
::

```vue
<template>
  <AGDSDirectionButton direction="right" @click="next">Next step</AGDSDirectionButton>
  <AGDSDirectionButton direction="left" @click="prev">Previous</AGDSDirectionButton>
</template>
```

## Disabled

::doc-preview{label="Disabled button"}
<AGDSDirectionButton direction="right" disabled>Next step</AGDSDirectionButton>
::

```vue
<template>
  <AGDSDirectionButton direction="right" disabled>Next step</AGDSDirectionButton>
</template>
```

## Loading

::doc-preview{label="Loading button"}
<AGDSDirectionButton direction="right" loading>Saving…</AGDSDirectionButton>
::

```vue
<template>
  <AGDSDirectionButton direction="right" :loading="saving" @click="save">
    Save and continue
  </AGDSDirectionButton>
</template>
```

## Props — AGDSDirectionLink

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | — | URL the link navigates to |
| `direction` | `'up' \| 'right' \| 'down' \| 'left'` | — | Arrow direction shown alongside the label |
| `external` | `boolean` | `false` | Opens in a new tab and appends accessible off-screen text |
| `focusRingFor` | `'keyboard' \| 'all'` | `'keyboard'` | When to show the focus ring |

## Props — AGDSDirectionButton

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'up' \| 'right' \| 'down' \| 'left'` | — | Arrow direction shown alongside the label |
| `disabled` | `boolean` | `false` | Disables the button |
| `loading` | `boolean` | `false` | Shows a spinner and disables the button. Sets `aria-busy="true"` |
| `loadingLabel` | `string` | `'Loading'` | Text announced to screen readers when loading |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML type attribute |
| `focusRingFor` | `'keyboard' \| 'all'` | `'keyboard'` | When to show the focus ring |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Fired on click (button only — not fired when disabled or loading) |
| `focus` | `FocusEvent` | Fired on focus |
| `blur` | `FocusEvent` | Fired on blur |
| `keydown` | `KeyboardEvent` | Fired on keydown (button only) |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Link or button label |

## Accessibility

- **Arrow icon**: `aria-hidden="true"` — decorative; the label conveys direction
- **External links**: offscreen `<span>` appended with ", opens in a new tab" for screen readers
- **Loading state**: `aria-busy="true"` set on the button; loading text announced via `aria-live="assertive"`
- **Disabled state**: native `disabled` attribute set; removes the button from the tab order
- **Focus ring**: 3px solid focus colour via `:focus-visible` — meets WCAG 2.2 focus appearance

## Changelog

### 0.1.0

- Initial release — `AGDSDirectionLink` and `AGDSDirectionButton` with `direction`, `external`, `disabled`, `loading`, `focusRingFor` props
