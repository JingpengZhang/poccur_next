import { int, mysqlTable, serial, timestamp } from "drizzle-orm/mysql-core";
import { users } from "./users";
import { folder } from "./folder";

export const file = mysqlTable("file", {
  id: serial("id").primaryKey().autoincrement(),
  userId: int("user_id").references(() => users.id),
  folderId: int("folder_id").references(() => folder.id),
  size: int("size"),
  createAt: timestamp("create_at"),
  updateAt: timestamp("update_at"),
});

export type File = typeof file.$inferSelect;
export type NewFile = typeof file.$inferInsert;
