<script setup lang="ts">
export interface PropRow {
  name: string
  type: string
  default?: string
  required?: boolean
  description: string
}

defineProps<{
  props: PropRow[]
}>()
</script>

<template>
  <div class="props-table-wrapper">
    <table class="props-table">
      <thead>
        <tr>
          <th scope="col">Prop</th>
          <th scope="col">Type</th>
          <th scope="col">Default</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prop in props" :key="prop.name">
          <td>
            <code class="props-table__name">{{ prop.name }}</code>
            <span v-if="prop.required" class="props-table__required" aria-label="required">*</span>
          </td>
          <td><code class="props-table__type">{{ prop.type }}</code></td>
          <td>
            <code v-if="prop.default !== undefined" class="props-table__default">{{ prop.default }}</code>
            <span v-else class="props-table__no-default">—</span>
          </td>
          <td class="props-table__desc">{{ prop.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.props-table-wrapper {
  overflow-x: auto;
  margin-block: var(--agds-space-4);
  border: 1px solid var(--agds-color-border);
  border-radius: var(--agds-radius-md);
}

.props-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--agds-font-size-sm);
}

.props-table th,
.props-table td {
  padding: var(--agds-space-3) var(--agds-space-4);
  text-align: left;
  vertical-align: top;
  border-bottom: 1px solid var(--agds-color-border);
}

.props-table tr:last-child td {
  border-bottom: none;
}

.props-table thead th {
  background-color: var(--agds-color-bg-subtle);
  font-weight: var(--agds-font-weight-semibold);
  color: var(--agds-color-text);
  font-size: var(--agds-font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.props-table__name {
  font-family: var(--agds-font-family-mono);
  color: var(--agds-color-brand);
  background: var(--agds-color-brand-muted);
  padding: 0.1em 0.35em;
  border-radius: var(--agds-radius-sm);
}

.props-table__required {
  color: var(--agds-color-error);
  margin-left: 2px;
  font-weight: var(--agds-font-weight-bold);
}

.props-table__type {
  font-family: var(--agds-font-family-mono);
  color: var(--agds-color-text);
  background: var(--agds-color-bg-subtle);
  padding: 0.1em 0.35em;
  border-radius: var(--agds-radius-sm);
}

.props-table__default {
  font-family: var(--agds-font-family-mono);
  color: var(--agds-color-text-muted);
  background: var(--agds-color-bg-subtle);
  padding: 0.1em 0.35em;
  border-radius: var(--agds-radius-sm);
}

.props-table__no-default {
  color: var(--agds-color-text-muted);
}

.props-table__desc {
  color: var(--agds-color-text);
  line-height: var(--agds-line-height-relaxed);
}
</style>
