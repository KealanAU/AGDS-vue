---
title: Progress indicator
description: A vertical step list that shows where users are in a multi-step process. Each step has a status, an icon, and an optional link or button. Collapses to a toggle on mobile.
category: Layout
status: stable
---

## Usage

Pass `items` — each with a `label` and a `status`. Use `activePath` to highlight the current step.

::doc-preview
<ProgressIndicatorDemo />
::

```vue
<template>
  <AgDSProgressIndicator
    active-path="/apply/personal"
    :items="[
      { label: 'Eligibility check',   status: 'done',    href: '/apply/eligibility' },
      { label: 'Personal details',    status: 'started', href: '/apply/personal'    },
      { label: 'Contact information', status: 'todo',    href: '/apply/contact'     },
      { label: 'Review and submit',   status: 'blocked', href: '/apply/review'      },
    ]"
  />
</template>
```

## Step statuses

| Status | Icon | Label shown |
|--------|------|-------------|
| `todo` | Empty circle | Not started |
| `started` / `doing` | Clock | In progress |
| `done` | Filled check | Completed |
| `saved` | Outline check | Saved |
| `error` | Alert circle | Error |
| `blocked` | Lock | Cannot start yet |

::doc-preview{label="All statuses"}
<ProgressIndicatorDemo variant="statuses" />
::

```vue
<template>
  <AgDSProgressIndicator
    active-path="In progress step"
    :items="[
      { label: 'Completed step',   status: 'done'    },
      { label: 'In progress step', status: 'started' },
      { label: 'Not started step', status: 'todo'    },
      { label: 'Blocked step',     status: 'blocked' },
      { label: 'Error step',       status: 'error'   },
      { label: 'Saved step',       status: 'saved'   },
    ]"
  />
</template>
```

## Button steps

Omit `href` and provide `onClick` to render a step as a `<button>` instead of a link. Useful when navigating programmatically.

```vue
<script setup>
function goToStep(step) { /* navigate programmatically */ }
</script>

<template>
  <AgDSProgressIndicator
    :items="[
      { label: 'Details', status: 'done',    onClick: () => goToStep('details') },
      { label: 'Review',  status: 'started', onClick: () => goToStep('review')  },
    ]"
  />
</template>
```

## Level-2 sub-steps

Add `items` to a link step to show a nested sub-step for the active item. Sub-steps are only shown when their parent is active.

::doc-preview{label="Active sub-step"}
<ProgressIndicatorDemo variant="sub-items" />
::

```vue
<template>
  <AgDSProgressIndicator
    active-path="/apply/contact/address"
    :items="[
      { label: 'Personal details', status: 'done', href: '/apply/personal' },
      {
        label: 'Contact information',
        status: 'started',
        href: '/apply/contact',
        items: [
          { label: 'Email address',  href: '/apply/contact/email'   },
          { label: 'Postal address', href: '/apply/contact/address' },
        ],
      },
      { label: 'Review and submit', status: 'todo', href: '/apply/review' },
    ]"
  />
</template>
```

## Hide subtitle

By default a subtitle shows "X of Y steps completed" below the mobile toggle. Set `hide-subtitle` to remove it.

```vue
<template>
  <AgDSProgressIndicator
    hide-subtitle
    :items="[
      { label: 'Details', status: 'done'    },
      { label: 'Review',  status: 'started' },
    ]"
  />
</template>
```

## bodyAlt background

Use `background="bodyAlt"` when the component sits on a `--agds-color-bg-subtle` surface.

::doc-preview{label="bodyAlt background"}
<ProgressIndicatorDemo variant="bodyAlt" />
::

```vue
<template>
  <AgDSProgressIndicator
    background="bodyAlt"
    active-path="/apply/personal"
    :items="items"
  />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `ProgressIndicatorItem[]` | — | **Required.** The list of steps |
| `activePath` | `string` | — | Highlights the step whose `href` (or `label`) matches. Preferred over the legacy `isActive` field |
| `background` | `'body' \| 'bodyAlt'` | `'body'` | Background colour variant |
| `hideSubtitle` | `boolean` | `false` | Hides the "X of Y steps completed" subtitle on mobile |

### ProgressIndicatorItem

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | **Required.** Step name |
| `status` | `ProgressIndicatorItemStatus` | **Required.** Current step state — see table above |
| `href` | `string` | Renders the step as an `<a>` link |
| `onClick` | `(event: MouseEvent) => void` | Renders the step as a `<button>` (used when `href` is omitted) |
| `items` | `ProgressIndicatorLevelTwoItem[]` | Level-2 sub-steps (link items only) |

### ProgressIndicatorLevelTwoItem

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | **Required.** Sub-step name |
| `href` | `string` | **Required.** Sub-step URL |

## Accessibility

- Wrapped in `<nav aria-label="Progress">` to provide a landmark
- The active step receives `aria-current="step"` (WCAG 4.1.2)
- Active sub-steps also receive `aria-current="step"`
- Status icons are `aria-hidden="true"` — the status text ("Completed", "In progress", etc.) is always visible in the DOM
- Mobile toggle uses `aria-expanded` to communicate collapsed/expanded state
- Step connector lines are decorative and `aria-hidden="true"`

## Changelog

### 0.1.0

- Initial release — `items`, `activePath`, `background`, `hideSubtitle`, level-2 sub-steps, button steps, mobile collapse toggle
