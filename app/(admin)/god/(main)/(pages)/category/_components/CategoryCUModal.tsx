import { useCreateCategory } from "@/hooks/requests/category/use-create-category";
import { useUpdateCategory } from "@/hooks/requests/category/use-update-category";
import { useCUModal } from "@/hooks/use-cu-modal";
import { useCUModalUpdate } from "@/hooks/use-cu-modal-update";
import { Category } from "@/server/src/db/schema/categories";
import { useMemoizedFn } from "ahooks";
import { Form, Input, Modal } from "antd";
import FormItem from "antd/es/form/FormItem";
import React from "react";
import toast from "react-hot-toast";

type Props = ReturnType<typeof useCUModal<Category>>;

const CategoryCUModal: React.FC<Props> = ({ ...cuModalProps }) => {
  // 表单实例
  const [form] = Form.useForm<Category>();

  useCUModalUpdate(form, cuModalProps);

  // 新增请求
  const { runAsync: createRunAsync, loading: createLoading } =
    useCreateCategory(form);

  // 更新请求
  const { runAsync: updateRunAsync, loading: updateLoading } =
    useUpdateCategory(form);

  const submit = useMemoizedFn(() => {
    cuModalProps.submit({
      onCreate: () => {
        createRunAsync().then((res) => {
          if (res.code === 200) {
            toast.success("新增成功");
            cuModalProps.onCancel();
            cuModalProps.onCreateSuccess();
          }
        });
      },
      onUpdate: () => {
        if (cuModalProps.data && cuModalProps.data.id) {
          updateRunAsync(cuModalProps.data.id).then((res) => {
            if (res.code === 200) {
              toast.success("更新成功");
              cuModalProps.onCancel();
              cuModalProps.onUpdateSuccess();
            }
          });
        }
      },
    });
  });

  return (
    <Modal
      {...cuModalProps}
      onOk={submit}
      loading={createLoading || updateLoading}
    >
      <Form
        form={form}
        labelCol={{
          span: 4,
        }}
      >
        <FormItem name="name" label="分类" required>
          <Input placeholder="请输入分类名" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CategoryCUModal;
