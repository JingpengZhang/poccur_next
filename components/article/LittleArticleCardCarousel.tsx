import { Carousel, Flex } from "antd";
import React, { createRef, CSSProperties, useRef } from "react";
import ArticleCardOverlay from "./ArticleCardOverlay";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { CarouselRef } from "antd/es/carousel";
import { useMemoizedFn } from "ahooks";

type Props = {
  data: ArticleItem[];
  className?: string;
  style?: CSSProperties;
};

const LittleArticleCardCarousel: React.FC<Props> = ({
  data,
  className,
  style,
}) => {
  const carouselRef = createRef<CarouselRef>();

  const prev = useMemoizedFn(() => {
    carouselRef.current?.prev();
  });
  const next = useMemoizedFn(() => {
    carouselRef.current?.next();
  });

  return (
    <div style={style} className={`w-full relative ${className}`}>
      <Carousel ref={carouselRef} autoplay className={`w-full`}>
        {data.map((item) => (
          <div key={item.id}>
            <ArticleCardOverlay
              style={{ backgroundColor: "red" }}
              className="w-full aspect-[3/4]"
              data={item}
            />
          </div>
        ))}
      </Carousel>

      <Flex className="absolute top-6 right-6" gap={4}>
        <Flex
          align="center"
          justify="center"
          className="w-9 cursor-pointer aspect-square rounded-full white bg-white_04"
          onClick={prev}
        >
          <IoIosArrowBack />
        </Flex>
        <Flex
          align="center"
          justify="center"
          className="w-9 cursor-pointer aspect-square rounded-full white bg-white_04"
          onClick={next}
        >
          <IoIosArrowForward />
        </Flex>
      </Flex>
    </div>
  );
};

export default LittleArticleCardCarousel;
