import {
  collection, doc, onSnapshot, query, updateDoc,
} from 'firebase/firestore';
import { ICategory, ICategoryDoc } from '../domains/category';
import db from '../plugins/use-firestore';

const getCategoriesCollection = (bookId: string) => collection(db, 'books', bookId, 'categories');
const getCategoryDocument = (bookId: string, categoryId: string) => doc(db, 'books', bookId, 'categories', categoryId);

export const updateCategory = async (bookId: string, categoryId: string, name: string, color: string, icon?:string) => {
  const data = {
    name,
    color,
    icon,
  };
  await updateDoc(getCategoryDocument(bookId, categoryId), data);
};

let unsubscribe: Function;
export const subscribeCategories = async (bookId: string, callback: (e: ICategoryDoc[]) => void) => {
  if (unsubscribe) {
    unsubscribe();
  }
  const q = query(getCategoriesCollection(bookId));
  unsubscribe = onSnapshot(q, (querySnapshot) => {
    const categories: ICategoryDoc[] = [];
    querySnapshot.forEach((d) => {
      categories.push({
        id: d.id,
        ...(d.data() as ICategory),
      });
    });
    categories.sort((a, b) => a.order - b.order);
    callback(categories);
  });
};
