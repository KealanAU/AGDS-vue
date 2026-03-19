---
title: Call to action
description: A bold link or button with a trailing chevron that draws attention to a primary action. Use it to guide users to the next step.
category: Layout
status: stable
---

## Usage

Use `AGDSCallToActionLink` when the destination is a URL. Use `AGDSCallToActionButton` when the action is triggered by JavaScript.

::doc-preview
:call-to-action-demo
::

```vue
<template>
  <AGDSCallToActionLink href="/start">Get started</AGDSCallToActionLink>
</template>
```

## Button variant

Use `AGDSCallToActionButton` when there is no URL — for example, advancing a multi-step form or triggering a modal.

::doc-preview{label="Button variant"}
:call-to-action-demo{variant="button"}
::

```vue
<template>
  <AGDSCallToActionButton @click="next">Apply now</AGDSCallToActionButton>
</template>
```

## External links

Set `external` to open the link in a new tab. Screen reader users hear ", opens in a new tab" appended automatically.

::doc-preview{label="External link"}
:call-to-action-demo{variant="external"}
::

```vue
<template>
  <AGDSCallToActionLink href="https://www.australia.gov.au" external>
    australia.gov.au
  </AGDSCallToActionLink>
</template>
```

## Disabled

::doc-preview{label="Disabled button"}
:call-to-action-demo{variant="disabled"}
::

```vue
<template>
  <AGDSCallToActionButton disabled>Apply now</AGDSCallToActionButton>
</template>
```

## Loading

::doc-preview{label="Loading button"}
:call-to-action-demo{variant="loading"}
::

```vue
<template>
  <AGDSCallToActionButton :loading="submitting" loading-label="Submitting form" @click="submit">
    Submit application
  </AGDSCallToActionButton>
</template>
```

## Props — AGDSCallToActionLink

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | — | URL the link navigates to |
| `external` | `boolean` | `false` | Opens in a new tab and appends accessible off-screen text |
| `focusRingFor` | `'keyboard' \| 'all'` | `'keyboard'` | When to show the focus ring |

## Props — AGDSCallToActionButton

| Prop | Type | Default | Description |
|------|------|---------|-------------|
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

- **Chevron icon**: `aria-hidden="true"` — decorative; the label conveys the action
- **External links**: offscreen `<span>` appended with ", opens in a new tab" for screen readers (WCAG 2.4.4)
- **Loading state**: `aria-busy="true"` set on the button; loading text announced via `aria-live="assertive"` (WCAG 4.1.3)
- **Disabled state**: native `disabled` attribute set; removes the button from the tab order
- **Focus ring**: 3px solid focus colour via `:focus-visible` — meets WCAG 2.2 focus appearance

## Changelog

### 0.1.0

- Initial release — `AGDSCallToActionLink` and `AGDSCallToActionButton` with `external`, `disabled`, `loading`, `focusRingFor` props
