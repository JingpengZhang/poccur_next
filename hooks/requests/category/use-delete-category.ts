import API_URLS from "@/request/api-urls";
import { requestManager } from "@/request/axios-request";
import { Category } from "@/server/src/db/schema/categories";
import { useRequest } from "ahooks";

type Params = {
  id: Category["id"];
};

type Data = {
  code: 200;
  message: string;
};

export const useDeleteCategory = () => {
  return useRequest(
    async (_params: Params) => {
      const data = await requestManager.delete<Params, Data>(
        API_URLS.category.delete,
        _params,
      );

      return data;
    },
    {
      manual: true,
      throttleWait: 500,
    },
  );
};
