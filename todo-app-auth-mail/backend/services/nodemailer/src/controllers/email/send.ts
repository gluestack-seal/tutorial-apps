import Commons from "../commons";
import nodemailer from "nodemailer";
import emailBody from "../../validator/email-body"
import Template from "../helpers/template";

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
      await transporter.sendMail(mailOptions);

      return Commons.Response(res, true, 'Email has been sent', {});
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
