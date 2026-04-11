<script setup lang="ts">
import { DropdownMenuSeparator } from 'reka-ui'
import AGDSDivider from '../divider/AGDSDivider.vue'
</script>

<template>
  <!--
    DropdownMenuSeparator renders role="separator" with aria-orientation="horizontal".
    as-child lets our wrapper div be the actual DOM element while Reka still wires
    the separator role/aria attributes.
  -->
  <DropdownMenuSeparator as-child>
    <div class="agds-dm-divider" role="separator" aria-hidden="true">
      <AGDSDivider />
    </div>
  </DropdownMenuSeparator>
</template>

<style scoped>
.agds-dm-divider {
  padding-block: var(--agds-space-1);
}
</style>
