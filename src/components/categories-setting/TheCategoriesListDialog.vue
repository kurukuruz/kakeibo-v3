<script setup lang="ts">
import Dialog from 'primevue/dialog';
import ToggleButton from 'primevue/togglebutton';
import { computed, ref } from 'vue';
import { ICategoryDoc } from '../../domains/category';
import { useCategoryListStore } from '../../stores/category-list';
import { Division } from '../../types';
import CategoryRow from './CategoryRow.vue';
import TheCategoryFormDialog from './TheCategoryFormDialog.vue';

interface IProps {
  display: boolean,
}

interface IEmits {
  (e: 'update:display', value: boolean): void,
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const innerDisplay = computed({
  get: () => props.display,
  set: (newVal) => {
    emit('update:display', newVal);
  },
});

const categoryListStore = useCategoryListStore();
const division = ref<Division>('payout');
const isIncome = computed({
  get: () => division.value === 'income',
  set: (newVal) => { division.value = newVal ? 'income' : 'payout'; },
});
const categories = computed(() => categoryListStore.categoriesListOf(division.value));

const displayEditor = ref(false);
const target = ref(categories.value[0]);
const showCategoryEditor = (c: ICategoryDoc) => {
  target.value = c;
  displayEditor.value = true;
};
</script>

<template>
  <Dialog
    v-model:visible="innerDisplay"
    :modal="true"
    class="p-dialog-maximized"
  >
    <template #header>
      <ToggleButton
        v-model="isIncome"
        on-label="収入"
        on-icon="pi pi-sync"
        off-label="支出"
        off-icon="pi pi-sync"
        icon-pos="right"
        class="p-button-sm"
      />
      <div class="p-dialog-title ml-2">
        <span>費目一覧</span>
      </div>
      <div class="flex-grow-1">
        <!-- spacer -->
      </div>
    </template>
    <div>
      <CategoryRow
        v-for="c in categories"
        :key="c.id"
        :category="c"
        @call-edit="showCategoryEditor(c)"
      />
    </div>
  </Dialog>
  <TheCategoryFormDialog
    v-model:display="displayEditor"
    :category="target"
  />
</template>

<style>
.p-tabmenuitem.center-link > a {
  justify-content: center;
}
</style>
