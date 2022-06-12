<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { ref } from 'vue';

interface IProps {
  date: string;
}

const props = defineProps<IProps>();

const display = ref(false);

const onShow = () => {
  console.log(`show with: ${props.date}`);
};
</script>

<template>
  <Button
    icon="pi pi-list"
    @click="display = true"
  />
  <Dialog
    v-model:visible="display"
    :modal="true"
    :header="props.date"
    @show="onShow"
  >
    Content
  </Dialog>
</template>
