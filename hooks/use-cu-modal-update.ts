import { useUpdateEffect } from "ahooks";
import { useCUModal } from "./use-cu-modal";
import { FormInstance } from "antd";

export const useCUModalUpdate = <T extends object>(
  form: FormInstance<T>,
  useCUModalInstance: ReturnType<typeof useCUModal<T>>,
) => {
  const { data, open, mode } = useCUModalInstance;

  useUpdateEffect(() => {
    if (open === true) {
      if (mode === "create") {
        form.resetFields();
      } else if (mode === "update" && data) {
        form.setFieldsValue(data);
      }
    }
  }, [useCUModalInstance.data, open, mode]);
};
