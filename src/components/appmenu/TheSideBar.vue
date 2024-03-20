<script setup lang="ts">
import Sidebar from 'primevue/sidebar';
import Menu from 'primevue/menu';
import TabMenu from 'primevue/tabmenu';
import { computed, ref } from 'vue';
import type { MenuItem } from 'primevue/menuitem';
import { storeToRefs } from 'pinia';
import TheCategoriesListDialog from '../categories-setting/TheCategoriesListDialog.vue';
import { useBookListStore } from '../../stores/book-list';

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

const displayCategoriesList = ref(false);

const menuItems: MenuItem[] = [
  {
    separator: true,
  },
  {
    label: '費目設定',
    icon: 'mdi mdi-text-box-edit',
    command: () => {
      displayCategoriesList.value = true;
      innerDisplay.value = false;
    },
  },
];

const bookListStore = useBookListStore();
const { books, activeIndex } = storeToRefs(bookListStore);
const bookMenuItems = computed(() => (
  books.value.map((b): MenuItem => {
    const tag = b.icon ? b.icon : 'mdi-note-text-outline';
    const kind = tag.slice(0, tag.indexOf('-'));
    return {
      label: b.name,
      icon: `${kind} ${tag}`,
    };
  })
));
bookListStore.load();
</script>

<template>
  <Sidebar v-model:visible="innerDisplay">
    <TabMenu
      v-model:activeIndex="activeIndex"
      :model="bookMenuItems"
      class="tab-vertical"
    />
    <Menu
      :model="menuItems"
      class="w-full p-menu-nonborder"
    />
  </Sidebar>
  <TheCategoriesListDialog v-model:display="displayCategoriesList" />
</template>

<style>
.p-menu.p-menu-nonborder {
  border: 0px;
}

.tab-vertical .p-tabmenu-nav {
  flex-direction: column;
}
.p-tabmenu.tab-vertical .p-tabmenu-nav {
  border-width: 0 2px 0 0;
}
.p-tabmenu.tab-vertical .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link {
  border-width: 0 2px 0 0;
  margin: 0 -2px 0 0;
  border-top-right-radius: 0px;
  border-bottom-left-radius: 3px;
}
</style>
