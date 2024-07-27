import { collection, getDocs, query } from 'firebase/firestore';
import { IBook, IBookDoc } from '../domains/book';
import db from '../plugins/use-firestore';

const getBooksCollection = () => collection(db, 'books');

export const getAllBooks = async (): Promise<IBookDoc[]> => {
  const q = query(getBooksCollection());
  const querySnapshot = await getDocs(q);
  const books: IBookDoc[] = [];
  querySnapshot.forEach((d) => {
    books.push({
      id: d.id,
      ...(d.data() as IBook),
    });
  });
  books.sort((a, b) => a.order - b.order);
  return books;
};
