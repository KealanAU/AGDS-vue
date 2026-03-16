<script setup lang="ts">
import AgDSHeading from './AGDSHeading.vue'
</script>

<template>
  <AgDSHeading type="h1" v-bind="$attrs">
    <slot />
  </AgDSHeading>
</template>
