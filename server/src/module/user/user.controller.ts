import Elysia from "elysia";
import { JwtService } from "../../common/service/jwt-service";
import UserService from "./user.service";
import { userModel } from "../../model/user";
import Response from "../../libs/response";

export const userController = new Elysia({ prefix: "/user" })
  .use(JwtService)
  .use(userModel)
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
    }
  )
  .post(
    "/sign-in",
    async ({ jwt, body }) => {
      // 查看是否匹配成功
      const result = await UserService.matchPassword(body.email, body.password);

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
    }
  );
