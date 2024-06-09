import Elysia from "elysia";
import swagger from "@elysiajs/swagger";
import jwt from "@elysiajs/jwt";
import { userModel } from "./model/user";
import UserService from "./module/user/user.service";
import Response from "./libs/response";

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
        async ({ jwt, body }) => {
          // 查看是否匹配成功
          const result = await UserService.matchPassword(
            body.email,
            body.password,
          );

          if (result && result.length > 0) {
            const user = result[0];
            // 生成 token
            const token = await jwt.sign({
              id: user.id,
            });

            return Response.ok({
              data: {
                token,
              },
            });
          }
          return Response.error("SIGN_IN_FAIL");
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
