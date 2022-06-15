import { defineStore } from 'pinia';
import { ICategoryDoc } from '../domains/category';
import { Division } from '../types';

const demoData: ICategoryDoc[] = [
  {
    id: 'aaa', name: '食費', icon: 'mdi-silverware', color: 'red', division: 'payout', order: 1,
  },
  {
    id: 'bbb', name: 'その他飲食', icon: 'mdi-coffee', color: 'black', division: 'payout', order: 2,
  },
  {
    id: 'ccc', name: '交通費', icon: 'mdi-train', color: 'lime darken-2', division: 'payout', order: 3,
  },
  {
    id: 'xxx', name: '予算', icon: 'mdi-currency-jpy', color: 'black', division: 'income', order: 1,
  },
];

export const useCategoryListStore = defineStore('category-list', {
  state: () => ({
    categories: demoData,
  }),
  getters: {
    categoriesListOf: (state) => (
      (division: Division) => state.categories.filter((c) => c.division === division)
    ),
    categoryOf: (state) => (
      (categoryId: string) => state.categories.find((c) => c.id === categoryId)
    ),
  },
});
