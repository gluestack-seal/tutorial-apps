"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const emailBody = joi_1.default.object({
    mailOptions: joi_1.default.object({
        from: joi_1.default.string().required(),
        to: joi_1.default.alternatives().try(joi_1.default.array().min(1).items(joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.object().min(1))), joi_1.default.string().required()).required(),
        cc: [
            joi_1.default.array().min(1).items(joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.object().min(1))),
            joi_1.default.string().required()
        ],
        bcc: [
            joi_1.default.array().min(1).items(joi_1.default.alternatives().try(joi_1.default.string(), joi_1.default.object().min(1))),
            joi_1.default.string().required()
        ],
        subject: joi_1.default.string().required(),
        text: joi_1.default.string(),
        template: joi_1.default.string().required(),
        // html: Joi.alternatives().try(
        //   Joi.string(),
        //   Joi.object({ path: Joi.string().required() }).min(1)
        // ).required(),
        data: joi_1.default.object(),
        attachments: joi_1.default.array().min(1).items(joi_1.default.object().min(1))
    }).required(),
    transportOptions: joi_1.default.object({
        host: joi_1.default.string().required(),
        port: joi_1.default.number().required(),
        auth: joi_1.default.object({
            user: joi_1.default.string().required(),
            pass: joi_1.default.string().required()
        }).required(),
    }).required()
});
exports.default = emailBody;
