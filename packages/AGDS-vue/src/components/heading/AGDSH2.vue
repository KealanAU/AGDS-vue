<script setup lang="ts">
import AgDSHeading from './AGDSHeading.vue'
</script>

<template>
  <AgDSHeading type="h2" v-bind="$attrs">
    <slot />
  </AgDSHeading>
</template>
