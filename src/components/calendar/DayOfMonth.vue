<script setup lang="ts">
import type { Dayjs } from 'dayjs';
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
  if (props.value.day() === 6) {
    return 'blueviolet';
  }
  if (props.value.day() === 0) {
    return 'crimson';
  }
  return 'var(--p-text-color)';
});
const backgroundColor = computed(() => {
  if (props.selected) {
    if (props.value.day() === 6) {
      return 'blueviolet';
    }
    if (props.value.day() === 0) {
      return 'crimson';
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
  <div class="flex flex-column align-items-center bg-white px-0 py-0 one-seventh cursor-pointer hover:surface-100">
    <div
      class="text-xs w-1rem h-1rem border-circle text-center"
      :style="style"
    >
      {{ props.value.date() }}
    </div>
    <div class="w-full text-xs text-right vertical-align-middle text-income">
      {{ income }}
    </div>
    <div class="w-full text-xs text-right vertical-align-middle text-payout">
      {{ payout }}
    </div>
  </div>
</template>

<style scoped>
.one-seventh {
  width: 14.2857%; /* 100/7 */
}
</style>
