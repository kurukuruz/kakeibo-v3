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
    :class="{'col-6': props.double, 'col-3': !props.double}"
  >
    <Button
      class="p-button-lg w-full"
      :class="{'h-2rem': props.narrow}"
      :label="props.label"
    />
  </div>
</template>
