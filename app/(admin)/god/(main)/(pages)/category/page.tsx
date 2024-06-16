"use client";

import { useGetCategoryList } from "@/hooks/requests/category/use-get-category-list";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Flex, Popconfirm, Table, Tooltip } from "antd";
import CategoryCUModal from "./_components/CategoryCUModal";
import { useCUModal } from "@/hooks/use-cu-modal";
import { Category } from "@/server/src/db/schema/categories";
import { useDeleteCategory } from "@/hooks/requests/category/use-delete-category";
import { useMemoizedFn } from "ahooks";
import toast from "react-hot-toast";

export default function Page() {
  // 列表
  const { tableProps, refresh, run, pagination } = useGetCategoryList();

  // CU Modal
  const cuModal = useCUModal<Category>({
    name: "分类",
    onCreateSuccess: () => {
      run({
        current: 1,
        pageSize: pagination.pageSize,
      });
    },
    onUpdateSuccess: () => {
      refresh();
    },
  });

  // 删除请求
  const { runAsync: deleteRunAsync } = useDeleteCategory();

  // 删除分类
  const deleteCategories = useMemoizedFn((ids: Array<Category["id"]>) => {
    const handler = [];
    for (let i = 0; i < ids.length; i++) {
      handler.push(deleteRunAsync({ id: ids[i] }));
    }

    Promise.all(handler).then(() => {
      toast.success("删除成功");
      refresh();
    });
  });

  return (
    <>
      <CategoryCUModal {...cuModal} />

      <Flex align="center" justify="space-between" className="mb-5">
        <h2 className="text-lg">分类表格</h2>

        <Flex gap={16} align="center">
          <Button type="primary" onClick={cuModal.create}>
            新增
          </Button>
          <Tooltip title="刷新">
            <ReloadOutlined
              className="cursor-pointer hover:text-blue-500 text-lg"
              onClick={refresh}
            />
          </Tooltip>
        </Flex>
      </Flex>
      <Table
        rowKey="id"
        columns={[
          {
            title: "ID",
            dataIndex: "id",
          },
          {
            title: "分类名",
            dataIndex: "name",
          },
          {
            title: "操作",
            width: 200,
            dataIndex: "action",
            render: (_, rowData) => {
              return (
                <Flex align="center" gap={12}>
                  <Tooltip title="编辑">
                    <EditOutlined
                      className="hover:text-blue-600"
                      onClick={() => cuModal.update(rowData)}
                    />
                  </Tooltip>

                  <Tooltip title="删除">
                    <Popconfirm
                      title="提示"
                      description="确认删除此分类，请谨慎操作"
                      onConfirm={() => deleteCategories([rowData.id])}
                    >
                      <DeleteOutlined className="hover:text-red-600" />
                    </Popconfirm>
                  </Tooltip>
                </Flex>
              );
            },
          },
        ]}
        {...tableProps}
      />
    </>
  );
}
