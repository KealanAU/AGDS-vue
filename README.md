# AGDS-vue

**Agriculture Design System (AgDS) as accessible Vue 3 components for the Department of Agriculture, Fisheries and Forestry.**

[![npm](https://img.shields.io/npm/v/AGDS-vue)](https://www.npmjs.com/package/AGDS-vue)
[![License: MIT](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

[Visit the AgDS website](https://design-system.agriculture.gov.au/)

---

## What is AGDS-vue?

`AGDS-vue` is an open-source Vue 3 component library implementing the
[Agriculture Design System (AgDS)](https://design-system.agriculture.gov.au/).
It provides a suite of tools and guidelines to help designers and developers build the steel
threads of the Export Service with efficiency and consistency.

Every interactive component is built on top of **[Reka UI](https://reka-ui.com)**
accessibility primitives — giving you correct keyboard navigation, ARIA attributes, and
focus management out of the box, without any custom wheel-reinvention.

---

## Install

```bash
pnpm add AGDS-vue
# or
npm install AGDS-vue
# or
yarn add AGDS-vue
```

`vue` is a peer dependency — install it alongside if you haven't already:

```bash
pnpm add vue
```

---

## Quick start

### Register all components globally

```ts
// main.ts
import { createApp } from 'vue'
import AgDSVue from 'AGDS-vue'
import 'AGDS-vue/styles'
import App from './App.vue'

createApp(App).use(AgDSVue).mount('#app')
```

```vue
<template>
  <AgDSButton variant="primary" @click="handleSubmit">
    Submit application
  </AgDSButton>
</template>
```

### Import individually (tree-shakeable)

```vue
<script setup>
import { AgDSButton } from 'AGDS-vue'
import 'AGDS-vue/styles'
</script>

<template>
  <AgDSButton variant="secondary">Cancel</AgDSButton>
</template>
```

---

## Documentation

Full documentation, live examples, and a props reference are available at:

**[kealanau.github.io/AGDS-vue](https://kealanau.github.io/AGDS-vue/)**

Or run the docs locally:

```bash
git clone https://github.com/KealanAU/AGDS-vue
cd AGDS-vue
pnpm install
pnpm build:lib
pnpm dev
# → http://localhost:3000
```

---

## Components

| Category | Examples |
|----------|---------|
| Content | Callout, Card, Heading, Text, Divider |
| Forms | Button, Checkbox, DatePicker, FileInput, Select |
| Layout | Box, Columns, Flex, Stack, AppLayout |
| Navigation | MainNav, SideNav, Tabs, Breadcrumbs, Pagination |

---

## Built on Reka UI

Interactive components delegate keyboard navigation, ARIA, and focus management to
[Reka UI](https://reka-ui.com) primitives, imported from the `reka-ui` package.

This means:

- No custom focus traps
- No custom keyboard handlers
- WCAG 2.2 AA keyboard and screen reader support by default

Reka UI is bundled as a dependency — no separate install needed.

---

## Design tokens

All styles use `--agds-*` CSS custom properties, making it easy to override or
extend the design language without touching component code:

```css
:root {
  --agds-color-brand: #00698f;
  --agds-color-focus: #9263de;
  --agds-color-text:  #313131;
  /* ... 60+ tokens */
}
```

No Tailwind. No external CSS frameworks. One `import 'AGDS-vue/styles'`.

---

## Digital Service Standard

This library is designed to help teams meet the
[Digital Service Standard](https://www.dta.gov.au/help-and-advice/about-digital-service-standard).

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full guide. In short:

1. Check [reka-ui.com](https://reka-ui.com) for the right primitive
2. Build the component in `packages/AGDS-vue/src/components/`
3. Style with `--agds-*` tokens only
4. Write tests including axe-core accessibility check
5. Add a docs page in `docs/content/components/`
6. Open a PR

---

## Acknowledgement of Country

We acknowledge the Traditional Custodians of Country throughout Australia and their
continuing connection to land, sea, and community.
We pay our respects to Elders past and present.

---

## License

[MIT](./LICENSE) © 2024 Department of Agriculture, Fisheries and Forestry, © 2026 Kealan Clarke


