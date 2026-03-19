---
title: Text Link
description: An inline anchor styled with the brand action colour. AGDSTextLinkExternal adds an open-in-new-tab icon and the required screen reader warning for external links.
category: Navigation
status: stable
---

## Usage

Use `AGDSTextLink` for internal navigation. Pass the destination via `href` and the link text via the default slot.

::doc-preview
:text-link-demo
::

```vue
<template>
  <p>
    Read the
    <AGDSTextLink href="/guides/getting-started">getting started guide</AGDSTextLink>
    before continuing.
  </p>
</template>
```

## External links

Use `AGDSTextLinkExternal` for links that open in a new tab. It automatically adds:

- `target="_blank"` and `rel="noopener noreferrer"`
- An open-in-new-tab icon
- Visually hidden text `", opens in a new tab"` for screen readers (WCAG 2.4.4)

::doc-preview{label="External link"}
:text-link-demo{variant="external"}
::

```vue
<template>
  <p>
    Visit the
    <AGDSTextLinkExternal href="https://www.australia.gov.au">
      australia.gov.au
    </AGDSTextLinkExternal>
    website for more information.
  </p>
</template>
```

## Within body text

Text links are designed to sit within a sentence or paragraph. They inherit the font size and line height of their surrounding text.

::doc-preview{label="In context"}
:text-link-demo{variant="in-context"}
::

---

## Props — AGDSTextLink

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | — | **Required.** URL the link navigates to |
| `focusRingFor` | `'keyboard' \| 'all'` | `'keyboard'` | When to show the focus ring. Use `'all'` when focus is moved programmatically |

## Events — AGDSTextLink

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Emitted when the link is clicked |
| `focus` | `FocusEvent` | Emitted when the link gains focus |
| `blur` | `FocusEvent` | Emitted when the link loses focus |

## Slots — AGDSTextLink

| Slot | Description |
|------|-------------|
| `default` | Link text — should describe the destination, not "click here" |

---

## Props — AGDSTextLinkExternal

Inherits all props from `AGDSTextLink`. `target` and `rel` are set automatically and cannot be overridden.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | — | **Required.** URL of the external resource |
| `focusRingFor` | `'keyboard' \| 'all'` | `'keyboard'` | When to show the focus ring |

---

## Accessibility

- Uses a native `<a href>` element — no custom ARIA needed
- Link text must describe the destination — avoid generic labels like "click here" or "read more" (WCAG 2.4.4)
- `AGDSTextLinkExternal` appends visually hidden `", opens in a new tab"` text via `AGDSExternalLinkCallout` — users are warned before following the link (WCAG 2.4.4)
- The open-in-new-tab icon is `aria-hidden="true"` — the hidden text carries the announcement
- Focus ring uses `--agds-color-focus` tokens and `border-radius: 2px`, visible on `:focus-visible` (WCAG 2.4.7)
- `focusRingFor="all"` shows the focus ring on `:focus` as well, for when focus is moved programmatically (e.g. skip links)

## Changelog

### 0.1.0

- Initial release — `AGDSTextLink` (href, focusRingFor), `AGDSTextLinkExternal` (auto new-tab warning, open-in-new icon)
