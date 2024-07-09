import { Article } from "@/server/src/db/schema/articles";
import { Flex } from "antd";
import React from "react";
import CategoryTag from "../category/CategoryTag";
import dayjs from "dayjs";
import Link from "next/link";

type Props = {
  data: Article;
};

const ArticleListItem: React.FC<Props> = ({ data }) => {
  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(https://jellywp.com/theme/disto/demo/wp-content/uploads/2019/03/daniel-korpai-1296140-unsplash-780x450.jpg)",
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
            <span className="text-xs mt-2">
              {dayjs(data.createAt).format("YYYY-MM-DD")}
            </span>
          </div>
        </Flex>
      </div>
    </>
  );
};

export default ArticleListItem;
