export interface Meta {
  total: number;
  total_page: number;
  page: number;
  per_page: number;
}

export interface Pagination<T> {
  data: T;
  meta: Meta;
}
