import * as bcryptjs from "bcryptjs";
import Common from "../../commons";
import Helpers from "../helpers";
import Mutations from "../graphql/mutations";

class SocialSignup {
  public static async success(req: any, res: any): Promise<void> {
    const { user } = req?.session?.passport || { user: null };
    if (!user)
      return res.redirect("/authentication/signup/google/callback/failure");

    const password = `glue${user.split("@")[0]}`
    const hashPswd = await bcryptjs.hash(password, 12);
    try {
      // graphql query
      const { data, errors } = await Common.GQLRequest({
        variables: {
          name: user.split("@")[0],
          email: user.toLowerCase(),
          password: hashPswd,
        },
        query: Mutations.InsertUser,
      });

      if (!data || !data.data || !data.data.insert_users_one) {
        return res.json({});
      }

      const { allowedRoles, defaultRole } =
        await Helpers.getAllowedAndDefaultRoles();

      // create Token for authentication
      const token = await Helpers.CreateToken({
        id: data.data.insert_users_one.id,
        allowed_roles: allowedRoles,
        default_role: defaultRole,
      });

      return res.render("token", {
        user: user,
        token: token.token,
      });
    } catch (e) {
      return res.json({ error: e.message, user: user });
    }
  }

  public static async failure(req: any, res: any): Promise<void> {
    res.send("Error");
  }
}

export default SocialSignup;
