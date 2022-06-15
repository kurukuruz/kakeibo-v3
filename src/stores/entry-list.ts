import { defineStore } from 'pinia';
import { IEntryDoc } from '../domains/entry';

const demoData: IEntryDoc[] = [
  {
    id: '99',
    date: '2022-06-13',
    categoryId: 'xxx',
    memo: 'テスト0613in',
    amount: 10000,
    division: 'income',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '1',
    date: '2022-06-13',
    categoryId: 'aaa',
    memo: 'テスト0613',
    amount: 100,
    division: 'payout',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    date: '2022-06-14',
    categoryId: 'bbb',
    memo: 'テスト0614',
    amount: 200,
    division: 'payout',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    date: '2022-06-14',
    categoryId: 'ccc',
    memo: 'テスト0614-2',
    amount: 1201,
    division: 'payout',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const useEntryListStore = defineStore('entry-list', {
  state: () => ({
    entries: demoData,
  }),
  getters: {
    selectByDate: (state) => (date: string) => state.entries.filter((e) => e.date === date),
  },
});
