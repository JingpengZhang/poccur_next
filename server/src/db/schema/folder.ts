import {
  mysqlTable,
  int,
  timestamp,
  serial,
  varchar,
  AnyMySqlColumn,
} from "drizzle-orm/mysql-core";
import { users } from "./users";

export const folder = mysqlTable("folder", {
  id: serial("id").primaryKey().autoincrement(),
  pid: int("pid").references((): AnyMySqlColumn => folder.id),
  name: varchar("name", { length: 255 }),
  userId: int("user_id").references(() => users.id),
  createAt: timestamp("create_at"),
  updateAt: timestamp("update_at"),
});

export type Folder = typeof folder.$inferSelect;
export type NewFolder = typeof folder.$inferInsert;
