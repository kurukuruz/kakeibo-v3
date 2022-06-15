import { Division } from '../types';

export interface ICategory {
  name: string;
  icon?: string;
  color: string;
  division: Division;
  order: number;
}

export interface ICategoryDoc extends ICategory {
  id: string;
}
