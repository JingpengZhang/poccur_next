export const isSignIn = async ({ headers, jwt }: any) => {
  const result = !!(await jwt.verify(headers["token"]));
};
