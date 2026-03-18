<script setup lang="ts">
defineProps<{
  /** 'default' | 'statuses' | 'ordered' */
  variant?: string
}>()
</script>

<template>
  <!-- default: typical multi-step task list -->
  <AGDSTaskList
    v-if="!variant || variant === 'default'"
    :items="[
      { label: 'Personal details', status: 'done', href: '#' },
      { label: 'Employment history', status: 'doing', href: '#' },
      { label: 'References', status: 'todo', href: '#' },
      { label: 'Upload documents', status: 'blocked', href: '#' },
    ]"
  />

  <!-- statuses: one item per status value -->
  <AGDSTaskList
    v-else-if="variant === 'statuses'"
    :items="[
      { label: 'Done', status: 'done', href: '#' },
      { label: 'Done recently', status: 'doneRecently', href: '#' },
      { label: 'Doing', status: 'doing', href: '#' },
      { label: 'To do', status: 'todo', href: '#' },
      { label: 'Blocked', status: 'blocked', href: '#' },
      { label: 'Not required', status: 'notRequired', href: '#' },
    ]"
  />

  <!-- ordered: numbered layout -->
  <AGDSTaskList
    v-else-if="variant === 'ordered'"
    ordered
    :items="[
      { label: 'Eligibility check', status: 'done', href: '#' },
      { label: 'Personal information', status: 'doing', href: '#' },
      { label: 'Supporting documents', status: 'todo', href: '#' },
    ]"
  />
</template>
