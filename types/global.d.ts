declare namespace RequestModule {
  // 列表参数
  type ListParams = {
    page?: number;
    pageSize?: number;
  };

  // 列表返回
  type ListData<T> = {
    list: T[];
    total: number;
    page: number;
    pageSize: number;
  };
}
