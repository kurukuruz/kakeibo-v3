<script setup lang="ts">
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import ColorPicker from 'primevue/colorpicker';
import { computed, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import type { ICategory, ICategoryDoc } from '../../domains/category';
import { implementsCategoryDoc } from '../../domains/category';
import CategorySelectionRow from '../form/CategorySelectionRow.vue';
import { registerCategory, updateCategory } from '../../dba/categories';
import { useBookListStore } from '../../stores/book-list';

interface IProps {
  category: ICategory | ICategoryDoc;
  display: boolean;
}

interface IEmits {
  (e: 'update:display', value: boolean): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const innerDisplay = computed({
  get: () => props.display,
  set: (newVal) => {
    emit('update:display', newVal);
  },
});

const nameTemp = ref('');
const iconTemp = ref<string>();
const colorTemp = ref('');
const colorHex = computed({
  get: () => (colorTemp.value.startsWith('#') ? colorTemp.value.slice(1) : colorTemp.value),
  set: (newVal) => {
    colorTemp.value = `#${newVal}`;
  },
});

watch(props, () => {
  nameTemp.value = props.category.name;
  iconTemp.value = props.category.icon;
  colorTemp.value = props.category.color;
});

const bookListStore = useBookListStore();
const { activeBookId } = storeToRefs(bookListStore);

const upload = () => {
  if (!activeBookId.value) return;
  if (implementsCategoryDoc(props.category)) {
    updateCategory(activeBookId.value, props.category.id, nameTemp.value, colorTemp.value, iconTemp.value);
  } else {
    registerCategory(activeBookId.value, {
      name: nameTemp.value,
      color: colorTemp.value,
      icon: iconTemp.value,
      division: props.category.division,
      order: props.category.order,
    });
  }
  innerDisplay.value = false;
};
</script>

<template>
  <Dialog
    v-model:visible="innerDisplay"
    :modal="true"
  >
    <template #header>
      <Button
        icon="pi pi-check"
        class="p-button-text p-button-rounded"
        @click="upload"
      />
      <CategorySelectionRow
        :name="nameTemp"
        :icon="iconTemp"
        :color="colorTemp"
      />
      <div class="flex-grow-1">
        <!-- spacer -->
      </div>
    </template>
    <div class="flex flex-column">
      <InputText v-model="nameTemp" />
      <InputText v-model="iconTemp" />
      <div>
        <ColorPicker
          v-model="colorHex"
          class="mr-1"
        />
        <InputText v-model="colorHex" />
      </div>
    </div>
  </Dialog>
</template>
