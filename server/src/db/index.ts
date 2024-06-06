import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2";
import * as userSchema from "./schema/users";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "zhang123456",
  database: "poccur_next",
});

export const db = drizzle(connection, {
  schema: {
    ...userSchema,
  },
  mode: "default",
});
