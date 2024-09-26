import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { withCommonColumns } from "../common";

export const categories = mysqlTable(
  "categories",
  withCommonColumns({
    name: varchar("name", { length: 50 }).unique().notNull(),
  })
);

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
