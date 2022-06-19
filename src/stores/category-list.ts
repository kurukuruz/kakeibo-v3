import { defineStore } from 'pinia';
import { ICategoryDoc } from '../domains/category';
import { Division } from '../types';
import { subscribeCategories } from '../dba/categories';

export const useCategoryListStore = defineStore('category-list', {
  state: () => ({
    categories: [] as ICategoryDoc[],
  }),
  getters: {
    categoriesListOf: (state) => (
      (division: Division) => state.categories.filter((c) => c.division === division)
    ),
    categoryOf: (state) => (
      (categoryId: string) => state.categories.find((c) => c.id === categoryId)
    ),
  },
  actions: {
    subscribe(bookId: string) {
      subscribeCategories(bookId, (categories) => {
        this.categories = categories;
      });
    },
  },
});
