import Helpers from "../helpers";
import Common from "../../commons";
import Queries from "../graphql/queries";
import User from "../models/user";

class RefreshToken {
  public static async handle(req: any, res: any): Promise<void> {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return Common.Response(res, false, "Invalid Token", null);
      }

      /// Verify and Decode Token
      const verifiedRefreshToken = Helpers.verifyRefreshToken(refreshToken);
      if (!verifiedRefreshToken.success) {
        return Common.Response(res, false, "Invalid Refresh Token", null);
      }

      const tempToken = req.headers.authorization?.split(" ")[1];
      const verifiedJWTToken = Helpers.verifyJWTToken(tempToken);
      if (!verifiedJWTToken.success) {
        return Common.Response(res, false, "Invalid Token", null);
      }

      const user_id = verifiedJWTToken.token.id;

      /// Get the user based on id
      const { data: userData } = await Common.GQLRequest({
        variables: { id: user_id },
        query: Queries.UserByPK,
      });

      // error handling
      if (!userData || !userData.data || !userData.data.users_by_pk) {
        const error =
          (userData.errors && userData.errors) || "Something went wrong!";
        return Common.Response(res, false, error, null);
      }

      const { allowedRoles, defaultRole } =
        await Helpers.getAllowedAndDefaultRoles();

      const user: User = { ...userData.data.users_by_pk };

      // create Token for authentication
      const token = await Helpers.CreateToken({
        id: user_id,
        allowed_roles: allowedRoles,
        default_role: defaultRole,
      });

      return res.json({
        success: true,
        message: "Refresh Token generated successfully!",
        data: {
          ...user,
          token,
        },
      });
    } catch (error: any) {
      return Common.Response(res, false, error.message, null);
    }
  }
}
export default RefreshToken;
