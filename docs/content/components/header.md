---
title: Header
description: The site header containing the agency logo, service name, and optional right-side content such as search or account navigation.
category: Layout
status: stable
---

## Usage

Provide at minimum a `heading` (the service name). The heading renders as a link back to the home page.

```vue
<template>
  <AgDSHeader heading="My Government Service" />
</template>
```

## With a logo

Use the `logo` slot to insert an image or SVG.

```vue
<template>
  <AgDSHeader heading="My Government Service" href="/">
    <template #logo>
      <img src="/logo.svg" alt="Department of Agriculture, Fisheries and Forestry" width="200" height="65" />
    </template>
  </AgDSHeader>
</template>
```

## Co-branding (two logos)

Use `secondHref` and the `secondLogo` slot for a co-branded header. Use `dividerPosition` to control where the vertical divider sits.

```vue
<template>
  <AgDSHeader
    heading="My Service"
    href="/"
    second-href="https://partner.gov.au"
    divider-position="between"
  >
    <template #logo>
      <img src="/agency-logo.svg" alt="Department of Agriculture, Fisheries and Forestry" width="200" height="65" />
    </template>
    <template #secondLogo>
      <img src="/partner-logo.svg" alt="Partner Agency" width="120" height="65" />
    </template>
  </AgDSHeader>
</template>
```

## Right-side content

Use the `rightContent` slot for secondary actions such as search or a sign-in link.

```vue
<template>
  <AgDSHeader heading="My Government Service">
    <template #rightContent>
      <a href="/signin">Sign in</a>
    </template>
  </AgDSHeader>
</template>
```

## Badge label

Use `badgeLabel` to indicate a pre-release state (e.g. "Beta").

```vue
<template>
  <AgDSHeader heading="My Service" badge-label="Beta" />
</template>
```

## Subline

Use `subline` to add a short description beneath the heading.

```vue
<template>
  <AgDSHeader
    heading="My Government Service"
    subline="Helping Australians access what they need"
  />
</template>
```

## Size variants

`size="sm"` reduces the vertical padding of the header for compact layouts.

```vue
<template>
  <AgDSHeader heading="My Service" size="sm" />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `heading` | `string` | — | **Required.** Service or site name rendered as the main heading |
| `href` | `string` | `'/'` | Destination href for the heading/logo link |
| `background` | `'body' \| 'bodyAlt'` | `'body'` | Background colour of the header surface |
| `badgeLabel` | `string` | — | Badge text to indicate a pre-release state (e.g. `'Beta'`) |
| `dividerPosition` | `'after' \| 'between'` | `'after'` | Position of the vertical divider when two logos are used |
| `maxWidth` | `'container' \| 'containerLg'` | `'container'` | Maximum width of the inner content container |
| `secondHref` | `string` | — | Href for the second (co-brand) logo link |
| `size` | `'sm' \| 'md'` | `'md'` | Controls vertical padding — `sm` for compact layouts |
| `subline` | `string` | — | Supplementary description placed beneath the heading |

## Slots

| Slot | Description |
|------|-------------|
| `logo` | Primary logo element (img or SVG) |
| `secondLogo` | Second logo for co-branding |
| `rightContent` | Content placed in the right column (nav, search, sign-in, etc.) |

## Accessibility

- Renders as a `<header>` element which provides the `banner` landmark
- The heading/logo link provides a "skip to home" mechanism; the accessible name comes from the heading text
- `rightContent` is hidden in print output
- When using `logo` only (no visible heading text), ensure the logo has an appropriate `alt` attribute

## Changelog

### 0.1.0

- Initial release — `heading`, `href`, `background`, `size`, `badgeLabel`, `subline`, `dividerPosition`, `secondHref`, `maxWidth`, `logo`/`secondLogo`/`rightContent` slots
