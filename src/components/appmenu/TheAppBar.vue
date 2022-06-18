<script setup lang="ts">
import Button from 'primevue/button';
</script>

<template>
  <div class="h-full w-full flex align-items-center gap-3 app-bar-content">
    <Button
      icon="pi pi-bars"
      class="p-button-text p-button-rounded p-button-inherit"
    />
    <div class="title">
      krz家計簿
    </div>
  </div>
</template>

<style scoped>
.app-bar-content {
  color: white;
  background-color: var(--surface-800);
}
.p-button.p-button-text.p-button-inherit {
  color: inherit;
}
.p-button.p-button-text.p-button-inherit:enabled:hover {
  color: inherit;
  background-color: var(--surface-500);
}
.title {
  font-size: 1.25rem;
}
</style>
