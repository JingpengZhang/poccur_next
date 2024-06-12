import { mysqlTable, serial, timestamp, varchar } from "drizzle-orm/mysql-core";

export const categories = mysqlTable("categories", {
  id: serial("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 50 }).unique(),
  createAt: timestamp("create_at"),
  updateAt: timestamp("update_at"),
});

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
