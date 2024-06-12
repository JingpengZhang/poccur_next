import Elysia from "elysia";
import { JwtService } from "../../common/service/jwt-service";
import { CategoryModel } from "./category.model";
import CategoryService from "./category.service";
import Response from "../../libs/response";

export const CategoryController = new Elysia({ prefix: "/category" })
  .use(JwtService)
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
      } catch (err) {
        return Response.error("UNKOWN");
      }
    },
    {
      body: "category.create",
    },
  );
