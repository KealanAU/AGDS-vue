---
title: Text Link
description: An inline anchor styled with the brand action colour. AgDSTextLinkExternal adds an open-in-new-tab icon and the required screen reader warning for external links.
category: Navigation
status: stable
---

## Usage

Use `AgDSTextLink` for internal navigation. Pass the destination via `href` and the link text via the default slot.

::doc-preview
<p>Read the <AgDSTextLink href="/guides/getting-started">getting started guide</AgDSTextLink> before continuing.</p>
::

```vue
<template>
  <p>
    Read the
    <AgDSTextLink href="/guides/getting-started">getting started guide</AgDSTextLink>
    before continuing.
  </p>
</template>
```

## External links

Use `AgDSTextLinkExternal` for links that open in a new tab. It automatically adds:

- `target="_blank"` and `rel="noopener noreferrer"`
- An open-in-new-tab icon
- Visually hidden text `", opens in a new tab"` for screen readers (WCAG 2.4.4)

::doc-preview{label="External link"}
<p>Visit the <AgDSTextLinkExternal href="https://www.australia.gov.au">australia.gov.au</AgDSTextLinkExternal> website for more information.</p>
::

```vue
<template>
  <p>
    Visit the
    <AgDSTextLinkExternal href="https://www.australia.gov.au">
      australia.gov.au
    </AgDSTextLinkExternal>
    website for more information.
  </p>
</template>
```

## Within body text

Text links are designed to sit within a sentence or paragraph. They inherit the font size and line height of their surrounding text.

::doc-preview{label="In context"}
<AgDSText as="p" font-size="md">
  You must
  <AgDSTextLink href="/eligibility">check your eligibility</AgDSTextLink>
  before submitting. For help, contact
  <AgDSTextLinkExternal href="https://www.servicesaustralia.gov.au">Services Australia</AgDSTextLinkExternal>.
</AgDSText>
::

---

## Props — AgDSTextLink

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | — | **Required.** URL the link navigates to |
| `focusRingFor` | `'keyboard' \| 'all'` | `'keyboard'` | When to show the focus ring. Use `'all'` when focus is moved programmatically |

## Events — AgDSTextLink

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Emitted when the link is clicked |
| `focus` | `FocusEvent` | Emitted when the link gains focus |
| `blur` | `FocusEvent` | Emitted when the link loses focus |

## Slots — AgDSTextLink

| Slot | Description |
|------|-------------|
| `default` | Link text — should describe the destination, not "click here" |

---

## Props — AgDSTextLinkExternal

Inherits all props from `AgDSTextLink`. `target` and `rel` are set automatically and cannot be overridden.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | — | **Required.** URL of the external resource |
| `focusRingFor` | `'keyboard' \| 'all'` | `'keyboard'` | When to show the focus ring |

---

## Accessibility

- Uses a native `<a href>` element — no custom ARIA needed
- Link text must describe the destination — avoid generic labels like "click here" or "read more" (WCAG 2.4.4)
- `AgDSTextLinkExternal` appends visually hidden `", opens in a new tab"` text via `AgDSExternalLinkCallout` — users are warned before following the link (WCAG 2.4.4)
- The open-in-new-tab icon is `aria-hidden="true"` — the hidden text carries the announcement
- Focus ring uses `--agds-color-focus` tokens and `border-radius: 2px`, visible on `:focus-visible` (WCAG 2.4.7)
- `focusRingFor="all"` shows the focus ring on `:focus` as well, for when focus is moved programmatically (e.g. skip links)

## Changelog

### 0.1.0

- Initial release — `AgDSTextLink` (href, focusRingFor), `AgDSTextLinkExternal` (auto new-tab warning, open-in-new icon)
