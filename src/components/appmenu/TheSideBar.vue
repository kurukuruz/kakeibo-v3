<script setup lang="ts">
import Drawer from 'primevue/drawer';
import Menu from 'primevue/menu';
import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import { computed, ref } from 'vue';
import type { MenuItem } from 'primevue/menuitem';
import { storeToRefs } from 'pinia';
import TheCategoriesListDialog from '../categories-setting/TheCategoriesListDialog.vue';
import { useBookListStore } from '../../stores/book-list';
import { APP_VERSION } from '../../version';

interface IProps {
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
  books.value.map((b) => {
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
  <Drawer v-model:visible="innerDisplay">
    <div class="flex flex-col h-full">
      <Tabs v-model:value="activeIndex">
        <TabList class="tab-vertical">
          <Tab v-for="(item, idx) in bookMenuItems" :key="item.label" :value="idx" class="p-menu-item-link" as="div"><i :class="item.icon" />{{ item.label }}</Tab>
        </TabList>
      </Tabs>
      <Menu
        :model="menuItems"
        class="w-full p-menu-nonborder"
      />
      <p class="mt-auto text-xs">
        ver.{{ APP_VERSION }}
      </p>
    </div>
  </Drawer>
  <TheCategoriesListDialog v-model:display="displayCategoriesList" />
</template>

<style>
.p-menu.p-menu-nonborder {
  border: 0px;
}

.tab-vertical .p-tablist-tab-list {
  flex-direction: column;
  border: none;
}
.tab-vertical .p-tab {
  border-width: 0 2px 0 0;

  &:not(.p-tab-active) {
    border-color: transparent;
  }
}
.tab-vertical .p-tablist-active-bar {
  display: none;
}
</style>
