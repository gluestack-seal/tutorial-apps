import Signin from "./signin";
import Signup from "./signup";
import User from "./user";
import SocialSignin from "./socialSignin";
import SocialSignup from "./socialSignup";
import RefreshJWTToken from "./refresh-jwt-token";

class Authentication {
  public signin(req: any, res: any): any {
    return Signin.handle(req, res);
  }

  public signup(req: any, res: any): any {
    return Signup.handle(req, res);
  }

  public refreshJWTToken(req: any, res: any): any {
    return RefreshJWTToken.handle(req, res);
  }

  public user(req: any, res: any): any {
    return User.handle(req, res);
  }

  public socialSigninSuccess(req: any, res: any): any {
    return SocialSignin.success(req, res);
  }

  public socialSigninFailure(req: any, res: any): any {
    return SocialSignin.failure(req, res);
  }

  public socialSignupSuccess(req: any, res: any): any {
    return SocialSignup.success(req, res);
  }

  public socialSignupFailure(req: any, res: any): any {
    return SocialSignup.failure(req, res);
  }
}

export default new Authentication();
