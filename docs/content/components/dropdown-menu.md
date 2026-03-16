---
title: Dropdown Menu
description: A button that opens a panel of menu items. Supports links, actions, radio selections, dividers, and grouped items with full keyboard navigation.
category: Navigation
status: stable
---

## Usage

`AgDSDropdownMenu` composes a button and a panel. The panel opens below the button and closes when an item is selected, Escape is pressed, or the user clicks outside.

```vue
<template>
  <AgDSDropdownMenu>
    <AgDSDropdownMenuButton>Options</AgDSDropdownMenuButton>
    <AgDSDropdownMenuPanel>
      <AgDSDropdownMenuItem @select="() => {}">Edit</AgDSDropdownMenuItem>
      <AgDSDropdownMenuItem @select="() => {}">Duplicate</AgDSDropdownMenuItem>
      <AgDSDropdownMenuDivider />
      <AgDSDropdownMenuItem @select="() => {}">Delete</AgDSDropdownMenuItem>
    </AgDSDropdownMenuPanel>
  </AgDSDropdownMenu>
</template>
```

## Link items

Use `AgDSDropdownMenuItemLink` for items that navigate rather than trigger an action.

```vue
<template>
  <AgDSDropdownMenu>
    <AgDSDropdownMenuButton>My account</AgDSDropdownMenuButton>
    <AgDSDropdownMenuPanel>
      <AgDSDropdownMenuItemLink href="/profile">Profile</AgDSDropdownMenuItemLink>
      <AgDSDropdownMenuItemLink href="/settings">Settings</AgDSDropdownMenuItemLink>
      <AgDSDropdownMenuDivider />
      <AgDSDropdownMenuItemLink href="/logout">Sign out</AgDSDropdownMenuItemLink>
    </AgDSDropdownMenuPanel>
  </AgDSDropdownMenu>
</template>
```

## Radio items

Use `AgDSDropdownMenuItemRadio` inside `AgDSDropdownMenuGroup` to build a single-select list. The group requires a `label` for screen readers.

```vue
<script setup>
import { ref } from 'vue'
const sort = ref('newest')
</script>

<template>
  <AgDSDropdownMenu>
    <AgDSDropdownMenuButton>Sort by</AgDSDropdownMenuButton>
    <AgDSDropdownMenuPanel>
      <AgDSDropdownMenuGroup label="Sort order">
        <AgDSDropdownMenuItemRadio value="newest" v-model="sort">Newest first</AgDSDropdownMenuItemRadio>
        <AgDSDropdownMenuItemRadio value="oldest" v-model="sort">Oldest first</AgDSDropdownMenuItemRadio>
        <AgDSDropdownMenuItemRadio value="alpha" v-model="sort">Alphabetical</AgDSDropdownMenuItemRadio>
      </AgDSDropdownMenuGroup>
    </AgDSDropdownMenuPanel>
  </AgDSDropdownMenu>
</template>
```

## Groups and dividers

Use `AgDSDropdownMenuGroup` with a `label` to visually and semantically group related items. Use `AgDSDropdownMenuDivider` to separate groups.

```vue
<template>
  <AgDSDropdownMenu>
    <AgDSDropdownMenuButton>Actions</AgDSDropdownMenuButton>
    <AgDSDropdownMenuPanel>
      <AgDSDropdownMenuGroup label="Manage">
        <AgDSDropdownMenuItem @select="() => {}">Edit</AgDSDropdownMenuItem>
        <AgDSDropdownMenuItem @select="() => {}">Duplicate</AgDSDropdownMenuItem>
      </AgDSDropdownMenuGroup>
      <AgDSDropdownMenuDivider />
      <AgDSDropdownMenuGroup label="Danger zone">
        <AgDSDropdownMenuItem @select="() => {}">Archive</AgDSDropdownMenuItem>
        <AgDSDropdownMenuItem @select="() => {}">Delete</AgDSDropdownMenuItem>
      </AgDSDropdownMenuGroup>
    </AgDSDropdownMenuPanel>
  </AgDSDropdownMenu>
</template>
```

## Props — AgDSDropdownMenuButton

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'tertiary'` | `'secondary'` | Button visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Prevents the menu from opening |

## Props — AgDSDropdownMenuItem / AgDSDropdownMenuItemLink

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Prevents selection |
| `href` | `string` | — | _(Link only)_ Navigation target |

## Props — AgDSDropdownMenuItemRadio

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | **Required.** The value this item represents |
| `modelValue` | `string` | — | Currently selected value. Use with `v-model` |
| `disabled` | `boolean` | `false` | Prevents selection |

## Props — AgDSDropdownMenuGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Accessible label for the group |

## Events — AgDSDropdownMenuItem

| Event | Payload | Description |
|-------|---------|-------------|
| `select` | `void` | Emitted when the item is activated |

## Events — AgDSDropdownMenuItemRadio

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Emitted when this item is selected |

## Keyboard navigation

| Key | Behaviour |
|-----|-----------|
| `Enter` / `Space` | Open menu; activate focused item |
| `ArrowDown` | Open menu / move to next item |
| `ArrowUp` | Open menu (focus last item) / move to previous item |
| `Home` | Move focus to first item |
| `End` | Move focus to last item |
| `Escape` | Close menu and return focus to button |
| Character | Jump to first item starting with that character |

## Accessibility

- **Pattern**: custom listbox with `aria-activedescendant` tracking
- **Button**: `aria-haspopup="listbox"`, `aria-controls` pointing to panel, `aria-expanded` toggled
- **Panel**: `role="listbox"` with `aria-labelledby` pointing to the button
- **Items**: `role="option"` with `aria-selected` or `role="radio"` with `aria-checked` for radio items
- **Groups**: `role="group"` with `aria-label`
- **Focus**: focus stays on the button; arrow key navigation updates `aria-activedescendant`

## Changelog

### 0.1.0

- Initial release — action items, link items, radio items, groups, dividers, full keyboard navigation
