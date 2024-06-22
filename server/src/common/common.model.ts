import Elysia, { t } from "elysia";

export const CommonSchemas = {
  page: t.Optional(t.Numeric({ minimum: 1, default: 1 })),
  pageSize: t.Optional(t.Numeric({ minimum: 1, default: 10 })),
  type: t.Optional(t.Union([t.Literal("list"), t.Literal("all")])),
};

export const CommonModel = new Elysia({
  name: "Model.Common",
}).model({
  "common.list": t.Object({
    page: CommonSchemas.page,
    pageSize: CommonSchemas.pageSize,
  }),
  "common.listWithType": t.Object({
    page: CommonSchemas.page,
    pageSize: CommonSchemas.pageSize,
    type: CommonSchemas.type,
  }),
});
