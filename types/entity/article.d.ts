type Article = {
  id: number;
  title: string; // 标题
  categoryId: Category["id"];
  userId: User["id"];
  coverId: UserFile["id"]; // 封面 id
  createdAt: string; // 创建日期
  updatedAt: string; // 最近更新日期
};

type ArticleItem = Pick<Article, "id" | "title" | "createdAt" | "updatedAt"> & {
  category: Category;
  user: Pick<User, "id" | "username" | "avatar">; // 作者信息
  cover: UserFile["path"]; // 封面
};
