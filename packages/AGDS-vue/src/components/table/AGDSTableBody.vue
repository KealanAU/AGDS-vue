<script setup lang="ts">
/** Wraps the body rows of an `AGDSTable` in a `<tbody>` element. */
export interface AGDSTableBodyProps {}
</script>

<template>
  <tbody class="agds-table-body">
    <slot />
  </tbody>
</template>
