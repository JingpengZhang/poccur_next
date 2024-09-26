import { cors } from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import Elysia, { t } from "elysia";
import Response from "./libs/response";
import { ArticleController } from "./module/article/article.controller";
import { CategoryController } from "./module/category/category.controller";
import { fileController } from "./module/file/file.controller";
import FileService from "./module/file/file.service";
import { userController } from "./module/user/user.controller";

const app = new Elysia()
  .use(cors())
  // swagger 文档
  .use(
    swagger({
      documentation: {
        tags: [
          {
            name: "User",
            description: "用户相关接口。",
          },
        ],
      },
    })
  )
  .use(userController)
  .use(CategoryController)
  .use(ArticleController)
  .use(fileController)
  .get("/", () => "hello poccur_next")
  .post(
    "/test",
    async ({ body: { files } }) => {
      const res = await FileService.uploadFiles(files, {
        warehouceId: 2,
      });
      // const res = await FileService.createPublicWarehouse({
      //   maxCapacity: 10 * 1024 * 1024 * 1024,
      // });
      return Response.ok({
        data: {
          ids: res,
        },
      });
    },
    {
      body: t.Object({ files: t.Files() }),
    }
  )
  .listen(3001);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
