<script setup lang="ts">
import dayjs from 'dayjs';
import { daysOfMonth } from '../../commons/calendar-utils';
import WeekHeader from './WeekHeader.vue';
import DayOfMonth from './DayOfMonth.vue';

const today = dayjs();
const days = daysOfMonth(today);
</script>

<template>
  <div class="surface-800 flex flex-column row-gap-1px p-1px">
    <div class="flex gap-1px">
      <WeekHeader
        v-for="day in days[0]"
        :key="day.unix()"
        :value="day.format('ddd')"
        :dow="day.day()"
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
        :value="day.date()"
        :dow="day.day()"
        :today="day.isSame(today, 'date')"
        class="col"
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
