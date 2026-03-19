<script setup lang="ts">
defineProps<{
  /** 'default' */
  variant?: string
}>()
</script>

<template>
  <AGDSProse v-if="!variant || variant === 'default'">
    <h2>Section heading</h2>
    <p>This paragraph is inside a prose container. Links, <strong>bold text</strong>, and <em>italics</em> are all styled automatically.</p>
    <ul>
      <li>Bullet one</li>
      <li>Bullet two</li>
    </ul>
  </AGDSProse>
</template>
