<script setup lang="ts">
import Avatar from 'primevue/avatar';
import { computed } from 'vue';

export interface ICategoryOption {
  name: string;
  icon?: string;
  color?: string;
}

const props = defineProps<ICategoryOption>();

const icon = computed(() => {
  const tag = props.icon ? props.icon : 'mdi-circle-off-outline';
  return `mdi ${tag}`;
});

const color = computed(() => (props.icon ? '#FFF' : props.color));
</script>

<template>
  <div>
    <Avatar
      :icon="icon"
      shape="circle"
      :style="{ 'color': color, 'background-color': props.color}"
    />
    <span class="pl-1">{{ props.name }}</span>
  </div>
</template>
