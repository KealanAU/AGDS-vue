<script setup lang="ts">
import { computed, ref } from 'vue'
import { AGDSSideNav } from 'agds-vue'
import type { SideNavItem } from 'agds-vue'

const props = defineProps<{
  /** 'default' | 'always' */
  variant?: string
}>()

const items: SideNavItem[] = [
  { href: '#', label: 'All services' },
  {
    href: '#health',
    label: 'Health',
    items: [
      { href: '#medicare', label: 'Medicare' },
      { href: '#aged-care', label: 'Aged care' },
    ],
  },
  {
    href: '#education',
    label: 'Education',
    items: [
      { href: '#schools', label: 'Schools' },
      { href: '#higher', label: 'Higher education' },
    ],
  },
  { href: '#contact', label: 'Contact' },
]

const activePath = ref('#health')

const subLevelVisible = computed(() => (props.variant === 'always' ? 'always' : 'whenActive'))
</script>

<template>
  <div style="max-width: 320px">
    <AGDSSideNav
      :active-path="activePath"
      title="Services"
      title-link="#"
      :items="items"
      :sub-level-visible="subLevelVisible"
    />
  </div>
</template>
