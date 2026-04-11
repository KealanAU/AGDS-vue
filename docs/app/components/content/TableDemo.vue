<script setup lang="ts">
defineProps<{
  variant?: string
}>()
</script>

<template>
  <!-- Striped variant -->
  <AGDSTable v-if="variant === 'striped'" striped>
    <AGDSTableHead>
      <AGDSTableRow>
        <AGDSTableHeader>Name</AGDSTableHeader>
        <AGDSTableHeader>Role</AGDSTableHeader>
      </AGDSTableRow>
    </AGDSTableHead>
    <AGDSTableBody>
      <AGDSTableRow>
        <AGDSTableCell>Alice</AGDSTableCell>
        <AGDSTableCell>Admin</AGDSTableCell>
      </AGDSTableRow>
      <AGDSTableRow>
        <AGDSTableCell>Bob</AGDSTableCell>
        <AGDSTableCell>Editor</AGDSTableCell>
      </AGDSTableRow>
      <AGDSTableRow>
        <AGDSTableCell>Carol</AGDSTableCell>
        <AGDSTableCell>Viewer</AGDSTableCell>
      </AGDSTableRow>
    </AGDSTableBody>
  </AGDSTable>

  <!-- Default variant -->
  <AGDSTable v-else>
    <AGDSTableHead>
      <AGDSTableRow>
        <AGDSTableHeader>Name</AGDSTableHeader>
        <AGDSTableHeader>Department</AGDSTableHeader>
        <AGDSTableHeader>Status</AGDSTableHeader>
      </AGDSTableRow>
    </AGDSTableHead>
    <AGDSTableBody>
      <AGDSTableRow>
        <AGDSTableCell>Alice Smith</AGDSTableCell>
        <AGDSTableCell>Finance</AGDSTableCell>
        <AGDSTableCell>Active</AGDSTableCell>
      </AGDSTableRow>
      <AGDSTableRow>
        <AGDSTableCell>Bob Jones</AGDSTableCell>
        <AGDSTableCell>HR</AGDSTableCell>
        <AGDSTableCell>Inactive</AGDSTableCell>
      </AGDSTableRow>
    </AGDSTableBody>
  </AGDSTable>
</template>
