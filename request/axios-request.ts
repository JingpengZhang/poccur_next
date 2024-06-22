import CommonUtils from "@/utils/common-utils";
import { message } from "antd";
import axios, { AxiosRequestConfig } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 10000,
});

message.config({
  duration: 2,
  maxCount: 3,
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // token
    const token =
      localStorage.getItem("token") ||
      "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiZXhwIjoxNzE4NzkwNjg3fQ.o24tHaNfIdtMolGgRpTyZW3iHUPcVFkd5-Yxd3hcxr8";
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (err) => {
    return Promise.reject(err);
  },
);

/**
 * 请求管理
 */
export const requestManager = {
  /**
   * post
   * @param url 请求地址
   * @param params 参数对象
   * @param toFormData 是否转换为 FormData 对象，如果为 true，将循环 params 并构造 FormData 对象
   */
  post<IParams = any, IData = any>(
    url: string,
    params?: IParams,
    toFormData: Boolean = false,
    config: AxiosRequestConfig = {},
  ): Promise<IData> {
    // 请求携带的数据
    let requestData: FormData | object | undefined = undefined;

    // params 为 FormData 类型数据
    if (params instanceof FormData) {
      requestData = params;
    } else if (params instanceof Object) {
      // 如果params 是对象类型
      // 判断是否需要转换成 FormData 类型数据
      if (toFormData) {
        const formData: FormData = new FormData();
        // 转换
        const _params = params as object;
        for (let k in _params) {
          const kval = _params[k as keyof typeof _params] as unknown;
          CommonUtils.appendToFormData(formData, k, kval);
        }
        requestData = formData;
      } else {
        // 不需要转换，直接传递过去
        requestData = params;
      }
    }

    return axiosInstance.post(url, requestData, { ...config });
  },
  patch<IParams = any, IData = any>(
    url: string,
    params?: IParams,
    toFormData: Boolean = false,
    config: AxiosRequestConfig = {},
  ): Promise<IData> {
    // 请求携带的数据
    let requestData: FormData | object | undefined = undefined;

    // params 为 FormData 类型数据
    if (params instanceof FormData) {
      requestData = params;
    } else if (params instanceof Object) {
      // 如果params 是对象类型
      // 判断是否需要转换成 FormData 类型数据
      if (toFormData) {
        const formData: FormData = new FormData();
        // 转换
        const _params = params as object;
        for (let k in _params) {
          const kval = _params[k as keyof typeof _params] as unknown;
          CommonUtils.appendToFormData(formData, k, kval);
        }
        requestData = formData;
      } else {
        // 不需要转换，直接传递过去
        requestData = params;
      }
    }

    return axiosInstance.patch(url, requestData, { ...config });
  },
  get: <P extends object | undefined, T>(
    url: string,
    params?: P,
  ): Promise<T> => {
    let queryStr = "";

    // 检查 params 是否存在并且是一个对象
    if (params && typeof params === "object") {
      // 遍历 params 对象的键值对，构建查询字符串
      const queryParams = new URLSearchParams();
      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          // @ts-ignore
          queryParams.append(key, String(params[key]));
        }
      }
      queryStr = `?${queryParams.toString()}`;
    }

    return axiosInstance.get(url + queryStr);
  },
  delete: <P extends object | undefined, T>(
    url: string,
    params?: P,
  ): Promise<T> => {
    return axiosInstance.delete(url, { data: params });
  },
};

export default axiosInstance;
