---
title: Status Badge
description: A compact inline badge that communicates the status of a record or task using a semantic tone, icon, and label. Supports regular (pill) and subtle (icon + label only) appearances.
category: Data Display
status: stable
---

## Usage

Provide a `label` and a `tone`. The badge renders inline and can sit inside table cells, list items, or body text.

::doc-preview
<StatusBadgeDemo />
::

```vue
<template>
  <AGDSStatusBadge tone="successHigh" label="Approved" />
</template>
```

## Tone

The `tone` prop controls the icon shape, icon colour, and border colour. Tones follow the AGDS task-status vocabulary:

**High** — filled icons, strong colour:
`errorHigh`, `successHigh`, `infoHigh`, `warningHigh`

**Medium** — outline icons, muted colour:
`errorMedium`, `successMedium`, `infoMedium`, `warningMedium`

**Low** — outline icons, neutral colour:
`errorLow`, `successLow`, `infoLow`, `warningLow`, `cannotStartLow`, `inProgressLow`, `notStartedLow`, `pausedLow`, `unknownLow`

::doc-preview{label="Selected tones"}
<StatusBadgeDemo variant="tones" />
::

```vue
<template>
  <AGDSStatusBadge tone="successHigh" label="Completed" />
  <AGDSStatusBadge tone="errorHigh" label="Failed" />
  <AGDSStatusBadge tone="warningMedium" label="Needs review" />
  <AGDSStatusBadge tone="inProgressLow" label="In progress" />
  <AGDSStatusBadge tone="notStartedLow" label="Not started" />
</template>
```

## Appearance

Use the `appearance` prop to switch between `regular` (default pill with border) and `subtle` (icon + label, no border or background).

::doc-preview{label="Appearances"}
<StatusBadgeDemo variant="appearances" />
::

```vue
<template>
  <AGDSStatusBadge tone="infoHigh" label="Regular" appearance="regular" />
  <AGDSStatusBadge tone="infoHigh" label="Subtle" appearance="subtle" />
</template>
```

## In a table

The badge renders as an inline element and aligns to the text baseline, making it suitable for use in table cells.

```vue
<template>
  <table>
    <tr>
      <td>Application #1024</td>
      <td><AGDSStatusBadge tone="successHigh" label="Approved" /></td>
    </tr>
    <tr>
      <td>Application #1025</td>
      <td><AGDSStatusBadge tone="inProgressLow" label="Under review" /></td>
    </tr>
  </table>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Visible text label |
| `tone` | `StatusBadgeTone` | `'infoHigh'` | Controls icon, icon colour, and border colour |
| `appearance` | `'regular' \| 'subtle'` | `'regular'` | `regular` adds a pill border and background; `subtle` shows icon + label only |

## Accessibility

- The badge renders as a `<span>` to avoid introducing block-level elements in inline contexts
- The icon SVG carries `aria-hidden="false"` and `aria-label="Status: {toneLabel}."` so screen readers announce both the semantic meaning and the label (WCAG 1.1.1)
- Tone is never communicated by colour alone — the icon shape and label text also differ between tones (WCAG 1.3.3)
- Windows High Contrast Mode: the border uses `ButtonText` and the icon uses `forced-color-adjust: none` to retain colour meaning (WCAG 1.4.11)

## Changelog

### 0.1.0

- Initial release — high/medium/low tones, `regular`/`subtle` appearances
