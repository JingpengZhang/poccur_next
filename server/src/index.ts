import Elysia from "elysia";
import { users } from "./module/users";

const app = new Elysia()
  .get("/", () => "hello poccur_next")
  .use(users)
  .listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
