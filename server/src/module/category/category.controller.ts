import Elysia from "elysia";
import { JwtService } from "../../common/service/jwt-service";
import { CategoryModel, CategorySchemas } from "./category.model";
import CategoryService from "./category.service";
import Response from "../../libs/response";
import { categories } from "../../db/schema/categories";
import { builtinModules } from "module";
import { CommonModel } from "../../common/common.model";

export const CategoryController = new Elysia({ prefix: "/category" })
  .use(JwtService)
  .use(CommonModel)
  .use(CategoryModel)
  .post(
    "/create",
    async ({ body }) => {
      try {
        // 插入分类
        const result = await CategoryService.insert({
          name: body.name,
        });

        return Response.ok({
          data: {
            id: result[0].insertId, // 插入的数据 id
          },
        });
      } catch (err: any) {
        let message: string | undefined = undefined;
        if (err["errno"] === 1062) message = "字段重复";
        return Response.error("UNKOWN", { message });
      }
    },
    {
      body: "category.create",
    },
  )
  .patch(
    "/",
    async ({ body }) => {
      try {
        // 更新分类
        await CategoryService.update(parseInt(body.id), {
          name: body.name,
        });

        return Response.ok();
      } catch (err: any) {
        let message: string | undefined = undefined;
        if (err["errno"] === 1062) message = "字段重复";
        return Response.error("UNKOWN", { message });
      }
    },
    {
      body: "category.update",
    },
  )
  .delete(
    "/",
    async ({ body }) => {
      try {
        // 删除分类
        await CategoryService.delete(parseInt(body.id));
        return Response.ok();
      } catch (err: any) {
        return Response.error("UNKOWN", { data: err });
      }
    },
    {
      body: "category.delete",
    },
  )
  .get(
    "/list",
    async ({ query }) => {
      try {
        // 查找列表
        const result = await CategoryService.queryList(
          query.page,
          query.pageSize,
        );

        const total = await CategoryService.count();

        return Response.ok({
          data: result,
          list: {
            pageSize: query.pageSize,
            page: query.page,
            total,
          },
        });
      } catch (err: any) {
        return Response.error("UNKOWN", { data: err });
      }
    },
    {
      query: "common.list",
    },
  );
