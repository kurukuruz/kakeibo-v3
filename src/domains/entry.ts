import { Dayjs } from 'dayjs';

export interface IEntry {
  date: string;
  memo?: string;
  amount: number;
}

export interface IEntryDoc extends IEntry {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export const createNew = (date: Dayjs): IEntry => ({
  date: date.format('YYYY-MM-DD'),
  amount: 0,
});
