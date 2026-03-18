<script setup lang="ts">
import AGDSHeading from './AGDSHeading.vue'
</script>

<template>
  <AGDSHeading type="h3" v-bind="$attrs">
    <slot />
  </AGDSHeading>
</template>
