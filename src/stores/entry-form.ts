import { Dayjs } from 'dayjs';
import { defineStore } from 'pinia';
import { IEntry, IEntryDoc, createNew } from '../domains/entry';

interface IState {
  display: boolean,
  entry: IEntry | IEntryDoc,
}

export const useEntryFormStore = defineStore('entry-form', {
  state: (): IState => ({
    display: false,
    entry: {
      date: '',
      categoryId: '',
      amount: 0,
    },
  }),
  actions: {
    showDialog() {
      this.display = true;
    },
    setNewEntry(date: Dayjs) {
      this.entry = createNew(date);
    },
    setExistingEntry(entry: IEntryDoc) {
      this.entry = { ...entry };
    },
  },
});
