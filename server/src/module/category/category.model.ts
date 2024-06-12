import Elysia, { t } from "elysia";
import Response from "../../libs/response";

export const CategorySchemas = {
  // 分类名
  name: t.String({
    error: Response.error("FIELD_IS_MISSING", {
      message: "分类名不能为空",
    }),
  }),
};

export const CategoryModel = new Elysia({
  name: "Model.Category",
}).model({
  "category.create": t.Object({
    name: CategorySchemas.name,
  }),
});
