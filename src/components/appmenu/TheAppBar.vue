<script setup lang="ts">
import Button from 'primevue/button';
import { ref } from 'vue';
import TheSideBar from './TheSideBar.vue';

const dispSideBar = ref(false);
const showSideBar = () => {
  dispSideBar.value = true;
};
</script>

<template>
  <div class="h-full w-full flex items-center gap-4 app-bar-content">
    <Button
      icon="pi pi-bars"
      class="p-button-text p-button-rounded p-button-inherit"
      @click="showSideBar"
    />
    <div class="title">
      krz家計簿
    </div>
  </div>
  <TheSideBar v-model:display="dispSideBar" />
</template>

<style scoped>
.app-bar-content {
  color: white;
  background-color: var(--p-surface-800);
}
.p-button.p-button-text.p-button-inherit {
  color: inherit;
}
.p-button.p-button-text.p-button-inherit:enabled:hover {
  color: inherit;
  background-color: var(--p-surface-500);
}
.title {
  font-size: 1.25rem;
}
</style>
