import Commons from "../commons";
import nodemailer from "nodemailer";
import emailBody from "../../validator/email-body"
import Template from "../helpers/template";
import { Glue } from "@gluestack/glue-server-sdk-js";

class SendEmail {
  public static async handle(req: Request, res: Response): Promise<void> {
    // validate email body
    const { error, value } = emailBody.validate(req.body, { abortEarly: false });
    if (error) {
      return Commons.Response(res, false, error.details[0].message, {});
    }

    // generating template based on request type
    const template = await Template.compile(value.mailOptions.template, value.mailOptions.data);

    if (!template.status) {
      return Commons.Response(res, false, template.message, {});
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
    }

    try {
      // create transporter of nodemailer
      const transporter = await SendEmail.CreateTransporter(value.transportOptions);

      // send email
      const response = await transporter.sendMail(mailOptions);
  
      const glue = new Glue((process.env.GLUE_APP_URL || "").replace("localhost", "host.docker.internal"))

      glue.functions.invoke("authservices", "email-response", { ...value.mailOptions, ...response })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(`Err -->`, err.message);
      })

      return Commons.Response(res, true, 'Email has been sent', response);
    } catch (error: any) {
      return Commons.Response(res, false, error.message, {});
    }
  }

  private static async CreateTransporter(
    transportOptions: import("nodemailer/lib/smtp-transport")) {
    return nodemailer.createTransport(transportOptions);
  }
}

export default SendEmail;
