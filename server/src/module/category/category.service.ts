import { asc, count, desc, eq } from "drizzle-orm";
import { db } from "../../db";
import { Category, NewCategory, categories } from "../../db/schema/categories";

abstract class CategoryService {
  // 插入分类
  static async insert(data: Pick<NewCategory, "name">) {
    return await db.insert(categories).values({
      name: data.name,
      createAt: new Date(),
    });
  }

  // 更新分类
  static async update(id: Category["id"], data: Pick<NewCategory, "name">) {
    return await db
      .update(categories)
      .set({
        name: data.name,
      })
      .where(eq(categories.id, id));
  }

  // 删除分类
  static async delete(id: Category["id"]) {
    return await db.delete(categories).where(eq(categories.id, id));
  }

  // 获取列表
  static async queryList(page: number, pageSize: number) {
    return await db.query.categories.findMany({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      orderBy: [desc(categories.id)],
    });
  }

  // 获取总数
  static async count() {
    return (await db.select({ count: count() }).from(categories))[0].count;
  }
}

export default CategoryService;
