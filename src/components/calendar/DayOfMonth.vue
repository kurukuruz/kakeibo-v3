<script setup lang="ts">
import { reactive } from 'vue';

interface IProps {
  value: number | string;
  selected?: boolean;
  today?: boolean;
  dow?: number | string;
}

const props = defineProps<IProps>();

const style = reactive({ color: '', backgroundColor: '' });
if (props.dow === 'Sat' || props.dow === 6) {
  style.color = 'blueviolet';
} else if (props.dow === 'Sun' || props.dow === 0) {
  style.color = 'crimson';
} else {
  style.color = '#424242';
}
if (props.today) {
  style.backgroundColor = 'lavender';
}
</script>

<template>
  <div class="flex flex-column align-items-center bg-white px-1 py-0">
    <div
      class="text-xs w-1rem h-1rem border-circle"
      :style="style"
    >
      {{ value }}
    </div>
    <div class="w-full text-right">
      -
    </div>
    <div class="w-full text-right">
      -
    </div>
  </div>
</template>
