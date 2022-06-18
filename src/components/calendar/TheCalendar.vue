<script setup lang="ts">
import dayjs from 'dayjs';
import Button from 'primevue/button';
import { computed, ref, watch } from 'vue';
import { daysOfMonth } from '../../commons/calendar-utils';
import WeekHeader from './WeekHeader.vue';
import DayOfMonth from './DayOfMonth.vue';
import TheOneDayDialog from './TheOneDayDialog.vue';
import AggregatedValue from './AggregatedValue.vue';
import TheFormDialog from '../form/TheFormDialog.vue';
import { useEntryFormStore } from '../../stores/entry-form';
import { useEntryListStore } from '../../stores/entry-list';
import { IEntryDoc } from '../../domains/entry';

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

const entryListStore = useEntryListStore();
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
  <div class="surface-800 flex flex-column row-gap-1px p-1px">
    <div class="flex align-items-center bg-white gap-1 p-1">
      <Button
        icon="pi pi-plus"
        class="p-button-text p-button-rounded p-button-secondary"
        @click="showAddEntryDialog"
      />
      <TheOneDayDialog
        v-model:date="target"
        button-icon="pi pi-list"
        button-class="p-button-text p-button-rounded p-button-secondary"
      />
      <div>{{ target.month() + 1 }}<small class="text-500">&nbsp;{{ target.year() }}</small></div>
      <div class="flex-grow-1">
        <!-- spacer -->
      </div>
      <Button
        icon="mdi mdi-calendar-today"
        class="p-button-text p-button-rounded p-button-secondary"
        @click="goToday"
      />
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
    </div>
    <div class="flex gap-1px">
      <WeekHeader
        v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']"
        :key="day"
        :value="day"
        :dow="day"
        class="col"
      />
    </div>
    <div
      v-for="week in days"
      :key="week[0].unix()"
      class="flex gap-1px"
    >
      <DayOfMonth
        v-for="day in week"
        :key="day.unix()"
        :value="day"
        :today="day.isSame(today, 'date')"
        :extra="!day.isSame(target, 'month')"
        :selected="day.isSame(target, 'date')"
        class="col"
        @click="target = day"
      />
    </div>
    <div class="flex gap-1px">
      <div class="flex-grow-1 flex flex-column row-gap-1px one-half">
        <AggregatedValue
          division="income"
          :amount="incomeMonth"
        />
        <AggregatedValue
          division="payout"
          :amount="payoutMonth"
        />
      </div>
      <div class="flex-grow-1 flex one-half">
        <AggregatedValue
          division="balance"
          :amount="balanceMonth"
          class="flex-grow-1"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.gap-1px {
  gap: 1px;
}
.row-gap-1px {
  row-gap: 1px;
}
.p-1px {
  padding: 1px;
}

.one-half {
  width: 50%;
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
