import Elysia, { t } from "elysia";

export const CommonSchemas = {
  page: t.Numeric({ minimum: 1, default: 1 }),
  pageCount: t.Numeric({ minimum: 1, default: 10 }),
};

export const CommonModel = new Elysia({
  name: "Model.Common",
}).model({
  "common.list": t.Object({
    page: CommonSchemas.page,
    pageCount: CommonSchemas.pageCount,
  }),
});
