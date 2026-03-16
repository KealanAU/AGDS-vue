---
title: Accordion
description: A vertically stacked set of collapsible sections. Supports single and multiple open modes, keyboard navigation, and smooth height animation.
category: Content
status: stable
---

## Usage

Wrap `AgDSAccordionItem` components inside `AgDSAccordion`. Each item needs a unique `value` and a `title`.

::doc-preview
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

::doc-preview{label="Single"}
<AgDSAccordion type="single" :collapsible="true">
  <AgDSAccordionItem value="a" title="Step 1 — Create account">
    <p>Register at my.gov.au using your email address.</p>
  </AgDSAccordionItem>
  <AgDSAccordionItem value="b" title="Step 2 — Verify identity">
    <p>Complete the online identity verification with your Medicare or passport details.</p>
  </AgDSAccordionItem>
  <AgDSAccordionItem value="c" title="Step 3 — Link services">
    <p>Link your government services from the dashboard once your identity is verified.</p>
  </AgDSAccordionItem>
</AgDSAccordion>
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

```vue
<template>
  <!-- Open the first item by default -->
  <AgDSAccordion default-value="eligibility">
    <AgDSAccordionItem value="eligibility" title="Eligibility">…</AgDSAccordionItem>
    <AgDSAccordionItem value="documents" title="Documents">…</AgDSAccordionItem>
  </AgDSAccordion>
</template>
```

## Controlled

Use `v-model` to control open items from your component's state.

```vue
<script setup>
import { ref } from 'vue'
const open = ref(['eligibility'])
</script>

<template>
  <AgDSAccordion v-model="open">
    <AgDSAccordionItem value="eligibility" title="Eligibility">…</AgDSAccordionItem>
    <AgDSAccordionItem value="documents" title="Documents">…</AgDSAccordionItem>
  </AgDSAccordion>
</template>
```

## Disabled item

Use the `disabled` prop on `AgDSAccordionItem` to prevent a specific item from being opened.

::doc-preview{label="Disabled item"}
<AgDSAccordion>
  <AgDSAccordionItem value="active" title="Active section">
    <p>This section can be opened.</p>
  </AgDSAccordionItem>
  <AgDSAccordionItem value="locked" title="Temporarily unavailable" disabled>
    <p>This content is unavailable.</p>
  </AgDSAccordionItem>
</AgDSAccordion>
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

Use `indent` on `AgDSAccordion` to indent both triggers and panel content. Useful when the accordion appears inside a list or nested layout.

```vue
<template>
  <AgDSAccordion indent>
    <AgDSAccordionItem value="info" title="Additional information">…</AgDSAccordionItem>
  </AgDSAccordion>
</template>
```

## bodyAlt background

Use `background="bodyAlt"` when the accordion sits on an off-white (`bodyAlt`) background to ensure hover states remain visible.

```vue
<template>
  <AgDSAccordion background="bodyAlt">
    <AgDSAccordionItem value="info" title="More information">…</AgDSAccordionItem>
  </AgDSAccordion>
</template>
```

## Heading level

Use `headingLevel` on `AgDSAccordionItem` to set the semantic heading level for the trigger. Defaults to `3`. Adjust to match the surrounding page heading hierarchy.

```vue
<template>
  <!-- Inside an <h2> section, use h3 -->
  <AgDSAccordion>
    <AgDSAccordionItem value="a" title="Question" :heading-level="3">…</AgDSAccordionItem>
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
