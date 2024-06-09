import jwt from "@elysiajs/jwt";

export const JwtService = jwt({
  name: "jwt",
  secret: "poccur_next hello",
  exp: "3d",
});
