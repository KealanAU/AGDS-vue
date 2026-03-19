<script setup lang="ts">
defineProps<{
  /** 'default' | 'body-alt' | 'uncontained' | 'disabled' */
  variant?: string
}>()
</script>

<template>
  <!-- default -->
  <AGDSTabs v-if="!variant || variant === 'default'" default-value="overview">
    <AGDSTabList aria-label="Application sections">
      <AGDSTab value="overview">Overview</AGDSTab>
      <AGDSTab value="eligibility">Eligibility</AGDSTab>
      <AGDSTab value="documents">Documents</AGDSTab>
    </AGDSTabList>
    <AGDSTabPanel value="overview"><p>Overview content goes here.</p></AGDSTabPanel>
    <AGDSTabPanel value="eligibility"><p>Eligibility requirements go here.</p></AGDSTabPanel>
    <AGDSTabPanel value="documents"><p>Required documents go here.</p></AGDSTabPanel>
  </AGDSTabs>

  <!-- body-alt -->
  <AGDSTabs v-else-if="variant === 'body-alt'" default-value="a" background="bodyAlt">
    <AGDSTabList aria-label="Sections">
      <AGDSTab value="a">Section A</AGDSTab>
      <AGDSTab value="b">Section B</AGDSTab>
      <AGDSTab value="c">Section C</AGDSTab>
    </AGDSTabList>
    <AGDSTabPanel value="a"><p>Content for Section A.</p></AGDSTabPanel>
    <AGDSTabPanel value="b"><p>Content for Section B.</p></AGDSTabPanel>
    <AGDSTabPanel value="c"><p>Content for Section C.</p></AGDSTabPanel>
  </AGDSTabs>

  <!-- uncontained -->
  <AGDSTabs v-else-if="variant === 'uncontained'" default-value="a" :contained="false">
    <AGDSTabList aria-label="Sections">
      <AGDSTab value="a">Section A</AGDSTab>
      <AGDSTab value="b">Section B</AGDSTab>
    </AGDSTabList>
    <AGDSTabPanel value="a"><p>Panel without border or padding.</p></AGDSTabPanel>
    <AGDSTabPanel value="b"><p>Another uncontained panel.</p></AGDSTabPanel>
  </AGDSTabs>

  <!-- disabled -->
  <AGDSTabs v-else-if="variant === 'disabled'" default-value="active">
    <AGDSTabList aria-label="Sections">
      <AGDSTab value="active">Active</AGDSTab>
      <AGDSTab value="pending" disabled>Pending review</AGDSTab>
      <AGDSTab value="closed" disabled>Closed</AGDSTab>
    </AGDSTabList>
    <AGDSTabPanel value="active"><p>This tab is selectable.</p></AGDSTabPanel>
    <AGDSTabPanel value="pending"><p>This tab is disabled.</p></AGDSTabPanel>
    <AGDSTabPanel value="closed"><p>This tab is disabled.</p></AGDSTabPanel>
  </AGDSTabs>
</template>
