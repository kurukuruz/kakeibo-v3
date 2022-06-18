import { collection, getDocs, query } from 'firebase/firestore';
import { ICategory, ICategoryDoc } from '../domains/category';
import db from '../plugins/use-firestore';

const getCategoriesCollection = (bookId: string) => collection(db, 'books', bookId, 'categories');

export const getCategories = async (bookId: string):Promise<ICategoryDoc[]> => {
  const querySnapshot = await getDocs(query(getCategoriesCollection(bookId)));
  const categories: ICategoryDoc[] = [];
  querySnapshot.forEach((d) => {
    categories.push({
      id: d.id,
      ...(d.data() as ICategory),
    });
  });
  return categories;
};
