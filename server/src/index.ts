import Elysia from "elysia";
import swagger from "@elysiajs/swagger";
import jwt from "@elysiajs/jwt";
import { userModel } from "./model/user";
import UserService from "./module/user/user.service";

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
  // jwt 模块
  .use(
    jwt({
      name: "jwt",
      secret: "poccur_next hello",
      exp: "3d",
    }),
  )
  .use(userModel)
  .group("/user", (app) =>
    app
      .post(
        "/sign-up",
        ({ body }) => {
          return UserService.signUp(body.email, body.password);
        },
        {
          body: "user.sign-up",
          detail: {
            tags: ["User"],
          },
        },
      )
      .post(
        "/sign-in",
        ({ body }) => {
          return UserService.signIn(body.email, body.password);
        },
        {
          body: "user.sign-in",
          detail: {
            tags: ["User"],
          },
        },
      ),
  )
  .get("/", () => "hello poccur_next")
  .listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
