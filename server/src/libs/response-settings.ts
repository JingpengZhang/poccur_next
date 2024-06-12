export type RESPONSE_TYPES_NAME =
  | "SUCCESS"
  | "SIGN_IN_FAIL"
  | "FIELD_IS_MISSING"
  | "FIELD_NOT_EMAIL"
  | "UNKOWN";

export const RESPONSE_TYPES: {
  [K in RESPONSE_TYPES_NAME]: {
    code: number;
    message: string;
  };
} = {
  SUCCESS: {
    code: 200,
    message: "请求成功",
  },
  UNKOWN: {
    code: 1000,
    message: "未知错误",
  },
  // 登录失败
  SIGN_IN_FAIL: {
    code: 3000,
    message: "用户名或密码错误",
  },
  // 缺少字段
  FIELD_IS_MISSING: {
    code: 2000,
    message: "缺少字段",
  },
  // 不是邮箱
  FIELD_NOT_EMAIL: {
    code: 2001,
    message: "不符合邮箱格式",
  },
};
