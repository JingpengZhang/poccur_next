import { db } from "../../db";
import { NewCategory, categories } from "../../db/schema/categories";

abstract class CategoryService {
  // 插入分类
  static async insert(data: Pick<NewCategory, "name">) {
    return await db.insert(categories).values({
      name: data.name,
      createAt: new Date(),
    });
  }
}

export default CategoryService;
