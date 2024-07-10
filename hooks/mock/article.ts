import Mock from "mockjs";

export const articlesList: ArticleItem[] = Mock.mock({
  "list|10": [
    {
      id: "@increment(1)",
      title: "@ctitle",
      user: {
        id: "@increment(1)",
        username: "@cname",
      },
      cover: "@dataImage",
      createdAt: "@date",
      updateAt: "@date",
    },
  ],
});
