import API_URLS from "@/request/api-urls";
import { requestManager } from "@/request/axios-request";
import { NewCategory } from "@/server/src/db/schema/categories";
import { useRequest } from "ahooks";
import { FormInstance } from "antd";
import toast from "react-hot-toast";

type Params = NewCategory;

type Data = {
  code: 200 | 1000;
  message: string;
};

export const useUpdateCategory = (formInstance: FormInstance<Params>) => {
  return useRequest(
    async (id: Params["id"]) => {
      const data = await requestManager.patch<Params, Data>(
        API_URLS.category.patch,
        {
          ...formInstance.getFieldsValue(),
          id,
        },
      );

      // 字段重复
      if (data.code === 1000) {
        toast.error("分类名不能重复");
      }

      return data;
    },
    {
      manual: true,
      throttleWait: 500,
    },
  );
};
