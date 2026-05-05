<script setup lang="ts">
import AGDSDropdownMenu from './AGDSDropdownMenu.vue'
import AGDSDropdownMenuButton from './AGDSDropdownMenuButton.vue'
import AGDSDropdownMenuPanel from './AGDSDropdownMenuPanel.vue'
import AGDSDropdownMenuItemRadio from './AGDSDropdownMenuItemRadio.vue'
</script>

<template>
  <AGDSDropdownMenu>
    <AGDSDropdownMenuButton>Sort by</AGDSDropdownMenuButton>
    <AGDSDropdownMenuPanel>
      <AGDSDropdownMenuItemRadio :checked="true">Name</AGDSDropdownMenuItemRadio>
      <AGDSDropdownMenuItemRadio :checked="false">Date</AGDSDropdownMenuItemRadio>
    </AGDSDropdownMenuPanel>
  </AGDSDropdownMenu>
</template>
