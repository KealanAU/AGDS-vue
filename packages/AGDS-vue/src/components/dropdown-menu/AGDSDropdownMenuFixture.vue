<script setup lang="ts">
import AGDSDropdownMenu from './AGDSDropdownMenu.vue'
import AGDSDropdownMenuButton from './AGDSDropdownMenuButton.vue'
import AGDSDropdownMenuPanel from './AGDSDropdownMenuPanel.vue'
import AGDSDropdownMenuItem from './AGDSDropdownMenuItem.vue'
</script>

<template>
  <AGDSDropdownMenu>
    <AGDSDropdownMenuButton>Actions</AGDSDropdownMenuButton>
    <AGDSDropdownMenuPanel>
      <AGDSDropdownMenuItem>Edit</AGDSDropdownMenuItem>
      <AGDSDropdownMenuItem>Delete</AGDSDropdownMenuItem>
    </AGDSDropdownMenuPanel>
  </AGDSDropdownMenu>
</template>
