<script setup lang="ts">
import AgDSHeading from './AGDSHeading.vue'
</script>

<template>
  <AgDSHeading type="h6" v-bind="$attrs">
    <slot />
  </AgDSHeading>
</template>
