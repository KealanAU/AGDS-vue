<script setup lang="ts">
import AgDSHeading from './AGDSHeading.vue'
</script>

<template>
  <AgDSHeading type="h5" v-bind="$attrs">
    <slot />
  </AgDSHeading>
</template>
