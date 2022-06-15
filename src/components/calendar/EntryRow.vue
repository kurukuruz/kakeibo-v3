<script setup lang="ts">
import Button from 'primevue/button';
import Avatar from 'primevue/avatar';
import { computed } from 'vue';
import { IEntryDoc } from '../../domains/entry';
import { useEntryFormStore } from '../../stores/entry-form';
import { useCategoryListStore } from '../../stores/category-list';
import { asJPY } from '../../commons/currency-utils';

interface IProps {
  entry: IEntryDoc,
}

const props = defineProps<IProps>();

const entryFormStore = useEntryFormStore();
const showEditEntryDialog = () => {
  entryFormStore.setExistingEntry(props.entry);
  entryFormStore.showDialog();
};

const categoryListStore = useCategoryListStore();
const category = computed(() => categoryListStore.categoryOf(props.entry.categoryId));
const avatarIcon = computed(() => {
  const tag = category.value?.icon ? category.value.icon : 'mdi-circle-off-outline';
  return `mdi ${tag}`;
});
const avatarColor = computed(() => (category.value?.icon ? '#FFF' : category.value?.color));
</script>

<template>
  <div class="flex align-items-center">
    <Button
      icon="pi pi-pencil"
      class="p-button-text p-button-rounded p-button-secondary"
      @click="showEditEntryDialog"
    />
    <Avatar
      :icon="avatarIcon"
      shape="circle"
      :style="{ 'color': avatarColor, 'background-color': category?.color}"
    />
    <div class="pl-1">
      <div>{{ category?.name }}</div>
      <div>{{ props.entry.memo }}</div>
    </div>
    <div class="flex-grow-1">
      <!-- spacer -->
    </div>
    <div>{{ asJPY(props.entry.amount) }}</div>
  </div>
  <div style="margin: 0.5rem 0; border-top: 1px solid var(--surface-300)" />
</template>
