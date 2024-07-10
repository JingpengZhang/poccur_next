import Link from "next/link";
import React from "react";

type Props = {
  data: Category;
};

const CategoryTag: React.FC<Props> = ({ data }) => {
  return (
    <>
      <Link
        href={""}
        style={{ backgroundColor: data.color }}
        className="flex items-center hover:text-white h-6 text-white bg-blue-600 w-fit rounded-md px-3 text-xs"
      >
        {data.name.toUpperCase()}
      </Link>
    </>
  );
};

export default CategoryTag;
