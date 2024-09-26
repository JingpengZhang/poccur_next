import { eq } from "drizzle-orm";
import { db } from "../../db";
import {
  FileFolder,
  fileFolders,
  files,
  FileType,
  fileTypes,
  FileWarehouse,
  fileWarehouseOnUsers,
  fileWarehouses,
  NewFile,
  NewFileFolder,
  NewFileWarehouse,
} from "../../db/schema/files";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import dayjs from "dayjs";
import path from "path";
import UserService from "../user/user.service";
import { User } from "../../db/schema/users";
import HttpResult from "../../HttpResult";

abstract class FileService {
  /**
   * 初始化个人文件仓库
   * @param userId 所属用户 id
   */
  static async initPersonalWarehouse(
    userId: User["id"],
    warehouseVals: Omit<NewFileWarehouse, "id" | "isPublic" | "currentCapacity">
  ) {
    try {
      // 新建文件仓库数据
      const warehouse = await db.insert(fileWarehouses).values({
        name: "个人仓库" + userId,
        ...warehouseVals,
      });

      // 新建文件仓库与用户对应关系数据
      await db.insert(fileWarehouseOnUsers).values({
        userId: userId,
        fileWarehouseId: warehouse[0].insertId,
      });
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * 创建公共仓库
   * @param val
   */
  static async createPublicWarehouse(
    vals: Omit<NewFileWarehouse, "id" | "isPublic" | "currentCapacity">
  ) {
    try {
      const warehouse = await db.insert(fileWarehouses).values({
        name: "公共仓库",
        isPublic: 1,
        ...vals,
      });
      return warehouse[0].insertId;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * 根据仓库id获取仓库信息
   * @param id
   */
  static async getPublicWarehouseById(id: FileWarehouse["id"]) {
    try {
      const warehouse = await db
        .select()
        .from(fileWarehouses)
        .where(eq(fileWarehouses.id, id));
      return warehouse[0] ?? null;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * 创建文件夹
   * @param data
   * @returns
   */
  static async createFolder(data: Omit<NewFileFolder, "id">) {
    try {
      const folder = await db.insert(fileFolders).values(data);
      return folder[0].insertId;
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * 通过id获取文件夹数据
   * @param id
   * @returns
   */
  static async getFileFolderDBDataById(id: FileFolder["id"]) {
    const result = await db
      .select()
      .from(fileFolders)
      .where(eq(fileFolders.id, id));
    return result[0] ?? null;
  }

  /**
   * 通过id获取文件类型数据
   * @param id
   * @returns
   */
  static async getFileTypeDBDataById(id: FileType["id"]) {
    const result = await db
      .select()
      .from(fileTypes)
      .where(eq(fileTypes.id, id));
    return result[0] ?? null;
  }

  /**
   * 通过id获取文件仓库数据
   * @param id
   * @returns
   */
  static async getWarehouseDBDataById(id: FileWarehouse["id"]) {
    // 获取仓库数据
    const result = await db
      .select()
      .from(fileWarehouses)
      .where(eq(fileWarehouses.id, id));

    return result[0] ?? null;
  }

  /**
   * 增加置顶仓库当前容量值,并返回新的仓库数据
   * @param id 仓库id
   * @param val 增加值
   * @returns
   */
  static async increaseWarehouseCurrentCapacity(
    id: FileWarehouse["id"],
    val: FileWarehouse["currentCapacity"]
  ) {
    try {
      const warehouse = await this.getWarehouseDBDataById(id);
      if (warehouse) {
        await db
          .update(fileWarehouses)
          .set({ currentCapacity: warehouse.currentCapacity + val })
          .where(eq(fileWarehouses.id, id));
        warehouse.currentCapacity = warehouse.currentCapacity + val;
        return warehouse;
      }
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * 上传文件
   * @param originFiles 文件数组
   * @param data
   */
  static async uploadFiles(
    originFiles: File[],
    data: {
      warehouceId: FileWarehouse["id"];
      userId?: User["id"];
      folderId?: FileFolder["id"];
      fileTypeId?: FileType["id"];
    }
  ) {
    try {
      // 获取用户数据
      let userDBData: User | undefined | null;
      if (data?.userId) {
        userDBData = await UserService.getUserDBDataById(data.userId);
        if (userDBData === null) {
          console.log("用户不存在");
          return;
        }
      }

      // 获取文件夹数据
      let fileFolderDBData: FileFolder | undefined | null = undefined;
      if (data?.folderId) {
        fileFolderDBData = await this.getFileFolderDBDataById(data.folderId);
        if (fileFolderDBData === null) {
          console.log("文件夹不存在");
          return;
        }
      }

      // 获取文件类型数据
      let fileTypeDBData: FileType | undefined | null = undefined;
      if (data?.fileTypeId) {
        fileTypeDBData = await this.getFileTypeDBDataById(data.fileTypeId);
        if (fileTypeDBData === null) {
          console.log("文件类型不存在");
          return new HttpResult({
            code: "3",
          });
        }
      }

      // 获取文件仓库数据
      let warehouseDBData: FileWarehouse | undefined | null = undefined;

      if (!data.warehouceId) {
        console.log("请选择文件仓库");
        return;
      }

      // 获取仓库数据
      warehouseDBData = await this.getWarehouseDBDataById(data.warehouceId);

      // 仓库不存在
      if (!warehouseDBData === null) {
        console.log("仓库不存在");
        return;
      }

      // 检查是否超出仓库容量大小
      const totalSize = originFiles.reduce((sum, v) => sum + v.size, 0);
      if (
        totalSize + warehouseDBData.currentCapacity >
        warehouseDBData.maxCapacity
      ) {
        console.log("超出仓库容量");
        return;
      }

      // 基础前缀
      const baseURL = "./server/public/upload/";
      // 文件的相对路径
      let folderRelativeURL = "";

      // 创建日期文件夹（如果不存在）
      folderRelativeURL += dayjs().format("YYYYMMDD");
      if (!existsSync(baseURL + folderRelativeURL)) {
        mkdirSync(baseURL + folderRelativeURL);
      }
      // 创建用户文件夹
      if (data?.userId) {
        folderRelativeURL += "/" + data.userId;
        if (!existsSync(baseURL + folderRelativeURL)) {
          mkdirSync(baseURL + folderRelativeURL);
        }
      }

      // id
      const ids = [];

      for (let i = 0; i < originFiles.length; i++) {
        const file = originFiles[i];
        // 获取文件 Buffer 数据
        const buffer = Buffer.from(await file.arrayBuffer());

        // 后缀
        const suffix = path.extname(file.name);

        // 文件名（去除后缀）
        const filePureName = file.name.slice(0, -suffix.length);

        // 文件路径
        let fileRelativeURL = "/" + file.name;

        // 同名计数
        let index = 0;

        // 同名时，自动加上 （index） 后缀
        const genFileRelativeURL = () => {
          // 如果重名
          if (existsSync(baseURL + folderRelativeURL + fileRelativeURL)) {
            index++;
            fileRelativeURL = `/${filePureName}(${index})${suffix}`;
            genFileRelativeURL();
          } else {
            return;
          }
        };

        genFileRelativeURL();

        // 磁盘存储路径
        const storagePath = baseURL + folderRelativeURL + fileRelativeURL;

        // 数据库存储路径
        const virtualPath = folderRelativeURL + fileRelativeURL;

        // 写入到磁盘中
        writeFileSync(storagePath, buffer);

        // 更新仓库值
        if (warehouseDBData)
          warehouseDBData = await this.increaseWarehouseCurrentCapacity(
            warehouseDBData.id,
            file.size
          );

        // 保存到数据库文件表中
        const fileData: NewFile = {
          size: file.size,
          url: virtualPath,
          suffix: suffix,
          userId: userDBData?.id,
          warehouceId: warehouseDBData?.id,
          folderId: fileFolderDBData?.id,
          fileTypeId: fileTypeDBData?.id,
        };

        const result = await db.insert(files).values(fileData);
        ids.push(result[0].insertId);
      }
      // return ids;
    } catch (err) {
      console.log(err);
    }
  }
}
export default FileService;
