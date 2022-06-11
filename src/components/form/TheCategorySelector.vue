<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import { ref } from 'vue';
import CategorySelectionRow, { ICategoryOption } from './CategorySelectionRow.vue';

interface IOption extends ICategoryOption {
  value: string;
}

const selected = ref<IOption>();
const options: IOption[] = [
  {
    value: 'abc', name: '食費', icon: 'mdi-silverware', color: 'red',
  },
  {
    value: 'def', name: '交通費', icon: 'mdi-train', color: 'teal',
  },
  { value: 'def', name: 'テスト', color: 'black' },
  { value: 'def', name: 'その他', icon: 'mdi-information-variant' },
];
</script>

<template>
  <Dropdown
    v-model="selected"
    :options="options"
    placeholder="費目"
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
