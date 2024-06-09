import Elysia, { t } from "elysia";
import Response from "../libs/response";

export const userSchema = {
  // 邮箱
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
  // 密码
  password: t.String({
    error: Response.error("FIELD_IS_MISSING", {
      message: "密码不能为空",
    }),
  }),
};

export const userModel = new Elysia({
  name: "Model.User",
}).model({
  "user.sign-up": t.Object({
    email: userSchema.email,
    password: userSchema.password,
  }),
  "user.sign-in": t.Object({
    email: userSchema.email,
    password: userSchema.password,
  }),
});
