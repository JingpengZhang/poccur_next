import { mysqlTable, serial, timestamp, varchar } from "drizzle-orm/mysql-core";
import { withCommonColumns } from "../common";

/** 用户表 */
export const users = mysqlTable(
  "users",
  withCommonColumns({
    email: varchar("email", { length: 24 }).notNull().unique(),
    password: varchar("password", { length: 32 }).notNull(),
  })
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
