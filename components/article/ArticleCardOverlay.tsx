import { Article } from "@/server/src/db/schema/articles";
import { Flex } from "antd";
import React, { CSSProperties } from "react";
import CategoryTag from "../category/CategoryTag";
import Link from "next/link";
import TimeWithIcon from "../time/TimeWithIcon";

type Props = {
  className?:string;
  style?:CSSProperties;
  data: ArticleItem;
};

const ArticleCardOverlay: React.FC<Props> = ({ data,style,className }) => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${data.cover})`,
          ...style
        }}
        className={`relative rounded-lg overflow-hidden bg-center bg-cover bg-no-repeat ${className}`}
      >
        <Flex
          vertical
          justify="space-between"
          className="absolute top-0 left-0 w-full h-full bg-black_06 p-4"
        >
          <CategoryTag data={data.category} />

          <div>
            <Link
              href={""}
              className="text-white hover:text-white text-xl font-bold line-clamp-2 leading-6"
            >
              {data.title}
            </Link>
            <TimeWithIcon timestamp={data.createAt as any as string} />
          </div>
        </Flex>
      </div>
    </>
  );
};

export default ArticleCardOverlay;
