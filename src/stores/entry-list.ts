import { defineStore } from 'pinia';
import { IEntryDoc } from '../domains/entry';
import { subscribeEntries } from '../dba/entries';

export const useEntryListStore = defineStore('entry-list', {
  state: () => ({
    entries: [] as IEntryDoc[],
  }),
  getters: {
    selectByDate: (state) => (date: string) => state.entries.filter((e) => e.date === date),
    selectByYM: (state) => (ym: string) => state.entries.filter((e) => e.date.startsWith(ym)),
  },
  actions: {
    subscribe(bookId: string, startDate: string, endDate: string) {
      subscribeEntries(bookId, startDate, endDate, (entries) => {
        this.entries = entries;
      });
    },
  },
});
