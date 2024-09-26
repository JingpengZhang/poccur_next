import Elysia from "elysia";

/**
 * 文件系统
 * @param app
 * @returns
 */
export const fileController = (app: Elysia) =>
  app.group("/file", (app) =>
    app.get("/", async () => {
      return "hello file";
    })
  );
