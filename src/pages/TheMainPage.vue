<script setup lang="ts">
import TheAppBar from '../components/appmenu/TheAppBar.vue';
import TheCalendar from '../components/calendar/TheCalendar.vue';
import { useCategoryListStore } from '../stores/category-list';

const categoryListStore = useCategoryListStore();
categoryListStore.load('default');
</script>

<template>
  <div class="app-bar">
    <TheAppBar />
  </div>
  <div class="content">
    <TheCalendar />
  </div>
</template>

<style scoped>
.app-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3.5rem;
  z-index: 1;
  background-color: white;
  box-shadow: 0 2px 4px rgb(0 0 0 / 50%);;
}
.content {
  margin-top: 4rem;
}
</style>
