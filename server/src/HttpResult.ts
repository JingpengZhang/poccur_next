/**
 * 文件模块请求业务状态码
 */
export enum FileModuleHttpResultCode {
  TYPE_NOT_EXIST = "3000",
  FOLDER_NOT_EXIST = "3001",
}
/**
 * 请求业务状态码
 */
type HttpResultCode = "200" | FileModuleHttpResultCode;

/** 请求业务状态码与信息 MAP */
export const httpResultCodeMessageMap: Map<HttpResultCode, string> = new Map();
httpResultCodeMessageMap.set("200", "操作成功");
httpResultCodeMessageMap.set(
  FileModuleHttpResultCode.CODE_3000,
  "文件类型不存在"
);
// httpResultCodeMessageMap.set("3001", "文件夹不存在");
// httpResultCodeMessageMap.set("3002", "请选择文件仓库");
// httpResultCodeMessageMap.set("3003", "仓库不存在");
// httpResultCodeMessageMap.set("3004", "超出仓库容量");

class HttpResult {
  public success: boolean;
  public code: HttpResultCode;
  public data: object;
  public message: string;
  constructor(opts?: {
    success?: boolean;
    code?: HttpResultCode;
    data?: object;
    message?: string;
  }) {
    this.success = opts?.success ?? true;
    this.code = opts?.code ?? "200";
    this.data = opts?.data ?? {};
    this.message = opts?.message ?? "操作成功";
  }
}

export default HttpResult;
