<script setup lang="ts">
import Dropdown from 'primevue/dropdown';
import { computed } from 'vue';
import CategorySelectionRow, { ICategoryOption } from './CategorySelectionRow.vue';

interface IOption extends ICategoryOption {
  value: string;
}

interface IProps {
  modelValue: string;
}

interface IEmits {
  (e: 'update:modelValue', value?: string): void,
}

const props = defineProps<IProps>();

const emit = defineEmits<IEmits>();

const options: IOption[] = [
  {
    value: 'aaa', name: '食費', icon: 'mdi-silverware', color: 'red',
  },
  {
    value: 'bbb', name: '交通費', icon: 'mdi-train', color: 'teal',
  },
  { value: 'ccc', name: 'テスト', color: 'black' },
  { value: 'ddd', name: 'その他', icon: 'mdi-information-variant' },
];

const selected = computed({
  get: () => options.find((opt) => opt.value === props.modelValue),
  set: (newVal) => { emit('update:modelValue', newVal?.value); },
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
