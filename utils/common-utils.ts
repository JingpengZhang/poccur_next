class CommonUtils {
  // 将任意类型值添加到 FormData 中
  static appendToFormData(formData: FormData, key: string, data: unknown) {
    // 如果是 Blob 类型
    if (data instanceof Blob) {
      formData.append(key, data);
    } else {
      // 如果是字符串类型
      if (typeof data === "string") {
        formData.append(key, data);
      } else if (typeof data === "number" || typeof data === "boolean") {
        formData.append(key, data.toString());
      } else if (typeof data === "object") {
        // 如果是数组，格式化为 key[index] = val 的形式加入 formData
        if (data instanceof Array) {
          data.forEach((val, index) => {
            CommonUtils.appendToFormData(formData, `${key}[${index}]`, val);
          });
        } else {
          formData.append(key, JSON.stringify(data));
        }
      }
    }
  }
}

export default CommonUtils;
