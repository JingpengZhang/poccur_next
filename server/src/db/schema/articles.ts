import {
  int,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { users } from "./users";
import { categories } from "./categories";

export const articles = mysqlTable("articles", {
  id: serial("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }),
  content: text("content"),
  userId: int("user_id").references(() => users.id),
  categoryId: int("category_id").references(() => categories.id),
  createAt: timestamp("create_at"),
  updateAt: timestamp("update_at"),
});

export type Article = typeof articles.$inferSelect;
export type NewArticle = typeof articles.$inferInsert;
