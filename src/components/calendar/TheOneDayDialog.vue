<script setup lang="ts">
import { Dayjs } from 'dayjs';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { computed, ref } from 'vue';
import { useEntryFormStore } from '../../stores/entry-form';
import { useEntryListStore } from '../../stores/entry-list';
import EntryRow from './EntryRow.vue';

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

const entryFormStore = useEntryFormStore();
const showAddEntryDialog = () => {
  entryFormStore.setNewEntry(props.date);
  entryFormStore.showDialog();
};

const entryListStore = useEntryListStore();
const entries = computed(() => entryListStore.selectByDate(innerDate.value.format('YYYY-MM-DD')));
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
    class="p-dialog-maximized"
    @show="onShow"
  >
    <template #header>
      <div class="flex align-items-center">
        <Button
          icon="pi pi-plus"
          class="p-button-text p-button-rounded p-button-secondary"
          @click="showAddEntryDialog"
        />
        <div class="p-dialog-title align-self-stretch">
          <span class="vertical-align-middle">{{ innerDate.format('YYYY-MM-DD') }}</span>
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
    <EntryRow
      v-for="entry in entries"
      :key="entry.id"
      :entry="entry"
    />
    <template #footer>
      <div class="flex flex-column">
        <div class="flex justify-content-between">
          <div>収入</div>
          <div>-</div>
        </div>
        <div class="flex justify-content-between">
          <div>支出</div>
          <div>&yen;&nbsp;6,000</div>
        </div>
      </div>
    </template>
  </Dialog>
</template>
