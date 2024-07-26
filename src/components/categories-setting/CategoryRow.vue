<script setup lang="ts">
import Button from 'primevue/button';
import { ICategoryDoc } from '../../domains/category';
import CategoryAvatar from '../common/CategoryAvatar.vue';

interface IProps {
  category: ICategoryDoc;
}

interface IEmits {
  (e: 'callEdit'): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const callEdit = () => {
  emit('callEdit');
};
</script>

<template>
  <div class="flex align-items-center p-2">
    <CategoryAvatar
      :icon="props.category.icon"
      :color="props.category.color"
    />
    <div class="pl-1">
      {{ props.category.name }}
    </div>
    <div class="flex-grow-1">
      <!-- spacer -->
    </div>
    <Button
      icon="pi pi-pencil"
      class="p-button-text p-button-rounded p-button-secondary"
      @click="callEdit"
    />
  </div>
</template>
