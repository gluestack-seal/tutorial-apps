import Common from "../../commons";
import Queries from "../graphql/queries";

class User {
  public static async handle(req: any, res: any): Promise<void> {
    const token = req.headers["x-hasura-user-token"];

    try {
      // graphql query
      const { data } = await Common.AuthGQLRequest({
        variables: {},
        query: Queries.User,
        token: token,
      });
      if (data && data.data && data.data.users && data.data.users[0]) {
        return res.json(data.data.users[0]);
      }
      return res.json({});
    } catch (error) {
      return Common.Response(res, false, error.message, null);
    }
  }
}

export default User;
