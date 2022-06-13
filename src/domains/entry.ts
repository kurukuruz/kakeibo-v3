import { Dayjs } from 'dayjs';

export interface IEntry {
  date: string;
  memo?: string;
  amount: number;
}

export const createNew = (date: Dayjs): IEntry => ({
  date: date.format('YYYY-MM-DD'),
  amount: 0,
});
