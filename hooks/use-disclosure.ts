import { useBoolean, useMemoizedFn } from "ahooks";

export const useDisclosure = () => {
  const [open, setOpen] = useBoolean();

  // 关闭弹窗
  const onCancel = useMemoizedFn(() => {
    setOpen.setFalse();
  });

  return {
    open,
    setOpen,
    onCancel,
  };
};
