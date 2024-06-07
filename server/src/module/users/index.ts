import Elysia, { t } from "elysia";
import { db } from "../../db";
import { users as userSchema } from "../../db/schema/users";
import { and, eq } from "drizzle-orm";
import Response from "../../libs/response";

export const users = new Elysia({ prefix: "/user" })
  .post(
    "/sign-up",
    async ({ body }) => {
      await db.insert(userSchema).values({
        email: body.email,
        password: body.password,
        createAt: new Date(),
      });
      return Response.ok();
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
      detail: {
        tags: ["User"],
      },
    },
  )
  .post(
    "/sign-in",
    async ({ body }) => {
      const result = await db
        .select()
        .from(userSchema)
        .where(
          and(
            eq(userSchema.email, body.email),
            eq(userSchema.password, body.password),
          ),
        );

      return result.length > 0 ? Response.ok() : Response.error("SIGN_IN_FAIL");
    },
    {
      body: t.Object({
        email: t.String({
          format: "email",
          error: ({ errors }) =>
            errors.findIndex((v) => v.type === 45) !== -1
              ? Response.error("FIELD_IS_MISSING", {
                  message: "邮箱不能为空",
                })
              : Response.error("FIELD_NOT_EMAIL", {
                  message: "邮箱格式不正确",
                }),
        }),
        password: t.String({
          error: Response.error("FIELD_IS_MISSING", {
            message: "密码不能为空",
          }),
        }),
      }),
      detail: {
        tags: ["User"],
      },
    },
  );
