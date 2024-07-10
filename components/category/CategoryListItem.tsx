import { Flex } from "antd";
import Link from "next/link";
import React from "react";

type Props = {
  className?: string;
  data: Category;
};

const CategoryListItem: React.FC<Props> = ({ className, data }) => {
  return (
    <>
      <Link
        href={""}
        className={`block text-white hover:text-white rounded-lg overflow-hidden ${className}`}
        style={{
          backgroundImage: `url(${data.pic})`,
        }}
      >
        <Flex
          align="center"
          justify="space-between"
          className="bg-black_06 w-full h-full px-4"
        >
          <span>{data.name}</span>
          <Flex
            align="center"
            justify="center"
            className=" h-6 aspect-square text-xs bg-white rounded-full text-black"
          >
            {data.articleCount}
          </Flex>
        </Flex>
      </Link>
    </>
  );
};

export default CategoryListItem;
