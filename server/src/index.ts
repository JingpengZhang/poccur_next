import Elysia from "elysia";
import { users } from "./module/users";
import swagger from "@elysiajs/swagger";

const app = new Elysia()
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
  .get("/", () => "hello poccur_next")
  .use(users)
  .listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
