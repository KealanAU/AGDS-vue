<script setup lang="ts">
const props = defineProps<{
  currentPage?: number
  totalPages?: number
  /** 'link' | 'buttons' */
  variant?: string
}>()

const currentPage = computed(() => props.currentPage ?? 3)
const totalPages = computed(() => props.totalPages ?? 10)
const variant = computed(() => props.variant ?? 'link')

function generateHref(page: number) {
  return `?page=${page}`
}
</script>

<template>
  <div class="pagination-demo">
    <AGDSPagination
      v-if="variant === 'link'"
      :current-page="currentPage"
      :total-pages="totalPages"
      :generate-href="generateHref"
    />
    <AGDSPaginationButtons v-else :current-page="currentPage" :total-pages="totalPages" />
  </div>
</template>

<style scoped>
.pagination-demo {
  padding: var(--agds-space-8) var(--agds-space-6);
}
</style>
