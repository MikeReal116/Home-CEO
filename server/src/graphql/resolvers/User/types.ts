export interface UserArgs {
  id: string;
}

export interface Paginate {
  limit: number;
  page: number;
}

export interface ReturnData<T> {
  total: number;
  result: T[];
}
