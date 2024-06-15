import { RESPONSE_TYPES, RESPONSE_TYPES_NAME } from "./response-settings";

export type Code = "1000";

class Response {
  /**
   * 请求成功数据
   */
  static ok(options?: {
    data?: object;
    message?: string;
    list?: {
      page: number;
      pageCount: number;
      total: number;
    };
  }) {
    return {
      code: 200,
      message: options?.message ?? RESPONSE_TYPES.SUCCESS.message,
      data: options?.list
        ? {
            list: options.data,
            ...options.list,
          }
        : options?.data,
    };
  }

  /**
   * 请求失败数据
   */
  static error(
    errorType: RESPONSE_TYPES_NAME,
    options?: {
      message?: string;
      data?: object;
    },
  ) {
    return {
      code: RESPONSE_TYPES[errorType].code,
      message: options?.message ?? RESPONSE_TYPES[errorType].message,
      data: options?.data,
    };
  }
}

export default Response;
