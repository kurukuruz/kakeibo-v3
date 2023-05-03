<script setup lang="ts">
interface IProps {
  label: string,
  color: string,
}

const props = defineProps<IProps>();
</script>

<template>
  <div
    class="flex align-items-center mx-2"
  >
    <div
      class="legend-square"
      :style="{ backgroundColor: props.color }"
    >
      <!-- 凡例の四角 -->
    </div>
    <div class="text-sm white-space-nowrap ml-1">
      {{ props.label }}
    </div>
  </div>
</template>

<style scoped>
.legend-square {
  width: 0.75rem;
  height: 0.75rem;
}
</style>
