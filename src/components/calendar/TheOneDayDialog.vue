<script setup lang="ts">
import { Dayjs } from 'dayjs';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { computed, ref } from 'vue';
import { asJPY } from '../../commons/currency-utils';
import { IEntryDoc } from '../../domains/entry';
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

const goPrevDate = () => {
  const newVal = innerDate.value.subtract(1, 'day');
  innerDate.value = newVal;
};
const goNextDate = () => {
  const newVal = innerDate.value.add(1, 'day');
  innerDate.value = newVal;
};

const entryFormStore = useEntryFormStore();
const showAddEntryDialog = () => {
  entryFormStore.setNewEntry(props.date);
  entryFormStore.showDialog();
};

const entryListStore = useEntryListStore();
const entries = computed(() => entryListStore.selectByDate(innerDate.value.format('YYYY-MM-DD')));

const strOfSumAmount = (eAry: IEntryDoc[]) => {
  if (eAry.length) {
    const sum = eAry.map((e) => e.amount).reduce((prev, curr) => prev + curr, 0);
    return asJPY(sum);
  }
  return '-';
};
const income = computed(() => {
  const incomeEntries = entries.value.filter((e) => e.division === 'income');
  return strOfSumAmount(incomeEntries);
});
const payout = computed(() => {
  const payoutEntries = entries.value.filter((e) => e.division === 'payout');
  return strOfSumAmount(payoutEntries);
});
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
      <div class="grid">
        <div class="col-6 flex justify-content-between text-income">
          <div>収入</div>
          <div>{{ income }}</div>
        </div>
        <div class="col-6 flex justify-content-between text-payout">
          <div>支出</div>
          <div>{{ payout }}</div>
        </div>
      </div>
    </template>
  </Dialog>
</template>
