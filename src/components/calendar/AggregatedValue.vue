<script setup lang="ts">
import { computed } from 'vue';
import { asJPY } from '../../commons/currency-utils';
import { Division } from '../../types';

interface IProps {
  amount?: number;
  division: Division | 'balance';
}

const props = defineProps<IProps>();

const divisionName = computed(() => {
  if (props.division === 'income') {
    return '収入';
  }
  if (props.division === 'payout') {
    return '支出';
  }
  return '残高';
});
const amountStr = computed(() => {
  if (props.amount) {
    return asJPY(props.amount);
  }
  return '-';
});
</script>

<template>
  <div
    class="flex align-items-center bg-white text-sm p-1"
    :class="[`text-${props.division}`, { 'text-minus': props.amount && props.amount < 0 }]"
  >
    <div>{{ divisionName }}</div>
    <div class="flex-grow-1">
      <!-- spacer -->
    </div>
    <div class="amount">
      {{ amountStr }}
    </div>
  </div>
</template>

<style scoped>
.text-balance.text-minus .amount {
  color: red;
}
</style>
