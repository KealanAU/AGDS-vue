<script setup lang="ts">
import { computed, ref } from 'vue'
import { AgDSSideNav } from 'AGDS-vue'
import type { SideNavItem } from 'AGDS-vue'

const props = defineProps<{
  /** 'default' | 'always' */
  variant?: string
}>()

const items: SideNavItem[] = [
  { href: '/services', label: 'All services' },
  {
    href: '/services/health',
    label: 'Health',
    items: [
      { href: '/services/health/medicare', label: 'Medicare' },
      { href: '/services/health/aged-care', label: 'Aged care' },
    ],
  },
  {
    href: '/services/education',
    label: 'Education',
    items: [
      { href: '/services/education/schools', label: 'Schools' },
      { href: '/services/education/higher', label: 'Higher education' },
    ],
  },
  { href: '/services/contact', label: 'Contact' },
]

const activePath = ref('/services/health')

const subLevelVisible = computed(() => (props.variant === 'always' ? 'always' : 'whenActive'))
</script>

<template>
  <div style="max-width: 320px">
    <AgDSSideNav
      :active-path="activePath"
      title="Services"
      title-link="/services"
      :items="items"
      :sub-level-visible="subLevelVisible"
    />
  </div>
</template>
