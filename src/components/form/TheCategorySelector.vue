<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import { computed } from 'vue';
import CategorySelectionRow from './CategorySelectionRow.vue';
import { useCategoryListStore } from '../../stores/category-list';
import { Division } from '../../types';

interface IProps {
  modelValue: string;
  division: Division;
}

interface IEmits {
  (e: 'update:modelValue', value?: string): void;
}

const props = defineProps<IProps>();

const emit = defineEmits<IEmits>();

const categoryListStore = useCategoryListStore();
const options = computed(() => categoryListStore.categoriesListOf(props.division));

const selected = computed({
  get: () => options.value.find((opt) => opt.id === props.modelValue),
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
        <CategorySelectionRow
          name=""
        />
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
