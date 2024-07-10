import { Article } from "@/server/src/db/schema/articles";
import { Flex } from "antd";
import React from "react";
import CategoryTag from "../category/CategoryTag";
import Link from "next/link";
import TimeWithIcon from "../time/TimeWithIcon";

type Props = {
  data: ArticleItem;
};

const ArticleCardOverlay: React.FC<Props> = ({ data }) => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${data.cover})`,
        }}
        className="relative w-full h-full rounded-lg overflow-hidden bg-center bg-cover bg-no-repeat"
      >
        <Flex
          vertical
          justify="space-between"
          className="absolute top-0 left-0 w-full h-full bg-black_06 p-4"
        >
          <CategoryTag />

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
