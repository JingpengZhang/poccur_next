import { Flex } from "antd";
import Link from "next/link";
import React from "react";

type Props = {
  className?: string;
};

const CategoryListItem: React.FC<Props> = ({ className }) => {
  return (
    <>
      <Link
        href={""}
        className={`block text-white hover:text-white rounded-lg overflow-hidden ${className}`}
        style={{
          backgroundImage:
            "url(https://jellywp.com/theme/disto/demo/wp-content/uploads/2019/03/daniel-korpai-1296140-unsplash-780x450.jpg)",
        }}
      >
        <Flex
          align="center"
          justify="space-between"
          className="bg-black_06 w-full h-full px-4"
        >
          <span>React</span>
          <Flex
            align="center"
            justify="center"
            className=" h-6 aspect-square text-xs bg-white rounded-full text-black"
          >
            11
          </Flex>
        </Flex>
      </Link>
    </>
  );
};

export default CategoryListItem;
