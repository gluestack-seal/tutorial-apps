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
const commons_1 = __importDefault(require("../commons"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const email_body_1 = __importDefault(require("../../validator/email-body"));
const template_1 = __importDefault(require("../helpers/template"));
class SendEmail {
    static handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // validate email body
            const { error, value } = email_body_1.default.validate(req.body, { abortEarly: false });
            if (error) {
                return commons_1.default.Response(res, false, error.details[0].message, {});
            }
            // generating template based on request type
            const template = yield template_1.default.compile(value.mailOptions.template, value.mailOptions.data);
            if (!template.status) {
                return commons_1.default.Response(res, false, template.message, {});
            }
            // mail options
            const mailOptions = {
                from: value.mailOptions.from,
                to: value.mailOptions.to,
                cc: value.mailOptions.cc,
                bcc: value.mailOptions.bcc,
                subject: value.mailOptions.subject,
                text: value.mailOptions.text,
                html: template.data,
                attachments: value.mailOptions.attachments
            };
            try {
                // create transporter of nodemailer
                const transporter = yield SendEmail.CreateTransporter(value.transportOptions);
                // send email
                yield transporter.sendMail(mailOptions);
                return commons_1.default.Response(res, true, 'Email has been sent', {});
            }
            catch (error) {
                return commons_1.default.Response(res, false, error.message, {});
            }
        });
    }
    static CreateTransporter(transportOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            return nodemailer_1.default.createTransport(transportOptions);
        });
    }
}
exports.default = SendEmail;
