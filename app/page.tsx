import ArticleListItem from "@/components/article/ArticleListItem";
import { Article } from "@/server/src/db/schema/articles";
import { Button, Col, Grid, Input, Row, Table } from "antd";

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
      <section className="w-page mx-auto">
        <div className="w-3/5">
          <Row gutter={20} className="w-full">
            {articles.map((item) => (
              <Col span={12} key={item.id} className="aspect-[360/288] mb-6">
                <ArticleListItem data={item} />
              </Col>
            ))}
          </Row>
        </div>
      </section>
    </main>
  );
}
