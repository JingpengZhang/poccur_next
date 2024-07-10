import Mock from "mockjs";

export const categoriesList: Category[] = Mock.mock({
  "list|3": [
    {
      id: "@increment(1)",
      name: "@name",
      articleCount: "@integer(0,100)",
      pic: "@dataImage",
      color: "@color",
    },
  ],
});
