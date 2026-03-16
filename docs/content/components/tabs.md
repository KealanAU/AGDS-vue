---
title: Tabs
description: A tabbed interface that shows one panel at a time. Supports keyboard navigation, controlled and uncontrolled modes, and body/bodyAlt background variants.
category: Navigation
status: stable
---

## Usage

Wrap `AgDSTabList` and `AgDSTabPanel` inside `AgDSTabs`. Each `AgDSTab` must have a `value` that matches the `value` on its corresponding `AgDSTabPanel`.

```vue
<template>
  <AgDSTabs default-value="overview">
    <AgDSTabList aria-label="Application sections">
      <AgDSTab value="overview">Overview</AgDSTab>
      <AgDSTab value="eligibility">Eligibility</AgDSTab>
      <AgDSTab value="documents">Documents</AgDSTab>
    </AgDSTabList>

    <AgDSTabPanel value="overview">
      <p>Overview content goes here.</p>
    </AgDSTabPanel>
    <AgDSTabPanel value="eligibility">
      <p>Eligibility requirements go here.</p>
    </AgDSTabPanel>
    <AgDSTabPanel value="documents">
      <p>Required documents go here.</p>
    </AgDSTabPanel>
  </AgDSTabs>
</template>
```

## Controlled

Use `v-model` on `AgDSTabs` to control the active tab from your component's state.

```vue
<script setup>
import { ref } from 'vue'
const activeTab = ref('overview')
</script>

<template>
  <AgDSTabs v-model="activeTab">
    <AgDSTabList aria-label="Application sections">
      <AgDSTab value="overview">Overview</AgDSTab>
      <AgDSTab value="eligibility">Eligibility</AgDSTab>
    </AgDSTabList>
    <AgDSTabPanel value="overview">…</AgDSTabPanel>
    <AgDSTabPanel value="eligibility">…</AgDSTabPanel>
  </AgDSTabs>
</template>
```

## bodyAlt background

Use `background="bodyAlt"` when the tabs sit on an off-white (`bodyAlt`) background.

```vue
<template>
  <AgDSTabs default-value="a" background="bodyAlt">
    <AgDSTabList aria-label="Sections">
      <AgDSTab value="a">Section A</AgDSTab>
      <AgDSTab value="b">Section B</AgDSTab>
    </AgDSTabList>
    <AgDSTabPanel value="a">…</AgDSTabPanel>
    <AgDSTabPanel value="b">…</AgDSTabPanel>
  </AgDSTabs>
</template>
```

## Contained panels

By default, tab panels have a border and padding that visually contain the content. Set `contained="false"` to remove this styling when the panel content provides its own layout.

```vue
<template>
  <AgDSTabs default-value="a" :contained="false">
    <AgDSTabList aria-label="Sections">
      <AgDSTab value="a">Section A</AgDSTab>
      <AgDSTab value="b">Section B</AgDSTab>
    </AgDSTabList>
    <AgDSTabPanel value="a">…</AgDSTabPanel>
    <AgDSTabPanel value="b">…</AgDSTabPanel>
  </AgDSTabs>
</template>
```

## Disabled tab

Use the `disabled` prop on `AgDSTab` to prevent a tab from being selected.

```vue
<template>
  <AgDSTabs default-value="active">
    <AgDSTabList aria-label="Sections">
      <AgDSTab value="active">Active</AgDSTab>
      <AgDSTab value="pending" disabled>Pending review</AgDSTab>
    </AgDSTabList>
    <AgDSTabPanel value="active">…</AgDSTabPanel>
    <AgDSTabPanel value="pending">…</AgDSTabPanel>
  </AgDSTabs>
</template>
```

## Props — AgDSTabs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | — | Controlled active tab value. Use with `v-model` |
| `defaultValue` | `string` | — | Initial active tab for uncontrolled use |
| `background` | `'body' \| 'bodyAlt'` | `'body'` | Background variant — adjusts active indicator and hover colours |
| `contained` | `boolean` | `true` | Adds border and padding to tab panels |

## Props — AgDSTab

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | **Required.** Unique identifier matching a `AgDSTabPanel` `value` |
| `disabled` | `boolean` | `false` | Prevents the tab from being selected |

## Props — AgDSTabPanel

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | **Required.** Unique identifier matching a `AgDSTab` `value` |

## Props — AgDSTabList

Passes all attributes (including `aria-label` / `aria-labelledby`) through to the underlying `tablist` element.

## Events — AgDSTabs

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
- **Labelling**: provide `aria-label` or `aria-labelledby` on `AgDSTabList` to describe the purpose of the tab group
- **Selection**: `aria-selected` toggled automatically on each tab
- **Association**: `aria-controls` and `aria-labelledby` link each tab to its panel
- **Keyboard**: follows the [ARIA tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) — arrow keys move between tabs, Enter/Space activates

## Changelog

### 0.1.0

- Initial release — `v-model`, `defaultValue`, `background`, `contained`, `disabled` tab prop
