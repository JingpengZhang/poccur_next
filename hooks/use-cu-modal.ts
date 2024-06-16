import { useCreation, useMemoizedFn, useSetState, useToggle } from "ahooks";
import { useState } from "react";
import { useDisclosure } from "./use-disclosure";

type Mode = "create" | "update";

export const useCUModal = <T extends object>(options?: {
  initialData?: T;
  onCreateSuccess?: () => void;
  onUpdateSuccess?: () => void;
  name?: string;
}) => {
  // 模式
  const [mode, { set: setMode }] = useToggle<Mode>("create");

  // 显示/隐藏
  const disclosuer = useDisclosure();

  // 数据
  const [data, setData] = useState<T | undefined>(options?.initialData);

  // 通过创建模式打开
  const create = useMemoizedFn(() => {
    setData(options?.initialData);
    setMode("create");
    disclosuer.setOpen.setTrue();
  });

  // 通过编辑模式打开
  const update = useMemoizedFn((data: T) => {
    setData(data);
    setMode("update");
    disclosuer.setOpen.setTrue();
  });

  // 创建成功回调
  const onCreateSuccess = useMemoizedFn(() => {
    if (options?.onCreateSuccess) options.onCreateSuccess();
  });

  // 更新成功回调
  const onUpdateSuccess = useMemoizedFn(() => {
    if (options?.onUpdateSuccess) options.onUpdateSuccess();
  });

  // 弹窗标题
  const title = useCreation(() => {
    return (mode === "create" ? "新增" : "修改") + (options?.name ?? "");
  }, [mode, options?.name]);

  // 提交
  const submit = useMemoizedFn(
    (options: { onCreate: () => void; onUpdate: () => void }) => {
      if (mode === "create") {
        options.onCreate();
      } else {
        options.onUpdate();
      }
    },
  );

  return {
    mode,
    setMode,
    ...disclosuer,
    data,
    create,
    update,
    onCreateSuccess,
    onUpdateSuccess,
    title,
    submit,
  };
};
