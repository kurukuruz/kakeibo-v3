<script setup lang="ts">
import { computed, reactive } from 'vue';

interface IProps {
  value: number | string;
  selected?: boolean;
  today?: boolean;
  extra?: boolean;
  dow?: number | string;
}

const props = defineProps<IProps>();

const color = computed(() => {
  if (props.selected) {
    return 'white';
  } if (props.dow === 'Sat' || props.dow === 6) {
    return 'blueviolet';
  } if (props.dow === 'Sun' || props.dow === 0) {
    return 'crimson';
  }
  return 'var(--text-color)';
});
const backgroundColor = computed(() => {
  if (props.selected) {
    if (props.dow === 'Sat' || props.dow === 6) {
      return 'blueviolet';
    } if (props.dow === 'Sun' || props.dow === 0) {
      return 'crimson';
    }
    return 'var(--text-color)';
  } if (props.today) {
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
