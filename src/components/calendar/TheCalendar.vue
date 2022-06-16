<script setup lang="ts">
import dayjs from 'dayjs';
import Button from 'primevue/button';
import { ref, watch } from 'vue';
import { daysOfMonth } from '../../commons/calendar-utils';
import WeekHeader from './WeekHeader.vue';
import DayOfMonth from './DayOfMonth.vue';
import TheOneDayDialog from './TheOneDayDialog.vue';
import TheFormDialog from '../form/TheFormDialog.vue';
import { useEntryFormStore } from '../../stores/entry-form';

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
</style>

<style>
.text-income {
  color: blue;
}
.text-payout {
  color: red;
}
</style>
