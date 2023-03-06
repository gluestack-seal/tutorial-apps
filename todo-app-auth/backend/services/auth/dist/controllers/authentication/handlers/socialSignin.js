"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const commons_1 = require("../../commons");
const helpers_1 = require("../helpers");
const queries_1 = require("../graphql/queries");
class Signin {
    static success(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = ((_a = req === null || req === void 0 ? void 0 : req.session) === null || _a === void 0 ? void 0 : _a.passport) || { user: null };
            if (!user)
                return res.redirect("/authentication/signin/google/callback/failure");
            try {
                const { data } = yield commons_1.default.GQLRequest({
                    variables: { email: user.toLowerCase() },
                    query: queries_1.default.UserByEmail,
                });
                // error handling
                if (!data ||
                    !data.data ||
                    !data.data.users ||
                    data.data.users.length === 0) {
                    return res.json({});
                }
                const { allowedRoles, defaultRole } = yield helpers_1.default.getAllowedAndDefaultRoles();
                // create Token for authentication
                const token = yield helpers_1.default.CreateToken({
                    id: data.data.users[0].id,
                    allowed_roles: allowedRoles,
                    default_role: defaultRole,
                });
                return res.render("token", {
                    user: user,
                    token: token.token,
                });
            }
            catch (e) {
                return res.json({ error: e.message, user: user });
            }
        });
    }
    static failure(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send("Error");
        });
    }
}
exports.default = Signin;
//# sourceMappingURL=socialSignin.js.map