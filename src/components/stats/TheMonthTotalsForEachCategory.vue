<script setup lang="ts">
import { Dayjs } from 'dayjs';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Chart from 'primevue/chart';
import { computed, ref } from 'vue';
import { IEntryDoc } from '../../domains/entry';
import { useEntryListStore } from '../../stores/entry-list';
import { useCategoryListStore } from '../../stores/category-list';
import LegendItem from './LegendItem.vue';

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

const categoryListStore = useCategoryListStore();
const options = computed(() => categoryListStore.categoriesListOf('payout'));

const payoutsStats = computed(() => {
  // 費目ごとに集計
  const payouts = entries.value
    .filter((e) => e.division === 'payout')
    .reduce((acc, val: IEntryDoc) => {
      if (acc[val.categoryId]) {
        acc[val.categoryId] += val.amount;
      } else {
        acc[val.categoryId] = val.amount;
      }
      return acc;
    }, {} as {[key:string]: number});
  // 選択肢の順番・色に割り当て
  return options.value
    .map((c) => ({ name: c.name, color: c.color, amount: payouts[c.id] }))
    .filter((c) => c.amount); // 使用していない費目は省略
});

const chartData = computed(() => ({
  labels: payoutsStats.value.map((s) => s.name),
  datasets: [{
    data: payoutsStats.value.map((s) => s.amount),
    backgroundColor: payoutsStats.value.map((s) => s.color),
  }],
}));

const chartOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
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
    class="p-dialog-maximized"
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
    <div class="flex flex-column justify-content-center align-items-center">
      <Chart
        type="pie"
        :data="chartData"
        :options="chartOptions"
        class="w-full md:w-30rem flex justify-content-center"
      />
      <div class="flex flex-wrap justify-content-center m-2">
        <LegendItem
          v-for="(category, idx) in payoutsStats"
          :key="idx"
          :label="category.name"
          :color="category.color"
        />
      </div>
    </div>
  </Dialog>
</template>
