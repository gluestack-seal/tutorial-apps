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
class Upload {
    static handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = helpers_1.default.minioClient();
            // Get the file from the request
            const file = req.file;
            // Use the minioClient to upload the file to Minio
            client.putObject(locals_1.default.config().bucket, file.originalname, file.buffer, function (err, etag) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        // Handle the error
                        return res.status(500).send(err);
                    }
                    client.presignedUrl("GET", locals_1.default.config().bucket, file.originalname, parseInt(locals_1.default.config().tokenTimeout), function (err, presignedUrl) {
                        if (err)
                            return console.log(err);
                        // Return a response to the client
                        return res.send({
                            message: "File uploaded successfully",
                            status: 200,
                            etag: etag,
                            presignedUrl: presignedUrl.split("?")[0],
                        });
                    });
                });
            });
        });
    }
}
exports.default = Upload;
