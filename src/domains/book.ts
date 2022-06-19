export interface IBook {
  name: string;
  icon?: string;
  order: number;
}

export interface IBookDoc extends IBook {
  id: string;
}
