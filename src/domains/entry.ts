import { Dayjs } from 'dayjs';
import { Division } from '../types';

export interface IEntry {
  date: string;
  categoryId: string;
  memo?: string;
  amount: number;
  division: Division;
}

export interface IEntryDoc extends IEntry {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export const createNew = (date: Dayjs): IEntry => ({
  date: date.format('YYYY-MM-DD'),
  categoryId: '',
  amount: 0,
  division: 'payout',
});
