<script setup lang="ts">
interface IProps {
  value: string;
  dow?: number | string;
}

const props = defineProps<IProps>();

const style = { color: '' };
if (props.dow === 'Sat' || props.dow === 6) {
  style.color = 'blueviolet';
} else if (props.dow === 'Sun' || props.dow === 0) {
  style.color = 'crimson';
} else {
  style.color = 'var(--text-color)';
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
