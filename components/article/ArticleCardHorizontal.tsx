import { Flex } from "antd";
import CategoryTag from "../category/CategoryTag";
import TimeWithIcon from "../time/TimeWithIcon";
import { Article } from "@/server/src/db/schema/articles";
import Image from "next/image";
import Link from "next/link";

type Props = {
  className?: string;
  data: ArticleItem;
  index?: number; // 次序
};

const ArticleCardHorizontal: React.FC<Props> = ({ className, data, index }) => {
  return (
    <>
      <Flex justify="space-between" className={className}>
        <Flex className="h-full" justify="space-between" vertical>
          <div>
            <CategoryTag />
            <Link
              href=""
              className="leading-6 mt-2 block text-black hover:text-black font-bold text-lg"
            >
              {data.title}
            </Link>
          </div>
          <TimeWithIcon
            timestamp={data.createdAt as any as string}
            className="text-stone-500"
          />
        </Flex>
        <div className="h-full aspect-square rounded-lg overflow-hidden relative">
          <Image
            className="w-full h-full object-cover"
            src={data.cover}
            alt="封面"
            width={300}
            height={300}
          />
          {/* 次序 */}
          {index !== undefined && (
            <Flex
              align="center"
              justify="center"
              className="w-6 aspect-square text-white bg-red-500 absolute top-0 left-0"
            >
              {index}
            </Flex>
          )}
        </div>
      </Flex>
    </>
  );
};

export default ArticleCardHorizontal;
