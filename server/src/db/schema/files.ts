import { One, relations } from "drizzle-orm";
import {
  AnyMySqlColumn,
  bigint,
  int,
  mysqlTable,
  tinyint,
  varchar,
} from "drizzle-orm/mysql-core";
import { withCommonColumns } from "../common";
import { users } from "./users";

/** 文件仓库表 */
export const fileWarehouses = mysqlTable(
  "file_warehouse",
  withCommonColumns({
    /** 仓库名 */
    name: varchar("warehouse_name", { length: 64 })
      .notNull()
      .default("文件仓库"),
    /** 当前容量(byte) */
    currentCapacity: bigint("current_capacity", { mode: "number" })
      .notNull()
      .default(0),
    /** 最大容量(byte) */
    maxCapacity: bigint("max_capacity", { mode: "number" })
      .notNull()
      .default(0),
    /** 是否为公共仓库 */
    isPublic: tinyint("is_public").notNull().default(0),
  })
);

export type NewFileWarehouse = typeof fileWarehouses.$inferInsert;
export type FileWarehouse = typeof fileWarehouses.$inferSelect;

/** 文件仓库-用户表 */
export const fileWarehouseOnUsers = mysqlTable("file_warehouse_users", {
  fileWarehouseId: int("file_warehouse_id")
    .notNull()
    .references(() => fileWarehouses.id)
    .primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => users.id)
    .primaryKey(),
});

export const fileWarehouseRelations = relations(fileWarehouses, ({ many }) => ({
  fileWarehouseUsers: many(fileWarehouseOnUsers),
}));

export const fileWarehouseOnUsersRelations = relations(
  fileWarehouseOnUsers,
  ({ one }) => ({
    fileWarehouse: one(fileWarehouses, {
      fields: [fileWarehouseOnUsers.fileWarehouseId],
      references: [fileWarehouses.id],
    }),
    user: one(users, {
      fields: [fileWarehouseOnUsers.userId],
      references: [users.id],
    }),
  })
);

/** 文件类型表 */
export const fileTypes = mysqlTable(
  "file_type",
  withCommonColumns({
    /** 类型名称 */
    name: varchar("file_type_name", { length: 64 }),
    /** 是否启用 */
    status: tinyint("file_type_status").notNull().default(0),
  })
);

export type NewFileType = typeof fileTypes.$inferInsert;
export type FileType = typeof fileTypes.$inferSelect;

/** 文件夹表 */
export const fileFolders = mysqlTable(
  "file_folder",
  withCommonColumns({
    /** 文件夹名称名称 */
    name: varchar("file_folder_name", { length: 64 }),
    /** 父文件夹id */
    parentId: int("pid").references((): AnyMySqlColumn => fileFolders.id),
    /** 创建人 */
    userId: int("user_id")
      .notNull()
      .references(() => users.id),
    /** 所属文件仓库id */
    warehouceId: int("warehouce_id")
      .notNull()
      .references(() => fileWarehouses.id),
    /** 是否私密 */
    isPrivate: tinyint("is_private").notNull().default(0),
  })
);
export type NewFileFolder = typeof fileFolders.$inferInsert;
export type FileFolder = typeof fileFolders.$inferSelect;

export const fileFolderRelations = relations(fileFolders, ({ one }) => ({
  parentFolder: one(fileFolders, {
    fields: [fileFolders.parentId],
    references: [fileFolders.id],
  }),
  user: one(users, {
    fields: [fileFolders.userId],
    references: [users.id],
  }),
  warehouse: one(fileWarehouses, {
    fields: [fileFolders.warehouceId],
    references: [fileWarehouses.id],
  }),
}));

/** 文件表 */
export const files = mysqlTable(
  "file",
  withCommonColumns(
    {
      /** 文件类型id */
      fileTypeId: int("file_type_id").references(() => fileTypes.id),
      /** 上传者id */
      userId: int("user_id").references(() => users.id),
      /** 文件夹id */
      folderId: int("folder_id").references(() => fileFolders.id),
      /** 文件大小 */
      size: int("file_size").notNull().default(0),
      /** 存储路径 */
      url: varchar("file_path", { length: 64 }).notNull(),
      /** 所属文件仓库id */
      warehouceId: int("warehouce_id").references(() => fileWarehouses.id),
      /** 文件后缀 */
      suffix: varchar("file_suffix", { length: 16 }).notNull(),
    },
    { isDeleted: true }
  )
);

export const fileRelations = relations(files, ({ one }) => ({
  fileType: one(fileTypes, {
    fields: [files.fileTypeId],
    references: [fileTypes.id],
  }),
  user: one(users, {
    fields: [files.userId],
    references: [users.id],
  }),
  folder: one(fileFolders, {
    fields: [files.folderId],
    references: [fileFolders.id],
  }),
  warehouse: one(fileWarehouses, {
    fields: [files.warehouceId],
    references: [fileWarehouses.id],
  }),
}));

export type File = typeof files.$inferSelect;
export type NewFile = typeof files.$inferInsert;

/** 文件下载记录表 */
export const fileDownloadRecords = mysqlTable(
  "file_download_record",
  withCommonColumns({
    /** 下载人id */
    userId: int("user_id")
      .notNull()
      .references(() => users.id),
    /** 文件id */
    fileId: int("file_id")
      .notNull()
      .references(() => files.id),
  })
);

export const fileDownloadRecordRelations = relations(
  fileDownloadRecords,
  ({ one }) => ({
    file: one(files, {
      fields: [fileDownloadRecords.fileId],
      references: [files.id],
    }),
    user: one(users, {
      fields: [fileDownloadRecords.userId],
      references: [users.id],
    }),
  })
);

export type FileDownloadRecord = typeof fileDownloadRecords.$inferSelect;
export type NewFileDownloadRecord = typeof fileDownloadRecords.$inferInsert;
