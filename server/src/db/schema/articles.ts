import { relations } from "drizzle-orm";
import { int, mysqlTable, text, varchar } from "drizzle-orm/mysql-core";
import { withCommonColumns } from "../common";
import { categories } from "./categories";
import { users } from "./users";

export const articles = mysqlTable(
  "articles",
  withCommonColumns({
    /** 标题 */
    title: varchar("title", { length: 255 }).notNull(),
    /** 内容 */
    content: text("content").notNull(),
    /** 创建人id */
    userId: int("user_id")
      .references(() => users.id)
      .notNull(),
    /** 分类id */
    categoryId: int("category_id").references(() => categories.id),
  })
);

export const articleRelations = relations(articles, ({ one }) => ({
  category: one(categories, {
    fields: [articles.categoryId],
    references: [categories.id],
  }),
  user: one(users, {
    fields: [articles.userId],
    references: [users.id],
  }),
}));

export type Article = typeof articles.$inferSelect;
export type NewArticle = typeof articles.$inferInsert;
