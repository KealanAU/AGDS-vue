<script setup lang="ts">
import { AgDSProgressIndicator } from 'AGDS-vue'
import type { ProgressIndicatorItem } from 'AGDS-vue'

const props = defineProps<{
  /** 'default' | 'statuses' | 'sub-items' | 'bodyAlt' */
  variant?: string
}>()

const defaultItems: ProgressIndicatorItem[] = [
  { label: 'Eligibility check', status: 'done', href: '/apply/eligibility' },
  { label: 'Personal details', status: 'started', href: '/apply/personal' },
  { label: 'Contact information', status: 'todo', href: '/apply/contact' },
  { label: 'Review and submit', status: 'blocked', href: '/apply/review' },
]

const allStatusItems: ProgressIndicatorItem[] = [
  { label: 'Completed step', status: 'done' },
  { label: 'In progress step', status: 'started' },
  { label: 'Not started step', status: 'todo' },
  { label: 'Blocked step', status: 'blocked' },
  { label: 'Error step', status: 'error' },
  { label: 'Saved step', status: 'saved' },
]

const subItems: ProgressIndicatorItem[] = [
  { label: 'Personal details', status: 'done', href: '/apply/personal' },
  {
    label: 'Contact information',
    status: 'started',
    href: '/apply/contact',
    items: [
      { label: 'Email address', href: '/apply/contact/email' },
      { label: 'Postal address', href: '/apply/contact/address' },
    ],
  },
  { label: 'Review and submit', status: 'todo', href: '/apply/review' },
]
</script>

<template>
  <div style="max-width: 400px; width: 100%">
    <AgDSProgressIndicator
      v-if="variant === 'statuses'"
      :items="allStatusItems"
      active-path="In progress step"
    />
    <AgDSProgressIndicator
      v-else-if="variant === 'sub-items'"
      :items="subItems"
      active-path="/apply/contact/address"
    />
    <AgDSProgressIndicator
      v-else-if="variant === 'bodyAlt'"
      :items="defaultItems"
      active-path="/apply/personal"
      background="bodyAlt"
    />
    <AgDSProgressIndicator v-else :items="defaultItems" active-path="/apply/personal" />
  </div>
</template>
