import {
  addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where, type Unsubscribe,
} from 'firebase/firestore';
import { IEntry, IEntryDoc } from '../domains/entry';
import db from '../plugins/use-firestore';

const getEntriesCollection = (bookId: string) => collection(db, 'books', bookId, 'entries');

const getEntryDocument = (bookId: string, entryId: string) => doc(db, 'books', bookId, 'entries', entryId);

export const registerEntry = async (bookId: string, entry: IEntry): Promise<IEntryDoc> => {
  const data = {
    ...entry,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const docRef = await addDoc(getEntriesCollection(bookId), data);

  return {
    id: docRef.id,
    ...data,
  };
};

export const updateEntry = async (bookId: string, entry: IEntryDoc): Promise<IEntryDoc> => {
  const data = {
    categoryId: entry.categoryId,
    memo: entry.memo,
    amount: entry.amount,
    division: entry.division,
    updatedAt: new Date(),
  };
  await updateDoc(getEntryDocument(bookId, entry.id), data);

  return {
    ...entry,
    updatedAt: data.updatedAt,
  };
};

export const deleteEntry = async (bookId: string, entryId: string) => {
  await deleteDoc(getEntryDocument(bookId, entryId));
};

let unsubscribe: Unsubscribe;
export const subscribeEntries = async (bookId: string, startDate: string, endDate: string, callback: (e: IEntryDoc[]) => void) => {
  if (unsubscribe) {
    unsubscribe();
  }
  const q = query(
    getEntriesCollection(bookId),
    where('date', '>=', startDate),
    where('date', '<=', endDate),
  );
  unsubscribe = onSnapshot(q, (querySnapshot) => {
    const entries: IEntryDoc[] = [];
    querySnapshot.forEach((d) => {
      entries.push({
        id: d.id,
        createdAt: d.data().createdAt.toDate(),
        updatedAt: d.data().updatedAt.toDate(),
        ...(d.data() as IEntry),
      });
    });
    callback(entries);
  });
};
