import ArticleCardHorizontal from "@/components/article/ArticleCardHorizontal";
import ArticleCardOverlay from "@/components/article/ArticleCardOverlay";
import CategoryListItem from "@/components/category/CategoryListItem";
import ModuleTitle from "@/components/ModuleTitle";
import { Article } from "@/server/src/db/schema/articles";
import { Button, Col, Flex, Grid, Input, Row, Table } from "antd";

export default function Home() {
  const articles: Article[] = [
    {
      id: 1,
      title: "Round white dining table on brown hardwood",
      content: "",
      userId: 1,
      categoryId: 1,
      createAt: new Date().getTime() as any,
      updateAt: new Date().getTime() as any,
    },
    {
      id: 2,
      title: "Round white dining table on brown hardwood",
      content: "",
      userId: 1,
      categoryId: 1,
      createAt: new Date().getTime() as any,
      updateAt: new Date().getTime() as any,
    },
    {
      id: 3,
      title: "Round white dining table on brown hardwood",
      content: "",
      userId: 1,
      categoryId: 1,
      createAt: new Date().getTime() as any,
      updateAt: new Date().getTime() as any,
    },
    {
      id: 4,
      title: "Round white dining table on brown hardwood",
      content: "",
      userId: 1,
      categoryId: 1,
      createAt: new Date().getTime() as any,
      updateAt: new Date().getTime() as any,
    },
  ];

  return (
    <main>
      <section className="w-page mx-auto flex justify-between">
        <div className="w-3/5 flex-shrink-0">
          <Row gutter={20} className="w-full">
            {articles.map((item) => (
              <Col span={12} key={item.id} className="aspect-[360/288] mb-6">
                <ArticleCardOverlay data={item} />
              </Col>
            ))}
          </Row>
        </div>
        <div className="flex-grow">
          <CategoryListItem className="h-14 w-full" />
          <ModuleTitle>Recent Post</ModuleTitle>
          <Flex vertical gap={30} className="mt-8">
            {articles.map((item, index) => (
              <ArticleCardHorizontal
                data={item}
                key={item.id}
                className="h-24"
                index={index + 1}
              />
            ))}
          </Flex>
        </div>
      </section>
    </main>
  );
}
