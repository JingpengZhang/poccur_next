import Elysia from "elysia";
import swagger from "@elysiajs/swagger";
import { userController } from "./module/user/user.controller";
import { CategoryController } from "./module/category/category.controller";
import { cors } from "@elysiajs/cors";
import { ArticleController } from "./module/article/article.controller";

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
    }),
  )
  .use(userController)
  .use(CategoryController)
  .use(ArticleController)
  .get("/", () => "hello poccur_next")
  .listen(3001);

export type App = typeof app;

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
