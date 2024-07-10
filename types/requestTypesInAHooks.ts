import { AntdTableOptions } from "ahooks/lib/useAntdTable/types";
import { Options } from "ahooks/lib/useRequest/src/types";

// ahooks useAntdTable 类型
export type RequestAntdTableHooksOptions<
  DataType,
  Params,
  TData = {},
> = AntdTableOptions<
  {
    total: number;
    list: DataType[];
  } & TData,
  [
    {
      current: number;
      pageSize: number;
      sorter?: any;
      filter?: any;
      extra?: any;
      [key: string]: any;
    },
    Params,
  ]
>;

// ahooks useRequest option 类型
export type RequestHooksOptions<Params, Data> = Options<Data, [params: Params]>;
