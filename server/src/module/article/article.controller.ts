import Elysia, { t } from "elysia";
import { JwtService } from "../../common/service/jwt-service";
import { CommonModel } from "../../common/common.model";
import { ArticleModel } from "./article.model";
import Response from "../../libs/response";
import ArticleService from "./article.service";

export const ArticleController = new Elysia({ prefix: "/article" })
  .use(JwtService)
  .use(CommonModel)
  .use(ArticleModel)
  .guard(
    {
      headers: t.Object({
        authorization: t.TemplateLiteral("Bearer ${string}", {
          error: () => {
            return Response.error("UNAUTHORIZATION");
          },
        }),
      }),
    },
    (app) =>
      app
        .resolve(async ({ headers: { authorization }, jwt }) => {
          const bearer = authorization.split(" ")[1];
          const jwtResult = await jwt.verify(bearer);
          return {
            bearer,
            // @ts-ignore
            userId: jwtResult["id"],
          };
        })
        .post(
          "/",
          async ({ body, userId }) => {
            try {
              const result = await ArticleService.insert({
                userId,
                title: body.title,
                content: body.content,
                categoryId: body.categoryId,
              });

              return Response.ok({
                data: {
                  id: result[0].insertId,
                },
              });
            } catch (err: any) {
              let message: string | undefined = undefined;
              console.log(err);

              if (err["errno"] === 1062) message = "字段重复";
              return Response.error("UNKOWN", { message });
            }
          },
          {
            body: "article.create",
          },
        ),
  );
