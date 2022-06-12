<script setup lang="ts">
import { reactive } from 'vue';

interface IProps {
  value: string;
  dow?: number | string;
}

const props = defineProps<IProps>();

const style = reactive({ color: '' });
if (props.dow === 'Sat' || props.dow === 6) {
  style.color = 'blueviolet';
} else if (props.dow === 'Sun' || props.dow === 0) {
  style.color = 'crimson';
} else {
  style.color = '#424242';
}
</script>

<template>
  <div
    class="bg-white p-0"
    :style="style"
  >
    <span class="text-xs">{{ value }}</span>
  </div>
</template>
