import { mysqlTable, serial, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey().autoincrement(),
  email: varchar("email", { length: 24 }).unique(),
  password: varchar("password", { length: 32 }),
  createAt: timestamp("create_at"),
  updateAt: timestamp("update_at"),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
