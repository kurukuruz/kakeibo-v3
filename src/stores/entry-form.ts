import { Dayjs } from 'dayjs';
import { defineStore } from 'pinia';
import { IEntry, createNew } from '../domains/entry';

export const useEntryFormStore = defineStore('entry-form', {
  state: () => ({
    display: false,
    entry: {
      date: '',
      amount: 0,
    } as IEntry,
  }),
  actions: {
    showDialog() {
      this.display = true;
    },
    setNewEntry(date: Dayjs) {
      this.entry = createNew(date);
    },
  },
});
