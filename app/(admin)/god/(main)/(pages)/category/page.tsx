"use client";

import { useGetCategoryList } from "@/hooks/requests/category/use-get-category-list";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { App, Button, Flex, Table, Tooltip } from "antd";
import CategoryCUModal from "./_components/CategoryCUModal";
import { useCUModal } from "@/hooks/use-cu-modal";
import { Category } from "@/server/src/db/schema/categories";
import { useDeleteCategory } from "@/hooks/requests/category/use-delete-category";
import { useMemoizedFn } from "ahooks";
import toast from "react-hot-toast";
import React, { useState } from "react";
import { setServers } from "dns";

export default function Page() {
  const { modal } = App.useApp();

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
  const { runAsync: deleteRunAsync, loading: deleteLoading } =
    useDeleteCategory();

  // 删除分类
  const deleteCategories = useMemoizedFn((ids: Array<Category["id"]>) => {
    modal.confirm({
      content: "确认删除所选分类，请谨慎操作",
      onOk: async () => {
        for (let i = 0; i < ids.length; i++) {
          await deleteRunAsync({ id: ids[i] });
        }

        toast.success("删除成功");
        refresh();
      },
    });
  });

  // 所选数据
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  return (
    <>
      <CategoryCUModal {...cuModal} />

      <Flex align="center" justify="space-between" className="mb-5">
        <h2 className="text-lg">分类表格</h2>

        <Flex gap={16} align="center">
          <Button
            type="primary"
            danger
            disabled={selectedRowKeys.length === 0}
            onClick={() => deleteCategories(selectedRowKeys as number[])}
          >
            删除所选
          </Button>
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
        rowSelection={{
          type: "checkbox",
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
        }}
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
                      onClick={() => deleteCategories([rowData.id])}
                      className="hover:text-red-600"
                    />
                  </Tooltip>
                </Flex>
              );
            },
          },
        ]}
        {...tableProps}
        loading={tableProps.loading || deleteLoading}
      />
    </>
  );
}
