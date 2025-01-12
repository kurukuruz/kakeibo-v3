<script setup lang="ts">
import dayjs from 'dayjs';
import Button from 'primevue/button';
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { daysOfMonth } from '../../commons/calendar-utils';
import WeekHeader from './WeekHeader.vue';
import DayOfMonth from './DayOfMonth.vue';
import TheOneDayDialog from './TheOneDayDialog.vue';
import AggregatedValue from './AggregatedValue.vue';
import TheFormDialog from '../form/TheFormDialog.vue';
import TheMonthTotalsForEachCategory from '../stats/TheMonthTotalsForEachCategory.vue';
import { useEntryFormStore } from '../../stores/entry-form';
import { useEntryListStore } from '../../stores/entry-list';
import { useBookListStore } from '../../stores/book-list';
import type { IEntryDoc } from '../../domains/entry';

const today = dayjs();
const target = ref(today);
const days = ref(daysOfMonth(target.value));
watch(target, (curr, prev) => {
  if (!curr.isSame(prev, 'month')) {
    days.value = daysOfMonth(target.value);
  }
});

const goPrevMonth = () => {
  target.value = target.value.subtract(1, 'month');
};
const goNextMonth = () => {
  target.value = target.value.add(1, 'month');
};
const goToday = () => {
  target.value = today;
};

const entryFormStore = useEntryFormStore();
const showAddEntryDialog = () => {
  entryFormStore.setNewEntry(target.value);
  entryFormStore.showDialog();
};

const bookListStore = useBookListStore();
const { activeBookId } = storeToRefs(bookListStore);

const entryListStore = useEntryListStore();

const startSubscribe = () => {
  if (!activeBookId.value) return;
  entryListStore.subscribe(
    activeBookId.value,
    days.value[0][0].format('YYYY-MM-DD'),
    days.value.slice(-1)[0].slice(-1)[0].format('YYYY-MM-DD'),
  );
};
startSubscribe();
watch([days, activeBookId], startSubscribe);

const entriesOfMonth = computed(() => entryListStore.selectByYM(target.value.format('YYYY-MM')));
const sumAmount = (eAry: IEntryDoc[]) => {
  if (eAry.length) {
    const sum = eAry.map((e) => e.amount).reduce((prev, curr) => prev + curr, 0);
    return sum;
  }
  return undefined;
};
const incomeMonth = computed(() => {
  const incomeEntries = entriesOfMonth.value.filter((e) => e.division === 'income');
  return sumAmount(incomeEntries);
});
const payoutMonth = computed(() => {
  const payoutEntries = entriesOfMonth.value.filter((e) => e.division === 'payout');
  return sumAmount(payoutEntries);
});
const balanceMonth = computed(() => {
  if (!incomeMonth.value && !payoutMonth.value) {
    return undefined;
  }
  const i = incomeMonth.value ? incomeMonth.value : 0;
  const p = payoutMonth.value ? payoutMonth.value : 0;
  return i - p;
});
</script>

<template>
  <TheFormDialog />
  <div class="bg-surface-800 grid grid-cols-7 gap-1px p-1px">
    <div class="col-span-7 flex items-center bg-white gap-1 p-1">
      <Button
        icon="mdi mdi-calendar-today"
        class="p-button-text p-button-rounded p-button-secondary"
        @click="goToday"
      />
      <div>{{ target.month() + 1 }}<small class="text-surface-500 dark:text-surface-300">&nbsp;{{ target.year() }}</small></div>
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
      <div class="grow">
        <!-- spacer -->
      </div>
      <TheOneDayDialog
        v-model:date="target"
        button-icon="pi pi-list"
        button-class="p-button-text p-button-rounded p-button-secondary"
      />
    </div>
    <WeekHeader
      v-for="day in ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']"
      :key="day"
      :value="day"
      :dow="day"
      class="flex-1"
    />
    <template
      v-for="week in days"
      :key="week[0].unix()"
    >
      <DayOfMonth
        v-for="day in week"
        :key="day.unix()"
        :value="day"
        :today="day.isSame(today, 'date')"
        :extra="!day.isSame(target, 'month')"
        :selected="day.isSame(target, 'date')"
        class="flex-1"
        @click="target = day"
      />
    </template>
    <div class="flex items-center justify-center bg-white p-1">
      <TheMonthTotalsForEachCategory
        v-model:date="target"
        button-icon="pi pi-chart-pie"
      />
    </div>
    <div class="col-span-3 flex flex-col gap-1px">
      <AggregatedValue
        division="income"
        :amount="incomeMonth"
      />
      <AggregatedValue
        division="payout"
        :amount="payoutMonth"
      />
    </div>
    <div class="col-span-3 flex">
      <AggregatedValue
        division="balance"
        :amount="balanceMonth"
        class="grow"
      />
    </div>
  </div>
  <div class="my-2">
    <Button
      class="w-full"
      icon="pi pi-plus"
      label="追加"
      @click="showAddEntryDialog"
    />
  </div>
</template>

<style scoped>
.gap-1px {
  gap: 1px;
}
.p-1px {
  padding: 1px;
}
</style>

<style>
.text-income {
  color: blue;
}
.text-payout {
  color: red;
}
</style>
