"use client";

import ArticleCardHorizontal from "@/components/article/ArticleCardHorizontal";
import ArticleCardOverlay from "@/components/article/ArticleCardOverlay";
import LittleArticleCardCarousel from "@/components/article/LittleArticleCardCarousel";
import CategoryListItem from "@/components/category/CategoryListItem";
import ModuleTitle from "@/components/ModuleTitle";
import { articlesList } from "@/hooks/mock/article";
import { categoriesList } from "@/hooks/mock/category";
import { Col, Flex, Row } from "antd";

export default function Home() {
  return (
    <main>
      <section className="w-page mx-auto flex justify-between">
        <div className="flex-grow ">
          <Row gutter={20} className="w-full">
            {/* @ts-ignore */}
            {articlesList.list.map((item) => (
              <Col span={12} key={item.id} className="aspect-[360/288] mb-6">
                <ArticleCardOverlay data={item} className="w-full h-full" />
              </Col>
            ))}
          </Row>
        </div>
        <div className="flex-shrink-0 w-[300px]">
          <Flex vertical gap={10} className="">
            {/* @ts-ignore */}
            {categoriesList.list.map((item) => (
              <CategoryListItem
                key={item.id}
                data={item}
                className="h-14 w-full"
              />
            ))}
          </Flex>
          <ModuleTitle className="mt-12">Recent Post</ModuleTitle>
          <Flex vertical gap={30} className="mt-8">
            {/* @ts-ignore */}
            {articlesList.list.map((item, index) => (
              <ArticleCardHorizontal
                data={item}
                key={item.id}
                className="h-24"
                index={index + 1}
              />
            ))}
          </Flex>
          <LittleArticleCardCarousel
            data={(articlesList as any).list}
            className="mt-12"
          />
        </div>
      </section>
    </main>
  );
}
