import { and, eq } from "drizzle-orm";
import { db } from "../../db";
import { NewUser, users } from "../../db/schema/users";
import Response from "../../libs/response";
import { Utils } from "../../libs/utils";

abstract class UserService {
  /**
   * 通过id获取用户信息
   * @param id
   * @returns
   */
  static async getUserDBDataById(id: User["id"]) {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0] ?? null;
  }

  /**
   * 向用户表中插入新数据
   * @param user
   */
  static async insertUser(
    user: Omit<NewUser, "createdAt"> & {
      createdAt?: Date;
    }
  ) {
    try {
      const result = await db.insert(users).values({
        ...user,
        createdAt: Utils.time(),
      });

      return result[0].insertId;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * 注册
   * @param email 邮箱
   * @param password 密码
   * @returns 响应
   */
  static async signUp(email: string, password: string) {
    // await db.insert(users).values({
    //   email: email,
    //   password: password,
    //   createAt: new Date(),
    // });
    // return Response.ok();
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
