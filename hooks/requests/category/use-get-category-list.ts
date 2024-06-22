import API_URLS from "@/request/api-urls";
import { requestManager } from "@/request/axios-request";
import { Category } from "@/server/src/db/schema/categories";
import { useAntdTable } from "ahooks";
import { FormInstance } from "antd";

type Params = RequestModule.ListParams;

type Data = {
  code: "200";
  data: RequestModule.ListData<Category>;
};

export const useGetCategoryList = (
  form?: FormInstance,
  options?: {
    type?: Params["type"];
  },
) => {
  return useAntdTable(
    async (page) => {
      const data = await requestManager.get<Params, Data>(
        API_URLS.category.list,
        {
          page: page.current,
          pageSize: page.pageSize,
          type: options?.type,
        },
      );

      return {
        list: data.data.list,
        total: data.data.total,
      };
    },
    {
      form,
    },
  );
};
