<script setup lang="ts">
import Sidebar from 'primevue/sidebar';
import Menu from 'primevue/menu';
import { computed, ref } from 'vue';
import { MenuItem } from 'primevue/menuitem';
import TheCategoriesListDialog from '../categories-setting/TheCategoriesListDialog.vue';

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
    label: '費目設定',
    icon: 'mdi mdi-text-box-edit',
    command: () => {
      displayCategoriesList.value = true;
      innerDisplay.value = false;
    },
  },
];
</script>

<template>
  <Sidebar v-model:visible="innerDisplay">
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
</style>
