<script setup lang="ts">
import { Dayjs } from 'dayjs';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Chart from 'primevue/chart';
import { computed, ref } from 'vue';
import { IEntryDoc } from '../../domains/entry';
import { useEntryListStore } from '../../stores/entry-list';

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

const goPrevMonth = () => {
  const newVal = innerDate.value.subtract(1, 'month');
  innerDate.value = newVal;
};
const goNextMonth = () => {
  const newVal = innerDate.value.add(1, 'month');
  innerDate.value = newVal;
};

const entryListStore = useEntryListStore();
const entries = computed(() => entryListStore.selectByYM(innerDate.value.format('YYYY-MM')));

const strOfSumAmount = (eAry: IEntryDoc[]) => {
  if (eAry.length) {
    const sum = eAry.map((e) => e.amount).reduce((prev, curr) => prev + curr, 0);
    return sum;
  }
  return 0;
};
const payout = computed(() => {
  const payoutEntries = entries.value.filter((e) => e.division === 'payout');
  return strOfSumAmount(payoutEntries);
});

const chartData = computed(() => ({
  labels: ['one', 'two', 'three'],
  datasets: [{
    data: [payout.value, 20000, 30000],
    backgroundColor: ['red', 'blue', 'green'],
  }],
}));
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
  >
    <template #header>
      <div class="p-dialog-title mx-2">
        <div>
          {{ innerDate.month() + 1 }}<small class="text-500">&nbsp;{{ innerDate.year() }}</small>
        </div>
      </div>
      <Button
        icon="pi pi-chevron-left"
        class="p-button-text p-button-rounded p-button-secondary"
        @click="goPrevMonth"
      />
      <Button
        icon="pi pi-chevron-right"
        class="p-button-text p-button-rounded p-button-secondary"
        @click="goNextMonth"
      />
      <div class="flex-grow-1">
        <!-- spacer -->
      </div>
    </template>
    <div>
      <Chart
        type="pie"
        :data="chartData"
        class="w-full md:w-30rem flex justify-content-center"
      />
    </div>
  </Dialog>
</template>
