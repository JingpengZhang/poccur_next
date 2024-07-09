import { Flex } from "antd";
import Link from "next/link";

const CategoryTag = () => {
  return (
    <>
      <Link
        href={""}
        className="flex items-center hover:text-white h-6 text-white bg-blue-600 w-fit rounded-md px-3 text-xs"
      >
        {"React".toUpperCase()}
      </Link>
    </>
  );
};

export default CategoryTag;
