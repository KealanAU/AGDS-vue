---
title: Loading
description: An animated loading indicator with a pulsing dot pattern and a text label. Use the inline variant inside a container, or full-screen to block the entire viewport during page-level transitions.
category: Layout
status: stable
---

## Usage

Provide a `label` — this text is shown below the dots and announced to assistive technologies.

```vue
<template>
  <AgDSLoadingBlanket label="Loading results" />
</template>
```

## Full-screen

Set `full-screen` to cover the entire viewport with a semi-transparent overlay. Use this for page-level loading states such as form submission or navigation.

```vue
<script setup>
import { ref } from 'vue'
const isSubmitting = ref(false)

async function submit() {
  isSubmitting.value = true
  await saveForm()
  isSubmitting.value = false
}
</script>

<template>
  <AgDSLoadingBlanket
    v-if="isSubmitting"
    full-screen
    label="Saving your application"
  />
</template>
```

## Controlled visibility

Toggle the blanket with `v-if` based on your loading state. The live region announces the label immediately when the element mounts.

```vue
<script setup>
import { ref } from 'vue'
const loading = ref(false)
const data = ref(null)

async function load() {
  loading.value = true
  data.value = await fetchData()
  loading.value = false
}
</script>

<template>
  <div style="position: relative; min-height: 10rem;">
    <AgDSLoadingBlanket v-if="loading" label="Loading content" />
    <div v-else>{{ data }}</div>
  </div>
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Text shown below the dots and announced to assistive technologies |
| `fullScreen` | `boolean` | `false` | Covers the entire viewport with a semi-transparent overlay |

## Accessibility

- The label is rendered in a live region: `role="alert"` (assertive) for full-screen, `role="status"` (polite) for inline — matching the urgency of each use case (WCAG 4.1.3)
- Animated dots are `aria-hidden="true"` — purely decorative
- Full-screen: use `v-if` rather than `v-show` so the live region is injected fresh and the announcement fires on mount

## Changelog

### 0.1.0

- Initial release — `label`, `fullScreen`
