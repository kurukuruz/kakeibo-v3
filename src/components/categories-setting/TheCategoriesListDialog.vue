<script setup lang="ts">
import { storeToRefs } from 'pinia';
import Dialog from 'primevue/dialog';
import ToggleButton from 'primevue/togglebutton';
import {
  computed, Ref, ref, watch,
} from 'vue';
import { ICategory, ICategoryDoc } from '../../domains/category';
import { useBookListStore } from '../../stores/book-list';
import { useCategoryListStore } from '../../stores/category-list';
import { Division } from '../../types';
import CategoryAvatar from '../common/CategoryAvatar.vue';
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
const target: Ref<ICategory | ICategoryDoc> = ref(categories.value[0]);
const showCategoryEditor = (c: ICategoryDoc) => {
  target.value = c;
  displayEditor.value = true;
};
const showNewCategoryEditor = () => {
  target.value = {
    name: '',
    color: '#000000',
    icon: '',
    division: division.value,
    order: categories.value.length,
  } as ICategory;
  displayEditor.value = true;
};

const bookListStore = useBookListStore();
const { activeBookId } = storeToRefs(bookListStore);
const startSubscribe = () => {
  if (!activeBookId.value) return;
  categoryListStore.subscribe(activeBookId.value);
};
startSubscribe();
watch(activeBookId, startSubscribe);
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
      <div
        class="flex align-items-center p-2"
        @click="showNewCategoryEditor"
      >
        <CategoryAvatar
          icon="pi-plus"
          color="var(--text-color-secondary)"
        />
        <div class="pl-1 text-color-secondary">
          費目追加
        </div>
        <div class="flex-grow-1">
          <!-- spacer -->
        </div>
      </div>
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
