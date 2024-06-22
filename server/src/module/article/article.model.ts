import Elysia, { t } from "elysia";
import Response from "../../libs/response";
import { CategorySchemas } from "../category/category.model";

export const ArticleSchema = {
  // 标题
  title: t.String({
    error: Response.error("FIELD_IS_MISSING", {
      message: "文章标题不能为空",
    }),
  }),
  // 内容
  content: t.String({
    error: Response.error("FIELD_IS_MISSING", {
      message: "文章内容不能为空",
    }),
  }),
  // id
  id: t.Numeric(),
};

export const ArticleModel = new Elysia({
  name: "Model.Article",
}).model({
  "article.create": t.Object({
    title: ArticleSchema.title,
    content: ArticleSchema.content,
    categoryId: t.Optional(CategorySchemas.id),
  }),
});
