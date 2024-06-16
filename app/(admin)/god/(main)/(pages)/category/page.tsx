"use client";

import { useGetCategoryList } from "@/hooks/requests/category/use-get-category-list";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Flex, Table, Tooltip } from "antd";
import CategoryCUModal from "./_components/CategoryCUModal";
import { useCUModal } from "@/hooks/use-cu-modal";
import { Category } from "@/server/src/db/schema/categories";

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
                    <DeleteOutlined
                      className="hover:text-red-600"
                      onClick={() => {}}
                    />
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
