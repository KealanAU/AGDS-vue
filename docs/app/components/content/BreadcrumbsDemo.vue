<script setup lang="ts">
import { AgDSBreadcrumbs } from 'AGDS-vue'

const props = defineProps<{
  /** 'basic' | 'collapsed' */
  variant?: string
}>()

const basicLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { label: 'Apply for a permit' },
]

const collapsedLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/services/permits', label: 'Permits' },
  { href: '/services/permits/building', label: 'Building' },
  { label: 'Apply for a permit' },
]

const links = computed(() => (props.variant === 'collapsed' ? collapsedLinks : basicLinks))
</script>

<template>
  <AgDSBreadcrumbs :links="links" />
</template>
