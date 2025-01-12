<script setup lang="ts">
import Button from 'primevue/button';

interface IProps {
  label: string;
  double?: boolean;
  narrow?: boolean;
}

const props = defineProps<IProps>();
</script>

<template>
  <div
    :class="{'col-span-2': props.double}"
  >
    <Button
      class="p-button-lg w-full"
      :class="{'h-8': props.narrow}"
      :label="props.label"
      severity="secondary"
    />
  </div>
</template>
