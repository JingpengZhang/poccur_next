import { db } from "../../db";
import { NewArticle, articles } from "../../db/schema/articles";

abstract class ArticleService {
  // 插入文章
  static async insert(data: NewArticle) {
    return await db.insert(articles).values({
      title: data.title,
      content: data.content,
      userId: 1,
      categoryId: data.categoryId,
    });
  }
}

export default ArticleService;
