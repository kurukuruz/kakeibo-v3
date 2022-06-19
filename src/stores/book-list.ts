import { defineStore } from 'pinia';
import { IBookDoc } from '../domains/book';
import { getAllBooks } from '../dba/books';

export const useBookListStore = defineStore('book-list', {
  state: () => ({
    books: [] as IBookDoc[],
    activeIndex: 0,
  }),
  getters: {
    activeBookId: (state) => (
      state.books.length > state.activeIndex ? state.books[state.activeIndex].id : undefined
    ),
  },
  actions: {
    async load() {
      this.books = await getAllBooks();
    },
  },
});
