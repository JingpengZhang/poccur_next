import API_URLS from "@/request/api-urls";
import { requestManager } from "@/request/axios-request";
import { NewArticle } from "@/server/src/db/schema/articles";
import { useRequest } from "ahooks";
import { FormInstance } from "antd";

type Params = NewArticle;

type Data = {
  code: 200;
  message: string;
};

export const useCreateArticle = <T extends object>(
  formInstance: FormInstance<T>,
) => {
  return useRequest(
    async () => {
      const data = await requestManager.post<Params, Data>(
        API_URLS.article.index,
        {
          ...formInstance.getFieldsValue(),
        },
      );

      return data;
    },
    {
      manual: true,
      throttleWait: 500,
    },
  );
};
