import Common from "../controllers/commons";

export default function jwtAuthMiddleware(req: any, res: any, next: any) {
  // Verify the JWT token
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send({ error: "Unauthorized" });
  }

  // graphql query
  Common.AuthGQLRequest({
    variables: {},
    query: `query me { users { id } }`,
    token: token
  })
  .then(({ data }) => {
    if (data?.users?.[0]) {
      return next();
    }
    return res.status(401).send({ error: "Unauthorized" });
  })
  .catch((error) => {
    return res.status(401).send({ error: "Unauthorized" });
  });
}
