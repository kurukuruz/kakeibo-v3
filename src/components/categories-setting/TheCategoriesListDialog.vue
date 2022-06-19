<script setup lang="ts">
import Dialog from 'primevue/dialog';
import { computed } from 'vue';

interface IProps {
  display: boolean,
}

interface IEmits {
  (e: 'update:display', value: boolean): void,
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const innerDisplay = computed({
  get: () => props.display,
  set: (newVal) => {
    emit('update:display', newVal);
  },
});
</script>

<template>
  <Dialog
    v-model:visible="innerDisplay"
    :modal="true"
    class="p-dialog-maximized"
  >
    test
  </Dialog>
</template>
