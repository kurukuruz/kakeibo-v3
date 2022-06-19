import {
  collection, doc, getDocs, query, updateDoc,
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

export const getCategories = async (bookId: string):Promise<ICategoryDoc[]> => {
  const q = query(getCategoriesCollection(bookId));
  const querySnapshot = await getDocs(q);
  const categories: ICategoryDoc[] = [];
  querySnapshot.forEach((d) => {
    categories.push({
      id: d.id,
      ...(d.data() as ICategory),
    });
  });
  categories.sort((a, b) => a.order - b.order);
  return categories;
};
