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
const queries_1 = require("../graphql/queries");
class User {
    static handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = req.headers["x-hasura-user-token"];
            try {
                // graphql query
                const { data } = yield commons_1.default.AuthGQLRequest({
                    variables: {},
                    query: queries_1.default.User,
                    token: token,
                });
                if (data && data.data && data.data.users && data.data.users[0]) {
                    return res.json(data.data.users[0]);
                }
                return res.json({});
            }
            catch (error) {
                return commons_1.default.Response(res, false, error.message, null);
            }
        });
    }
}
exports.default = User;
//# sourceMappingURL=user.js.map