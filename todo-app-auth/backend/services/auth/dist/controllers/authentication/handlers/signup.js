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
const bcryptjs = require("bcryptjs");
const commons_1 = require("../../commons");
const helpers_1 = require("../helpers");
const mutations_1 = require("../graphql/mutations");
class Signup {
    static handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = req.body.input || req.body;
            try {
                // hash password
                const hashPswd = yield bcryptjs.hash(password, 12);
                // graphql query
                const { data, errors } = yield commons_1.default.GQLRequest({
                    variables: {
                        name,
                        email: email.toLowerCase(),
                        password: hashPswd,
                    },
                    query: mutations_1.default.InsertUser,
                });
                if (!data || !data.data || !data.data.insert_users_one) {
                    const error = errors ||
                        (data.errors && data.errors[0].message) ||
                        "Something went wrong!";
                    return commons_1.default.Response(res, false, error, null);
                }
                const { allowedRoles, defaultRole } = yield helpers_1.default.getAllowedAndDefaultRoles();
                // create Token for authentication
                const token = yield helpers_1.default.CreateToken({
                    id: data.data.insert_users_one.id,
                    allowed_roles: allowedRoles,
                    default_role: defaultRole,
                });
                return commons_1.default.Response(res, true, "Signup successfully!", Object.assign(Object.assign({}, data.data.insert_users_one), token));
            }
            catch (error) {
                return commons_1.default.Response(res, false, error.message, null);
            }
        });
    }
}
exports.default = Signup;
//# sourceMappingURL=signup.js.map