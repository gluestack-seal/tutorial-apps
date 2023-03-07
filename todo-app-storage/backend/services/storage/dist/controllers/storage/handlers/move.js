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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = __importDefault(require("../helpers"));
const locals_1 = __importDefault(require("../../../providers/locals"));
const commons_1 = __importDefault(require("../../commons"));
const queries_1 = __importDefault(require("../graphql/queries"));
class Move {
    static handle(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { path } = req.params;
            try {
                // graphql query
                const { data } = yield commons_1.default.GQLRequest({
                    variables: { path: path },
                    query: queries_1.default.FileByPath,
                });
                // error handling
                if (!data ||
                    !data.data ||
                    !data.data.files ||
                    data.data.files.length === 0) {
                    return res.json({});
                }
                const client = helpers_1.default.minioClient();
                const file = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.files[0];
                if (!file.is_public) {
                    return res.json({});
                }
                client.presignedUrl("GET", locals_1.default.config().minioConfig.buckets[file.is_public ? "public" : "private"], file.path, parseInt(locals_1.default.config().minioConfig.tokenTimeout), function (err, presignedUrl) {
                    if (err)
                        return console.log(err);
                    const url = new URL(presignedUrl);
                    let replacedUrl = presignedUrl.replace(locals_1.default.config().minioConfig.adminEndPoint, `${locals_1.default.config().minioConfig.cdnEndPoint}/backend/${locals_1.default.config().appId}`);
                    if (url.protocol !== "https:") {
                        replacedUrl = replacedUrl.replace(locals_1.default.config().minioConfig.port, locals_1.default.config().nginxPort);
                    }
                    return res.redirect(replacedUrl);
                });
            }
            catch (error) {
                return commons_1.default.Response(res, false, error.message, null);
            }
        });
    }
}
exports.default = Move;
