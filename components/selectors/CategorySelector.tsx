import { useGetCategoryList } from "@/hooks/requests/category/use-get-category-list";
import { Select } from "antd";
import { SelectProps } from "antd/lib";
import React from "react";

type Props = SelectProps;

const CategorySelector: React.FC<Props> = ({ ...antSelectProps }) => {
  const { data } = useGetCategoryList(undefined, {
    type: "all",
  });

  return (
    <Select
      placeholder="请选择分类"
      options={data?.list}
      fieldNames={{
        label: "name",
        value: "id",
      }}
      allowClear
      {...antSelectProps}
    />
  );
};

export default CategorySelector;
