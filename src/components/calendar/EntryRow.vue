<script setup lang="ts">
import Button from 'primevue/button';
import { IEntryDoc } from '../../domains/entry';
import { useEntryFormStore } from '../../stores/entry-form';

interface IProps {
  entry: IEntryDoc,
}

const props = defineProps<IProps>();

const entryFormStore = useEntryFormStore();
const showEditEntryDialog = () => {
  entryFormStore.setExistingEntry(props.entry);
  entryFormStore.showDialog();
};
</script>

<template>
  <div>
    {{ props.entry.memo }}  {{ props.entry.amount }}
    <Button
      icon="pi pi-pencil"
      class="p-button-text p-button-rounded"
      @click="showEditEntryDialog"
    />
  </div>
</template>
