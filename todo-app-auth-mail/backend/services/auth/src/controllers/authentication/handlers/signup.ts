import * as bcryptjs from "bcryptjs";
import Common from "../../commons";
import Helpers from "../helpers";
import Mutations from "../graphql/mutations";

class Signup {
  public static async handle(req: any, res: any): Promise<void> {
    const { name, email, password } = req.body.input || req.body;

    try {
      // hash password
      const hashPswd = await bcryptjs.hash(password, 12);

      // graphql query
      const { data, errors } = await Common.GQLRequest({
        variables: {
          name,
          email: email.toLowerCase(),
          password: hashPswd,
        },
        query: Mutations.InsertUser,
      });

      if (!data || !data.data || !data.data.insert_users_one) {
        const error =
          errors ||
          (data.errors && data.errors[0].message) ||
          "Something went wrong!";
        return Common.Response(res, false, error, null);
      }

      const { allowedRoles, defaultRole } =
        await Helpers.getAllowedAndDefaultRoles();

      // create Token for authentication
      const token = await Helpers.CreateToken({
        id: data.data.insert_users_one.id,
        allowed_roles: allowedRoles,
        default_role: defaultRole,
      });

      return Common.Response(res, true, "Signup successfully!", {
        ...data.data.insert_users_one,
        ...token,
      });
    } catch (error) {
      return Common.Response(res, false, error.message, null);
    }
  }
}

export default Signup;
