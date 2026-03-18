---
title: Accordion
description: A vertically stacked set of collapsible sections. Supports single and multiple open modes, keyboard navigation, and smooth height animation.
category: Content
status: stable
---

## Usage

Wrap `AgDSAccordionItem` components inside `AgDSAccordion`. Each item needs a unique `value` and a `title`.

::doc-preview
<AccordionDemo />
::

```vue
<template>
  <AgDSAccordion>
    <AgDSAccordionItem value="eligibility" title="Eligibility requirements">
      <p>You must be an Australian citizen or permanent resident to be eligible.</p>
    </AgDSAccordionItem>
    <AgDSAccordionItem value="documents" title="Required documents">
      <p>Bring two forms of photo identification and proof of address.</p>
    </AgDSAccordionItem>
    <AgDSAccordionItem value="timeline" title="Processing timeline">
      <p>Applications are processed within 10 business days of receipt.</p>
    </AgDSAccordionItem>
  </AgDSAccordion>
</template>
```

## Type

Use `type="single"` to allow only one item open at a time. The default is `multiple`.

::doc-preview{label='type="single"'}
<AccordionDemo variant="single" />
::

```vue
<template>
  <AgDSAccordion type="single" :collapsible="true">
    <AgDSAccordionItem value="a" title="Step 1 — Create account">…</AgDSAccordionItem>
    <AgDSAccordionItem value="b" title="Step 2 — Verify identity">…</AgDSAccordionItem>
    <AgDSAccordionItem value="c" title="Step 3 — Link services">…</AgDSAccordionItem>
  </AgDSAccordion>
</template>
```

## Default open

Use `defaultValue` to open items on first render without controlling them. Pass a string for `type="single"` or an array for `type="multiple"`.

::doc-preview{label='defaultValue="eligibility"'}
<AccordionDemo variant="default-open" />
::

```vue
<template>
  <AgDSAccordion default-value="eligibility">
    <AgDSAccordionItem value="eligibility" title="Eligibility">…</AgDSAccordionItem>
    <AgDSAccordionItem value="documents" title="Documents">…</AgDSAccordionItem>
  </AgDSAccordion>
</template>
```

## Disabled item

Use the `disabled` prop on `AgDSAccordionItem` to prevent a specific item from being opened.

::doc-preview{label="disabled"}
<AccordionDemo variant="disabled" />
::

```vue
<template>
  <AgDSAccordion>
    <AgDSAccordionItem value="active" title="Active section">…</AgDSAccordionItem>
    <AgDSAccordionItem value="locked" title="Temporarily unavailable" disabled>…</AgDSAccordionItem>
  </AgDSAccordion>
</template>
```

## Indent

Use `indent` on `AgDSAccordion` to indent both triggers and panel content.

::doc-preview{label="indent"}
<AccordionDemo variant="indent" />
::

```vue
<template>
  <AgDSAccordion indent>
    <AgDSAccordionItem value="info" title="Additional information">…</AgDSAccordionItem>
  </AgDSAccordion>
</template>
```

## Props — AgDSAccordion

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | `'single' \| 'multiple'` | `'multiple'` | Whether one or multiple items can be open simultaneously |
| `collapsible` | `boolean` | `true` | For `type="single"` — allows the open item to be closed again |
| `modelValue` | `string \| string[]` | — | Controlled open value(s). Use with `v-model` |
| `defaultValue` | `string \| string[]` | — | Initial open value(s) for uncontrolled use |
| `indent` | `boolean` | `false` | Indents triggers and panel content |
| `background` | `'body' \| 'bodyAlt'` | `'body'` | Default hover background for all child items |

## Props — AgDSAccordionItem

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | **Required.** Unique identifier used by AccordionRoot to track open state |
| `title` | `string` | — | **Required.** Visible heading text for the trigger button |
| `headingLevel` | `2 \| 3 \| 4 \| 5 \| 6` | `3` | Semantic heading level for the trigger |
| `disabled` | `boolean` | `false` | Prevents the item from being opened or closed |
| `background` | `'body' \| 'bodyAlt'` | _(inherited)_ | Overrides the accordion-level `background` for this item |

## Events — AgDSAccordion

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string \| string[]` | Emitted when the open state changes |

## Slots — AgDSAccordionItem

| Slot | Description |
|------|-------------|
| `default` | Panel content rendered when the item is open |

## Accessibility

Built on [Reka UI AccordionRoot](https://reka-ui.com/docs/components/accordion).

- **Keyboard**: `Enter`/`Space` toggles the focused item; `Tab` moves between triggers
- **ARIA**: `aria-expanded` toggled automatically; trigger controls panel via `aria-controls`
- **Heading**: trigger is wrapped in a semantic heading (`h3` by default) — adjust `headingLevel` to fit surrounding hierarchy
- **Animation**: height transition uses `--reka-accordion-content-height` CSS variable — no JavaScript measurement required
- **Disabled**: sets `data-disabled` and prevents interaction; does not remove from tab order so screen reader users can still discover it

## Changelog

### 0.1.0

- Initial release — `single`/`multiple` types, `collapsible`, `indent`, `background`, `headingLevel`, `disabled` props
