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
const helpers_1 = require("../helpers");
const commons_1 = require("../../commons");
const queries_1 = require("../graphql/queries");
class RefreshToken {
    static handle(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.body;
                if (!refreshToken) {
                    return commons_1.default.Response(res, false, "Invalid Token", null);
                }
                /// Verify and Decode Token
                const verifiedRefreshToken = helpers_1.default.verifyRefreshToken(refreshToken);
                if (!verifiedRefreshToken.success) {
                    return commons_1.default.Response(res, false, "Invalid Refresh Token", null);
                }
                const tempToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
                const verifiedJWTToken = helpers_1.default.verifyJWTToken(tempToken);
                if (!verifiedJWTToken.success) {
                    return commons_1.default.Response(res, false, "Invalid Token", null);
                }
                const user_id = verifiedJWTToken.token.id;
                /// Get the user based on id
                const { data: userData } = yield commons_1.default.GQLRequest({
                    variables: { id: user_id },
                    query: queries_1.default.UserByPK,
                });
                // error handling
                if (!userData || !userData.data || !userData.data.users_by_pk) {
                    const error = (userData.errors && userData.errors) || "Something went wrong!";
                    return commons_1.default.Response(res, false, error, null);
                }
                const { allowedRoles, defaultRole } = yield helpers_1.default.getAllowedAndDefaultRoles();
                const user = Object.assign({}, userData.data.users_by_pk);
                // create Token for authentication
                const token = yield helpers_1.default.CreateToken({
                    id: user_id,
                    allowed_roles: allowedRoles,
                    default_role: defaultRole,
                });
                return res.json({
                    success: true,
                    message: "Refresh Token generated successfully!",
                    data: Object.assign(Object.assign({}, user), { token }),
                });
            }
            catch (error) {
                return commons_1.default.Response(res, false, error.message, null);
            }
        });
    }
}
exports.default = RefreshToken;
//# sourceMappingURL=refresh-jwt-token.js.map