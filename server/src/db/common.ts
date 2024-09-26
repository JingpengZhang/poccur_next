import { int, timestamp, tinyint } from "drizzle-orm/mysql-core";

/** 公共字段 */
export const commonColumns = {
  id: int("id").primaryKey().autoincrement(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
};

/**
 * 合并公共字段
 * @param columns
 * @returns
 */
export const withCommonColumns = <T extends object>(
  columns: T,
  rules?: {
    isDeleted?: boolean; // 是否已删除
  }
) => {
  let val = Object.assign(columns, commonColumns);
  // 是否包含删除标识字段
  if (rules?.isDeleted) {
    val = Object.assign(val, {
      isDeleted: tinyint("is_deleted"),
    });
  }
  return val;
};
