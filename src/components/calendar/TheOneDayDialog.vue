<script setup lang="ts">
import { Dayjs } from 'dayjs';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { computed, ref } from 'vue';

interface IProps {
  date: Dayjs;
  buttonLabel?: string;
  buttonIcon?: string;
  buttonIconPos?: 'left' | 'right' | 'top' | 'bottom';
  buttonClass?: string;
}

interface IEmits {
  (e: 'update:date', value: Dayjs): void,
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const innerDate = computed({
  get: () => props.date,
  set: (newVal) => {
    emit('update:date', newVal);
  },
});

const display = ref(false);

const refresh = (date: Dayjs) => {
  console.log(`show with: ${date.format('YYYY-MM-DD HH:mm:ss.SSSZ')}`);
};

const onShow = () => {
  refresh(props.date);
};

const goPrevDate = () => {
  const newVal = innerDate.value.subtract(1, 'day');
  innerDate.value = newVal;
  refresh(newVal);
};
const goNextDate = () => {
  const newVal = innerDate.value.add(1, 'day');
  innerDate.value = newVal;
  refresh(newVal);
};
</script>

<template>
  <Button
    :label="props.buttonLabel"
    :icon="props.buttonIcon"
    :icon-pos="props.buttonIconPos"
    :class="props.buttonClass"
    @click="display = true"
  />
  <Dialog
    v-model:visible="display"
    :modal="true"
    @show="onShow"
  >
    <template #header>
      <div class="flex align-items-center">
        <div class="p-dialog-title">
          {{ innerDate.format('YYYY-MM-DD') }}
        </div>
        <div class="flex-grow-1">
          <!-- spacer -->
        </div>
        <Button
          icon="pi pi-chevron-left"
          class="p-button-text p-button-rounded p-button-secondary"
          @click="goPrevDate"
        />
        <Button
          icon="pi pi-chevron-right"
          class="p-button-text p-button-rounded p-button-secondary"
          @click="goNextDate"
        />
      </div>
    </template>
    Content
  </Dialog>
</template>
