<script setup lang="ts">
import { AgDSFeatureLinkList } from 'AGDS-vue'

const props = defineProps<{
  /** 'basic' | 'secondary' */
  variant?: string
}>()

const basicLinks = [
  { href: '#', label: 'Apply for a grant' },
  { href: '#', label: 'Check your eligibility' },
  { href: '#', label: 'Find a service near you' },
]

const secondaryLinks = [
  {
    href: '#',
    label: 'Apply for a grant',
    secondaryText: 'For individuals and small businesses affected by recent natural disasters',
  },
  {
    href: '#',
    label: 'Check your eligibility',
    secondaryText: 'Answer a few questions to see what support is available to you',
  },
]

const links = computed(() => (props.variant === 'secondary' ? secondaryLinks : basicLinks))
</script>

<template>
  <AgDSFeatureLinkList :links="links" />
</template>
