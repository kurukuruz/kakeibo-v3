<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import { computed } from 'vue';
import CategorySelectionRow from './CategorySelectionRow.vue';
import { useCategoryListStore } from '../../stores/category-list';

interface IProps {
  modelValue: string;
}

interface IEmits {
  (e: 'update:modelValue', value?: string): void,
}

const props = defineProps<IProps>();

const emit = defineEmits<IEmits>();

const categoryListStore = useCategoryListStore();
const options = categoryListStore.categoriesListOf('payout');

const selected = computed({
  get: () => options.find((opt) => opt.id === props.modelValue),
  set: (newVal) => { emit('update:modelValue', newVal?.id); },
});
</script>

<template>
  <Dropdown
    v-model="selected"
    :options="options"
    class="h-3rem"
  >
    <template #value="slotProps">
      <CategorySelectionRow
        v-if="slotProps.value"
        :name="slotProps.value.name"
        :icon="slotProps.value.icon"
        :color="slotProps.value.color"
      />
      <span v-else>
        {{ slotProps.placeholder }}
      </span>
    </template>
    <template #option="slotProps">
      <CategorySelectionRow
        :name="slotProps.option.name"
        :icon="slotProps.option.icon"
        :color="slotProps.option.color"
      />
    </template>
  </Dropdown>
</template>
