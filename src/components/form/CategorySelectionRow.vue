<script setup lang="ts">
import CategoryAvatar from '../common/CategoryAvatar.vue';

export interface ICategoryOption {
  name: string;
  icon?: string;
  color?: string;
}

const props = defineProps<ICategoryOption>();
</script>

<template>
  <div class="w-4">
    <CategoryAvatar
      :icon="props.icon"
      :color="props.color"
    />
    <span class="pl-1">{{ props.name }}</span>
  </div>
</template>
