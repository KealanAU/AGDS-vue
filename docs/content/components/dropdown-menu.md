---
title: Dropdown Menu
description: A button that opens a panel of menu items. Supports links, actions, radio selections, dividers, and grouped items with full keyboard navigation.
category: Navigation
status: stable
---

## Usage

`AGDSDropdownMenu` composes a button and a panel. The panel opens below the button and closes when an item is selected, Escape is pressed, or the user clicks outside.

```vue
<template>
  <AGDSDropdownMenu>
    <AGDSDropdownMenuButton>Options</AGDSDropdownMenuButton>
    <AGDSDropdownMenuPanel>
      <AGDSDropdownMenuItem @select="() => {}">Edit</AGDSDropdownMenuItem>
      <AGDSDropdownMenuItem @select="() => {}">Duplicate</AGDSDropdownMenuItem>
      <AGDSDropdownMenuDivider />
      <AGDSDropdownMenuItem @select="() => {}">Delete</AGDSDropdownMenuItem>
    </AGDSDropdownMenuPanel>
  </AGDSDropdownMenu>
</template>
```

## Link items

Use `AGDSDropdownMenuItemLink` for items that navigate rather than trigger an action.

```vue
<template>
  <AGDSDropdownMenu>
    <AGDSDropdownMenuButton>My account</AGDSDropdownMenuButton>
    <AGDSDropdownMenuPanel>
      <AGDSDropdownMenuItemLink href="/profile">Profile</AGDSDropdownMenuItemLink>
      <AGDSDropdownMenuItemLink href="/settings">Settings</AGDSDropdownMenuItemLink>
      <AGDSDropdownMenuDivider />
      <AGDSDropdownMenuItemLink href="/logout">Sign out</AGDSDropdownMenuItemLink>
    </AGDSDropdownMenuPanel>
  </AGDSDropdownMenu>
</template>
```

## Radio items

Use `AGDSDropdownMenuItemRadio` inside `AGDSDropdownMenuGroup` to build a single-select list. The group requires a `label` for screen readers.

```vue
<script setup>
import { ref } from 'vue'
const sort = ref('newest')
</script>

<template>
  <AGDSDropdownMenu>
    <AGDSDropdownMenuButton>Sort by</AGDSDropdownMenuButton>
    <AGDSDropdownMenuPanel>
      <AGDSDropdownMenuGroup label="Sort order">
        <AGDSDropdownMenuItemRadio value="newest" v-model="sort">Newest first</AGDSDropdownMenuItemRadio>
        <AGDSDropdownMenuItemRadio value="oldest" v-model="sort">Oldest first</AGDSDropdownMenuItemRadio>
        <AGDSDropdownMenuItemRadio value="alpha" v-model="sort">Alphabetical</AGDSDropdownMenuItemRadio>
      </AGDSDropdownMenuGroup>
    </AGDSDropdownMenuPanel>
  </AGDSDropdownMenu>
</template>
```

## Groups and dividers

Use `AGDSDropdownMenuGroup` with a `label` to visually and semantically group related items. Use `AGDSDropdownMenuDivider` to separate groups.

```vue
<template>
  <AGDSDropdownMenu>
    <AGDSDropdownMenuButton>Actions</AGDSDropdownMenuButton>
    <AGDSDropdownMenuPanel>
      <AGDSDropdownMenuGroup label="Manage">
        <AGDSDropdownMenuItem @select="() => {}">Edit</AGDSDropdownMenuItem>
        <AGDSDropdownMenuItem @select="() => {}">Duplicate</AGDSDropdownMenuItem>
      </AGDSDropdownMenuGroup>
      <AGDSDropdownMenuDivider />
      <AGDSDropdownMenuGroup label="Danger zone">
        <AGDSDropdownMenuItem @select="() => {}">Archive</AGDSDropdownMenuItem>
        <AGDSDropdownMenuItem @select="() => {}">Delete</AGDSDropdownMenuItem>
      </AGDSDropdownMenuGroup>
    </AGDSDropdownMenuPanel>
  </AGDSDropdownMenu>
</template>
```

## Props — AGDSDropdownMenuButton

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'tertiary'` | `'secondary'` | Button visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `disabled` | `boolean` | `false` | Prevents the menu from opening |

## Props — AGDSDropdownMenuItem / AGDSDropdownMenuItemLink

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `disabled` | `boolean` | `false` | Prevents selection |
| `href` | `string` | — | _(Link only)_ Navigation target |

## Props — AGDSDropdownMenuItemRadio

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | **Required.** The value this item represents |
| `modelValue` | `string` | — | Currently selected value. Use with `v-model` |
| `disabled` | `boolean` | `false` | Prevents selection |

## Props — AGDSDropdownMenuGroup

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Accessible label for the group |

## Events — AGDSDropdownMenuItem

| Event | Payload | Description |
|-------|---------|-------------|
| `select` | `void` | Emitted when the item is activated |

## Events — AGDSDropdownMenuItemRadio

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
