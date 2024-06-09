import Elysia from "elysia";
import swagger from "@elysiajs/swagger";
import { userController } from "./module/user/user.controller";

const app = new Elysia()
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
  .get("/", () => "hello poccur_next")
  .listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
