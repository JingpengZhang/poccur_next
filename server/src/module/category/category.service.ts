import { eq } from "drizzle-orm";
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
}

export default CategoryService;
