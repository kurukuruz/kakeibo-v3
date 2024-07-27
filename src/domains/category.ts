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

// TODO: ESLintエラーにならないようロジック修正
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const implementsCategoryDoc = (arg: any): arg is ICategoryDoc => (
  arg !== null
  && typeof arg === 'object'
  && typeof arg.id === 'string'
);
