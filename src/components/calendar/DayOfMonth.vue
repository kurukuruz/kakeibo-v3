<script setup lang="ts">
import type { Dayjs } from 'dayjs';
import holidays from '@holiday-jp/holiday_jp';
import { computed, reactive } from 'vue';
import type { IEntryDoc } from '../../domains/entry';
import { useEntryListStore } from '../../stores/entry-list';

interface IProps {
  value: Dayjs;
  selected?: boolean;
  today?: boolean;
  extra?: boolean;
}

const props = defineProps<IProps>();

const color = computed(() => {
  if (props.selected) {
    return 'white';
  }
  if (props.value.day() === 0 || holidays.isHoliday(props.value.toDate())) {
    return 'crimson';
  }
  if (props.value.day() === 6) {
    return 'blueviolet';
  }
  return 'var(--p-text-color)';
});
const backgroundColor = computed(() => {
  if (props.selected) {
    if (props.value.day() === 0 || holidays.isHoliday(props.value.toDate())) {
      return 'crimson';
    }
    if (props.value.day() === 6) {
      return 'blueviolet';
    }
    return 'var(--p-text-color)';
  }
  if (props.today) {
    return 'lavender';
  }
  return '';
});
const opacity = computed(() => {
  if (props.extra) {
    return 0.6;
  }
  return 1;
});
const style = reactive({ color, backgroundColor, opacity });

const entryListStore = useEntryListStore();
const entries = computed(() => entryListStore.selectByDate(props.value.format('YYYY-MM-DD')));

const strOfSumAmount = (eAry: IEntryDoc[]) => {
  if (eAry.length) {
    const sum = eAry.map((e) => e.amount).reduce((prev, curr) => prev + curr, 0);
    return sum.toLocaleString('jp-JP');
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
  <div class="flex flex-col items-center bg-white px-0 py-0 cursor-pointer hover:bg-surface-100">
    <div
      class="text-xs w-4 h-4 rounded-full text-center"
      :style="style"
    >
      {{ props.value.date() }}
    </div>
    <div class="w-full text-xs text-right align-middle text-income">
      {{ income }}
    </div>
    <div class="w-full text-xs text-right align-middle text-payout">
      {{ payout }}
    </div>
  </div>
</template>
