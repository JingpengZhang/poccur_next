import { defineConfig } from "drizzle-kit";

const schemaUrlPrefix = "./server/src/db/schema/";

const schemas = ["users", "categories", "articles", "files"];

export default defineConfig({
  schema: schemas.map((v) => schemaUrlPrefix + v + ".ts"),
  out: "./server/drizzle",
  dialect: "mysql", // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    host: "localhost",
    user: "root",
    password: "zhang123456",
    database: "poccur_next",
  },
});
