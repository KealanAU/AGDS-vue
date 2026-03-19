---
title: Tabs
description: A tabbed interface that shows one panel at a time. Supports keyboard navigation, controlled and uncontrolled modes, and body/bodyAlt background variants.
category: Navigation
status: stable
---

## Usage

Wrap `AGDSTabList` and `AGDSTabPanel` inside `AGDSTabs`. Each `AGDSTab` must have a `value` that matches the `value` on its corresponding `AGDSTabPanel`.

::doc-preview
:tabs-demo
::

```vue
<template>
  <AGDSTabs default-value="overview">
    <AGDSTabList aria-label="Application sections">
      <AGDSTab value="overview">Overview</AGDSTab>
      <AGDSTab value="eligibility">Eligibility</AGDSTab>
      <AGDSTab value="documents">Documents</AGDSTab>
    </AGDSTabList>

    <AGDSTabPanel value="overview">
      <p>Overview content goes here.</p>
    </AGDSTabPanel>
    <AGDSTabPanel value="eligibility">
      <p>Eligibility requirements go here.</p>
    </AGDSTabPanel>
    <AGDSTabPanel value="documents">
      <p>Required documents go here.</p>
    </AGDSTabPanel>
  </AGDSTabs>
</template>
```

## Controlled

Use `v-model` on `AGDSTabs` to control the active tab from your component's state.

```vue
<script setup>
import { ref } from 'vue'
const activeTab = ref('overview')
</script>

<template>
  <AGDSTabs v-model="activeTab">
    <AGDSTabList aria-label="Application sections">
      <AGDSTab value="overview">Overview</AGDSTab>
      <AGDSTab value="eligibility">Eligibility</AGDSTab>
    </AGDSTabList>
    <AGDSTabPanel value="overview">…</AGDSTabPanel>
    <AGDSTabPanel value="eligibility">…</AGDSTabPanel>
  </AGDSTabs>
</template>
```

## bodyAlt background

Use `background="bodyAlt"` when the tabs sit on an off-white (`bodyAlt`) background.

::doc-preview{label="bodyAlt background"}
:tabs-demo{variant="body-alt"}
::

```vue
<template>
  <AGDSTabs default-value="a" background="bodyAlt">
    <AGDSTabList aria-label="Sections">
      <AGDSTab value="a">Section A</AGDSTab>
      <AGDSTab value="b">Section B</AGDSTab>
    </AGDSTabList>
    <AGDSTabPanel value="a">…</AGDSTabPanel>
    <AGDSTabPanel value="b">…</AGDSTabPanel>
  </AGDSTabs>
</template>
```

## Contained panels

By default, tab panels have a border and padding that visually contain the content. Set `contained="false"` to remove this styling when the panel content provides its own layout.

::doc-preview{label="Uncontained panels"}
:tabs-demo{variant="uncontained"}
::

```vue
<template>
  <AGDSTabs default-value="a" :contained="false">
    <AGDSTabList aria-label="Sections">
      <AGDSTab value="a">Section A</AGDSTab>
      <AGDSTab value="b">Section B</AGDSTab>
    </AGDSTabList>
    <AGDSTabPanel value="a">…</AGDSTabPanel>
    <AGDSTabPanel value="b">…</AGDSTabPanel>
  </AGDSTabs>
</template>
```

## Disabled tab

Use the `disabled` prop on `AGDSTab` to prevent a tab from being selected.

::doc-preview{label="Disabled tabs"}
:tabs-demo{variant="disabled"}
::

```vue
<template>
  <AGDSTabs default-value="active">
    <AGDSTabList aria-label="Sections">
      <AGDSTab value="active">Active</AGDSTab>
      <AGDSTab value="pending" disabled>Pending review</AGDSTab>
    </AGDSTabList>
    <AGDSTabPanel value="active">…</AGDSTabPanel>
    <AGDSTabPanel value="pending">…</AGDSTabPanel>
  </AGDSTabs>
</template>
```

## Props — AGDSTabs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | — | Controlled active tab value. Use with `v-model` |
| `defaultValue` | `string` | — | Initial active tab for uncontrolled use |
| `background` | `'body' \| 'bodyAlt'` | `'body'` | Background variant — adjusts active indicator and hover colours |
| `contained` | `boolean` | `true` | Adds border and padding to tab panels |

## Props — AGDSTab

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | **Required.** Unique identifier matching a `AGDSTabPanel` `value` |
| `disabled` | `boolean` | `false` | Prevents the tab from being selected |

## Props — AGDSTabPanel

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | **Required.** Unique identifier matching a `AGDSTab` `value` |

## Props — AGDSTabList

Passes all attributes (including `aria-label` / `aria-labelledby`) through to the underlying `tablist` element.

## Events — AGDSTabs

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Emitted when the active tab changes |

## Keyboard navigation

| Key | Behaviour |
|-----|-----------|
| `ArrowLeft` / `ArrowRight` | Move focus between tabs (horizontal layout) |
| `ArrowUp` / `ArrowDown` | Move focus between tabs (vertical layout on mobile) |
| `Home` | Move focus to the first tab |
| `End` | Move focus to the last tab |
| `Enter` / `Space` | Activate the focused tab |

## Accessibility

Built on [Reka UI Tabs](https://reka-ui.com/docs/components/tabs).

- **Roles**: `tablist`, `tab`, `tabpanel` set automatically
- **Labelling**: provide `aria-label` or `aria-labelledby` on `AGDSTabList` to describe the purpose of the tab group
- **Selection**: `aria-selected` toggled automatically on each tab
- **Association**: `aria-controls` and `aria-labelledby` link each tab to its panel
- **Keyboard**: follows the [ARIA tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) — arrow keys move between tabs, Enter/Space activates

## Changelog

### 0.1.0

- Initial release — `v-model`, `defaultValue`, `background`, `contained`, `disabled` tab prop
