"use client";

import { useGetCategoryList } from "@/hooks/category/use-get-category-list";
import { ReloadOutlined } from "@ant-design/icons";
import { Button, Flex, Table, Tooltip } from "antd";

export default function Page() {
  // 列表
  const { tableProps, refresh } = useGetCategoryList();

  return (
    <>
      <Flex align="center" justify="space-between" className="mb-5">
        <h2 className="text-lg">分类表格</h2>

        <Flex gap={16} align="center">
          <Tooltip title="刷新">
            <ReloadOutlined
              className="cursor-pointer hover:text-blue-500 text-lg"
              onClick={refresh}
            />
          </Tooltip>
        </Flex>
      </Flex>
      <Table
        columns={[
          {
            title: "ID",
            dataIndex: "id",
          },
          {
            title: "分类名",
            dataIndex: "name",
          },
        ]}
        {...tableProps}
      />
    </>
  );
}
