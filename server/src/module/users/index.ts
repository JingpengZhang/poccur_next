import Elysia, { t } from "elysia";
import { db } from "../../db";
import { users as userSchema } from "../../db/schema/users";

export const users = new Elysia({ prefix: "/user" }).post(
  "/sign-up",
  async ({ body }) => {
    await db.insert(userSchema).values({
      email: body.email,
      password: body.password,
      createAt: new Date(),
    });
    return body.email;
  },
  {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    }),
  },
);
