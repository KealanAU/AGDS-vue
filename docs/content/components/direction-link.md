---
title: Direction Link
description: A link or button that displays an arrow indicating direction. Use it to signal navigation or progression — e.g. "Back", "Next", "Up to section".
category: Navigation
status: stable
---

## Usage

Use `AgDSDirectionLink` when the destination is a URL. Use `AgDSDirectionButton` when the action is triggered by JavaScript (e.g. moving through a multi-step form).

::doc-preview
<AgDSDirectionLink href="#" direction="right">Next step</AgDSDirectionLink>
::

```vue
<template>
  <AgDSDirectionLink href="/next" direction="right">Next step</AgDSDirectionLink>
</template>
```

## Direction

Use the `direction` prop to control which arrow is shown and where it appears.

- `left` — arrow before the label (back navigation)
- `right` — arrow after the label (forward navigation)
- `up` — arrow after the label (scroll up / parent section)
- `down` — arrow after the label (expand / scroll down)

::doc-preview{label="All directions"}
<AgDSDirectionLink href="#" direction="left">Back</AgDSDirectionLink>
<AgDSDirectionLink href="#" direction="right">Forward</AgDSDirectionLink>
<AgDSDirectionLink href="#" direction="up">Top of page</AgDSDirectionLink>
<AgDSDirectionLink href="#" direction="down">See more</AgDSDirectionLink>
::

```vue
<template>
  <AgDSDirectionLink href="#" direction="left">Back</AgDSDirectionLink>
  <AgDSDirectionLink href="#" direction="right">Forward</AgDSDirectionLink>
  <AgDSDirectionLink href="#" direction="up">Top of page</AgDSDirectionLink>
  <AgDSDirectionLink href="#" direction="down">See more</AgDSDirectionLink>
</template>
```

## External links

Set `external` to open the link in a new tab. Screen reader users hear ", opens in a new tab" appended automatically.

::doc-preview{label="External link"}
<AgDSDirectionLink href="https://www.australia.gov.au" direction="right" external>australia.gov.au</AgDSDirectionLink>
::

```vue
<template>
  <AgDSDirectionLink href="https://www.australia.gov.au" direction="right" external>
    australia.gov.au
  </AgDSDirectionLink>
</template>
```

## Button variant

Use `AgDSDirectionButton` when there is no URL destination. It supports `disabled` and `loading` states.

::doc-preview{label="Button variant"}
<AgDSDirectionButton direction="right">Next step</AgDSDirectionButton>
<AgDSDirectionButton direction="left">Previous</AgDSDirectionButton>
::

```vue
<template>
  <AgDSDirectionButton direction="right" @click="next">Next step</AgDSDirectionButton>
  <AgDSDirectionButton direction="left" @click="prev">Previous</AgDSDirectionButton>
</template>
```

## Disabled

::doc-preview{label="Disabled button"}
<AgDSDirectionButton direction="right" disabled>Next step</AgDSDirectionButton>
::

```vue
<template>
  <AgDSDirectionButton direction="right" disabled>Next step</AgDSDirectionButton>
</template>
```

## Loading

::doc-preview{label="Loading button"}
<AgDSDirectionButton direction="right" loading>Saving…</AgDSDirectionButton>
::

```vue
<template>
  <AgDSDirectionButton direction="right" :loading="saving" @click="save">
    Save and continue
  </AgDSDirectionButton>
</template>
```

## Props — AgDSDirectionLink

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | — | URL the link navigates to |
| `direction` | `'up' \| 'right' \| 'down' \| 'left'` | — | Arrow direction shown alongside the label |
| `external` | `boolean` | `false` | Opens in a new tab and appends accessible off-screen text |
| `focusRingFor` | `'keyboard' \| 'all'` | `'keyboard'` | When to show the focus ring |

## Props — AgDSDirectionButton

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

- Initial release — `AgDSDirectionLink` and `AgDSDirectionButton` with `direction`, `external`, `disabled`, `loading`, `focusRingFor` props
