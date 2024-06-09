import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema/users";
import Response from "../../libs/response";

abstract class UserService {
  /**
   * 注册
   * @param email 邮箱
   * @param password 密码
   * @returns 响应
   */
  static async signUp(email: string, password: string) {
    await db.insert(users).values({
      email: email,
      password: password,
      createAt: new Date(),
    });
    return Response.ok();
  }

  /**
   * 匹配用户用户名与密码
   * @param email 邮箱
   * @param password 密码
   * @returns 是否匹配成功
   */
  static async matchPassword(email: string, password: string) {
    const result = await db
      .select()
      .from(users)
      .where(and(eq(users.email, email), eq(users.password, password)));

    return result;
  }

  /**
   * 登录
   * @param email 邮箱
   * @param password 密码
   * @returns 响应
   */
  static async signIn(email: string, password: string) {
    const result = await db
      .select()
      .from(users)
      .where(and(eq(users.email, email), eq(users.password, password)));

    // jwt

    return result.length > 0 ? Response.ok() : Response.error("SIGN_IN_FAIL");
  }
}

export default UserService;
